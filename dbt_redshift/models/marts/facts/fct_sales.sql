{{ config(
    materialized='incremental',
    unique_key='sales_key',
    on_schema_change='append_new_columns',
    tags=['fact', 'sales']
) }}

with orders as (
    select * from {{ ref('stg_orders') }}
    {% if is_incremental() %}
    where updated_at > (select max(updated_at) from {{ this }})
    {% endif %}
),

customers as (
    select * from {{ ref('dim_customer') }}
),

products as (
    select * from {{ ref('dim_product') }}
),

dates as (
    select * from {{ ref('dim_date') }}
),

final as (
    select
        {{ dbt_utils.generate_surrogate_key(['o.order_id']) }} as sales_key,
        o.order_id,
        c.customer_key,
        p.product_key,
        d.date_day as order_date_key,
        o.order_date,
        o.amount as sales_amount,
        p.cost * 1 as cost_amount,  -- Assuming quantity is 1, should join with order_items
        o.amount - (p.cost * 1) as profit_amount,
        1 as quantity,  -- Should come from order_items table
        o.status,
        o.payment_method,
        o.shipping_address,
        c.region,
        c.country,
        p.category,
        p.subcategory,
        p.brand,
        date_part('year', o.order_date) as order_year,
        date_part('quarter', o.order_date) as order_quarter,
        date_part('month', o.order_date) as order_month,
        date_part('week', o.order_date) as order_week,
        date_part('dow', o.order_date) as order_day_of_week,
        current_timestamp as dwh_created_at,
        current_timestamp as dwh_updated_at
    from orders o
    inner join customers c on o.customer_id = c.customer_id
    inner join products p on true  -- Should join on product_id from order_items
    inner join dates d on date(o.order_date) = d.date_day
)

select * from final

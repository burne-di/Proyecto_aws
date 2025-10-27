{{ config(
    materialized='table',
    tags=['dimension', 'customer'],
    unique_key='customer_key'
) }}

with customers as (
    select * from {{ ref('stg_customers') }}
),

customer_aggregations as (
    select
        customer_id,
        count(*) as total_orders,
        sum(amount) as total_spent,
        max(order_date) as last_order_date,
        min(order_date) as first_order_date
    from {{ ref('stg_orders') }}
    group by customer_id
),

final as (
    select
        {{ dbt_utils.generate_surrogate_key(['c.customer_id']) }} as customer_key,
        c.customer_id,
        c.customer_name,
        c.email,
        c.region,
        c.country,
        c.registration_date,
        c.customer_segment,
        c.lifetime_value,
        coalesce(ca.total_orders, 0) as total_orders,
        coalesce(ca.total_spent, 0) as total_spent,
        ca.last_order_date,
        ca.first_order_date,
        case
            when ca.total_orders >= 10 then 'VIP'
            when ca.total_orders >= 5 then 'Regular'
            when ca.total_orders >= 1 then 'Occasional'
            else 'New'
        end as customer_tier,
        current_timestamp as dwh_created_at,
        current_timestamp as dwh_updated_at
    from customers c
    left join customer_aggregations ca on c.customer_id = ca.customer_id
)

select * from final

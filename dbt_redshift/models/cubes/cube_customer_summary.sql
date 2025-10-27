{{ config(
    materialized='materialized_view',
    tags=['olap', 'cube', 'customer']
) }}

with sales_data as (
    select * from {{ ref('fct_sales') }}
),

customer_metrics as (
    select
        customer_key,
        region,
        country,
        order_year,
        order_quarter,

        -- Customer Behavior Metrics
        count(distinct order_id) as order_count,
        sum(sales_amount) as total_spent,
        avg(sales_amount) as avg_order_value,
        sum(profit_amount) as total_profit_generated,

        -- Recency Metrics
        max(order_date) as last_order_date,
        min(order_date) as first_order_date,
        datediff(day, min(order_date), max(order_date)) as customer_lifetime_days,

        -- Frequency Metrics
        count(distinct order_month) as active_months,

        -- Monetary Metrics
        sum(case when order_month = date_part('month', current_date) then sales_amount else 0 end) as mtd_sales,
        sum(case when order_quarter = date_part('quarter', current_date) then sales_amount else 0 end) as qtd_sales,
        sum(case when order_year = date_part('year', current_date) then sales_amount else 0 end) as ytd_sales,

        current_timestamp as cube_refreshed_at

    from sales_data
    group by
        customer_key,
        region,
        country,
        order_year,
        order_quarter
)

select * from customer_metrics

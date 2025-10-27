{{ config(
    materialized='materialized_view',
    tags=['olap', 'cube', 'sales']
) }}

with sales_data as (
    select * from {{ ref('fct_sales') }}
),

aggregated as (
    select
        region,
        country,
        category,
        subcategory,
        brand,
        order_year,
        order_quarter,
        order_month,

        -- Sales Metrics
        count(distinct order_id) as total_orders,
        count(distinct customer_key) as unique_customers,
        sum(sales_amount) as total_sales,
        sum(cost_amount) as total_cost,
        sum(profit_amount) as total_profit,
        sum(quantity) as total_quantity,

        -- Aggregated Metrics
        avg(sales_amount) as avg_order_value,
        avg(profit_amount) as avg_profit_per_order,
        sum(profit_amount) / nullif(sum(sales_amount), 0) as profit_margin_pct,

        -- Min/Max
        min(sales_amount) as min_order_value,
        max(sales_amount) as max_order_value,

        current_timestamp as cube_refreshed_at

    from sales_data
    group by
        region,
        country,
        category,
        subcategory,
        brand,
        order_year,
        order_quarter,
        order_month
)

select * from aggregated

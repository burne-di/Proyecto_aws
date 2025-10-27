{{ config(
    materialized='table',
    tags=['dimension', 'product'],
    unique_key='product_key'
) }}

with products as (
    select * from {{ ref('stg_products') }}
),

final as (
    select
        {{ dbt_utils.generate_surrogate_key(['product_id']) }} as product_key,
        product_id,
        product_name,
        category,
        subcategory,
        brand,
        price,
        cost,
        margin,
        case
            when margin / nullif(price, 0) >= 0.4 then 'High Margin'
            when margin / nullif(price, 0) >= 0.2 then 'Medium Margin'
            else 'Low Margin'
        end as margin_category,
        stock_quantity,
        case
            when stock_quantity = 0 then 'Out of Stock'
            when stock_quantity < 10 then 'Low Stock'
            when stock_quantity < 50 then 'Medium Stock'
            else 'High Stock'
        end as stock_status,
        current_timestamp as dwh_created_at,
        current_timestamp as dwh_updated_at
    from products
)

select * from final

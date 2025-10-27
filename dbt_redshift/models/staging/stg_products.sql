{{ config(
    materialized='view',
    tags=['staging', 'products']
) }}

with source_data as (
    select
        product_id,
        product_name,
        category,
        subcategory,
        brand,
        price,
        cost,
        stock_quantity,
        created_at,
        updated_at
    from {{ source('raw', 'products') }}
),

cleaned as (
    select
        cast(product_id as bigint) as product_id,
        trim(product_name) as product_name,
        trim(category) as category,
        trim(subcategory) as subcategory,
        trim(brand) as brand,
        cast(price as decimal(10,2)) as price,
        cast(cost as decimal(10,2)) as cost,
        cast(price - cost as decimal(10,2)) as margin,
        cast(stock_quantity as integer) as stock_quantity,
        cast(created_at as timestamp) as created_at,
        cast(updated_at as timestamp) as updated_at
    from source_data
    where product_id is not null
      and price >= 0
)

select * from cleaned

{{ config(
    materialized='view',
    tags=['staging', 'orders']
) }}

with source_data as (
    select
        order_id,
        customer_id,
        order_date,
        amount,
        status,
        payment_method,
        shipping_address,
        created_at,
        updated_at
    from {{ source('raw', 'orders') }}
    where order_date >= '{{ var("start_date") }}'
),

cleaned as (
    select
        cast(order_id as bigint) as order_id,
        cast(customer_id as bigint) as customer_id,
        cast(order_date as timestamp) as order_date,
        cast(amount as decimal(10,2)) as amount,
        lower(trim(status)) as status,
        lower(trim(payment_method)) as payment_method,
        trim(shipping_address) as shipping_address,
        cast(created_at as timestamp) as created_at,
        cast(updated_at as timestamp) as updated_at
    from source_data
    where order_id is not null
      and customer_id is not null
      and amount >= 0
)

select * from cleaned

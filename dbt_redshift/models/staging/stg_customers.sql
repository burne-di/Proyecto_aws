{{ config(
    materialized='view',
    tags=['staging', 'customers']
) }}

with source_data as (
    select
        customer_id,
        name,
        email,
        region,
        country,
        registration_date,
        customer_segment,
        lifetime_value,
        created_at,
        updated_at
    from {{ source('raw', 'customers') }}
),

cleaned as (
    select
        cast(customer_id as bigint) as customer_id,
        trim(name) as customer_name,
        lower(trim(email)) as email,
        trim(region) as region,
        trim(country) as country,
        cast(registration_date as date) as registration_date,
        trim(customer_segment) as customer_segment,
        cast(lifetime_value as decimal(12,2)) as lifetime_value,
        cast(created_at as timestamp) as created_at,
        cast(updated_at as timestamp) as updated_at
    from source_data
    where customer_id is not null
      and email is not null
)

select * from cleaned

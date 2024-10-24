import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_url } from '../firebase/database'

export const shopApi = createApi({
    reducerPath: "shopApi",
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
    endpoints: (builder) => ({
        getCategories: builder.query({
            query: () => `categories.json`
        }),
        getProductsByCategory: builder.query({
            query: (category) => {
                category = category.toLowerCase()
                return (
                    `products.json?orderBy="categoria"&equalTo="${category}"`
                )
            },
            transformResponse: (response) => (
                response ? Object.values(response) : [])

        })
    })
})

export const { useGetCategoriesQuery, useGetProductsByCategoryQuery } = shopApi;
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_URL }),
    endpoints: (builder) => ({
        postOrder: builder.mutation({
            query: ({ ...order }) => ({
                url: 'orders.json',
                method: 'POST',
                body: order
            })
        }),
        getOrders: builder.query({
            query: (user) => `orders.json?orderBy="user"&equalTo="${user}"`,
            transformResponse: (response) => (
                response ? Object.values(response) : [])
        }),
        getOrder: builder.query({
            query: (orderId) => `orders.json?orderBy="orderId"&equalTo="${orderId}"`,
            transformResponse: (response) => (
                response ? Object.values(response)[0] : null
            )
        })
    })
})

export const { usePostOrderMutation, useGetOrdersQuery, useGetOrderQuery } = orderApi
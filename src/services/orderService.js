import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'
import { base_url } from '../firebase/database'

export const orderApi = createApi({
    reducerPath: 'orderApi',
    baseQuery: fetchBaseQuery({ baseUrl: base_url }),
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
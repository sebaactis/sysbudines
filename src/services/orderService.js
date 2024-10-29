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
            query: () => `orders.json`,
            transformResponse: (response) => (
                response ? Object.values(response) : []) 
        })
    })
})

export const { usePostOrderMutation, useGetOrdersQuery } = orderApi
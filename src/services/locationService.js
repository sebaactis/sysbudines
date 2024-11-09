import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react'

export const locationApi = createApi({
    reducerPath: 'locationApi',
    baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_URL }),
    endpoints: (builder) => ({
        postLocation: builder.mutation({
            query: ({ ...location }) => ({
                url: 'locations.json',
                method: 'POST',
                body: location
            })
        }),
        getLocations: builder.query({
            query: (user) => `locations.json?orderBy="user"&equalTo="${user}"`,
            transformResponse: (response) => (
                response ? Object.values(response) : [])
        })
    })
})

export const { usePostLocationMutation, useGetLocationsQuery } = locationApi
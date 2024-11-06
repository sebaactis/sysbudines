import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({ baseUrl: process.env.EXPO_PUBLIC_BASE_URL }),
    endpoints: (builder) => ({
        putProfileImage: builder.mutation({
            query: ({ image, localId }) => ({
                url: `profileImages/${localId}.json`,
                method: 'PUT',
                body: {
                    image
                }
            })
        }),
        getProfileImage: builder.query({
            query: (localId) => `profileImages/${localId}.json`
        })
    })
})

export const { usePutProfileImageMutation, useGetProfileImageQuery } = userApi;
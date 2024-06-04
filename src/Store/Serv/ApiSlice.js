import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const productsApi = createApi({
    reducerPath: 'productsApi',
    baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:3000/' }),
    tagTypes: ['Products'],
    endpoints: (builder) => ({
        // Get products
        getProducts: builder.query({
            query: ({ page = 1 }) => `products?page=${page}`,
            providesTags: ['Products'],
        }),
        // Delete product
        deleteProduct: builder.mutation({
            query: (id) => ({
                url: `products/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: ['Products'],
        }),


        // Update product
        updateProduct: builder.mutation({
            query: ({ id, body }) => ({
                url: `products/${id}`,
                method: 'PUT',
                body,
            }),
            invalidatesTags: ['Products'],
        }),

    }),
});

export const { useGetProductsQuery, useDeleteProductMutation, useUpdateProductMutation } = productsApi;

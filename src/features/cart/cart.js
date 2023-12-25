import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const productCartApi = createApi({
  reducerPath: "productCartApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
  }),

  tagTypes: ["carts"], // Define the tag type
  endpoints: (build) => ({
    createCart: build.mutation({
      query: (product) => ({
        url: "/cart/create-cart",
        method: "POST",
        body: product,
      }),
      invalidatesTags: ["carts"],
    }),

    deleteCart: build.mutation({
      query: (id) => ({
        url: `/cart/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["carts"],
    }),

    getAllCart: build.query({
      query: () => ({
        url: "/cart",
      }),
      providesTags: ["carts"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useCreateCartMutation,
  useGetAllCartQuery,
  useDeleteCartMutation,
} = productCartApi;

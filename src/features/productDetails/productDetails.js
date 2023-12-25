import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const ProductDetailsDetailsApi = createApi({
  reducerPath: "ProductDetailsDetailsApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/v1/",
    // baseUrl: "https://createabit-backend.onrender.com/api/v1/",
  }),

  tagTypes: ["productDetails"], // Define the tag type
  endpoints: (build) => ({
    createProductDetails: build.mutation({
      query: (data) => ({
        url: "/productDetails/create-productDetails",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["productDetails"],
    }),

    getSingleProductDetails: build.query({
      query: (id) => ({
        url: `/productDetails/${id}`,
      }),
      providesTags: ["productDetails"],

      refetchOnMountOrArgChange: true,
      pollingInterval: 1000,
    }),
  }),
});

export const {
  useGetSingleProductDetailsQuery,
  useCreateProductDetailsMutation,
} = ProductDetailsDetailsApi;

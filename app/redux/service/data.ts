import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const dataApi = createApi({
  reducerPath: "contact",
  baseQuery: fetchBaseQuery({ baseUrl: "https://contact.herokuapp.com" }),
  tagTypes: ["Contact"],
  endpoints: (builder) => ({
    // mendapatkan semua list kontak
    getAllContacts: builder.query<unknown, void>({
      query: () => `/contact`,
      providesTags: ["Contact"],
    }),
    getContactById: builder.query({
      query: (id) => `/contact/${id}`,
      providesTags: (result, error, id) => [{ type: "Contact", id }],
    }),
    createNewContact: builder.mutation({
      query: (newContact) => ({
        url: `/contact`,
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: newContact,
      }),
      invalidatesTags: ["Contact"],
    }),
    updateContact: builder.mutation({
      query: ({ id, updatedContact }) => ({
        url: `/contact/${id}`,
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: updatedContact,
      }),
      invalidatesTags: ["Contact"],
    }),

    deleteContact: builder.mutation({
      query: (id) => ({
        url: `/contact/${id}`,
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
      }),
      invalidatesTags: ["Contact"],
    }),
  }),
});

export const {
  useGetAllContactsQuery,
  useGetContactByIdQuery,
  useCreateNewContactMutation,
  useUpdateContactMutation,
  useDeleteContactMutation,
} = dataApi;

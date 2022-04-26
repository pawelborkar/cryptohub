import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const cryptoNewsHeaders = {
    "x-bingapis-sdk": "true",
    "x-rapidapi-host": process.env.REACT_APP_NEWS_API_HOST,
    "x-rapidapi-key": process.env.REACT_APP_API_KEY,
};

const baseUrl = process.env.REACT_APP_NEWS_BASE_URL;

const createRequest = (url) => ({ url, headers: cryptoNewsHeaders });

export const cryptoNewsApi = createApi({
    reducerPath: "cryptoNewsApi",
    baseQuery: fetchBaseQuery({ baseUrl }),
    endpoints: (builder) => ({
        getCryptoNews: builder.query({
            query: ({ newsCategory, count }) =>
                createRequest(
                    `/news/search?q=${newsCategory}&safeSearch=Off&textFormat=Raw&freshness=Day&count=${count}`
                ),
        }),
    }),
});

export const { useGetCryptoNewsQuery } = cryptoNewsApi;

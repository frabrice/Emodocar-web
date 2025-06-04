import { apiSlice } from "../apiEntry";

export const api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    // View wallet balance
    walletBalance: builder.query({
      query: () => ({
        url: "/wallet",
        method: "GET",
      }),
    }),

    // Make deposit to the wallet
    makeDeposit: builder.mutation({
      query: (data) => ({
        url: "/wallet/deposit",
        method: "POST",
        body: data,
      }),
    }),

    // verify wallet transaction
    verifyTransaction: builder.query({
      query: ({ tx_ref, status, transaction_id }) => ({
        url: `/wallet/verify?tx_ref=${tx_ref}&status=${status}&transaction_id=${transaction_id}`,
        method: "GET",
      }),
    }),

    // Transfer funds from wallet to user account
    transferFunds: builder.mutation({
      query: (data) => ({
        url: "/wallet/transfer",
        method: "POST",
        body: data,
      }),
    }),
    // Transaction history
    transactionHistory: builder.query({
      query: ({ page = 1, limit = 10 }) => ({
        url: `/wallet/transactions?page=${page}&limit=${limit}`,
        method: "GET",
      }),
    }),
  }),
});

export const {
  useLazyWalletBalanceQuery,
  useMakeDepositMutation,
  useLazyTransactionHistoryQuery,
  useTransferFundsMutation,
  useLazyVerifyTransactionQuery,
  useVerifyTransactionQuery,
} = api;

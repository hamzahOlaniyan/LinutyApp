// app/providers/QueryProvider.tsx
import AsyncStorage from "@react-native-async-storage/async-storage";
import {
   //   persistQueryClient,
   createAsyncStoragePersister,
} from "@tanstack/query-async-storage-persister";
import { QueryClient } from "@tanstack/react-query";
import { PersistQueryClientProvider } from "@tanstack/react-query-persist-client";
import React from "react";

export const queryClient = new QueryClient({
   defaultOptions: {
      queries: {
         staleTime: 1000 * 60 * 30, // 30 min = data considered fresh
         refetchOnMount: false, // don’t refetch on every mount
         refetchOnReconnect: true, // safe for offline/online users
         retry: 1,
      },
   },
});

const asyncStoragePersister = createAsyncStoragePersister({
   storage: AsyncStorage,
});

export function QueryProvider({ children }: { children: React.ReactNode }) {
   return (
      <PersistQueryClientProvider client={queryClient} persistOptions={{ persister: asyncStoragePersister }}>
         {children}
      </PersistQueryClientProvider>
   );
}

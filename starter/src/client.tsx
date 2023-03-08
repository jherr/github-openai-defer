"use client";
import { QueryClientProvider, QueryClient } from "react-query";

export const client = new QueryClient();

export default function ClientProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}

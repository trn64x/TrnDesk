import {SidebarProvider } from "@/components/ui/sidebar";
import {ActionProvider } from "@/providers/ActionProvider";

import UserDataProvider from "@/providers/HomeProvider";
import ThemeProvider from "@/providers/ThemeProvider";
import "@/styles/globals.css";
import type { AppProps } from "next/app";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ThemeProvider>

    <UserDataProvider>

    <ActionProvider>
    <SidebarProvider>
    <Component {...pageProps} />
  </SidebarProvider>
  </ActionProvider>
  </UserDataProvider>
  </ThemeProvider>
);
}

import { AppProps } from "next/app";
import Router from "next/router";
import { syncDrupalPreviewRoutes } from "next-drupal";
import { Layout } from "@/components/layout";
import { ChakraProvider } from "@chakra-ui/react";
import theme from '../theme';

Router.events.on("routeChangeStart", function (path) {
  syncDrupalPreviewRoutes(path);
});

export default function App({ Component, pageProps }: AppProps) {
  return (
    <ChakraProvider theme={theme}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </ChakraProvider>
  );
}

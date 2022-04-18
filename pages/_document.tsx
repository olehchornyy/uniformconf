import Document, {
  DocumentContext,
  DocumentInitialProps,
  Head,
  Html,
  Main,
  NextScript,
} from "next/document";
import { enableNextSsr } from "@uniformdev/context-next";
import { createUniformContext } from "../lib/context/uniformContext";
import getConfig from "next/config";

const {
  publicRuntimeConfig: {
    gaTrackingId,
  },
} = getConfig();

class MyDocument extends Document {
  static async getInitialProps(
    ctx: DocumentContext
  ): Promise<DocumentInitialProps> {
    const serverTracker = createUniformContext(ctx);
    enableNextSsr(ctx, serverTracker);
    return await Document.getInitialProps(ctx);
  }

  render(): React.ReactElement {
    let tagManagerSrc= '';
    if (gaTrackingId)
    {
      tagManagerSrc = `https://www.googletagmanager.com/gtag/js?id=${gaTrackingId}`
    }

    return (
      <Html lang="en">
        <Head>
          <link href="/favicon/favicon.png" rel="icon" />
          <link
            href="/favicon/apple-touch-icon.png"
            rel="apple-touch-icon"
          />
          <link
            href="/favicon/apple-touch-icon-72x72.png"
            rel="apple-touch-icon"
            sizes="72x72"
          />
          <link
            href="/favicon/apple-touch-icon-114x114.png"
            rel="apple-touch-icon"
            sizes="114x114"
          />
          <link
            href="/favicon/icon-192x192.png"
            rel="icon"
            sizes="192x192"
          />
          <meta
            name="description"
            content="ItProDay content demo site"
          />
          <script src="https://www.solarwinds.com/bundles/jquery?v=ywRv5tGf_C8UyV9Nh0RJf-e9u4Rh_SmIN-qx3i-kH8Y1"></script>
          <script src="//assets.adobedtm.com/764583179334/dd952b9e6603/launch-d1359cc878c7.min.js"></script>
        </Head>
        {tagManagerSrc && (
          <>
            <script async src={tagManagerSrc}></script>
            <script
              dangerouslySetInnerHTML={{
                __html: `
                window.dataLayer = window.dataLayer || [];
                function gtag(){dataLayer.push(arguments);}
                gtag('js', new Date());
                gtag('config', '${gaTrackingId}', {
                  page_path: window.location.pathname,
                });
                `
              }}
            />
          </>
        )}
        <body className="leading-normal tracking-normal text-white gradient">
          <Main />
          <NextScript />
        </body>
        <script type="text/javascript">_satellite.pageBottom();</script>
      </Html>
    );
  }
}

export default MyDocument;

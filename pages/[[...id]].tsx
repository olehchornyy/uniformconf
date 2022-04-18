import { GetStaticPaths, GetStaticPropsContext } from "next";
import Head from "next/head";
import dynamic from "next/dynamic";
import {
  RootComponentInstance,
  CANVAS_DRAFT_STATE,
  CANVAS_PUBLISHED_STATE,
} from "@uniformdev/canvas";
import { Composition, Slot } from "@uniformdev/canvas-react";
import { canvasClient } from "lib/canvasClient";
import { resolveRenderer } from "../components";

import {
  createContentstackEnhancer,
  CANVAS_CONTENTSTACK_PARAMETER_TYPES,
} from '@uniformdev/canvas-contentstack';
import { enhance, CanvasClient, EnhancerBuilder } from '@uniformdev/canvas';
import contentstack from 'contentstack'


const PreviewDevPanel = dynamic(
  () => import("lib/preview/PreviewDevPanel/PreviewDevPanel")
);

export default function Home({
  composition,
  preview,
}: {
  preview: boolean;
  composition: RootComponentInstance;
}) {
  return (
    <>
      <Head>
        <title>Celebrate IT Pro Day ’21!</title>
        <meta name="description" content="SolarWinds test site"></meta>
      </Head>
      <div>
        <Composition data={composition} resolveRenderer={resolveRenderer}>
          <Slot name="header" />
          <Slot name="content" />
          <Slot name="footer" />
        </Composition>
        {preview && (
          <PreviewDevPanel preview={preview} composition={composition} />
        )}
      </div>
    </>
  );
}

export async function getStaticProps(context: GetStaticPropsContext) {
  const slug = context?.params?.id;
  const slugString = Array.isArray(slug) ? slug.join("/") : slug;
  const { preview } = context;
  const { composition } = await canvasClient.getCompositionBySlug({
    slug: slugString ? `/${slugString}` : "/",
    state:
      process.env.NODE_ENV === "development" || preview
        ? CANVAS_DRAFT_STATE
        : CANVAS_PUBLISHED_STATE,
  });

  const client = contentstack.Stack({
    // NOTE: for production code ensure you use environment variables to
    // configure Contentstack, not hard-coded values.
    api_key: 'bltc0556c1ac32ebf79',
    delivery_token: 'csa4c74d2073de500acb05aca8',
    environment: 'production',
    // contentstack.Region.US || contentstack.Region.EU
    region: contentstack.Region.US,
  });
  
  // create the Contentstack enhancer
  const contentstackEnhancer = createContentstackEnhancer({ client });
  
  
  // apply the enhancers to the composition data, enhancing it with external data
  // In this case, the _value_ of the Contentstack parameter you created is enhanced
  // with data from the Contentstack entry you selected in the Contentstack entry selector.
  // You can create your own enhancers easily; they are a simple function.
  await enhance({
    composition,
    enhancers: new EnhancerBuilder().parameterType(
      CANVAS_CONTENTSTACK_PARAMETER_TYPES,
      contentstackEnhancer
    ),
    context: {},
  });

  return {
    props: {
      composition,
      preview: Boolean(preview),
    },
  };
}

export const getStaticPaths: GetStaticPaths = async () => {
  const pages = await canvasClient.getCompositionList({
    state:
      process.env.NODE_ENV === "development"
        ? CANVAS_DRAFT_STATE
        : CANVAS_PUBLISHED_STATE,
  });

  return {
    paths: pages.compositions
      .map((c) => c.composition._slug!)
      .filter((slug) => slug),
    fallback: true,
  };
};

import * as React from "react";
import Head from "next/head";
import {
  DrupalNode,
  getPathsFromContext,
  getResource,
  getResourceFromContext,
  getResourceTypeFromContext,
} from "next-drupal";
import {
  GetStaticPathsResult,
  GetStaticPropsContext,
  GetStaticPropsResult,
} from "next";
import { DrupalJsonApiParams } from "drupal-jsonapi-params";
import { NodeArticle } from "@/nodes/node-article";
import { NodeBasicPage } from "@/nodes/node-basic-page";
import { NodeLandingPage } from "@/nodes/node-landing-page";
import { NodeProperty } from "@/nodes/node-property";

interface NodePageProps {
  preview: GetStaticPropsContext["preview"];
  node: DrupalNode;
}

export default function NodePage({ node, preview }: NodePageProps) {
  const [showPreviewAlert, setShowPreviewAlert] =
    React.useState<boolean>(false);

  if (!node) return null;

  React.useEffect(() => {
    setShowPreviewAlert(preview && window.top === window.self);
  }, []);

  return (
    <>
      <Head>
        <title>{node.title}</title>
        <meta
          name="description"
          content="A Next.js site powered by a Drupal backend."
        />
      </Head>
      {showPreviewAlert && (
        <div className="fixed top-4 right-4">
          <a
            href="/api/exit-preview"
            className="bg-black text-white rounded-md px-4 py-2 text-sm"
          >
            Exit preview
          </a>
        </div>
      )}
      {node.type === "node--page" && <NodeBasicPage node={node} />}
      {node.type === "node--article" && <NodeArticle node={node} />}
      {node.type === "node--property" && <NodeProperty node={node} />}
      {node.type === "node--landing_page" && <NodeLandingPage node={node} />}
    </>
  );
}

export async function getStaticPaths(context): Promise<GetStaticPathsResult> {
  return {
    paths: await getPathsFromContext(
      ["node--article", "node--page", "node--landing_page", "node--property"],
      context
    ),
    fallback: "blocking",
  };
}

export async function getStaticProps(
  context
): Promise<GetStaticPropsResult<NodePageProps>> {
  const type = await getResourceTypeFromContext(context);

// Fetch blocks.
  const footerBlock = await getResource(
    "block_content--basic",
    "51bfce7b-f510-48f0-bd62-45909f48d972"
  );
  console.log(footerBlock);

  if (!type) {
    return {
      notFound: true,
    };
  }

  const apiParams = new DrupalJsonApiParams();

  if (type === "node--article") {
    apiParams.addInclude([ "field_image, uid"]);
  }

  if (type === "node--landing_page") {
    apiParams.addInclude([
      "field_paragraph_entity_content",
      "field_paragraph_entity_content.field_background_image",
      // "field_paragraph_entity_content.field_title",
      // "field_sections.field_media.field_media_image",
      // "field_sections.field_items",
      // "field_sections.field_reusable_paragraph.paragraphs.field_items",
    ]);
  }

  const node = await getResourceFromContext<DrupalNode>(type, context, {
    params: apiParams.getQueryObject(),
  });

  if (!node?.status) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      preview: context.preview || false,
      node,
    },
    revalidate: 10,
  };
}

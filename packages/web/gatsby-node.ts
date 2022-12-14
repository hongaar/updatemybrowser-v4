import { format, isFuture } from "date-fns";
import type { CreatePagesArgs } from "gatsby";
import { resolve } from "path";

/**
 * Implement Gatsby's Node APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/node-apis/
 */

async function createBlogPostPages(
  graphql: CreatePagesArgs["graphql"],
  actions: CreatePagesArgs["actions"]
) {
  const { createPage } = actions;
  const result = await graphql<{ allSanityPost: { edges: any[] } }>(`
    {
      allSanityPost(
        filter: { slug: { current: { ne: null } }, publishedAt: { ne: null } }
      ) {
        edges {
          node {
            id
            publishedAt
            slug {
              current
            }
          }
        }
      }
    }
  `);

  if (result.errors) throw result.errors;

  const postEdges = (result.data?.allSanityPost || {}).edges || [];

  postEdges
    .filter((edge) => !isFuture(new Date(edge.node.publishedAt)))
    .forEach((edge) => {
      const { id, slug = {}, publishedAt } = edge.node;
      const dateSegment = format(new Date(publishedAt), "yyyy/MM");
      const path = `/blog/${dateSegment}/${slug.current}/`;

      createPage({
        path,
        component: resolve(__dirname, "./src/templates/blog-post.tsx"),
        context: { id },
      });
    });
}

export async function createPages({ graphql, actions }: CreatePagesArgs) {
  await createBlogPostPages(graphql, actions);
}

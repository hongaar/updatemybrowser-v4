export default {
  widgets: [
    { name: "structure-menu" },
    {
      name: "project-info",
      options: {
        __experimental_before: [
          {
            name: "netlify",
            options: {
              description:
                "NOTE: Because these sites are static builds, they need to be re-deployed to see the changes when documents are published.",
              sites: [
                {
                  buildHookId:
                    "62486ad955633830b5cf3c97",
                  title: "Sanity Studio",
                  name: "updatemybrowser-v-4-studio",
                  apiId: "7c9f43fb-2871-4c07-865b-426005fb8787",
                },
                {
                  buildHookId: "62486ad9db8975204a1521ea",
                  title: "Blog Website",
                  name: "updatemybrowser-v-4",
                  apiId: "b3ad713d-7fe8-4040-b081-bd54f887e497",
                },
              ],
            },
          },
        ],
        data: [
          {
            title: "GitHub repo",
            value:
              "https://github.com/hongaar/updatemybrowser-v4",
            category: "Code",
          },
          {
            title: "Frontend",
            value: "https://updatemybrowser-v-4.netlify.app",
            category: "apps",
          },
        ],
      },
    },
    { name: "project-users", layout: { height: "auto" } },
    {
      name: "document-list",
      options: {
        title: "Recent blog posts",
        order: "_createdAt desc",
        types: ["post"],
      },
      layout: { width: "medium" },
    },
  ],
};

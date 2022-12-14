import S from "@sanity/desk-tool/structure-builder";
// @ts-ignore
import EyeIcon from "part:@sanity/base/eye-icon";
import { IoIosGlobe } from "react-icons/io";
import { MdCloudDownload, MdComputer, MdOutlineLink } from "react-icons/md";
import IframePreview from "../previews/IframePreview";

// Web preview configuration
const remoteURL = "https://updatemybrowser-v-4.netlify.app";
const localURL = "http://localhost:8000";
const previewURL =
  window.location.hostname === "localhost" ? localURL : remoteURL;

export const getDefaultDocumentNode = ({ schemaType }) => {
  /**
   * Here you can define fallback views for document types without
   * a structure definition for the document node. If you want different
   * fallbacks for different types, or document values (e.g. if there is a slug present)
   * you can set up that logic in here too.
   * https://www.sanity.io/docs/structure-builder-reference#getdefaultdocumentnode-97e44ce262c9
   */
  if (schemaType.startsWith("source")) {
    return S.document().views([
      S.view.form(),
      S.view
        .component(IframePreview)
        .icon(EyeIcon)
        .title("Preview")
        .options({ previewURL }),
    ]);
  }
  return S.document().views([S.view.form()]);
};

/**
 * This defines how documents are grouped and listed out in the Studio.
 * Relevant documentation:
 * - https://www.sanity.io/guides/getting-started-with-structure-builder
 * - https://www.sanity.io/docs/structure-builder-introduction
 * - https://www.sanity.io/docs/structure-builder-typical-use-cases
 * - https://www.sanity.io/docs/structure-builder-reference
 */

const listItems = [
  {
    title: "Sites",
    icon: MdOutlineLink,
    type: "site",
  },
  {
    title: "Operating systems",
    icon: MdComputer,
    type: "os",
  },
  {
    title: "Browsers",
    icon: IoIosGlobe,
    type: "browser",
  },

  {
    title: "Releases",
    icon: MdCloudDownload,
    type: "release",
  },
];

export default () =>
  S.list()
    .title("Content")
    .items([
      // S.listItem()
      //   .title("Sites")
      //   .icon(MdSettings)
      //   .child(
      //     S.editor()
      //       .id("siteSettings")
      //       .schemaType("siteSettings")
      //       .documentId("siteSettings")
      //   ),
      // S.divider(),
      ...listItems.map((listItem) =>
        S.listItem()
          .title(listItem.title)
          .icon(listItem.icon)
          .schemaType(listItem.type)
          .child(S.documentTypeList(listItem.type).title(listItem.title))
      ),
    ]);

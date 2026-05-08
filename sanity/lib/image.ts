import createImageUrlBuilder from "@sanity/image-url";
import { SanityImageSource } from "@sanity/image-url/lib/types/types";

import { dataset, projectId } from "../env";

// https://www.sanity.io/docs/image-url
const builder = createImageUrlBuilder({ projectId, dataset });

export const urlFor = (source: SanityImageSource) => {
  return builder.image(source).auto("format");
};

/**
 * Best Practice Safety Net: 
 * Resolves image URL safely, falling back to logo.png if source is invalid or resolution fails.
 */
export const safeUrlFor = (source: SanityImageSource | null | undefined) => {
  if (!source || typeof source !== 'object' || !('asset' in (source as any))) {
    return "/logo.png";
  }
  
  try {
    const url = urlFor(source).url();
    return url || "/logo.png";
  } catch (error) {
    console.error("Error resolving image URL:", error);
    return "/logo.png";
  }
};

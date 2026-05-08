import { NextRequest, NextResponse } from "next/server";
import { revalidatePath } from "next/cache";

/**
 * API Route to handle On-Demand Revalidation from Sanity CMS.
 * This route is triggered by a Sanity Webhook whenever content is updated.
 */
export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const secret = req.headers.get("x-revalidate-secret");

    // 1. Verify the secret for security
    if (secret !== process.env.SANITY_REVALIDATE_SECRET) {
      console.warn("[Revalidate] Invalid secret");
      return NextResponse.json({ message: "Invalid secret" }, { status: 401 });
    }

    // 2. Propagation Delay: Give Sanity CDN time to update (2 seconds)
    await new Promise((resolve) => setTimeout(resolve, 2000));

    // 3. Identify the document type and slug
    // On deletion, slug might be missing depending on your webhook projection
    const type = body._type;
    const slug = body.slug;

    console.log(`[Revalidate] Triggered for type: ${type}, slug: ${slug}`);

    // 4. Logic based on document type
    if (type === "article") {
      // Revalidate homepage
      revalidatePath("/");
      
      // Revalidate specific article page
      if (slug) {
        revalidatePath(`/article/${slug}`);
      } else {
        // If no slug, it's likely a deletion. 
        // We do a secondary revalidation of the homepage after a longer delay 
        // to ensure Sanity's search index has updated.
        console.log("[Revalidate] Potential deletion detected, scheduling secondary homepage refresh...");
        
        // Note: In serverless environments, we can't easily background a task after response.
        // We'll wait a bit longer for the first response if it's a deletion.
        await new Promise((resolve) => setTimeout(resolve, 3000));
        revalidatePath("/");
      }

      return NextResponse.json({ 
        revalidated: true, 
        message: `Revalidated homepage and paths. Slug: ${slug || 'none (deletion)'}` 
      });
    }

    // Fallback: Always revalidate homepage for other updates
    revalidatePath("/");
    
    return NextResponse.json({ 
      revalidated: true, 
      message: "Revalidated homepage fallback" 
    });

  } catch (err: any) {
    console.error("[Revalidate] Error:", err.message);
    return NextResponse.json({ message: "Error revalidating", error: err.message }, { status: 500 });
  }
}

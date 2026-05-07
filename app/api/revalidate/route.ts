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

    // 2. Identify the document type and slug
    const { _type: type, slug } = body;

    console.log(`[Revalidate] Triggered for type: ${type}, slug: ${slug}`);

    // 3. Logic based on document type
    if (type === "article") {
      // Revalidate the homepage to show the new article in the list
      revalidatePath("/");
      
      // Revalidate the specific article page
      if (slug) {
        revalidatePath(`/article/${slug}`);
      }

      return NextResponse.json({ 
        revalidated: true, 
        now: Date.now(),
        message: `Revalidated homepage and article: ${slug}` 
      });
    }

    // Fallback: Always revalidate homepage for other updates
    revalidatePath("/");
    
    return NextResponse.json({ 
      revalidated: true, 
      now: Date.now(),
      message: "Revalidated homepage" 
    });

  } catch (err: any) {
    console.error("[Revalidate] Error:", err.message);
    return NextResponse.json({ message: "Error revalidating", error: err.message }, { status: 500 });
  }
}

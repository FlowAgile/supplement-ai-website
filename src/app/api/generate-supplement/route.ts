import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `You are an expert collision repair supplement writer with 20+ years of experience in the auto body industry. You specialize in writing insurance supplement requests that get approved.

You have deep knowledge of:
- OEM repair procedures for all major manufacturers
- I-CAR repair standards and best practices
- Insurance company documentation requirements
- CCC, Mitchell, and Audatex estimating systems
- Proper collision repair operations, labor times, and materials
- ADAS (Advanced Driver Assistance Systems) calibration requirements
- Structural repair procedures and safety considerations

When given repair information, you generate professional, detailed supplement requests that:
1. Clearly identify each additional operation needed
2. Provide specific justification for WHY each operation is necessary
3. Reference relevant OEM repair procedures
4. Cite I-CAR standards where applicable
5. Use proper industry terminology
6. Include appropriate labor times with justification
7. Format the document professionally

Your tone is professional but firm — factual, evidence-based, and safety-focused. Never confrontational.

IMPORTANT: Always check for these commonly missed operations and include them if applicable:
- Pre/post repair diagnostic scan (required by almost all OEMs)
- Weld-through primer on welded panels (NOT INCLUDED in labor times)
- Corrosion protection on bare metal (NOT INCLUDED in labor times)
- Seam sealer to match OEM application (NOT INCLUDED)
- Blend adjacent panels for color match
- ADAS calibration (identify which systems based on vehicle year/make/model and repair area)
- Wheel alignment after structural or suspension work
- Sound deadener replacement
- 3D measuring for structural repairs`;

export async function POST(request: NextRequest) {
  try {
    const contentType = request.headers.get("content-type") || "";
    let vehicleYear: string,
      vehicleMake: string,
      vehicleModel: string,
      vin: string,
      insuranceCompany: string,
      claimNumber: string,
      shopName: string,
      estimatorName: string,
      initialEstimate: string,
      damageDescription: string,
      damageAreas: string;
    let estimateFileBase64: string | null = null;
    let estimateFileMediaType: string | null = null;

    if (contentType.includes("multipart/form-data")) {
      // Handle file upload
      const formData = await request.formData();
      vehicleYear = (formData.get("vehicleYear") as string) || "";
      vehicleMake = (formData.get("vehicleMake") as string) || "";
      vehicleModel = (formData.get("vehicleModel") as string) || "";
      vin = (formData.get("vin") as string) || "";
      insuranceCompany = (formData.get("insuranceCompany") as string) || "";
      claimNumber = (formData.get("claimNumber") as string) || "";
      shopName = (formData.get("shopName") as string) || "";
      estimatorName = (formData.get("estimatorName") as string) || "";
      initialEstimate = (formData.get("initialEstimate") as string) || "";
      damageDescription = (formData.get("damageDescription") as string) || "";
      damageAreas = (formData.get("damageAreas") as string) || "";

      const file = formData.get("estimateFile") as File | null;
      if (file && file.size > 0) {
        const buffer = await file.arrayBuffer();
        estimateFileBase64 = Buffer.from(buffer).toString("base64");
        // Map file type to Claude's expected media types
        const typeMap: Record<string, string> = {
          "application/pdf": "application/pdf",
          "image/png": "image/png",
          "image/jpeg": "image/jpeg",
          "image/jpg": "image/jpeg",
          "image/webp": "image/webp",
        };
        estimateFileMediaType = typeMap[file.type] || "image/png";
      }
    } else {
      // Handle JSON (original behavior)
      const body = await request.json();
      vehicleYear = body.vehicleYear;
      vehicleMake = body.vehicleMake;
      vehicleModel = body.vehicleModel;
      vin = body.vin;
      insuranceCompany = body.insuranceCompany;
      claimNumber = body.claimNumber;
      shopName = body.shopName;
      estimatorName = body.estimatorName;
      initialEstimate = body.initialEstimate;
      damageDescription = body.damageDescription;
      damageAreas = body.damageAreas;
    }

    const apiKey = process.env.FLOW_TEARDOWN_KEY || process.env.flow_teardown_key;
    if (!apiKey) {
      return NextResponse.json(
        { error: "API key not configured." },
        { status: 500 }
      );
    }

    const estimateSection = estimateFileBase64
      ? "See the uploaded estimate document/image attached below. Extract all line items, operations, labor, and totals from it."
      : initialEstimate;

    const userPromptText = `Generate a complete, professional supplement request for this collision repair.

VEHICLE INFORMATION:
- Year/Make/Model: ${vehicleYear} ${vehicleMake} ${vehicleModel}
- VIN: ${vin || "Not provided"}

CLAIM INFORMATION:
- Insurance Company: ${insuranceCompany}
- Claim Number: ${claimNumber || "TBD"}
- Shop Name: ${shopName || "Shop"}
- Estimator: ${estimatorName || "Estimator"}

INITIAL ESTIMATE:
${estimateSection}

ADDITIONAL DAMAGE FOUND DURING TEARDOWN:
${damageDescription}

DAMAGE AREAS: ${damageAreas || "See description"}

---

Generate the supplement in this exact format:

**[SHOP NAME]**
**SUPPLEMENT REQUEST**

**Date:** [Today's date]
**Claim #:** [claim number]
**Insurance:** [insurance company]
**Vehicle:** [year make model]
**VIN:** [vin]
**Estimator:** [estimator name]

---

**SUPPLEMENT SUMMARY:**
[2-3 sentence summary of what was found and why supplement is needed. Include total additional amount at the end.]

---

**ADDITIONAL OPERATIONS:**

For each operation, use this exact format:

**[number]. [OPERATION DESCRIPTION]**
- **Labor:** [X.X hours] — [Body/Refinish/Mechanical/Structural/ADAS]
- **Justification:** [Detailed explanation of why this is necessary]
- **Reference:** [Specific OEM procedure or I-CAR standard]

---

**SUPPORTING DOCUMENTATION:**
- Photos: [suggest what photos should be attached]
- OEM Procedures: [list referenced OEM documents]

---

**CLOSING:**
[Professional closing requesting review and approval, with invitation to inspect vehicle]

IMPORTANT RULES:
- Include ALL applicable operations — do not leave money on the table
- Every operation MUST have a specific justification and reference
- Check for ADAS calibration requirements based on the vehicle year/make/model
- Include pre/post diagnostic scan if not already on initial estimate
- Include weld-through primer, corrosion protection, and seam sealer for any panel repair/replacement
- Include blend operations for adjacent panels
- Be specific with labor types (Body, Structural, Refinish, Mechanical, ADAS)
- Estimate reasonable labor hours for each operation
- Calculate and include a total additional dollar amount (use $85/hr body, $85/hr structural, $55/hr refinish, $95/hr mechanical, $150/hr ADAS as rough estimates)`;

    // Build the message content — include image/PDF if uploaded
    type ContentBlock =
      | { type: "text"; text: string }
      | { type: "image"; source: { type: "base64"; media_type: string; data: string } }
      | { type: "document"; source: { type: "base64"; media_type: string; data: string } };

    const messageContent: ContentBlock[] = [];

    if (estimateFileBase64 && estimateFileMediaType) {
      if (estimateFileMediaType === "application/pdf") {
        messageContent.push({
          type: "document",
          source: {
            type: "base64",
            media_type: "application/pdf",
            data: estimateFileBase64,
          },
        });
      } else {
        messageContent.push({
          type: "image",
          source: {
            type: "base64",
            media_type: estimateFileMediaType,
            data: estimateFileBase64,
          },
        });
      }
    }

    messageContent.push({ type: "text", text: userPromptText });

    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "x-api-key": apiKey,
        "anthropic-version": "2023-06-01",
      },
      body: JSON.stringify({
        model: "claude-sonnet-4-20250514",
        max_tokens: 4000,
        system: SYSTEM_PROMPT,
        messages: [
          {
            role: "user",
            content: messageContent,
          },
        ],
      }),
    });

    if (!response.ok) {
      const errorData = await response.text();
      console.error("Anthropic API error:", errorData);
      return NextResponse.json(
        { error: "Failed to generate supplement. Check API key and try again." },
        { status: 500 }
      );
    }

    const data = await response.json();
    const supplementText = data.content[0].text;

    return NextResponse.json({
      supplement: supplementText,
      usage: data.usage,
    });
  } catch (error) {
    console.error("Error generating supplement:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred." },
      { status: 500 }
    );
  }
}

import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, shopName, email, phone, estimatingSoftware, supplementsPerMonth, painPoint } = body;

    // Validate required fields
    if (!name || !shopName || !email || !estimatingSoftware || !supplementsPerMonth) {
      return NextResponse.json(
        { error: "Missing required fields." },
        { status: 400 }
      );
    }

    const webhookUrl = process.env.ZOHO_CRM_WEBHOOK_URL;
    const xnQsjsdp = process.env.ZOHO_CRM_XN_QS_JSDP;
    const xmIwtLD = process.env.ZOHO_CRM_XM_IWT_LD;

    if (!webhookUrl || !xnQsjsdp || !xmIwtLD) {
      console.error("Zoho CRM environment variables not configured");
      return NextResponse.json(
        { error: "Contact form is not configured yet. Please email hello@teardownai.net directly." },
        { status: 500 }
      );
    }

    // Build form data for Zoho CRM Web-to-Lead
    const formData = new URLSearchParams();
    formData.append("xnQsjsdp", xnQsjsdp);
    formData.append("xmIwtLD", xmIwtLD);
    formData.append("actionType", "TGVhZHM="); // Base64 for "Leads"
    formData.append("returnURL", "https://teardownai.net/contact");

    // Map fields to Zoho CRM field names
    // Split name into first/last for Zoho (Last Name is required)
    const nameParts = name.trim().split(/\s+/);
    const firstName = nameParts.length > 1 ? nameParts.slice(0, -1).join(" ") : "";
    const lastName = nameParts.length > 1 ? nameParts[nameParts.length - 1] : name;

    if (firstName) formData.append("First Name", firstName);
    formData.append("Last Name", lastName);
    formData.append("Company", shopName);
    formData.append("Email", email);
    if (phone) formData.append("Phone", phone);
    formData.append("Lead Source", "Website Contact Form");
    formData.append("Description", painPoint || "");

    // Custom fields — these use Zoho's custom field API names
    // The actual field names will be set during Zoho CRM web form creation
    // Format: LEADCF1, LEADCF2, etc. (update after creating web form in Zoho)
    if (process.env.ZOHO_CRM_FIELD_ESTIMATING_SOFTWARE) {
      formData.append(process.env.ZOHO_CRM_FIELD_ESTIMATING_SOFTWARE, estimatingSoftware);
    }
    if (process.env.ZOHO_CRM_FIELD_SUPPLEMENTS_PER_MONTH) {
      formData.append(process.env.ZOHO_CRM_FIELD_SUPPLEMENTS_PER_MONTH, supplementsPerMonth);
    }

    // POST to Zoho CRM
    const response = await fetch(webhookUrl, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: formData.toString(),
    });

    // Zoho web forms return 200 with a redirect even on success
    // We consider any non-error response as success
    if (response.ok || response.status === 302 || response.status === 301) {
      return NextResponse.json({ success: true });
    }

    console.error("Zoho CRM response:", response.status, await response.text());
    return NextResponse.json(
      { error: "Failed to submit. Please try again or email hello@teardownai.net." },
      { status: 500 }
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { error: "An unexpected error occurred. Please email hello@teardownai.net." },
      { status: 500 }
    );
  }
}

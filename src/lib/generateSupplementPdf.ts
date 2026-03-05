import jsPDF from "jspdf";

interface SupplementPdfOptions {
  supplementMarkdown: string;
  vehicleYear: string;
  vehicleMake: string;
  vehicleModel: string;
  shopName: string;
}

// Page layout constants (A4 in mm)
const PAGE_WIDTH = 210;
const PAGE_HEIGHT = 297;
const MARGIN_LEFT = 20;
const MARGIN_RIGHT = 20;
const MARGIN_TOP = 22;
const MARGIN_BOTTOM = 22;
const CONTENT_WIDTH = PAGE_WIDTH - MARGIN_LEFT - MARGIN_RIGHT;

// Colors
const BRAND_BLUE = "#1e40af";
const DARK_TEXT = "#111827";
const BODY_TEXT = "#374151";
const LABEL_TEXT = "#6b7280";
const RULE_COLOR = "#d1d5db";
const ACCENT_COLOR = "#3b82f6";

export function generateSupplementPdf(options: SupplementPdfOptions): void {
  const { supplementMarkdown, vehicleYear, vehicleMake, vehicleModel, shopName } = options;

  const doc = new jsPDF({ unit: "mm", format: "a4" });
  let y = MARGIN_TOP;

  function checkPageBreak(neededHeight: number) {
    if (y + neededHeight > PAGE_HEIGHT - MARGIN_BOTTOM) {
      doc.addPage();
      y = MARGIN_TOP;
    }
  }

  function drawHorizontalRule() {
    checkPageBreak(6);
    y += 2;
    doc.setDrawColor(RULE_COLOR);
    doc.setLineWidth(0.3);
    doc.line(MARGIN_LEFT, y, PAGE_WIDTH - MARGIN_RIGHT, y);
    y += 4;
  }

  function renderWrappedText(
    text: string,
    x: number,
    maxWidth: number,
    fontSize: number,
    fontStyle: "normal" | "bold",
    color: string,
    lineHeight: number
  ): number {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", fontStyle);
    doc.setTextColor(color);
    const lines = doc.splitTextToSize(text, maxWidth);
    for (const line of lines) {
      checkPageBreak(lineHeight);
      doc.text(line, x, y);
      y += lineHeight;
    }
    return lines.length;
  }

  function renderCenteredText(
    text: string,
    fontSize: number,
    fontStyle: "normal" | "bold",
    color: string,
    lineHeight: number
  ) {
    doc.setFontSize(fontSize);
    doc.setFont("helvetica", fontStyle);
    doc.setTextColor(color);
    checkPageBreak(lineHeight);
    doc.text(text, PAGE_WIDTH / 2, y, { align: "center" });
    y += lineHeight;
  }

  // Render bold+normal inline (e.g. "**Label:** value")
  function renderLabelValue(
    label: string,
    value: string,
    x: number,
    maxWidth: number,
    labelSize: number,
    valueSize: number,
    lineHeight: number
  ) {
    doc.setFontSize(labelSize);
    doc.setFont("helvetica", "bold");
    doc.setTextColor(DARK_TEXT);
    const labelWidth = doc.getTextWidth(label + " ");

    // Check if value needs wrapping
    doc.setFontSize(valueSize);
    doc.setFont("helvetica", "normal");
    const remainingWidth = maxWidth - labelWidth;

    if (remainingWidth > 20) {
      // Try to fit on same line with wrapping for the value
      const valueLines = doc.splitTextToSize(value, remainingWidth);

      checkPageBreak(lineHeight);
      // Draw bold label
      doc.setFontSize(labelSize);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(DARK_TEXT);
      doc.text(label + " ", x, y);

      // Draw first line of value inline
      doc.setFontSize(valueSize);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(BODY_TEXT);
      if (valueLines.length > 0) {
        doc.text(valueLines[0], x + labelWidth, y);
      }
      y += lineHeight;

      // Draw remaining wrapped lines
      for (let i = 1; i < valueLines.length; i++) {
        checkPageBreak(lineHeight);
        doc.text(valueLines[i], x + labelWidth, y);
        y += lineHeight;
      }
    } else {
      // Not enough room, put value on next line
      checkPageBreak(lineHeight);
      doc.setFontSize(labelSize);
      doc.setFont("helvetica", "bold");
      doc.setTextColor(DARK_TEXT);
      doc.text(label, x, y);
      y += lineHeight;
      renderWrappedText(value, x + 4, maxWidth - 4, valueSize, "normal", BODY_TEXT, lineHeight);
    }
  }

  // --- Parse and render the supplement markdown ---
  const lines = supplementMarkdown.split("\n");
  let isFirstHeading = true;

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];
    const trimmed = line.trim();

    // Skip empty lines (add small spacing)
    if (trimmed === "") {
      y += 1.5;
      continue;
    }

    // Horizontal rule
    if (trimmed === "---") {
      drawHorizontalRule();
      continue;
    }

    // Bold-only line: **text** (headings, operation titles)
    const boldOnlyMatch = trimmed.match(/^\*\*(.+)\*\*$/);
    if (boldOnlyMatch && !trimmed.includes(":**")) {
      const text = boldOnlyMatch[1];

      // Numbered operation heading: "1. OPERATION NAME"
      const operationMatch = text.match(/^(\d+)\.\s+(.+)/);
      if (operationMatch) {
        checkPageBreak(10);
        y += 2;
        // Draw accent bar
        doc.setFillColor(ACCENT_COLOR);
        doc.rect(MARGIN_LEFT, y - 3.5, 1.5, 5, "F");
        // Draw operation text
        renderWrappedText(
          `${operationMatch[1]}. ${operationMatch[2]}`,
          MARGIN_LEFT + 5,
          CONTENT_WIDTH - 5,
          10,
          "bold",
          DARK_TEXT,
          5.5
        );
        continue;
      }

      // "SUPPLEMENT REQUEST" or similar major heading
      if (
        text === "SUPPLEMENT REQUEST" ||
        text === "SUPPLEMENT SUMMARY:" ||
        text === "ADDITIONAL OPERATIONS:" ||
        text === "SUPPORTING DOCUMENTATION:" ||
        text === "CLOSING:"
      ) {
        checkPageBreak(10);
        y += 1;
        renderCenteredText(
          text === "SUPPLEMENT REQUEST" ? text : text,
          text === "SUPPLEMENT REQUEST" ? 13 : 11,
          "bold",
          text === "SUPPLEMENT REQUEST" ? BRAND_BLUE : DARK_TEXT,
          text === "SUPPLEMENT REQUEST" ? 8 : 7
        );
        if (text === "SUPPLEMENT REQUEST") y += 1;
        continue;
      }

      // Shop name (first bold heading) — centered, large, blue
      if (isFirstHeading) {
        isFirstHeading = false;
        checkPageBreak(10);
        renderCenteredText(text, 14, "bold", BRAND_BLUE, 8);
        continue;
      }

      // Other bold headings
      checkPageBreak(8);
      y += 1;
      renderWrappedText(text, MARGIN_LEFT, CONTENT_WIDTH, 10, "bold", DARK_TEXT, 6);
      continue;
    }

    // Key-value line: **Label:** value (not starting with -)
    const kvMatch = trimmed.match(/^\*\*(.+?):\*\*\s*(.*)$/);
    if (kvMatch && !trimmed.startsWith("-")) {
      checkPageBreak(6);
      renderLabelValue(kvMatch[1] + ":", kvMatch[2], MARGIN_LEFT, CONTENT_WIDTH, 9, 9, 5);
      continue;
    }

    // Bulleted key-value: - **Label:** value
    const bulletKvMatch = trimmed.match(/^-\s*\*\*(.+?):\*\*\s*(.*)$/);
    if (bulletKvMatch) {
      const indent = MARGIN_LEFT + 6;
      const bulletWidth = CONTENT_WIDTH - 6;
      checkPageBreak(6);

      // Draw bullet
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(LABEL_TEXT);
      doc.text("•", MARGIN_LEFT + 2, y);

      renderLabelValue(bulletKvMatch[1] + ":", bulletKvMatch[2], indent, bulletWidth, 9, 9, 5);
      continue;
    }

    // Plain bullet: - text
    const bulletMatch = trimmed.match(/^-\s+(.+)$/);
    if (bulletMatch) {
      checkPageBreak(6);
      doc.setFontSize(9);
      doc.setFont("helvetica", "normal");
      doc.setTextColor(LABEL_TEXT);
      doc.text("•", MARGIN_LEFT + 2, y);
      renderWrappedText(bulletMatch[1], MARGIN_LEFT + 6, CONTENT_WIDTH - 6, 9, "normal", BODY_TEXT, 5);
      continue;
    }

    // Plain text (closing paragraphs, summaries, etc.)
    renderWrappedText(trimmed, MARGIN_LEFT, CONTENT_WIDTH, 9, "normal", BODY_TEXT, 5);
  }

  // Add footer with page numbers
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const totalPages = (doc as any).internal.getNumberOfPages();
  for (let p = 1; p <= totalPages; p++) {
    doc.setPage(p);
    doc.setFontSize(7);
    doc.setFont("helvetica", "normal");
    doc.setTextColor(LABEL_TEXT);
    doc.text(
      `Page ${p} of ${totalPages}`,
      PAGE_WIDTH / 2,
      PAGE_HEIGHT - 12,
      { align: "center" }
    );
    doc.text(
      "Generated by TeardownAI",
      PAGE_WIDTH / 2,
      PAGE_HEIGHT - 8,
      { align: "center" }
    );
  }

  // Generate filename
  const parts = [vehicleYear, vehicleMake, vehicleModel].filter(Boolean);
  const vehiclePart = parts.length > 0 ? parts.join("-") : "";
  const filename = vehiclePart
    ? `Supplement-${vehiclePart}.pdf`.replace(/\s+/g, "-").replace(/[^a-zA-Z0-9\-\.]/g, "")
    : "Supplement.pdf";

  doc.save(filename);
}

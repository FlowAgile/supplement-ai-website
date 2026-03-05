"use client";

import { useState, useRef } from "react";
import Link from "next/link";

export default function TryItPage() {
  const [formData, setFormData] = useState({
    vehicleYear: "",
    vehicleMake: "",
    vehicleModel: "",
    vin: "",
    insuranceCompany: "",
    claimNumber: "",
    shopName: "",
    estimatorName: "",
    initialEstimate: "",
    damageDescription: "",
    damageAreas: "",
  });

  const [isGenerating, setIsGenerating] = useState(false);
  const [supplement, setSupplement] = useState("");
  const [error, setError] = useState("");
  const [generationTime, setGenerationTime] = useState(0);

  // Upload state
  const [estimateInputMode, setEstimateInputMode] = useState<"type" | "upload">("type");
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [uploadPreview, setUploadPreview] = useState<string>("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  function handleChange(
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFileChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    // Validate file type
    const validTypes = ["application/pdf", "image/png", "image/jpeg", "image/jpg", "image/webp"];
    if (!validTypes.includes(file.type)) {
      setError("Please upload a PDF, PNG, JPG, or WebP file.");
      return;
    }

    // Validate file size (max 10MB)
    if (file.size > 10 * 1024 * 1024) {
      setError("File must be under 10MB.");
      return;
    }

    setError("");
    setUploadedFile(file);

    // Show preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onload = (ev) => setUploadPreview(ev.target?.result as string);
      reader.readAsDataURL(file);
    } else {
      setUploadPreview("");
    }
  }

  function handleRemoveFile() {
    setUploadedFile(null);
    setUploadPreview("");
    if (fileInputRef.current) fileInputRef.current.value = "";
  }

  async function handleGenerate(e: React.FormEvent) {
    e.preventDefault();
    setIsGenerating(true);
    setError("");
    setSupplement("");
    const startTime = Date.now();

    try {
      let res: Response;

      if (estimateInputMode === "upload" && uploadedFile) {
        // Send as FormData with file
        const fd = new FormData();
        fd.append("estimateFile", uploadedFile);
        fd.append("vehicleYear", formData.vehicleYear);
        fd.append("vehicleMake", formData.vehicleMake);
        fd.append("vehicleModel", formData.vehicleModel);
        fd.append("vin", formData.vin);
        fd.append("insuranceCompany", formData.insuranceCompany);
        fd.append("claimNumber", formData.claimNumber);
        fd.append("shopName", formData.shopName);
        fd.append("estimatorName", formData.estimatorName);
        fd.append("initialEstimate", "");
        fd.append("damageDescription", formData.damageDescription);
        fd.append("damageAreas", formData.damageAreas);

        res = await fetch("/api/generate-supplement", {
          method: "POST",
          body: fd,
        });
      } else {
        // Send as JSON (original behavior)
        res = await fetch("/api/generate-supplement", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
        });
      }

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || "Failed to generate supplement.");
        return;
      }

      setSupplement(data.supplement);
      setGenerationTime(Math.round((Date.now() - startTime) / 1000));
    } catch {
      setError("Network error. Please try again.");
    } finally {
      setIsGenerating(false);
    }
  }

  function handleCopy() {
    navigator.clipboard.writeText(supplement);
  }

  async function handleDownloadPdf() {
    const { generateSupplementPdf } = await import("@/lib/generateSupplementPdf");
    generateSupplementPdf({
      supplementMarkdown: supplement,
      vehicleYear: formData.vehicleYear,
      vehicleMake: formData.vehicleMake,
      vehicleModel: formData.vehicleModel,
      shopName: formData.shopName,
    });
  }

  return (
    <>
      <section className="bg-gradient-to-b from-brand-950 to-brand-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-green-500/20 border border-green-400/30 rounded-full px-4 py-1.5 mb-4">
              <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse" />
              <span className="text-sm text-green-200">Live AI — Real Results</span>
            </div>
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Try It With Your Repair
            </h1>
            <p className="text-lg text-blue-200 leading-relaxed">
              Enter your actual vehicle and damage info below. Our AI will
              generate a real supplement request — with OEM references,
              justifications, and missed operations — in under 60 seconds.
            </p>
          </div>
        </div>
      </section>

      <section className="py-8 md:py-12 bg-gray-50 min-h-screen">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {!supplement ? (
            <form onSubmit={handleGenerate}>
              <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-brand-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 17a2 2 0 11-4 0 2 2 0 014 0zM19 17a2 2 0 11-4 0 2 2 0 014 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16V6a1 1 0 00-1-1H4a1 1 0 00-1 1v10a1 1 0 001 1h1m8-1a1 1 0 01-1 1H9m4-1V8a1 1 0 011-1h2.586a1 1 0 01.707.293l3.414 3.414a1 1 0 01.293.707V16a1 1 0 01-1 1h-1m-6-1a1 1 0 001 1h1M5 17a2 2 0 104 0m-4 0a2 2 0 114 0m6 0a2 2 0 104 0m-4 0a2 2 0 114 0" />
                  </svg>
                  Vehicle &amp; Claim Info
                </h2>

                <div className="grid md:grid-cols-3 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Year *
                    </label>
                    <input
                      type="text"
                      name="vehicleYear"
                      required
                      value={formData.vehicleYear}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                      placeholder="2022"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Make *
                    </label>
                    <select
                      name="vehicleMake"
                      required
                      value={formData.vehicleMake}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none bg-white"
                    >
                      <option value="">Select</option>
                      {["Acura","Audi","BMW","Buick","Cadillac","Chevrolet","Chrysler","Dodge","Ford","Genesis","GMC","Honda","Hyundai","Infiniti","Jaguar","Jeep","Kia","Land Rover","Lexus","Lincoln","Mazda","Mercedes-Benz","Mini","Mitsubishi","Nissan","Porsche","Ram","Rivian","Subaru","Tesla","Toyota","Volkswagen","Volvo","Other"].map((make) => (
                        <option key={make} value={make}>{make}</option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Model *
                    </label>
                    <input
                      type="text"
                      name="vehicleModel"
                      required
                      value={formData.vehicleModel}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                      placeholder="Camry SE"
                    />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-4 mb-6">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      VIN <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      name="vin"
                      value={formData.vin}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                      placeholder="4T1G11AK8NU000000"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Insurance Company *
                    </label>
                    <select
                      name="insuranceCompany"
                      required
                      value={formData.insuranceCompany}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none bg-white"
                    >
                      <option value="">Select</option>
                      {["State Farm","GEICO","Progressive","Allstate","USAA","Liberty Mutual","Farmers","Nationwide","Travelers","American Family","Erie","Auto-Owners","Hartford","Safeco","Other"].map((ins) => (
                        <option key={ins} value={ins}>{ins}</option>
                      ))}
                    </select>
                  </div>
                </div>

                <div className="grid md:grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Claim # <span className="text-gray-400 font-normal">(optional)</span>
                    </label>
                    <input
                      type="text"
                      name="claimNumber"
                      value={formData.claimNumber}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                      placeholder="XX-XXXX-XXXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Shop Name
                    </label>
                    <input
                      type="text"
                      name="shopName"
                      value={formData.shopName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                      placeholder="Your Shop Name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Estimator Name
                    </label>
                    <input
                      type="text"
                      name="estimatorName"
                      value={formData.estimatorName}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                      placeholder="Your Name"
                    />
                  </div>
                </div>
              </div>

              <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm mb-6">
                <h2 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
                  <svg className="w-6 h-6 text-amber-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
                  </svg>
                  Repair Details
                </h2>

                <div className="space-y-4">
                  <div>
                    <div className="flex items-center justify-between mb-1">
                      <label className="block text-sm font-semibold text-gray-700">
                        Initial Estimate *
                      </label>
                      <div className="flex bg-gray-100 rounded-lg p-0.5">
                        <button
                          type="button"
                          onClick={() => setEstimateInputMode("type")}
                          className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors ${
                            estimateInputMode === "type"
                              ? "bg-white text-gray-900 shadow-sm"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          Type It
                        </button>
                        <button
                          type="button"
                          onClick={() => setEstimateInputMode("upload")}
                          className={`text-xs font-medium px-3 py-1.5 rounded-md transition-colors flex items-center gap-1 ${
                            estimateInputMode === "upload"
                              ? "bg-white text-gray-900 shadow-sm"
                              : "text-gray-500 hover:text-gray-700"
                          }`}
                        >
                          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                          </svg>
                          Upload File
                        </button>
                      </div>
                    </div>

                    {estimateInputMode === "type" ? (
                      <textarea
                        name="initialEstimate"
                        required={estimateInputMode === "type"}
                        rows={3}
                        value={formData.initialEstimate}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none resize-none"
                        placeholder="What was on the initial estimate? Example: Right fender replacement, headlamp assembly, bumper cover repair and refinish. Total: $4,287"
                      />
                    ) : (
                      <div>
                        {!uploadedFile ? (
                          <label className="flex flex-col items-center justify-center w-full h-36 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-brand-400 hover:bg-brand-50/30 transition-colors">
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                              <svg className="w-8 h-8 text-gray-400 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
                              </svg>
                              <p className="text-sm text-gray-600 font-medium">
                                Drop your estimate here or <span className="text-brand-600">browse</span>
                              </p>
                              <p className="text-xs text-gray-400 mt-1">
                                PDF, PNG, JPG up to 10MB — screenshot or export from CCC, Mitchell, or Audatex
                              </p>
                            </div>
                            <input
                              ref={fileInputRef}
                              type="file"
                              className="hidden"
                              accept=".pdf,.png,.jpg,.jpeg,.webp"
                              onChange={handleFileChange}
                            />
                          </label>
                        ) : (
                          <div className="border border-green-200 bg-green-50 rounded-lg p-4">
                            <div className="flex items-center justify-between">
                              <div className="flex items-center gap-3">
                                <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                  {uploadedFile.type === "application/pdf" ? (
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                                    </svg>
                                  ) : (
                                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                                    </svg>
                                  )}
                                </div>
                                <div>
                                  <p className="text-sm font-medium text-green-800">{uploadedFile.name}</p>
                                  <p className="text-xs text-green-600">
                                    {(uploadedFile.size / 1024).toFixed(0)} KB — Ready to analyze
                                  </p>
                                </div>
                              </div>
                              <button
                                type="button"
                                onClick={handleRemoveFile}
                                className="text-gray-400 hover:text-red-500 transition-colors p-1"
                              >
                                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                </svg>
                              </button>
                            </div>
                            {uploadPreview && (
                              <div className="mt-3 rounded-lg overflow-hidden border border-green-200">
                                <img src={uploadPreview} alt="Estimate preview" className="w-full max-h-48 object-contain bg-white" />
                              </div>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      What did you find during teardown? *
                    </label>
                    <textarea
                      name="damageDescription"
                      required
                      rows={4}
                      value={formData.damageDescription}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none resize-none"
                      placeholder="Describe in your own words what additional damage you found. Example: Found rail kink and apron buckle during teardown. Need to pull the rail back, fix the apron at shock tower. TSS radar is in the bumper area that got hit. Door next to fender needs blend."
                    />
                    <p className="text-xs text-gray-400 mt-1">
                      Just describe it naturally — the AI handles the
                      formatting, references, and justifications.
                    </p>
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1">
                      Damage Areas
                    </label>
                    <input
                      type="text"
                      name="damageAreas"
                      value={formData.damageAreas}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2.5 text-gray-900 focus:ring-2 focus:ring-brand-500 focus:border-brand-500 outline-none"
                      placeholder="e.g. Front right structural, front right cosmetic, ADAS"
                    />
                  </div>
                </div>
              </div>

              {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 mb-6 text-red-700 text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isGenerating}
                className="w-full bg-brand-600 hover:bg-brand-700 disabled:bg-brand-400 text-white font-bold py-4 rounded-xl text-lg transition-colors flex items-center justify-center gap-3"
              >
                {isGenerating ? (
                  <>
                    <svg className="w-6 h-6 animate-spin" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z" />
                    </svg>
                    Generating Supplement... (usually 15-45 seconds)
                  </>
                ) : (
                  <>
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                    </svg>
                    Generate Supplement
                  </>
                )}
              </button>
            </form>
          ) : (
            <div>
              {/* Success Banner */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-6 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 rounded-lg flex items-center justify-center">
                    <svg className="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <p className="font-bold text-green-800">
                      Supplement Generated
                    </p>
                    <p className="text-sm text-green-600">
                      Generated in {generationTime} seconds
                    </p>
                  </div>
                </div>
                <div className="flex flex-wrap gap-3">
                  <button
                    onClick={handleDownloadPdf}
                    className="text-sm bg-brand-600 hover:bg-brand-700 text-white font-medium px-4 py-2 rounded-lg flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    Download PDF
                  </button>
                  <button
                    onClick={handleCopy}
                    className="text-sm bg-white border border-gray-300 hover:bg-gray-50 text-gray-700 font-medium px-4 py-2 rounded-lg flex items-center gap-1.5"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z" />
                    </svg>
                    Copy to Clipboard
                  </button>
                  <button
                    onClick={() => {
                      setSupplement("");
                      setGenerationTime(0);
                    }}
                    className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                    </svg>
                    New Supplement
                  </button>
                </div>
              </div>

              {/* Generated Document */}
              <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 shadow-sm font-mono text-sm leading-relaxed whitespace-pre-wrap">
                {supplement}
              </div>

              {/* CTA */}
              <div className="bg-brand-50 border border-brand-200 rounded-xl p-8 mt-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  Imagine this for every repair.
                </h3>
                <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                  Professional supplements generated in seconds, every time.
                  Stop leaving revenue on the table.
                </p>
                <Link
                  href="/contact"
                  className="inline-block bg-brand-600 hover:bg-brand-700 text-white font-bold px-8 py-3.5 rounded-lg text-lg transition-colors"
                >
                  Join the Pilot Program — Free for 30 Days
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>
    </>
  );
}

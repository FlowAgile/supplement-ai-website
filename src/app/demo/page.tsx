"use client";

import { useState } from "react";
import Link from "next/link";
import { sampleSupplements } from "@/data/sample-supplements";
import SupplementViewer from "@/components/SupplementViewer";

export default function DemoPage() {
  const [activeTab, setActiveTab] = useState(0);
  const [showInput, setShowInput] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showOutput, setShowOutput] = useState(false);

  const activeSupplement = sampleSupplements[activeTab];

  function handleGenerate() {
    setShowInput(false);
    setIsGenerating(true);
    setShowOutput(false);

    // Simulate AI generation with a realistic delay
    setTimeout(() => {
      setIsGenerating(false);
      setShowOutput(true);
    }, 3000);
  }

  function handleReset() {
    setShowInput(true);
    setIsGenerating(false);
    setShowOutput(false);
  }

  function handleTabChange(index: number) {
    setActiveTab(index);
    setShowInput(true);
    setIsGenerating(false);
    setShowOutput(false);
  }

  return (
    <>
      {/* Hero */}
      <section className="bg-gradient-to-b from-brand-950 to-brand-900 text-white py-12 md:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold mb-4">
              Live Demo
            </h1>
            <p className="text-lg text-blue-200 leading-relaxed">
              See exactly what TeardownAI produces. Pick a repair scenario
              below, see the plain-language input from the estimator, then watch
              the AI generate a professional supplement request in seconds.
            </p>
          </div>
        </div>
      </section>

      {/* Demo Area */}
      <section className="py-8 md:py-12 bg-gray-50 min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Scenario Tabs */}
          <div className="flex flex-col sm:flex-row gap-3 mb-8">
            {sampleSupplements.map((supp, i) => (
              <button
                key={supp.id}
                onClick={() => handleTabChange(i)}
                className={`flex-1 text-left p-4 rounded-xl border-2 transition-all ${
                  activeTab === i
                    ? "border-brand-600 bg-white shadow-md"
                    : "border-gray-200 bg-white hover:border-gray-300"
                }`}
              >
                <p
                  className={`font-bold text-sm ${
                    activeTab === i ? "text-brand-700" : "text-gray-900"
                  }`}
                >
                  {supp.title}
                </p>
                <p className="text-xs text-gray-500 mt-1">{supp.subtitle}</p>
                <span
                  className={`inline-block mt-2 text-xs px-2 py-0.5 rounded-full ${
                    activeTab === i
                      ? "bg-brand-100 text-brand-700"
                      : "bg-gray-100 text-gray-600"
                  }`}
                >
                  {supp.damageType}
                </span>
              </button>
            ))}
          </div>

          {/* Input Section */}
          {showInput && (
            <div className="bg-white border border-gray-200 rounded-xl p-6 md:p-8 mb-6 shadow-sm">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-amber-100 rounded-lg flex items-center justify-center">
                  <svg className="w-5 h-5 text-amber-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-lg font-bold text-gray-900">
                    Estimator Input
                  </h2>
                  <p className="text-sm text-gray-500">
                    This is what the shop types in — plain language, no
                    formatting required
                  </p>
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Vehicle
                    </label>
                    <p className="text-gray-900 font-medium">
                      {activeSupplement.vehicle.year}{" "}
                      {activeSupplement.vehicle.make}{" "}
                      {activeSupplement.vehicle.model}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Insurance
                    </label>
                    <p className="text-gray-900 font-medium">
                      {activeSupplement.insurance}
                    </p>
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                      Initial Estimate
                    </label>
                    <p className="text-gray-700 text-sm">
                      {activeSupplement.initialEstimate}
                    </p>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                    What did you find during teardown?
                  </label>
                  <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 text-sm text-gray-800 leading-relaxed italic">
                    &ldquo;{activeSupplement.inputDescription}&rdquo;
                  </div>
                  <p className="text-xs text-gray-400 mt-2">
                    That&apos;s it. The estimator types a few sentences in their
                    own words.
                  </p>
                </div>
              </div>

              <div className="mt-8 flex justify-center">
                <button
                  onClick={handleGenerate}
                  className="bg-brand-600 hover:bg-brand-700 text-white font-bold px-10 py-4 rounded-xl text-lg transition-all hover:shadow-lg flex items-center gap-3"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                  Generate Supplement
                </button>
              </div>
            </div>
          )}

          {/* Generating Animation */}
          {isGenerating && (
            <div className="bg-white border border-gray-200 rounded-xl p-12 mb-6 shadow-sm">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-brand-100 rounded-full mb-6">
                  <svg
                    className="w-8 h-8 text-brand-600 animate-spin"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    />
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  AI is generating your supplement...
                </h3>
                <div className="space-y-2 text-sm text-gray-500 max-w-md mx-auto">
                  <p className="animate-pulse">
                    Analyzing damage description and vehicle specifications...
                  </p>
                  <p className="animate-pulse" style={{ animationDelay: "0.5s" }}>
                    Cross-referencing commonly missed operations...
                  </p>
                  <p className="animate-pulse" style={{ animationDelay: "1s" }}>
                    Pulling OEM repair procedures and I-CAR references...
                  </p>
                </div>
              </div>
            </div>
          )}

          {/* Output Section */}
          {showOutput && (
            <div className="mb-6">
              {/* Output Header */}
              <div className="bg-green-50 border border-green-200 rounded-xl p-4 mb-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
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
                      {activeSupplement.lineItems.length} operations identified
                      &middot; {activeSupplement.timeToGenerate} &middot;
                      Additional amount: {activeSupplement.totalAdditional}
                    </p>
                  </div>
                </div>
                <button
                  onClick={handleReset}
                  className="text-sm text-gray-600 hover:text-gray-900 font-medium flex items-center gap-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
                  </svg>
                  Try Again
                </button>
              </div>

              {/* The Supplement Document */}
              <SupplementViewer supplement={activeSupplement} />

              {/* CTA after seeing demo */}
              <div className="bg-brand-50 border border-brand-200 rounded-xl p-8 mt-8 text-center">
                <h3 className="text-xl font-bold text-gray-900 mb-2">
                  This is what your shop could be submitting.
                </h3>
                <p className="text-gray-600 mb-6 max-w-lg mx-auto">
                  Professional, OEM-referenced supplements generated from a few
                  sentences of input. Stop spending hours writing documentation
                  and start capturing the revenue you&apos;ve earned.
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

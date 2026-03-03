"use client";

import { SampleSupplement } from "@/data/sample-supplements";

export default function SupplementViewer({
  supplement,
}: {
  supplement: SampleSupplement;
}) {
  return (
    <div className="supplement-doc">
      {/* Header */}
      <div className="header-block">
        <div className="text-center mb-4">
          <p className="font-bold text-base text-gray-900">
            {supplement.shopName}
          </p>
          <p className="text-lg font-bold text-brand-700 mt-1">
            SUPPLEMENT REQUEST
          </p>
        </div>
        <div className="grid grid-cols-2 gap-x-8 gap-y-1 text-xs">
          <p>
            <span className="text-gray-500">Date:</span>{" "}
            {supplement.date}
          </p>
          <p>
            <span className="text-gray-500">Claim #:</span>{" "}
            {supplement.claimNumber}
          </p>
          <p>
            <span className="text-gray-500">Insurance:</span>{" "}
            {supplement.insurance}
          </p>
          <p>
            <span className="text-gray-500">Estimator:</span>{" "}
            {supplement.estimator}
          </p>
          <p className="col-span-2">
            <span className="text-gray-500">Vehicle:</span>{" "}
            {supplement.vehicle.year} {supplement.vehicle.make}{" "}
            {supplement.vehicle.model}
          </p>
          <p className="col-span-2">
            <span className="text-gray-500">VIN:</span>{" "}
            {supplement.vehicle.vin}
          </p>
        </div>
      </div>

      {/* Summary */}
      <div className="summary-block">
        <p className="text-xs font-semibold uppercase tracking-wider text-brand-700 mb-2">
          Supplement Summary
        </p>
        <p className="text-sm text-gray-700 leading-relaxed">
          {supplement.summary}
        </p>
        <p className="text-sm font-bold text-gray-900 mt-3">
          Total Additional Amount Requested:{" "}
          <span className="text-brand-700">{supplement.totalAdditional}</span>
        </p>
      </div>

      {/* Line Items */}
      <h3>Additional Operations</h3>
      {supplement.lineItems.map((item) => (
        <div key={item.number} className="line-item">
          <p className="font-semibold text-gray-900 text-sm mb-2">
            {item.number}. {item.operation}
          </p>
          <div className="space-y-1.5">
            <p>
              <span className="line-item-label">Labor: </span>
              <span className="line-item-value">
                {item.laborHours} hours — {item.laborType}
              </span>
            </p>
            <p>
              <span className="line-item-label">Justification: </span>
              <span className="line-item-value">{item.justification}</span>
            </p>
            <p className="reference">
              <span className="line-item-label">Reference: </span>
              {item.reference}
            </p>
          </div>
        </div>
      ))}

      {/* Supporting Documentation */}
      <h3>Supporting Documentation</h3>
      <div className="space-y-3 mt-3">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
            Photos Attached:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-0.5">
            {supplement.photosReferenced.map((photo, i) => (
              <li key={i}>{photo}</li>
            ))}
          </ul>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-gray-500 mb-1">
            OEM Documents Referenced:
          </p>
          <ul className="list-disc list-inside text-sm text-gray-700 space-y-0.5">
            {supplement.oemDocsReferenced.map((doc, i) => (
              <li key={i}>{doc}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* Closing */}
      <div className="closing-block">
        <p className="text-sm text-gray-700 leading-relaxed">
          {supplement.closingStatement}
        </p>
      </div>
    </div>
  );
}

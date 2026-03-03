export interface SupplementLineItem {
  number: number;
  operation: string;
  laborHours: string;
  laborType: string;
  justification: string;
  reference: string;
}

export interface SampleSupplement {
  id: string;
  title: string;
  subtitle: string;
  damageType: string;
  vehicle: {
    year: string;
    make: string;
    model: string;
    vin: string;
  };
  insurance: string;
  claimNumber: string;
  shopName: string;
  estimator: string;
  date: string;
  summary: string;
  totalAdditional: string;
  initialEstimate: string;
  lineItems: SupplementLineItem[];
  photosReferenced: string[];
  oemDocsReferenced: string[];
  closingStatement: string;
  inputDescription: string;
  timeToGenerate: string;
}

export const sampleSupplements: SampleSupplement[] = [
  {
    id: "front-end-structural",
    title: "Front-End Structural Repair",
    subtitle: "2022 Toyota Camry — Right Front Collision",
    damageType: "Front Right Structural + Cosmetic",
    vehicle: {
      year: "2022",
      make: "Toyota",
      model: "Camry SE",
      vin: "4T1G11AK8NU******",
    },
    insurance: "State Farm",
    claimNumber: "XX-XXXX-XXXX",
    shopName: "Precision Collision Center",
    estimator: "Mike Reynolds",
    date: "March 3, 2026",
    initialEstimate: "Initial estimate written for right fender replacement, right headlamp assembly, bumper cover repair and refinish. Total: $4,287.00",
    summary:
      "Upon disassembly and teardown of the right front end, additional damage was discovered that was not visible or accessible during the initial inspection. Structural damage to the right front rail and right apron assembly requires additional repair operations. ADAS calibration is required per Toyota Technical Service procedures. All operations listed are necessary to restore this vehicle to pre-loss condition per OEM specifications.",
    totalAdditional: "$3,847.50",
    lineItems: [
      {
        number: 1,
        operation: "Right front rail — straighten and pull to manufacturer dimensions",
        laborHours: "4.0",
        laborType: "Structural / Body",
        justification:
          "Right front rail is kinked at the seam approximately 8 inches rearward of the front rail tip. Rail must be pulled to manufacturer specifications and verified with a 3-dimensional measuring system to ensure proper structural alignment and crash energy absorption capability.",
        reference:
          "Toyota Collision Repair Body Manual — Section 51: Front Rail Repair Procedures. I-CAR Structural Repair Guidelines.",
      },
      {
        number: 2,
        operation: "Right apron assembly — repair buckle at shock tower",
        laborHours: "3.0",
        laborType: "Structural / Body",
        justification:
          "Right apron is buckled at the shock tower mount area due to impact transfer from the front rail. This area must be repaired to restore proper suspension geometry and structural support.",
        reference:
          "Toyota Collision Repair Body Manual — Apron Assembly specifications.",
      },
      {
        number: 3,
        operation: "3-dimensional measuring and documentation",
        laborHours: "1.5",
        laborType: "Structural",
        justification:
          "Pre-pull and post-pull measurements required to document structural dimensions are within manufacturer tolerances. Required for any structural repair involving the unibody/frame rails.",
        reference:
          "I-CAR Structural Measurement and Verification guidelines. Toyota specifications require dimensional verification after any structural repair.",
      },
      {
        number: 4,
        operation: "Weld-through primer — all welded panels",
        laborHours: "0.5",
        laborType: "Body",
        justification:
          "Weld-through primer must be applied to all bare metal surfaces prior to welding to ensure corrosion protection at weld joints. This is a not-included operation per the estimating system P-pages.",
        reference:
          "Toyota Collision Repair Manual — Anti-Corrosion Treatment. I-CAR Welding and Corrosion Protection procedures. CCC P-Pages: NOT INCLUDED in replacement labor.",
      },
      {
        number: 5,
        operation: "Corrosion protection — all exposed bare metal areas",
        laborHours: "0.8",
        laborType: "Body",
        justification:
          "All bare metal surfaces exposed during repair and not receiving weld-through primer must receive anti-corrosion treatment (cavity wax and/or rubberized undercoating) to prevent premature oxidation and restore OEM corrosion protection.",
        reference:
          "Toyota Anti-Corrosion Application Guidelines. I-CAR UPCR — Corrosion Protection section.",
      },
      {
        number: 6,
        operation: "Seam sealer — replicate OEM application on repaired areas",
        laborHours: "0.5",
        laborType: "Body",
        justification:
          "Seam sealer must be applied to all panel joints and seams in the repaired area to match OEM application style (caulk-type on rail seams, brushable on apron-to-rail joints). Required for water and corrosion protection.",
        reference:
          "Toyota Collision Repair Manual — Seam Sealer Application. NOT INCLUDED in replacement labor per estimating system.",
      },
      {
        number: 7,
        operation: "Blend right front door — color match",
        laborHours: "1.5",
        laborType: "Refinish",
        justification:
          "Right front door is the adjacent panel to the replaced right fender and falls within the color break area. Blending is required to ensure proper color match and eliminate any visible transition between the new fender refinish and the existing door finish.",
        reference:
          "I-CAR Refinish Procedures — Blending is a standard procedure for color match on adjacent panels.",
      },
      {
        number: 8,
        operation: "Pre-repair and post-repair diagnostic scan",
        laborHours: "0.5",
        laborType: "Mechanical / ADAS",
        justification:
          "Toyota requires a full diagnostic scan before and after any collision repair to identify stored DTCs, verify system functionality, and confirm all electronic systems are operating correctly after repair.",
        reference:
          "Toyota Position Statement — Pre and Post Repair Diagnostic Scanning (2018, reaffirmed). I-CAR Position Statement on scanning.",
      },
      {
        number: 9,
        operation: "Toyota Safety Sense (TSS) — front camera and radar calibration",
        laborHours: "1.0",
        laborType: "ADAS",
        justification:
          "The right front repair area includes the bumper cover and grille area where the millimeter-wave radar sensor is mounted. Per Toyota, any repair or replacement of components in the front radar sensor area requires static calibration of the TSS system. Failure to calibrate could result in non-functional pre-collision, lane departure, and adaptive cruise control systems.",
        reference:
          "Toyota TSS Calibration Requirements — Position Statement. Toyota Technical Information System (TIS) — ADAS Calibration Procedures for 2022 Camry.",
      },
      {
        number: 10,
        operation: "Wheel alignment — 4-wheel",
        laborHours: "1.0",
        laborType: "Mechanical",
        justification:
          "Wheel alignment is required following any structural repair to the front end to ensure proper steering geometry, tire wear, and vehicle handling. Required per Toyota specifications after any suspension or structural work.",
        reference:
          "Toyota alignment specifications. Standard industry practice following structural repair.",
      },
    ],
    photosReferenced: [
      "Photo 1: Right front rail kink at seam — measurement arrow showing deviation",
      "Photo 2: Right apron buckle at shock tower — close-up of deformation",
      "Photo 3: Overview of right front structural area after disassembly",
      "Photo 4: Pre-pull measurement printout showing dimensional deviation",
      "Photo 5: Radar sensor location behind grille opening — impact area",
    ],
    oemDocsReferenced: [
      "Toyota Collision Repair Body Manual — 2022 Camry",
      "Toyota Anti-Corrosion Treatment Guidelines",
      "Toyota TSS Calibration Position Statement",
      "Toyota Pre/Post Repair Scanning Position Statement",
    ],
    closingStatement:
      "This supplement is submitted for your review and approval. All operations listed are necessary for the safe and proper repair of this vehicle per Toyota manufacturer specifications and industry standards. We invite you to inspect the vehicle at our facility to verify the need for these operations. Please contact Mike Reynolds at (555) 123-4567 with any questions.",
    inputDescription:
      "Right front hit, found rail kink and apron buckle during teardown. Need to pull the rail back, fix the apron at shock tower. TSS radar is in the bumper area that got hit. Door next to fender needs blend.",
    timeToGenerate: "47 seconds",
  },
  {
    id: "rear-end-adas",
    title: "Rear-End with ADAS & Sensors",
    subtitle: "2023 Honda CR-V — Rear Collision",
    damageType: "Rear Structural + ADAS",
    vehicle: {
      year: "2023",
      make: "Honda",
      model: "CR-V EX-L",
      vin: "7FARS6H7XPE******",
    },
    insurance: "GEICO",
    claimNumber: "XXXX-XX-XXXXXX",
    shopName: "Precision Collision Center",
    estimator: "Mike Reynolds",
    date: "March 3, 2026",
    initialEstimate: "Initial estimate written for rear bumper cover replacement, right tail lamp assembly, and rear body panel repair. Total: $3,150.00",
    summary:
      "Upon removal of the rear bumper cover and further inspection, additional damage was identified to the rear bumper reinforcement, rear body panel, and rear floor pan. Multiple ADAS sensors require calibration due to the rear impact area. All operations are necessary to restore this vehicle to pre-loss condition per Honda repair procedures.",
    totalAdditional: "$2,965.00",
    lineItems: [
      {
        number: 1,
        operation: "Rear bumper reinforcement — replace",
        laborHours: "1.5",
        laborType: "Body",
        justification:
          "Rear bumper reinforcement bar is bent and creased from the impact. Cannot be straightened due to the nature of the deformation. Hidden behind the bumper cover and not visible on initial inspection. Replacement required to restore proper crash energy management.",
        reference:
          "Honda Collision Repair Information — Rear Bumper Reinforcement replacement procedures.",
      },
      {
        number: 2,
        operation: "Rear floor pan — inspect and repair minor buckle",
        laborHours: "2.0",
        laborType: "Body",
        justification:
          "The rear floor pan shows a minor buckle forward of the rear body panel joint, caused by impact transfer through the bumper reinforcement. This area must be repaired to restore structural integrity and ensure proper spare tire well fitment.",
        reference: "Honda Body Repair Manual — Rear Floor Pan section.",
      },
      {
        number: 3,
        operation: "Weld-through primer — rear body panel repair area",
        laborHours: "0.4",
        laborType: "Body",
        justification:
          "Weld-through primer required on all bare metal at weld points during rear body panel repair. Not included in panel repair labor times.",
        reference:
          "Honda Anti-Corrosion Application Guide. CCC P-Pages: NOT INCLUDED operation.",
      },
      {
        number: 4,
        operation: "Corrosion protection — rear structural and floor areas",
        laborHours: "0.6",
        laborType: "Body",
        justification:
          "All exposed bare metal surfaces in the repair area must receive anti-corrosion treatment to prevent premature oxidation and restore OEM-level corrosion protection.",
        reference:
          "Honda Anti-Corrosion Application Guide. I-CAR UPCR — Corrosion Protection.",
      },
      {
        number: 5,
        operation: "Seam sealer — rear body panel to floor pan joint",
        laborHours: "0.4",
        laborType: "Body",
        justification:
          "Seam sealer must be reapplied at the rear body panel to floor pan joint to match OEM application. Required for water intrusion prevention and corrosion protection.",
        reference:
          "Honda Collision Repair Information — Seam Sealer Application. NOT INCLUDED per estimating system.",
      },
      {
        number: 6,
        operation: "Pre-repair and post-repair diagnostic scan",
        laborHours: "0.5",
        laborType: "Mechanical",
        justification:
          "Honda requires a full diagnostic scan before beginning repairs and after all repairs are completed. Required to identify all stored DTCs and verify all systems are functioning correctly post-repair.",
        reference:
          "Honda Position Statement — Diagnostic Scan Requirements for Collision Repair.",
      },
      {
        number: 7,
        operation: "Blind spot information (BSI) system — calibration",
        laborHours: "0.8",
        laborType: "ADAS",
        justification:
          "The 2023 CR-V EX-L is equipped with blind spot information (BSI) sensors located in the rear bumper area. The rear bumper cover and reinforcement are being replaced, which disturbs the sensor mounting locations. Honda requires BSI calibration after any repair or replacement of components in the rear bumper sensor area.",
        reference:
          "Honda Sensing / BSI Calibration Requirements — Honda Position Statement on ADAS. Honda Service Information — BSI calibration procedure for 2023 CR-V.",
      },
      {
        number: 8,
        operation: "Rear cross traffic monitor — calibration",
        laborHours: "0.5",
        laborType: "ADAS",
        justification:
          "The rear cross traffic monitoring system shares sensors with the BSI system in the rear bumper area. Calibration is required when the rear bumper assembly is removed or replaced to ensure proper system operation.",
        reference:
          "Honda ADAS Calibration Guidelines — Rear Cross Traffic Alert system.",
      },
      {
        number: 9,
        operation: "Rear parking sensor — recalibration after bumper replacement",
        laborHours: "0.3",
        laborType: "ADAS",
        justification:
          "Rear parking sensors must be recalibrated after bumper cover replacement to ensure proper distance detection and alert functionality.",
        reference: "Honda Service Information — Parking Sensor Calibration.",
      },
    ],
    photosReferenced: [
      "Photo 1: Rear bumper reinforcement — bent and creased (hidden behind cover)",
      "Photo 2: Rear floor pan buckle — measurement showing deformation",
      "Photo 3: BSI sensor mounting area in rear bumper — impact zone",
      "Photo 4: Rear body panel to floor pan joint — seam sealer damage",
    ],
    oemDocsReferenced: [
      "Honda Collision Repair Information — 2023 CR-V",
      "Honda Anti-Corrosion Application Guide",
      "Honda Position Statement — ADAS Calibration Requirements",
      "Honda Position Statement — Pre/Post Repair Scanning",
    ],
    closingStatement:
      "This supplement is submitted for your review and approval. All operations are necessary for the safe and proper repair of this vehicle per Honda manufacturer specifications. The ADAS calibrations are required to ensure all safety systems are fully operational before the vehicle is returned to the customer. Please contact Mike Reynolds at (555) 123-4567 with any questions.",
    inputDescription:
      "Rear end hit, took bumper cover off and found the reinforcement bar is bent, floor pan has a small buckle. This is an EX-L so it has blind spot monitors and parking sensors in the bumper. Need to recalibrate all that stuff. Also need the usual corrosion/sealer work.",
    timeToGenerate: "38 seconds",
  },
  {
    id: "side-impact-bpillar",
    title: "Side Impact with B-Pillar Involvement",
    subtitle: "2021 Ford Explorer — Left Side Impact",
    damageType: "Side Structural + Interior",
    vehicle: {
      year: "2021",
      make: "Ford",
      model: "Explorer XLT",
      vin: "1FMSK8DH5MG******",
    },
    insurance: "Progressive",
    claimNumber: "XX-XXXXXXX",
    shopName: "Precision Collision Center",
    estimator: "Mike Reynolds",
    date: "March 3, 2026",
    initialEstimate: "Initial estimate written for left front door replacement, left rear door skin repair, left rocker panel molding, and exterior mirror replacement. Total: $5,420.00",
    summary:
      "Upon removal of the left front door and interior trim, additional damage was discovered to the left B-pillar, left rocker panel, and interior components. The B-pillar shows deformation at the upper hinge mount area requiring sectional repair per Ford specifications. Side curtain airbag and seat belt pretensioner require inspection. All operations are necessary to restore this vehicle to pre-loss condition.",
    totalAdditional: "$4,215.00",
    lineItems: [
      {
        number: 1,
        operation: "Left B-pillar — sectional repair at upper door hinge area",
        laborHours: "5.0",
        laborType: "Structural",
        justification:
          "The left B-pillar is deformed at the upper hinge mount area from the side impact force transferred through the front door. The B-pillar outer panel requires sectional repair per Ford-approved sectioning location. This is a structural component critical to occupant protection in side and rollover impacts.",
        reference:
          "Ford Body and Paint Repair Procedures — 2021 Explorer B-Pillar Section. Ford-approved sectioning locations for B-pillar outer panel.",
      },
      {
        number: 2,
        operation: "Left rocker panel — straighten and align at pinch weld",
        laborHours: "2.5",
        laborType: "Structural",
        justification:
          "Left rocker panel is pushed inward at the pinch weld area below the B-pillar. This area must be pulled back to specification and verified dimensionally. The rocker panel is a structural component of the unibody and affects door alignment and occupant protection.",
        reference:
          "Ford Body Repair Manual — Rocker Panel specifications. I-CAR Structural Repair Guidelines.",
      },
      {
        number: 3,
        operation: "3-dimensional measuring — pre and post repair",
        laborHours: "1.5",
        laborType: "Structural",
        justification:
          "Structural dimensional verification required before and after B-pillar and rocker panel repair to confirm all dimensions are within Ford specifications.",
        reference:
          "Ford dimensional specifications — 2021 Explorer. I-CAR Structural Measurement procedures.",
      },
      {
        number: 4,
        operation: "Side curtain airbag — inspection and test",
        laborHours: "0.5",
        laborType: "Mechanical",
        justification:
          "The left side curtain airbag is routed through the A-pillar and roofline along the left side. With B-pillar and structural involvement, the airbag system routing and mounting points must be inspected for damage or displacement. The airbag did not deploy, but impact to the B-pillar area warrants inspection of the system.",
        reference:
          "Ford Restraint System Inspection Requirements — Side Impact procedures. NHTSA guidelines on post-collision restraint system inspection.",
      },
      {
        number: 5,
        operation: "Left front seat belt pretensioner — inspection",
        laborHours: "0.3",
        laborType: "Mechanical",
        justification:
          "The seat belt pretensioner anchor is mounted to the B-pillar lower area, which has been impacted. Pretensioner must be inspected to verify it was not activated or damaged. Ford requires inspection of all restraint system components in the impact zone.",
        reference:
          "Ford Restraint System Inspection Guidelines — Seat Belt Pretensioner inspection after side impact.",
      },
      {
        number: 6,
        operation: "Weld-through primer — B-pillar sectional repair area",
        laborHours: "0.4",
        laborType: "Body",
        justification:
          "Weld-through primer required on all bare metal surfaces at sectioning joints before welding. Critical for corrosion protection at structural weld points.",
        reference:
          "Ford Corrosion Protection Guidelines. CCC P-Pages: NOT INCLUDED.",
      },
      {
        number: 7,
        operation: "Corrosion protection — B-pillar interior cavity and rocker panel",
        laborHours: "0.8",
        laborType: "Body",
        justification:
          "Cavity wax must be applied to the interior of the B-pillar and rocker panel after structural repair. These enclosed structural cavities require corrosion protection that was disturbed during the repair process.",
        reference:
          "Ford Anti-Corrosion Application Guidelines — Cavity wax procedures. I-CAR UPCR.",
      },
      {
        number: 8,
        operation: "Sound deadener — replace in B-pillar and door jamb area",
        laborHours: "0.5",
        laborType: "Body",
        justification:
          "OEM sound deadening material was removed/destroyed during B-pillar repair and must be replaced to match OEM application. Not included in structural repair labor.",
        reference:
          "Ford Body Repair Procedures — Sound Deadener Application. NOT INCLUDED per estimating system.",
      },
      {
        number: 9,
        operation: "Interior trim — left B-pillar upper and lower covers, replace damaged clips",
        laborHours: "0.8",
        laborType: "Body",
        justification:
          "Left B-pillar interior trim panels were removed for access to structural repair. Upper trim cover is cracked from impact transfer and requires replacement. Mounting clips are broken and must be replaced for proper fitment.",
        reference: "Ford Parts Catalog — Interior Trim components.",
      },
      {
        number: 10,
        operation: "Pre-repair and post-repair diagnostic scan",
        laborHours: "0.5",
        laborType: "Mechanical",
        justification:
          "Ford requires diagnostic scanning before and after collision repair. Especially critical when airbag system components are in the impact zone and restraint system has been disturbed.",
        reference:
          "Ford Position Statement — Diagnostic Scanning for Collision Repair. I-CAR Position Statement on Pre/Post Scanning.",
      },
      {
        number: 11,
        operation: "Blind spot information system (BLIS) — calibration",
        laborHours: "0.5",
        laborType: "ADAS",
        justification:
          "The 2021 Explorer XLT is equipped with BLIS sensors. While the primary sensors are in the rear quarters, Ford Co-Pilot360 systems are interconnected and Ford recommends verification/calibration of BLIS after any side impact repair involving structural components.",
        reference:
          "Ford Co-Pilot360 ADAS Calibration Requirements.",
      },
    ],
    photosReferenced: [
      "Photo 1: Left B-pillar deformation at upper hinge mount — close-up",
      "Photo 2: Left rocker panel pinch weld displacement — measurement",
      "Photo 3: Interior view showing B-pillar trim damage and airbag routing area",
      "Photo 4: Pre-repair dimensional measurement printout",
      "Photo 5: Seat belt pretensioner anchor point at B-pillar base",
    ],
    oemDocsReferenced: [
      "Ford Body and Paint Repair Procedures — 2021 Explorer",
      "Ford Corrosion Protection Guidelines",
      "Ford Restraint System Inspection Requirements",
      "Ford Co-Pilot360 ADAS Calibration Position Statement",
      "Ford Pre/Post Repair Scanning Position Statement",
    ],
    closingStatement:
      "This supplement is submitted for your review and approval. The B-pillar is a critical structural and safety component of this vehicle. All operations listed are necessary for the safe and proper repair per Ford manufacturer specifications. We strongly recommend an in-person inspection of the vehicle to verify the extent of structural involvement. Please contact Mike Reynolds at (555) 123-4567 with any questions.",
    inputDescription:
      "Left side hit, took the door off and found the B-pillar is pushed in at the upper hinge area. Rocker is tweaked at the pinch weld too. Need to section the B-pillar per Ford specs. Interior trim is broken. Need to check the airbag and seatbelt since they're mounted on the B-pillar. Has blind spot monitors too.",
    timeToGenerate: "52 seconds",
  },
];

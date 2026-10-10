export interface ProductCapacity {
  label: string;
  value: string;
  basePrice: number; // in INR without GST
  specs?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'extinguisher' | 'refilling' | 'equipment';
  fireClass: string; // e.g. "ABC", "BC", "AB", "A"
  standard: string; // e.g. "IS: 15683", "IS: 2878"
  description: string;
  idealUses: string[];
  capacities: ProductCapacity[];
  technicalSpecs: {
    operatingPressure?: string;
    dischargeRange?: string;
    dischargeTime?: string;
    testPressure?: string;
    temperatureRange?: string;
  };
  badgeColor?: string;
}

export const PRODUCTS: Product[] = [
  {
    id: 'abc-powder',
    name: 'ABC Multipurpose Powder',
    tagline: 'Stored Pressure Dry Chemical Powder Extinguisher',
    category: 'extinguisher',
    fireClass: 'ABC',
    standard: 'IS: 15683 / BIS Certified',
    description: 'High-performance MAP 50/90 dry powder extinguisher engineered for solid combustibles, flammable liquids, and energized electrical hazards.',
    idealUses: [
      'Commercial offices & IT parks',
      'Residential apartment complexes',
      'Retail showrooms & shopping malls',
      'Manufacturing warehouses & logistics hubs',
      'Vehicle engine compartments & public transport'
    ],
    capacities: [
      { label: '1 KG', value: '1kg', basePrice: 950, specs: 'Discharge: 8-10s | Compact vehicle mount' },
      { label: '2 KG', value: '2kg', basePrice: 1250, specs: 'Discharge: 10-12s | Small office / kitchen' },
      { label: '4 KG', value: '4kg', basePrice: 1650, specs: 'Discharge: 13-15s | Standard office / corridor' },
      { label: '6 KG', value: '6kg', basePrice: 2250, specs: 'Discharge: 15-18s | Commercial workspace standard' },
      { label: '9 KG', value: '9kg', basePrice: 3100, specs: 'Discharge: 20-25s | Heavy duty industrial floor' }
    ],
    technicalSpecs: {
      operatingPressure: '15 Bar',
      dischargeRange: '2 to 4 Meters',
      dischargeTime: '13 to 22 Seconds',
      testPressure: '35 Bar',
      temperatureRange: '-30°C to +60°C'
    }
  },
  {
    id: 'co2-portable',
    name: 'CO₂ Carbon Dioxide Portable',
    tagline: 'High-Pressure Pure Gas Clean Extinguisher',
    category: 'extinguisher',
    fireClass: 'BC',
    standard: 'IS: 15683 / PESO Approved',
    description: 'Clean, residue-free extinguishing agent specifically designed for delicate electronic machinery, IT server rooms, and live electrical panels.',
    idealUses: [
      'Data centers & server switch rooms',
      'Substations & HT/LT electrical panels',
      'Diagnostic medical labs & scanning rooms',
      'Broadcasting suites & recording studios',
      'Industrial generator enclosures'
    ],
    capacities: [
      { label: '2 KG', value: '2kg', basePrice: 2400, specs: 'Seamless cylinder with discharge horn' },
      { label: '3.2 KG', value: '3.2kg', basePrice: 3200, specs: 'Mid-capacity for control rooms' },
      { label: '4.5 KG', value: '4.5kg', basePrice: 3950, specs: 'Industry standard for server rooms' },
      { label: '6.5 KG', value: '6.5kg', basePrice: 5600, specs: 'Heavy capacity with flexible high-pressure hose' }
    ],
    technicalSpecs: {
      operatingPressure: '55 to 60 Bar',
      dischargeRange: '1.5 to 3 Meters',
      dischargeTime: '10 to 18 Seconds',
      testPressure: '250 Bar (PESO Certified)',
      temperatureRange: '-30°C to +55°C'
    }
  },
  {
    id: 'clean-agent',
    name: 'Clean Agent (HFC 236fa)',
    tagline: 'Zero-Residue Halon Alternative Extinguisher',
    category: 'extinguisher',
    fireClass: 'ABC',
    standard: 'IS: 15683 / Environment Safe',
    description: 'Electrically non-conductive, non-corrosive, non-toxic gas extinguisher that extinguishes fires without causing thermal shock or chemical residue on sensitive equipment.',
    idealUses: [
      'Hospital operation theatres & ICUs',
      'Semiconductor & microchip manufacturing',
      'Telecommunication exchanges',
      'Art archives, museums & rare document vaults',
      'Air traffic control suites'
    ],
    capacities: [
      { label: '2 KG', value: '2kg', basePrice: 2800, specs: 'Clean agent for compact control units' },
      { label: '4 KG', value: '4kg', basePrice: 4500, specs: 'Full room protection standard' },
      { label: '6 KG', value: '6kg', basePrice: 6200, specs: 'High-volume sensitive space deployment' }
    ],
    technicalSpecs: {
      operatingPressure: '15 Bar',
      dischargeRange: '2 to 3.5 Meters',
      dischargeTime: '12 to 16 Seconds',
      testPressure: '35 Bar',
      temperatureRange: '-20°C to +55°C'
    }
  },
  {
    id: 'foam-afff',
    name: 'Mechanical Foam (AFFF)',
    tagline: 'Aqueous Film-Forming Foam for Flammable Liquids',
    category: 'extinguisher',
    fireClass: 'AB',
    standard: 'IS: 15683 / Marine & Industrial Grade',
    description: 'Generates a vapor-sealing blanketing film over burning liquid surfaces that prevents oxygen access and stops flammable liquid reignition.',
    idealUses: [
      'Petrol filling stations & diesel generator yards',
      'Automotive service bays & spray paint booths',
      'Solvent & oil storage warehouses',
      'Aviation hangars & industrial marine yards',
      'Chemical processing plants'
    ],
    capacities: [
      { label: '6 Litre', value: '6l', basePrice: 1850, specs: 'Rapid response for paint/solvent storage' },
      { label: '9 Litre', value: '9l', basePrice: 2450, specs: 'Standard capacity for petrol pumps & garages' },
      { label: '50 Litre Trolley', value: '50l-trolley', basePrice: 14500, specs: 'Heavy mobile unit with 5m hose & applicator' }
    ],
    technicalSpecs: {
      operatingPressure: '15 Bar',
      dischargeRange: '4 to 6 Meters',
      dischargeTime: '25 to 45 Seconds',
      testPressure: '35 Bar',
      temperatureRange: '+5°C to +55°C'
    }
  },
  {
    id: 'water-co2',
    name: 'Water CO₂ Stored Pressure',
    tagline: 'Deep Penetrating High-Pressure Water Jet',
    category: 'extinguisher',
    fireClass: 'A',
    standard: 'IS: 15683 / Rapid Heat Absorption',
    description: 'Maximizes thermal cooling on solid combustible deep-seated fires including timber, paper, cardboard packaging, and textile bales.',
    idealUses: [
      'Corrugated box & packaging manufacturing',
      'Textile mills, garment factories & godowns',
      'Woodworking mills & carpentry workshops',
      'Libraries, stationery warehouses & archives',
      'Agricultural storage sheds'
    ],
    capacities: [
      { label: '9 Litre', value: '9l', basePrice: 1650, specs: 'Concentrated jet stream nozzle' },
      { label: '50 Litre Trolley', value: '50l-trolley', basePrice: 12800, specs: 'High-volume mobile fire suppression trolley' }
    ],
    technicalSpecs: {
      operatingPressure: '15 Bar',
      dischargeRange: '6 to 8 Meters',
      dischargeTime: '30 to 60 Seconds',
      testPressure: '35 Bar',
      temperatureRange: '+5°C to +55°C'
    }
  },
  {
    id: 'modular-ceiling',
    name: 'Automatic Modular Ceiling Extinguisher',
    tagline: 'Heat Sensitive Auto-Trigger Fire Suppression Bulb',
    category: 'extinguisher',
    fireClass: 'ABC',
    standard: 'IS: 15683 / 24x7 Unattended Protection',
    description: 'Autonomous ceiling-mounted protection unit equipped with temperature-activated 68°C quartzoid sprinkler bulb. Discharges instantaneously without human intervention.',
    idealUses: [
      'Unattended transformer compartments',
      'Server rack enclosures & battery backup banks',
      'Boiler & furnace rooms',
      'Elevator machine rooms',
      'LPG cylinder bank storage enclosures'
    ],
    capacities: [
      { label: '2 KG Ceiling', value: '2kg', basePrice: 2100, specs: 'Covers up to 1.5 - 2 sq. meters' },
      { label: '5 KG Ceiling', value: '5kg', basePrice: 3400, specs: 'Covers up to 3.5 - 4 sq. meters' },
      { label: '10 KG Ceiling', value: '10kg', basePrice: 5600, specs: 'Covers up to 7 - 8 sq. meters' }
    ],
    technicalSpecs: {
      operatingPressure: '15 Bar',
      dischargeRange: '360° Spherical Dispersion',
      dischargeTime: '8 to 12 Seconds',
      testPressure: '35 Bar',
      temperatureRange: 'Triggers at 68°C (Standard)'
    }
  },
  {
    id: 'refill-abc',
    name: 'ABC Powder Refilling & Hydro-Testing',
    tagline: 'Annual Refill, Nitrogen Pressurization & Certification',
    category: 'refilling',
    fireClass: 'ABC',
    standard: 'IS: 2190 Compliance',
    description: 'Complete inspection, powder moisture purge, IS-standard fresh dry chemical refilling, nitrogen pressurization, O-ring seal replacement, and test certification.',
    idealUses: [
      'Annual corporate safety audit compliance',
      'Factory Inspectorate NOC validation',
      'Expired or depressurized extinguishers',
      'Routine maintenance service'
    ],
    capacities: [
      { label: '1 - 2 KG Refill', value: '1-2kg', basePrice: 350, specs: 'Inspection + Powder + Nitrogen Gas + Seal' },
      { label: '4 KG Refill', value: '4kg', basePrice: 550, specs: 'Full powder replacement + Pressure certification' },
      { label: '6 KG Refill', value: '6kg', basePrice: 750, specs: 'Hydro-testing report + Inspection certificate' },
      { label: '9 KG Refill', value: '9kg', basePrice: 1050, specs: 'Industrial cylinder refurbishment & re-charge' }
    ],
    technicalSpecs: {
      operatingPressure: 'Re-pressurized to 15 Bar Nitrogen',
      testPressure: 'Hydro-static pressure tested at 35 Bar',
      temperatureRange: 'Includes 12-Month Guarantee Seal'
    }
  },
  {
    id: 'refill-co2',
    name: 'CO₂ Gas Refilling & PESO Valve Testing',
    tagline: 'Food-Grade 99.9% CO2 Gas Recharging',
    category: 'refilling',
    fireClass: 'BC',
    standard: 'PESO / IS: 2878 Guidelines',
    description: 'High-pressure cylinder tare weight inspection, discharge horn clearance, PESO valve seating replacement, and high-purity liquid CO2 recharging.',
    idealUses: [
      'Server room annual extinguisher recertification',
      'Depleted electrical panel extinguishers',
      '5-Year Mandatory Hydro-Testing Cycles'
    ],
    capacities: [
      { label: '2 KG CO2 Refill', value: '2kg', basePrice: 550, specs: 'Tare weight check & 2kg CO2 gas filling' },
      { label: '3.2 - 4.5 KG Refill', value: '4.5kg', basePrice: 850, specs: 'Standard commercial server room recharge' },
      { label: '6.5 KG CO2 Refill', value: '6.5kg', basePrice: 1250, specs: 'High-volume cylinder re-charging & seal' }
    ],
    technicalSpecs: {
      operatingPressure: 'Re-charged at 55-60 Bar',
      testPressure: 'Hydro-tested at 250 Bar (if due)',
      temperatureRange: 'Tare weight stamped verification'
    }
  },
  {
    id: 'safety-blanket',
    name: 'Industrial Fire Safety Blanket',
    tagline: 'Woven Fiber Glass Emergency Blanket',
    category: 'equipment',
    fireClass: 'A/B/Kitchen',
    standard: 'EN 1869 / IS Standards',
    description: 'Quick-release emergency fire blanket capable of withstanding temperatures up to 550°C. Essential for kitchen grease fires and personal clothes extinguishing.',
    idealUses: [
      'Commercial restaurant kitchens & pantries',
      'Laboratories & chemical handling stations',
      'Welding bays & metal grinding stations',
      'Emergency personal clothing rescue'
    ],
    capacities: [
      { label: 'Single Unit (1.8m x 1.8m)', value: '1unit', basePrice: 750, specs: 'Quick pull-down straps in rigid case' },
      { label: 'Pack of 4 Units', value: 'pack4', basePrice: 2700, specs: 'Ideal for multi-floor placement' }
    ],
    technicalSpecs: {
      operatingPressure: 'Zero pressure required',
      temperatureRange: 'Resistant up to 550°C continuous heat'
    }
  },
  {
    id: 'hose-reel-drum',
    name: 'Fire Hose Reel Drum (Swinging Type)',
    tagline: '30-Meter High Pressure Rubber Hose with Jet Nozzle',
    category: 'equipment',
    fireClass: 'A',
    standard: 'IS: 884 Certified',
    description: 'Wall-mounted 180° swinging hose reel drum made of heavy-gauge mild steel sheet with solid brass shut-off jet/spray nozzle for building fire riser connections.',
    idealUses: [
      'High-rise residential stairwell landings',
      'Industrial factory floors & warehouse corridors',
      'Educational institutions & hospitals',
      'Basement parking facilities'
    ],
    capacities: [
      { label: '30 Meter Drum Set', value: '30m', basePrice: 5400, specs: 'Includes 19mm braided hose, brass nozzle & wall bracket' }
    ],
    technicalSpecs: {
      operatingPressure: 'Working pressure 12 Bar',
      dischargeRange: 'Up to 10 Meters with continuous water line',
      testPressure: 'Tested at 20 Bar'
    }
  }
];

export const FIRE_CLASSES_INFO = [
  {
    code: 'A',
    name: 'Class A: Solid Combustibles',
    color: 'border-blue-500/30 text-blue-400 bg-blue-500/10',
    description: 'Fires involving ordinary carbonaceous solids like wood, paper, textiles, plastics, rubber, and cardboard packaging.',
    effectiveTypes: 'ABC Powder, Water CO2, Clean Agent'
  },
  {
    code: 'B',
    name: 'Class B: Flammable Liquids',
    color: 'border-cyan-500/30 text-cyan-400 bg-cyan-500/10',
    description: 'Fires involving volatile and combustible liquids such as petrol, diesel, paints, solvents, kerosene, thinners, and varnishes.',
    effectiveTypes: 'Mechanical Foam (AFFF), CO2, ABC Powder'
  },
  {
    code: 'C',
    name: 'Class C: Flammable Gases & Electrical',
    color: 'border-amber-500/30 text-amber-400 bg-amber-500/10',
    description: 'Combustible gas fires (LPG, CNG, Methane, Butane, Acetylene) as well as energized electrical equipment hazards.',
    effectiveTypes: 'ABC Dry Powder, CO2 Gas, Clean Agent'
  },
  {
    code: 'F',
    name: 'Class F / K: Cooking Fats & Oils',
    color: 'border-rose-500/30 text-rose-400 bg-rose-500/10',
    description: 'High-temperature deep fryer grease fires in commercial kitchens, bakeries, and food preparation facilities.',
    effectiveTypes: 'Fire Safety Blanket, Wet Chemical'
  }
];

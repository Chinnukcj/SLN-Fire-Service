export type ServiceType = 'buy-new' | 'refill';

export interface MaterialOption {
  material: string; // e.g. "Normal", "Stainless Steel"
  buyNewPrice: number | 'POR';
}

export interface ProductCapacity {
  label: string;
  value: string;
  basePrice?: number; // legacy compatibility fallback
  buyNewPrice?: number | 'POR';
  refillPrice?: number | 'POR' | null;
  materials?: MaterialOption[];
  specs?: string;
}

export interface Product {
  id: string;
  name: string;
  tagline: string;
  category: 'extinguisher' | 'equipment';
  fireClass: string; // e.g. "ABC", "BC", "AB", "A"
  standard: string; // e.g. "IS: 15683", "IS: 2878"
  description: string;
  idealUses: string[];
  capacities: ProductCapacity[];
  supportedServices?: ServiceType[];
  images?: string[];
  technicalSpecs: {
    operatingPressure?: string;
    dischargeRange?: string;
    dischargeTime?: string;
    testPressure?: string;
    temperatureRange?: string;
  };
  badgeColor?: string;
  contactOnly?: boolean;
}

export const PRODUCTS: Product[] = [
  {
    id: 'abc-powder',
    name: 'ABC Multipurpose Powder',
    tagline: 'Stored Pressure Dry Chemical Powder Extinguisher',
    category: 'extinguisher',
    fireClass: 'ABC',
    standard: 'IS: 15683 / BIS Certified',
    supportedServices: ['buy-new', 'refill'],
    description: 'High-performance MAP 50/90 dry powder extinguisher engineered for solid combustibles, flammable liquids, and energized electrical hazards.',
    idealUses: [
      'Commercial offices & IT parks',
      'Residential apartment complexes',
      'Retail showrooms & shopping malls',
      'Manufacturing warehouses & logistics hubs',
      'Vehicle engine compartments & public transport'
    ],
    capacities: [
      {
        label: '2 KG',
        value: '2kg',
        buyNewPrice: 510,
        refillPrice: 150,
        basePrice: 510,
        specs: 'Discharge: 10-12s | Small office / kitchen / vehicle'
      },
      {
        label: '4 KG',
        value: '4kg',
        buyNewPrice: 725,
        refillPrice: 220,
        basePrice: 725,
        specs: 'Discharge: 13-15s | Standard commercial corridor & server room'
      },
      {
        label: '6 KG',
        value: '6kg',
        buyNewPrice: 790,
        refillPrice: 255,
        basePrice: 790,
        specs: 'Discharge: 15-18s | Commercial workspace standard'
      },
      {
        label: '9 KG',
        value: '9kg',
        buyNewPrice: 1250,
        refillPrice: 430,
        basePrice: 1250,
        specs: 'Discharge: 20-25s | Heavy duty industrial shopfloor'
      }
    ],
    images: [
      'https://raw.githubusercontent.com/Chinnukcj/SLN-Fire-Service/main/public/images/ABC-Multipurpose1-4kg.png',
      'https://raw.githubusercontent.com/Chinnukcj/SLN-Fire-Service/main/public/images/ABC-Multipurpose2-4kg.png',
      'https://raw.githubusercontent.com/Chinnukcj/SLN-Fire-Service/main/public/images/ABC-Multipurpose1-6kg.png'
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
    id: 'modular-ceiling',
    name: 'Automatic Modular Ceiling Extinguisher',
    tagline: 'Heat Sensitive Auto-Trigger Fire Suppression Bulb',
    category: 'extinguisher',
    fireClass: 'ABC',
    standard: 'IS: 15683 / 24x7 Unattended Protection',
    supportedServices: ['buy-new', 'refill'],
    contactOnly: true,
    description: 'Autonomous ceiling-mounted protection unit equipped with temperature-activated 68°C quartzoid sprinkler bulb. Discharges instantaneously without human intervention.',
    idealUses: [
      'Unattended transformer compartments',
      'Server rack enclosures & battery backup banks',
      'Boiler & furnace rooms',
      'Elevator machine rooms',
      'LPG cylinder bank storage enclosures'
    ],
    capacities: [
      {
        label: '5 KG',
        value: '5kg',
        buyNewPrice: 'POR',
        refillPrice: 'POR',
        specs: 'Covers up to 3.5 - 4 sq. meters | Auto 68°C red bulb trigger'
      }
    ],
    images: [],
    technicalSpecs: {
      operatingPressure: '15 Bar',
      dischargeRange: '360° Spherical Dispersion',
      dischargeTime: '8 to 12 Seconds',
      testPressure: '35 Bar',
      temperatureRange: 'Triggers at 68°C (Standard)'
    }
  },
  {
    id: 'co2-portable',
    name: 'CO₂ Carbon Dioxide Portable',
    tagline: 'High-Pressure Pure Gas Clean Extinguisher',
    category: 'extinguisher',
    fireClass: 'BC',
    standard: 'IS: 15683 / PESO Approved',
    supportedServices: ['buy-new', 'refill'],
    description: 'Clean, residue-free extinguishing agent specifically designed for delicate electronic machinery, IT server rooms, and live electrical panels.',
    idealUses: [
      'Data centers & server switch rooms',
      'Substations & HT/LT electrical panels',
      'Diagnostic medical labs & scanning rooms',
      'Broadcasting suites & recording studios',
      'Industrial generator enclosures'
    ],
    capacities: [
      {
        label: '2 KG',
        value: '2kg',
        buyNewPrice: 3050,
        refillPrice: 180,
        basePrice: 3050,
        specs: 'Seamless PESO cylinder with discharge horn | Compact lab / control unit'
      },
      {
        label: '4.5 KG',
        value: '4.5kg',
        buyNewPrice: 3550,
        refillPrice: 360,
        basePrice: 3550,
        specs: 'Industry standard for IT server rooms & telecom suites'
      },
      {
        label: '9 KG',
        value: '9kg',
        buyNewPrice: 'POR',
        refillPrice: 595,
        specs: 'Heavy capacity with flexible high-pressure hose | Electrical substations'
      }
    ],
    images: [
      'https://raw.githubusercontent.com/Chinnukcj/SLN-Fire-Service/main/public/images/Co2-1-4.5kg.png'
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
    id: 'foam-afff',
    name: 'Mechanical Foam (AFFF)',
    tagline: 'Aqueous Film-Forming Foam for Flammable Liquids',
    category: 'extinguisher',
    fireClass: 'AB',
    standard: 'IS: 15683 / Marine & Industrial Grade',
    supportedServices: ['buy-new', 'refill'],
    description: 'Generates a vapor-sealing blanketing film over burning liquid surfaces that prevents oxygen access and stops flammable liquid reignition.',
    idealUses: [
      'Petrol filling stations & diesel generator yards',
      'Automotive service bays & spray paint booths',
      'Solvent & oil storage warehouses',
      'Aviation hangars & industrial marine yards',
      'Chemical processing plants'
    ],
    capacities: [
      {
        label: '9 Litre',
        value: '9l',
        buyNewPrice: 1450,
        refillPrice: 295,
        basePrice: 1450,
        specs: 'Standard capacity for petrol pumps & automotive service stations'
      },
      {
        label: '50 Litre',
        value: '50l',
        buyNewPrice: 7600,
        refillPrice: 690,
        basePrice: 7600,
        specs: 'Heavy mobile trolley with 5m hose & shut-off applicator'
      }
    ],
    images: [],
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
    supportedServices: ['buy-new', 'refill'],
    description: 'Maximizes thermal cooling on solid combustible deep-seated fires including timber, paper, cardboard packaging, and textile bales.',
    idealUses: [
      'Corrugated box & packaging manufacturing',
      'Textile mills, garment factories & godowns',
      'Woodworking mills & carpentry workshops',
      'Libraries, stationery warehouses & archives',
      'Agricultural storage sheds'
    ],
    capacities: [
      {
        label: '9 Litre',
        value: '9l',
        buyNewPrice: 1300,
        refillPrice: 110,
        basePrice: 1300,
        specs: 'Concentrated jet stream nozzle for solid Class A hazards'
      },
      {
        label: '50 Litre',
        value: '50l',
        buyNewPrice: 6000,
        refillPrice: 540,
        basePrice: 6000,
        specs: 'High-volume mobile fire suppression trolley'
      }
    ],
    images: [],
    technicalSpecs: {
      operatingPressure: '15 Bar',
      dischargeRange: '6 to 8 Meters',
      dischargeTime: '30 to 60 Seconds',
      testPressure: '35 Bar',
      temperatureRange: '+5°C to +55°C'
    }
  },
  {
    id: 'k-type',
    name: 'K-Type Kitchen Extinguisher',
    tagline: 'Wet Chemical Fire Extinguisher for Commercial Kitchens',
    category: 'extinguisher',
    fireClass: 'F / K',
    standard: 'IS: 15683 / Food Service Safety Certified',
    supportedServices: ['buy-new', 'refill'],
    description: 'Specialized wet chemical (potassium acetate) extinguisher for high-temperature commercial deep fryers and cooking fat grease fires. Forms an instant vapor-suppressing soapy blanket.',
    idealUses: [
      'Commercial restaurant kitchens & hotels',
      'Deep fat fryer battery stations',
      'Food processing & bakery fryers',
      'Cloud kitchens & hospital canteens',
      'Fast food & grill ventilation areas'
    ],
    capacities: [
      {
        label: '4 Litre',
        value: '4l',
        materials: [
          { material: 'Normal', buyNewPrice: 6350 },
          { material: 'Stainless Steel', buyNewPrice: 8000 }
        ],
        buyNewPrice: 6350,
        refillPrice: 675,
        basePrice: 6350,
        specs: 'Restaurant deep fryer protection | Food-grade safe'
      },
      {
        label: '6 Litre',
        value: '6l',
        materials: [
          { material: 'Normal', buyNewPrice: 6850 },
          { material: 'Stainless Steel', buyNewPrice: 8500 }
        ],
        buyNewPrice: 6850,
        refillPrice: 850,
        basePrice: 6850,
        specs: 'High-volume commercial kitchen & hotel standard'
      }
    ],
    images: [
      'https://raw.githubusercontent.com/Chinnukcj/SLN-Fire-Service/main/public/images/K-type-1.png',
      'https://raw.githubusercontent.com/Chinnukcj/SLN-Fire-Service/main/public/images/K-type-2.png'
    ],
    technicalSpecs: {
      operatingPressure: '12 to 14 Bar',
      dischargeRange: '3 to 4 Meters',
      dischargeTime: '20 to 35 Seconds',
      testPressure: '30 Bar',
      temperatureRange: '0°C to +60°C'
    }
  },
  {
    id: 'clean-agent',
    name: 'Clean Agent (HFC 236fa)',
    tagline: 'Zero-Residue Halon Alternative Extinguisher',
    category: 'extinguisher',
    fireClass: 'ABC',
    standard: 'IS: 15683 / Environment Safe',
    supportedServices: ['buy-new', 'refill'],
    description: 'Electrically non-conductive, non-corrosive, non-toxic gas extinguisher that extinguishes fires without causing thermal shock or chemical residue on sensitive equipment.',
    idealUses: [
      'Hospital operation theatres & ICUs',
      'Semiconductor & microchip manufacturing',
      'Telecommunication exchanges',
      'Art archives, museums & rare document vaults',
      'Air traffic control suites'
    ],
    capacities: [
      {
        label: '2 KG',
        value: '2kg',
        buyNewPrice: 'POR',
        refillPrice: 3600,
        basePrice: 3600,
        specs: 'Clean agent for compact control units | Refill @ ₹1,800/kg'
      },
      {
        label: '4 KG',
        value: '4kg',
        buyNewPrice: 'POR',
        refillPrice: 7200,
        basePrice: 7200,
        specs: 'Full room protection standard | Refill @ ₹1,800/kg'
      },
      {
        label: '6 KG',
        value: '6kg',
        buyNewPrice: 'POR',
        refillPrice: 10800,
        basePrice: 10800,
        specs: 'High-volume sensitive space deployment | Refill @ ₹1,800/kg'
      }
    ],
    images: [],
    technicalSpecs: {
      operatingPressure: '15 Bar',
      dischargeRange: '2 to 3.5 Meters',
      dischargeTime: '12 to 16 Seconds',
      testPressure: '35 Bar',
      temperatureRange: '-20°C to +55°C'
    }
  },
  {
    id: 'safety-blanket',
    name: 'Industrial Fire Safety Blanket',
    tagline: 'Woven Fiber Glass Emergency Blanket',
    category: 'equipment',
    fireClass: 'A/B/Kitchen',
    standard: 'EN 1869 / IS Standards',
    supportedServices: ['buy-new'],
    description: 'Quick-release emergency fire blanket capable of withstanding temperatures up to 550°C. Essential for kitchen grease fires and personal clothes extinguishing.',
    idealUses: [
      'Commercial restaurant kitchens & pantries',
      'Laboratories & chemical handling stations',
      'Welding bays & metal grinding stations',
      'Emergency personal clothing rescue'
    ],
    capacities: [
      {
        label: 'Single Unit (1.8m x 1.8m)',
        value: '1unit',
        buyNewPrice: 750,
        basePrice: 750,
        specs: 'Quick pull-down straps in rigid case'
      },
      {
        label: 'Pack of 4 Units',
        value: 'pack4',
        buyNewPrice: 2700,
        basePrice: 2700,
        specs: 'Ideal for multi-floor placement'
      }
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
    supportedServices: ['buy-new'],
    description: 'Wall-mounted 180° swinging hose reel drum made of heavy-gauge mild steel sheet with solid brass shut-off jet/spray nozzle for building fire riser connections.',
    idealUses: [
      'High-rise residential stairwell landings',
      'Industrial factory floors & warehouse corridors',
      'Educational institutions & hospitals',
      'Basement parking facilities'
    ],
    capacities: [
      {
        label: '30 Meter Drum Set',
        value: '30m',
        buyNewPrice: 5400,
        basePrice: 5400,
        specs: 'Includes 19mm braided hose, brass nozzle & wall bracket'
      }
    ],
    technicalSpecs: {
      operatingPressure: 'Working pressure 12 Bar',
      dischargeRange: 'Up to 10 Meters with continuous water line',
      testPressure: 'Tested at 20 Bar'
    }
  },
  {
    id: 'signage-board',
    name: 'Fire Safety Signage Board (Photoluminescent)',
    tagline: 'Glow-in-the-Dark Emergency Exit & Extinguisher Markers',
    category: 'equipment',
    fireClass: 'Evacuation',
    standard: 'IS: 9457 / ISO 7010 Certified',
    supportedServices: ['buy-new'],
    description: 'High-intensity glow photoluminescent safety signage made on rigid 3mm weather-resistant board. Guarantees immediate visibility in complete blackouts and smoke-filled corridors.',
    idealUses: [
      'Emergency exit stairwells & escape passage doors',
      'Fire extinguisher & hydrant mounting locations',
      'Manual Call Point (MCP) & emergency alarm stations',
      'Commercial basements, factories & apartment corridors'
    ],
    capacities: [
      {
        label: 'Extinguisher Marker (150x200mm)',
        value: 'sign-extinguisher',
        buyNewPrice: 280,
        basePrice: 280,
        specs: '3mm rigid photoluminescent PVC board'
      },
      {
        label: 'Emergency Exit Board (150x300mm)',
        value: 'sign-exit',
        buyNewPrice: 420,
        basePrice: 420,
        specs: 'Running man icon with glow directional arrow'
      },
      {
        label: 'Floor Evacuation Plan (300x400mm)',
        value: 'sign-evacuation',
        buyNewPrice: 850,
        basePrice: 850,
        specs: 'Custom facility floor evacuation layout'
      },
      {
        label: 'Starter Kit (10 Assorted Signs)',
        value: 'sign-pack10',
        buyNewPrice: 2800,
        basePrice: 2800,
        specs: 'Complete commercial multi-floor sign package'
      }
    ],
    technicalSpecs: {
      operatingPressure: 'Zero power required (Photoluminescent)',
      temperatureRange: '-15°C to +65°C UV & weather resistant',
      dischargeRange: 'Up to 6 - 8 hours glowing visibility in dark'
    },
    images: []
  },
  {
    id: 'smoke-detector',
    name: 'Optical Photoelectric Smoke Detector',
    tagline: 'Early Fire Sensing Chamber with 360° Visual LED Ring',
    category: 'equipment',
    fireClass: 'Detection',
    standard: 'IS: 11360 / EN 54-7 Certified',
    supportedServices: ['buy-new'],
    description: 'High-sensitivity optical photoelectric smoke sensor engineered for early detection of slow-smoldering and fast-burning fires. Features insect-resistant mesh barrier and dual visual alert LEDs.',
    idealUses: [
      'Corporate offices, conference halls & server rooms',
      'Hotels, hostels, hospitals & commercial corridors',
      'Electrical distribution panels & battery banks',
      'Warehouses, inventory stores & residential homes'
    ],
    capacities: [
      {
        label: 'Conventional 2-Wire (with Base)',
        value: 'conv-2wire',
        buyNewPrice: 650,
        basePrice: 650,
        specs: '9-33V DC universal zone panel compatible'
      },
      {
        label: 'Addressable Loop Detector',
        value: 'addr-loop',
        buyNewPrice: 1450,
        basePrice: 1450,
        specs: 'Microprocessor addressable with isolator base'
      },
      {
        label: 'Standalone Battery Unit (9V)',
        value: 'standalone-9v',
        buyNewPrice: 890,
        basePrice: 890,
        specs: 'Built-in 85dB alarm siren, no external wiring'
      },
      {
        label: 'Contractor Pack (10 Units + Bases)',
        value: 'pack-10',
        buyNewPrice: 5800,
        basePrice: 5800,
        specs: 'Universal 2-wire contractor pack with bases'
      }
    ],
    technicalSpecs: {
      operatingPressure: 'Operating voltage 12V - 24V DC (9-33V range)',
      dischargeRange: '50 - 60 sq. meters coverage per unit',
      dischargeTime: '< 3 seconds optical smoke chamber trigger',
      temperatureRange: '-10°C to +50°C, 95% RH non-condensing'
    },
    images: []
  },
  {
    id: 'fire-alarm-panel',
    name: 'Microprocessor Fire Alarm Control Panel',
    tagline: 'Multi-Zone Automated Central Monitoring & Siren Controller',
    category: 'equipment',
    fireClass: 'Central Control',
    standard: 'IS: 2189 / EN 54-2 Certified',
    supportedServices: ['buy-new'],
    description: 'Commercial grade microprocessor fire alarm control panel with independent zone supervision, battery charging system, open/short circuit fault indicators, and dual hooter siren outputs.',
    idealUses: [
      'Commercial complexes, retail malls & corporate towers',
      'Industrial manufacturing plants & processing units',
      'Hospitals, diagnostic labs & educational campuses',
      'High-rise residential apartment communities'
    ],
    capacities: [
      {
        label: '2-Zone Conventional Panel',
        value: 'panel-2zone',
        buyNewPrice: 6200,
        basePrice: 6200,
        specs: 'Monitors up to 40 detectors across 2 independent zones'
      },
      {
        label: '4-Zone Conventional Panel',
        value: 'panel-4zone',
        buyNewPrice: 8900,
        basePrice: 8900,
        specs: 'Monitors up to 80 detectors across 4 independent zones'
      },
      {
        label: '8-Zone Commercial Panel',
        value: 'panel-8zone',
        buyNewPrice: 14500,
        basePrice: 14500,
        specs: 'Monitors up to 160 devices with dual sounder circuits'
      },
      {
        label: '16-Zone Industrial Panel',
        value: 'panel-16zone',
        buyNewPrice: 24000,
        basePrice: 24000,
        specs: 'Heavy-duty steel enclosure with repeater port'
      }
    ],
    technicalSpecs: {
      operatingPressure: '220V - 240V AC 50Hz mains + 24V DC battery backup',
      dischargeRange: 'Supports up to 20-25 detectors/MCPs per zone',
      dischargeTime: 'Instant response: audible siren triggered < 1s',
      temperatureRange: '0°C to +50°C enclosed IP30 steel cabinet'
    },
    images: []
  },
  {
    id: 'manual-call-point',
    name: 'Manual Call Point (MCP Fire Alarm Station)',
    tagline: 'Emergency Push-Button / Break Glass Evacuation Trigger',
    category: 'equipment',
    fireClass: 'Emergency Trigger',
    standard: 'IS: 2189 / BS 5839 / EN 54-11',
    supportedServices: ['buy-new'],
    description: 'High-visibility red fire alarm manual pull/push station. Available with flexible resettable element or break-glass window with test reset key. Activates immediate site-wide emergency alarm.',
    idealUses: [
      'Emergency stairwell escape doors & lobby passageways',
      'Adjacent to fire extinguisher & hose reel stations',
      'Factory workshop entry and exit doors',
      'Commercial kitchen & server room access entries'
    ],
    capacities: [
      {
        label: 'Resettable Element (with Key)',
        value: 'mcp-resettable',
        buyNewPrice: 480,
        basePrice: 480,
        specs: 'Push-in resettable tab, reset key included'
      },
      {
        label: 'Break Glass Type (with Hammer)',
        value: 'mcp-breakglass',
        buyNewPrice: 380,
        basePrice: 380,
        specs: 'Break-glass element with attached test hammer'
      },
      {
        label: 'Weatherproof Outdoor IP66',
        value: 'mcp-weatherproof',
        buyNewPrice: 1150,
        basePrice: 1150,
        specs: 'Water & dust-proof silicone seal for outdoors'
      },
      {
        label: 'Contractor Pack of 5 Units',
        value: 'mcp-pack5',
        buyNewPrice: 2100,
        basePrice: 2100,
        specs: 'Complete set with wall backboxes & keys'
      }
    ],
    technicalSpecs: {
      operatingPressure: '12V - 30V DC zone loop circuit',
      dischargeTime: 'Instant activation upon push / break (< 0.2s)',
      temperatureRange: '-10°C to +55°C flame-retardant ABS enclosure'
    },
    images: []
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

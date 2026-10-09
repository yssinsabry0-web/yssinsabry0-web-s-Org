export interface RouteInfo {
  code: string;
  destination: string;
  name: string;
  duration: string;
  departureTime: string;
  lightCondition: 'SUNRISE OUT' | 'SUNSET OUT' | 'DUSK IN' | 'DAWN IN';
  distanceMiles: number;
  lat: number;
  lng: number;
}

export const LISBON_COORDS = { lat: 38.7223, lng: -9.1393 };

export const ROUTES_DATA: RouteInfo[] = [
  {
    code: 'KIX',
    destination: 'Osaka / Kyoto',
    name: 'Kyoto',
    duration: '14H 05M',
    departureTime: '18:30',
    lightCondition: 'SUNSET OUT',
    distanceMiles: 6880,
    lat: 34.4347,
    lng: 135.2441,
  },
  {
    code: 'CPT',
    destination: 'Cape Town',
    name: 'Cape Town',
    duration: '11H 20M',
    departureTime: '19:15',
    lightCondition: 'DUSK IN',
    distanceMiles: 5670,
    lat: -33.9715,
    lng: 18.6021,
  },
  {
    code: 'JFK',
    destination: 'New York',
    name: 'New York',
    duration: '8H 10M',
    departureTime: '17:45',
    lightCondition: 'SUNSET OUT',
    distanceMiles: 3370,
    lat: 40.6413,
    lng: -73.7781,
  },
  {
    code: 'EZE',
    destination: 'Buenos Aires',
    name: 'Buenos Aires',
    duration: '12H 25M',
    departureTime: '21:00',
    lightCondition: 'DAWN IN',
    distanceMiles: 5980,
    lat: -34.815,
    lng: -58.5348,
  },
  {
    code: 'KEF',
    destination: 'Reykjavik',
    name: 'Reykjavík',
    duration: '3H 50M',
    departureTime: '18:10',
    lightCondition: 'SUNSET OUT',
    distanceMiles: 1850,
    lat: 63.985,
    lng: -22.6056,
  },
  {
    code: 'SIN',
    destination: 'Singapore',
    name: 'Singapore',
    duration: '15H 40M',
    departureTime: '16:50',
    lightCondition: 'SUNSET OUT',
    distanceMiles: 7520,
    lat: 1.3644,
    lng: 103.9915,
  },
  {
    code: 'LAX',
    destination: 'Los Angeles',
    name: 'Los Angeles',
    duration: '12H 20M',
    departureTime: '17:20',
    lightCondition: 'SUNSET OUT',
    distanceMiles: 5680,
    lat: 33.9416,
    lng: -118.4085,
  },
];

export interface CabinSuite {
  id: 'window' | 'corner' | 'twin';
  tag: string;
  name: string;
  title: string;
  subtitle: string;
  description: string;
  multiplier: number;
  specs: {
    bed: string;
    windows: number;
    doorOrPerFlight: string;
    doorLabel: string;
  };
  details: string[];
}

export const CABIN_SUITES: CabinSuite[] = [
  {
    id: 'window',
    tag: '(01) WINDOW',
    name: 'The Window Suite',
    title: 'The Window Suite',
    subtitle: 'SUITE 3A · LIS -> KIX',
    description:
      'Thirty-eight private sanctuaries, each positioned directly along the exterior fuselage wall. Three continuous oval windows curve beside the bed, giving you an unbroken private panorama of cloudscapes from departure to arrival.',
    multiplier: 1.0,
    specs: {
      bed: '2.10 M',
      windows: 3,
      doorOrPerFlight: 'Yes',
      doorLabel: 'DOOR',
    },
    details: [
      'Italian brushed merino wool duvet',
      'Continuous triple-paned electric dimming',
      'Direct pressurized air duct & warm brass sconce',
    ],
  },
  {
    id: 'corner',
    tag: '(02) CORNER',
    name: 'The Corner Suite',
    title: 'The Corner Suite',
    subtitle: 'SUITE 10A / 10K · REAR APERTURE',
    description:
      'The last row, where the fuselage starts to narrow. Four windows across two angled walls, and the quietest place on the aircraft. A dual-aspect perspective that catches both the wingtip strobe and the horizon curve.',
    multiplier: 1.5,
    specs: {
      bed: '2.10 M',
      windows: 4,
      doorOrPerFlight: '2',
      doorLabel: 'PER FLIGHT',
    },
    details: [
      'Dual-aspect forward and lateral horizons',
      'Zero foot traffic aft acoustic boundary',
      'Dedicated personal wardrobe & cellar locker',
    ],
  },
  {
    id: 'twin',
    tag: '(03) TWIN',
    name: 'The Twin Suite',
    title: 'The Twin Suite',
    subtitle: 'SUITE 4B+4C · DUAL HORIZON',
    description:
      'Two Window Suites with the partition folded away, for people who would rather watch the sunrise together. Six panoramic windows stretching over four meters of illuminated horizon.',
    multiplier: 2.0,
    specs: {
      bed: '2',
      windows: 6,
      doorOrPerFlight: '4',
      doorLabel: 'PER FLIGHT',
    },
    details: [
      'Retractable acoustic solid walnut partition',
      'Dual independent temperature & shade consoles',
      'Shared dining configuration for in-flight service',
    ],
  },
];

export interface FaqItem {
  number: string;
  question: string;
  answer: string;
}

export const FAQ_ITEMS: FaqItem[] = [
  {
    number: '01',
    question: 'How do I become a member?',
    answer:
      'Membership is by invitation or member referral only. We open twenty-four new memberships at each equinox and solstice. To be considered, submit your flight profile via the request form. Our admissions steward reviews every inquiry before first light.',
  },
  {
    number: '02',
    question: 'Why so few suites?',
    answer:
      'Thirty-eight suites is the exact number where every single passenger can have three uninterrupted fuselage windows and direct aisle access without compromise. There is no economy cabin, no business class compromises, and zero middle seats, ever.',
  },
  {
    number: '03',
    question: 'Do you really time flights to the light?',
    answer:
      'Yes. Our schedule is engineered around astronomical twilight. Rather than flying into the harsh glare of midday sun, departures from Lisbon are scheduled so that cruise altitude coincides with either dawn or dusk, maximizing golden hour and celestial visibility.',
  },
  {
    number: '04',
    question: 'Can I bring someone who isn’t a member?',
    answer:
      'Members may reserve up to two companion suites per journey, or convert adjoining suites into a Twin Suite. Companions enjoy full lounge access and window suite amenities under your membership privileges.',
  },
  {
    number: '05',
    question: 'What aircraft do you fly?',
    answer:
      'GLOAM operates custom-fitted long-range widebody aircraft, engineered with bespoke acoustic dampening, active hum-cancellation in the suite bulkheads, and custom precision-machined window bezels.',
  },
  {
    number: '06',
    question: 'How does the shade work?',
    answer:
      'Each window is fitted with a physical electro-mechanical shade that glides smoothly with a single touch, alongside electrochromic smart glass. You can control it manually via the brass handle or preset automated light cues via the GLOAM companion app.',
  },
];

export type TimeOfDay = 'DAWN' | 'DAY' | 'DUSK' | 'NIGHT';

export interface TimePhase {
  id: TimeOfDay;
  time: string;
  name: string;
  tagline: string;
  location: string;
  subcopy: string;
  status: string;
  skyGradient: string;
  ambientLight: string;
  cloudOpacity: number;
  starOpacity: number;
  sunPosition: { x: number; y: number };
  shadePreset: number; // 0 to 100%
}

export const TIME_PHASES: Record<TimeOfDay, TimePhase> = {
  DAWN: {
    id: 'DAWN',
    time: '05:48',
    name: 'Dawn',
    tagline: "MEMBERS' AIR · LISBON",
    location: 'Approaching the Irish Sea',
    subcopy:
      'Thirty-eight suites a flight, three windows to every suite, and a shade that answers to no one but you. We fly at the hour the light is best.',
    status: 'The horizon catches fire. The shade lifts ten minutes before sunrise.',
    skyGradient: 'linear-gradient(180deg, #1b213b 0%, #46344d 28%, #9e5b56 60%, #e88c58 85%, #f6c888 100%)',
    ambientLight: 'rgba(232, 140, 88, 0.3)',
    cloudOpacity: 0.85,
    starOpacity: 0.1,
    sunPosition: { x: 75, y: 78 },
    shadePreset: 0,
  },
  DAY: {
    id: 'DAY',
    time: '11:20',
    name: 'Day',
    tagline: '11:20 · ABOVE THE WEATHER',
    location: 'Stratosphere over the North Atlantic',
    subcopy:
      'Noon, and every cloud is underneath you. Three windows, none of them shared.',
    status: 'Pure cerulean light above 41,000 feet. Cloud tops like sculptured alabaster.',
    skyGradient: 'linear-gradient(180deg, #092756 0%, #17528e 35%, #4a8ac2 70%, #9ecae8 100%)',
    ambientLight: 'rgba(158, 202, 232, 0.25)',
    cloudOpacity: 0.95,
    starOpacity: 0.0,
    sunPosition: { x: 50, y: 25 },
    shadePreset: 0,
  },
  DUSK: {
    id: 'DUSK',
    time: '19:06',
    name: 'Dusk',
    tagline: '19:06 · THE LONG SUNSET',
    location: 'Coast of Iberia descending into evening',
    subcopy:
      'Westbound, we fly a little slower to keep the light on the wing.',
    status: 'The hour the airline was named after. Burnt copper, plum, and long shadows.',
    skyGradient: 'linear-gradient(180deg, #140d1e 0%, #2e1a38 30%, #682c3c 65%, #b55639 88%, #e09054 100%)',
    ambientLight: 'rgba(205, 95, 60, 0.35)',
    cloudOpacity: 0.82,
    starOpacity: 0.35,
    sunPosition: { x: 25, y: 82 },
    shadePreset: 0,
  },
  NIGHT: {
    id: 'NIGHT',
    time: '01:12',
    name: 'Night',
    tagline: '01:12 · LIGHTS DOWN',
    location: 'Somewhere over Greenland',
    subcopy:
      'Somewhere over Greenland. The shade is yours, and so is the dark.',
    status: 'The shade is yours, and so is the dark. Crescent moon silvering the ice sheet below.',
    skyGradient: 'linear-gradient(180deg, #030409 0%, #080c16 40%, #0e1628 75%, #18233d 100%)',
    ambientLight: 'rgba(40, 55, 90, 0.25)',
    cloudOpacity: 0.45,
    starOpacity: 0.95,
    sunPosition: { x: 80, y: 22 },
    shadePreset: 0,
  },
};

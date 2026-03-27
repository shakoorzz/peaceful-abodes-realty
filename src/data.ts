export interface Property {
  id: string
  title: string
  address: string
  price: number
  beds: number
  baths: number
  sqft: number
  type: 'residential' | 'commercial'
  image: string
  images?: string[]
  featured?: boolean
  description?: string
  yearBuilt?: number
  lotSize?: string
  parking?: string
  amenities?: string[]
}

export const properties: Property[] = [
  {
    id: 'rauber-101',
    title: '101 Rauber St',
    address: '101 Rauber St, Rochester, NY 14605',
    price: 134900,
    beds: 3,
    baths: 1,
    sqft: 1025,
    type: 'residential',
    image: '/static/properties/101-rauber-st/01-primary.jpg',
    images: [
      '/static/properties/101-rauber-st/01-primary.jpg',
      '/static/properties/101-rauber-st/02.png',
      '/static/properties/101-rauber-st/03.png',
      '/static/properties/101-rauber-st/04-staged.jpg',
      '/static/properties/101-rauber-st/05.png',
      '/static/properties/101-rauber-st/06.png',
      '/static/properties/101-rauber-st/07.png'
    ],
    featured: true,
    description: 'Built in 2007, this well-maintained ranch offers easy one-level living with three bedrooms and one full bath. The spacious basement with egress windows provides excellent potential for future finishing or recreation. Situated on a large enclosed lot with ample parking and privacy, plus convenient access to downtown Rochester and nearby riverfront areas.',
    yearBuilt: 2007,
    lotSize: '5,663 sq ft',
    parking: 'Driveway',
    amenities: ['Full Basement', 'Egress Windows', 'Large Lot', 'Forced Air (Gas)']
  },
  {
    id: 'salisbury-204',
    title: '204 Salisbury St',
    address: '204 Salisbury St, Rochester, NY 14609',
    price: 184900,
    beds: 4,
    baths: 1.5,
    sqft: 1449,
    type: 'residential',
    image: '/static/properties/204-salisbury-st/01-primary.png',
    images: [
      '/static/properties/204-salisbury-st/01-primary.png',
      '/static/properties/204-salisbury-st/02.png',
      '/static/properties/204-salisbury-st/03.png',
      '/static/properties/204-salisbury-st/04-staged.jpg',
      '/static/properties/204-salisbury-st/05.png',
      '/static/properties/204-salisbury-st/06.png',
      '/static/properties/204-salisbury-st/07.png'
    ],
    featured: true,
    description: 'A beautifully maintained Rochester home offering space, charm, and modern updates. This 4-bedroom, 1.5-bath property features a screened porch, backyard deck, fully fenced yard, and classic gumwood trim with hardwood floors throughout. Freshly painted and move-in ready with energy-efficient windows and generous living space.',
    yearBuilt: 1920,
    lotSize: '3,999 sq ft',
    parking: 'Driveway',
    amenities: ['Screened Porch', 'Deck', 'Hardwood Floors', 'Fully Fenced Yard', 'Energy-Efficient Windows']
  },
  {
    id: 'smith-388',
    title: '388 Smith St',
    address: '388 Smith St, Rochester, NY 14608',
    price: 124900,
    beds: 6,
    baths: 2,
    sqft: 1680,
    type: 'residential',
    image: '/static/properties/388-smith-st/01-primary.png',
    images: [
      '/static/properties/388-smith-st/01-primary.png',
      '/static/properties/388-smith-st/02.png',
      '/static/properties/388-smith-st/03.png',
      '/static/properties/388-smith-st/04-staged.jpg',
      '/static/properties/388-smith-st/05.png',
      '/static/properties/388-smith-st/06.png',
      '/static/properties/388-smith-st/07.png'
    ],
    featured: false,
    description: 'Massive 6-bedroom, 2-bath home steps from Innovative Field and downtown Rochester. The flexible layout includes a large living/dining combo, eat-in kitchen, and three bedrooms per level. Easily convertible to a multi-family income property with the first right to purchase the adjacent vacant city lot.',
    yearBuilt: 1920,
    lotSize: '3,975 sq ft',
    parking: 'Street Parking',
    amenities: ['Eat-In Kitchen', 'Downtown Location', 'Investment Potential', 'Full Basement']
  },
  {
    id: 'leavenworth-27',
    title: '27 Leavenworth St',
    address: '27 Leavenworth St, Rochester, NY 14613',
    price: 83000,
    beds: 2,
    baths: 1,
    sqft: 1233,
    type: 'residential',
    image: '/static/properties/27-leavenworth-st/01-primary.png',
    images: [
      '/static/properties/27-leavenworth-st/01-primary.png',
      '/static/properties/27-leavenworth-st/02.png',
      '/static/properties/27-leavenworth-st/03.png',
      '/static/properties/27-leavenworth-st/04-staged.jpg',
      '/static/properties/27-leavenworth-st/05.png',
      '/static/properties/27-leavenworth-st/06.png',
      '/static/properties/27-leavenworth-st/07.png'
    ],
    featured: false,
    description: 'Charming 2-bedroom, 1-bath home with major updates including a newer roof (2023), hot water tank (2016), and furnace (2017). Enjoy the enclosed front porch and off-street parking, ideal for owner-occupants or investors looking to expand their portfolio.',
    yearBuilt: 1868,
    lotSize: '2,351 sq ft',
    parking: 'Off-Street / Driveway',
    amenities: ['Enclosed Front Porch', 'Newer Roof (2023)', 'Furnace (2017)', 'Hot Water Tank (2016)']
  },
  {
    id: 'garfield-103',
    title: '103 Garfield St',
    address: '103 Garfield St, East Rochester, NY 14445',
    price: 189900,
    beds: 3,
    baths: 1,
    sqft: 1179,
    type: 'residential',
    image: '/static/properties/103-garfield-st/01-primary.png',
    images: [
      '/static/properties/103-garfield-st/01-primary.png',
      '/static/properties/103-garfield-st/02.png',
      '/static/properties/103-garfield-st/03.png',
      '/static/properties/103-garfield-st/04-staged.jpg',
      '/static/properties/103-garfield-st/05.png',
      '/static/properties/103-garfield-st/06.png',
      '/static/properties/103-garfield-st/07.png'
    ],
    featured: true,
    description: 'Freshly updated and move-in ready home in East Rochester with new paint, carpeting, and kitchen updates. Includes a foyer/mudroom, three-season room, fireplace, and a detached 3-car garage. Quiet neighborhood location with easy access to major highways and downtown Rochester.',
    yearBuilt: 1920,
    lotSize: '3,049 sq ft',
    parking: '3-Car Detached Garage',
    amenities: ['Three-Season Room', '3-Car Garage', 'Fireplace', 'Bonus Room', 'Mud Room']
  },
  {
    id: 'kosciusko-94',
    title: '94 Kosciusko St',
    address: '94 Kosciusko St, Rochester, NY 14621',
    price: 143900,
    beds: 4,
    baths: 2.5,
    sqft: 1848,
    type: 'residential',
    image: '/static/properties/94-kosciusko-st/01-primary.png',
    images: [
      '/static/properties/94-kosciusko-st/01-primary.png',
      '/static/properties/94-kosciusko-st/02.png',
      '/static/properties/94-kosciusko-st/03.png',
      '/static/properties/94-kosciusko-st/04-staged.jpg',
      '/static/properties/94-kosciusko-st/05.png',
      '/static/properties/94-kosciusko-st/06.png',
      '/static/properties/94-kosciusko-st/07.png'
    ],
    featured: false,
    description: 'Versatile two-unit duplex with a spacious 4-bedroom, 2-bath front unit and a separate studio apartment. Highlights include two enclosed porches, original hardwood floors, a 4-car garage, and an adjacent lot included in the sale. Currently rented with strong income potential.',
    yearBuilt: 1897,
    lotSize: '3,455 sq ft',
    parking: '4-Car Garage',
    amenities: ['Two Enclosed Porches', 'Original Hardwood Floors', 'Adjacent Lot Included', 'Central Air', 'Two-Unit Duplex']
  }
]

export const neighborhoods = [
  {
    id: 'manhattan',
    name: 'Manhattan',
    description: 'The heart of NYC with world-class dining, culture, and endless opportunities.',
    image: 'https://images.unsplash.com/photo-1534430480872-3498386e7856?w=800&h=600&fit=crop&q=80',
    avgPrice: '$2.5M',
    properties: 45
  },
  {
    id: 'brooklyn',
    name: 'Brooklyn',
    description: 'Trendy neighborhoods, diverse communities, and a thriving arts scene.',
    image: 'https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?w=800&h=600&fit=crop&q=80',
    avgPrice: '$1.8M',
    properties: 38
  },
  {
    id: 'hudson-valley',
    name: 'Hudson Valley',
    description: 'Scenic beauty, historic charm, and a peaceful retreat from city life.',
    image: 'https://images.unsplash.com/photo-1605146769289-440113cc3d00?w=800&h=600&fit=crop&q=80',
    avgPrice: '$950K',
    properties: 24
  },
  {
    id: 'catskills',
    name: 'Catskills',
    description: 'Mountain living with outdoor recreation and stunning natural beauty.',
    image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=800&h=600&fit=crop&q=80',
    avgPrice: '$750K',
    properties: 18
  },
  {
    id: 'westchester',
    name: 'Westchester',
    description: 'Prestigious suburbs with excellent schools and easy NYC commute.',
    image: 'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&h=600&fit=crop&q=80',
    avgPrice: '$1.2M',
    properties: 32
  },
  {
    id: 'long-island',
    name: 'Long Island',
    description: 'Beautiful beaches, family communities, and diverse housing options.',
    image: 'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&h=600&fit=crop&q=80',
    avgPrice: '$850K',
    properties: 28
  }
]

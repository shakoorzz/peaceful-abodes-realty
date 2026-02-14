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
  featured?: boolean
  description?: string
  yearBuilt?: number
  lotSize?: string
  parking?: string
  amenities?: string[]
}

export const properties: Property[] = [
  {
    id: '1',
    title: 'Modern Luxury Penthouse',
    address: 'Manhattan, NY',
    price: 4500000,
    beds: 4,
    baths: 3.5,
    sqft: 3200,
    type: 'residential',
    image: 'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&h=600&fit=crop&q=80',
    featured: true,
    description: 'Stunning penthouse with panoramic city views, private terrace, and premium finishes throughout.',
    yearBuilt: 2022,
    lotSize: 'N/A',
    parking: '2 Reserved Spaces',
    amenities: ['Doorman', 'Gym', 'Rooftop Deck', 'Concierge', 'Private Elevator']
  },
  {
    id: '2',
    title: 'Catskills Lake House',
    address: 'Hudson Valley, NY',
    price: 1850000,
    beds: 5,
    baths: 4,
    sqft: 4500,
    type: 'residential',
    image: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&h=600&fit=crop&q=80',
    featured: true,
    description: 'Luxurious lakefront retreat with private dock, mountain views, and modern amenities.',
    yearBuilt: 2020,
    lotSize: '2.5 acres',
    parking: '3-Car Garage',
    amenities: ['Private Dock', 'Hot Tub', 'Fire Pit', 'Wine Cellar', 'Smart Home']
  },
  {
    id: '3',
    title: 'Brooklyn Brownstone',
    address: 'Park Slope, Brooklyn',
    price: 3200000,
    beds: 4,
    baths: 2.5,
    sqft: 2800,
    type: 'residential',
    image: 'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&h=600&fit=crop&q=80',
    description: 'Classic brownstone with original details, modern kitchen, and private garden.',
    yearBuilt: 1910,
    lotSize: '3,500 sqft',
    parking: 'Street Parking',
    amenities: ['Private Garden', 'Original Woodwork', 'High Ceilings', 'Finished Basement']
  },
  {
    id: '4',
    title: 'Prime Retail Space',
    address: 'SoHo, Manhattan',
    price: 8500000,
    beds: 0,
    baths: 2,
    sqft: 5000,
    type: 'commercial',
    image: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=800&h=600&fit=crop&q=80',
    featured: true,
    description: 'High-visibility retail space on a prime SoHo corner with excellent foot traffic.',
    yearBuilt: 1895,
    lotSize: 'N/A',
    parking: 'Street Parking',
    amenities: ['Corner Location', 'High Ceilings', 'Basement Storage', 'AC']
  },
  {
    id: '5',
    title: 'Upstate Colonial Estate',
    address: 'Rhinebeck, NY',
    price: 2750000,
    beds: 6,
    baths: 5,
    sqft: 6200,
    type: 'residential',
    image: 'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&h=600&fit=crop&q=80',
    description: 'Grand colonial estate on 10 acres with pool, guest house, and equestrian facilities.',
    yearBuilt: 1985,
    lotSize: '10 acres',
    parking: '4-Car Garage',
    amenities: ['Pool', 'Guest House', 'Horse Barn', 'Tennis Court', 'Pond']
  },
  {
    id: '6',
    title: 'Office Building',
    address: 'White Plains, NY',
    price: 12000000,
    beds: 0,
    baths: 8,
    sqft: 25000,
    type: 'commercial',
    image: 'https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop&q=80',
    description: 'Class A office building with excellent highway access and ample parking.',
    yearBuilt: 2005,
    lotSize: '2 acres',
    parking: '150 Spaces',
    amenities: ['Lobby', 'Conference Center', 'Gym', 'Cafeteria', 'Security']
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

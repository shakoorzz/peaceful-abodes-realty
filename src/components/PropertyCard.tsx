import { FC } from 'hono/jsx'

interface Property {
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
}

interface PropertyCardProps {
  property: Property
}

export const PropertyCard: FC<PropertyCardProps> = ({ property }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price)
  }

  return (
    <div class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 group">
      {/* Image */}
      <div class="relative overflow-hidden">
        <div class="aspect-[4/3] bg-gradient-to-br from-twilight-blue/20 to-mist-gray/20">
          <img 
            src={property.image}
            alt={property.title}
            class="w-full h-full object-cover"
          />
        </div>
        
        {/* Overlay on hover */}
        <div class="absolute inset-0 bg-twilight-blue/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
          <a href={`/properties/${property.id}`} class="bg-warm-amber text-white px-6 py-3 rounded font-medium hover:bg-warm-amber/80 transition-colors">
            View Details
          </a>
        </div>
        
        {/* Badge */}
        {property.featured && (
          <div class="absolute top-4 left-4 bg-gold-accent text-white px-3 py-1 rounded text-sm font-medium">
            Featured
          </div>
        )}
        
        {/* Type badge */}
        <div class={`absolute top-4 right-4 px-3 py-1 rounded text-sm font-medium ${
          property.type === 'residential' ? 'bg-forest-green text-white' : 'bg-twilight-blue text-white'
        }`}>
          {property.type === 'residential' ? 'Residential' : 'Commercial'}
        </div>
        
        {/* Favorite button */}
        <button class="absolute bottom-4 right-4 w-10 h-10 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-warm-amber hover:text-white transition-colors" aria-label="Save to favorites">
          <i class="far fa-heart"></i>
        </button>
      </div>
      
      {/* Content */}
      <div class="p-6">
        <p class="text-warm-amber font-bold text-2xl mb-2 font-mono">{formatPrice(property.price)}</p>
        <h3 class="font-serif text-xl text-charcoal font-semibold mb-2 line-clamp-1">{property.title}</h3>
        <p class="text-mist-gray text-sm mb-4 flex items-center gap-2">
          <i class="fas fa-map-marker-alt text-warm-amber"></i>
          {property.address}
        </p>
        
        {/* Stats */}
        <div class="flex items-center gap-4 pt-4 border-t border-gray-100">
          <div class="flex items-center gap-2 text-charcoal">
            <i class="fas fa-bed text-mist-gray"></i>
            <span class="font-medium">{property.beds}</span>
            <span class="text-mist-gray text-sm">Beds</span>
          </div>
          <div class="flex items-center gap-2 text-charcoal">
            <i class="fas fa-bath text-mist-gray"></i>
            <span class="font-medium">{property.baths}</span>
            <span class="text-mist-gray text-sm">Baths</span>
          </div>
          <div class="flex items-center gap-2 text-charcoal">
            <i class="fas fa-ruler-combined text-mist-gray"></i>
            <span class="font-medium">{property.sqft.toLocaleString()}</span>
            <span class="text-mist-gray text-sm">Sqft</span>
          </div>
        </div>
      </div>
    </div>
  )
}

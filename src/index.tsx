import { Hono } from 'hono'
import { renderer } from './renderer'
import { Navigation } from './components/Navigation'
import { Footer } from './components/Footer'
import { PropertyCard } from './components/PropertyCard'
import { properties, neighborhoods } from './data'

const app = new Hono()

app.use(renderer)

// Homepage
app.get('/', (c) => {
  const featuredProperties = properties.filter(p => p.featured).slice(0, 3)
  
  return c.render(
    <>
      <Navigation />
      
      {/* Hero Section */}
      <section class="relative min-h-screen flex items-center justify-center">
        {/* Hero Background Image */}
        <div class="absolute inset-0 bg-gradient-to-br from-twilight-blue via-twilight-blue/90 to-twilight-blue/80">
          <img 
            src="https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=1920&q=80" 
            alt="Luxury home at twilight" 
            class="w-full h-full object-cover opacity-40"
          />
          <div class="absolute inset-0 bg-gradient-to-b from-twilight-blue/70 via-twilight-blue/50 to-twilight-blue/80"></div>
        </div>
        
        <div class="relative z-10 text-center px-4 max-w-4xl mx-auto pt-28 pb-24">
          {/* Logo - with proper top margin to avoid nav overlap */}
          <div class="w-32 h-32 mx-auto mb-8 bg-warm-amber rounded-full flex items-center justify-center border-4 border-white/30 shadow-2xl animate-fade-in">
            <i class="fas fa-home text-white text-5xl"></i>
          </div>
          
          <h1 class="font-serif text-5xl md:text-6xl lg:text-7xl text-white font-bold mb-6 animate-fade-in-delay-1 opacity-0">
            Peaceful Abodes Realty
          </h1>
          
          <p class="text-xl md:text-2xl text-white/90 mb-4 animate-fade-in-delay-2 opacity-0 italic">
            "Helping you find your Peaceful Abode..."
          </p>
          <p class="text-lg text-white/70 mb-8 animate-fade-in-delay-2 opacity-0">
            Here and around the world
          </p>
          
          {/* Stats badges */}
          <div class="flex flex-wrap justify-center gap-4 mb-12 animate-fade-in-delay-3 opacity-0">
            <div class="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <span class="text-warm-amber font-bold">Investment</span>
              <span class="text-white ml-2">Property Specialist</span>
            </div>
            <div class="bg-white/10 backdrop-blur-sm px-6 py-3 rounded-full border border-white/20">
              <span class="text-warm-amber font-bold">Peace of Mind</span>
              <span class="text-white ml-2">Property Investing</span>
            </div>
          </div>
          
          {/* CTA Buttons */}
          <div class="flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-3 opacity-0 mb-16">
            <a href="/properties" class="bg-warm-amber hover:bg-warm-amber/80 text-white px-8 py-4 rounded font-semibold text-lg transition-all duration-300 shadow-lg hover:shadow-xl">
              Browse Properties
            </a>
            <a href="/contact" class="border-2 border-white text-white hover:bg-white hover:text-twilight-blue px-8 py-4 rounded font-semibold text-lg transition-all duration-300 flex items-center justify-center gap-2">
              <i class="fas fa-chevron-down text-sm"></i>
              Schedule Consultation
            </a>
          </div>
        </div>
        
        {/* Scroll indicator - positioned with more space from buttons */}
        <div class="absolute bottom-4 left-1/2 -translate-x-1/2 animate-bounce hidden sm:block">
          <i class="fas fa-chevron-down text-white/30 text-xl"></i>
        </div>
      </section>
      
      {/* Featured Properties */}
      <section class="py-20 px-4 bg-soft-cream">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="font-serif text-4xl text-charcoal font-bold mb-4">Featured Properties</h2>
            <p class="text-mist-gray text-lg max-w-2xl mx-auto">
              Discover exceptional properties across New York State, from Manhattan luxury to Catskills retreats.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {featuredProperties.map(property => (
              <PropertyCard property={property} />
            ))}
          </div>
          
          <div class="text-center mt-12">
            <a href="/properties" class="inline-flex items-center gap-2 bg-twilight-blue hover:bg-twilight-blue/80 text-white px-8 py-4 rounded font-semibold transition-colors">
              View All Properties <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>
      
      {/* Services Section */}
      <section class="py-20 px-4 bg-white">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="font-serif text-4xl text-charcoal font-bold mb-4">Our Services</h2>
            <p class="text-mist-gray text-lg max-w-2xl mx-auto">
              Comprehensive real estate services tailored to your investment goals.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div class="bg-soft-cream rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div class="w-16 h-16 mx-auto mb-6 bg-warm-amber/10 rounded-full flex items-center justify-center">
                <i class="fas fa-chart-line text-warm-amber text-2xl"></i>
              </div>
              <h3 class="font-serif text-xl text-charcoal font-bold mb-3">Investment Property Acquisition</h3>
              <p class="text-mist-gray">
                Expert guidance in identifying and acquiring profitable investment properties that align with your financial goals.
              </p>
            </div>
            
            <div class="bg-soft-cream rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div class="w-16 h-16 mx-auto mb-6 bg-warm-amber/10 rounded-full flex items-center justify-center">
                <i class="fas fa-tasks text-warm-amber text-2xl"></i>
              </div>
              <h3 class="font-serif text-xl text-charcoal font-bold mb-3">Property Management</h3>
              <p class="text-mist-gray">
                Comprehensive property management services to maximize your investment returns while minimizing your stress.
              </p>
            </div>
            
            <div class="bg-soft-cream rounded-xl p-8 text-center hover:shadow-lg transition-shadow">
              <div class="w-16 h-16 mx-auto mb-6 bg-warm-amber/10 rounded-full flex items-center justify-center">
                <i class="fas fa-hand-holding-usd text-warm-amber text-2xl"></i>
              </div>
              <h3 class="font-serif text-xl text-charcoal font-bold mb-3">Financial Guidance</h3>
              <p class="text-mist-gray">
                Strategic financial advice to help you make informed real estate investment decisions.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* Neighborhoods */}
      <section class="py-20 px-4 bg-soft-cream">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="font-serif text-4xl text-charcoal font-bold mb-4">Explore Neighborhoods</h2>
            <p class="text-mist-gray text-lg max-w-2xl mx-auto">
              From bustling city streets to serene countryside, find your perfect location.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {neighborhoods.slice(0, 6).map(neighborhood => (
              <a href={`/neighborhoods/${neighborhood.id}`} class="group relative rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div class="aspect-[4/3]">
                  <img 
                    src={neighborhood.image} 
                    alt={neighborhood.name}
                    class="w-full h-full object-cover"
                  />
                </div>
                <div class="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent"></div>
                <div class="absolute bottom-0 left-0 right-0 p-6">
                  <h3 class="font-serif text-2xl text-white font-bold mb-2">{neighborhood.name}</h3>
                  <p class="text-white/80 text-sm mb-3">{neighborhood.description}</p>
                  <div class="flex items-center gap-4 text-sm">
                    <span class="text-warm-amber font-semibold">Avg. {neighborhood.avgPrice}</span>
                    <span class="text-white/70">{neighborhood.properties} Properties</span>
                  </div>
                </div>
              </a>
            ))}
          </div>
          
          <div class="text-center mt-12">
            <a href="/neighborhoods" class="inline-flex items-center gap-2 text-twilight-blue hover:text-warm-amber font-semibold transition-colors">
              View All Neighborhoods <i class="fas fa-arrow-right"></i>
            </a>
          </div>
        </div>
      </section>
      
      {/* Why Choose Us */}
      <section class="py-20 px-4 bg-twilight-blue text-white">
        <div class="max-w-7xl mx-auto">
          <div class="text-center mb-12">
            <h2 class="font-serif text-4xl font-bold mb-4">Why Choose Peaceful Abodes</h2>
            <p class="text-white/70 text-lg max-w-2xl mx-auto">
              Experience the difference of working with a dedicated professional who puts your goals first.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-warm-amber rounded-full flex items-center justify-center">
                <i class="fas fa-handshake text-white text-2xl"></i>
              </div>
              <h3 class="font-semibold text-lg mb-2">Personal Attention</h3>
              <p class="text-white/70 text-sm">Direct access to your agent throughout the entire process.</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-warm-amber rounded-full flex items-center justify-center">
                <i class="fas fa-shield-alt text-white text-2xl"></i>
              </div>
              <h3 class="font-semibold text-lg mb-2">Honest Guidance</h3>
              <p class="text-white/70 text-sm">Transparent advice focused on your best interests.</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-warm-amber rounded-full flex items-center justify-center">
                <i class="fas fa-chart-pie text-white text-2xl"></i>
              </div>
              <h3 class="font-semibold text-lg mb-2">Investment Focus</h3>
              <p class="text-white/70 text-sm">Specialized knowledge in investment properties.</p>
            </div>
            
            <div class="text-center">
              <div class="w-16 h-16 mx-auto mb-4 bg-warm-amber rounded-full flex items-center justify-center">
                <i class="fas fa-globe-americas text-white text-2xl"></i>
              </div>
              <h3 class="font-semibold text-lg mb-2">Global Reach</h3>
              <p class="text-white/70 text-sm">Helping you find your peaceful abode anywhere.</p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section class="py-20 px-4 bg-white">
        <div class="max-w-4xl mx-auto text-center">
          <h2 class="font-serif text-4xl text-charcoal font-bold mb-6">Ready to Find Your Peaceful Abode?</h2>
          <p class="text-mist-gray text-lg mb-8">
            Let's start your real estate journey together. Contact Abubakr Abdul-Latif today for a personalized consultation.
          </p>
          <div class="flex flex-col sm:flex-row gap-4 justify-center">
            <a href="tel:5852108001" class="inline-flex items-center justify-center gap-2 bg-warm-amber hover:bg-warm-amber/80 text-white px-8 py-4 rounded font-semibold text-lg transition-colors">
              <i class="fas fa-phone"></i> 585.210.8001
            </a>
            <a href="mailto:peacefulabodes@gmail.com" class="inline-flex items-center justify-center gap-2 border-2 border-twilight-blue text-twilight-blue hover:bg-twilight-blue hover:text-white px-8 py-4 rounded font-semibold text-lg transition-colors">
              <i class="fas fa-envelope"></i> Email Us
            </a>
          </div>
        </div>
      </section>
      
      <Footer />
    </>,
    { title: 'Peaceful Abodes Realty | Helping You Find Your Peaceful Abode' }
  )
})

// Properties Page
app.get('/properties', (c) => {
  return c.render(
    <>
      <Navigation />
      
      <main class="pt-24 pb-16 bg-soft-cream min-h-screen">
        <div class="max-w-7xl mx-auto px-4">
          <div class="text-center mb-12">
            <h1 class="font-serif text-4xl md:text-5xl text-charcoal font-bold mb-4">Our Properties</h1>
            <p class="text-mist-gray text-lg max-w-2xl mx-auto">
              Discover exceptional properties across New York State
            </p>
          </div>
          
          {/* Filters */}
          <div class="flex flex-wrap justify-center gap-4 mb-12">
            <button data-filter="all" class="px-6 py-3 rounded-full font-medium bg-warm-amber text-white transition-colors">
              All Properties
            </button>
            <button data-filter="residential" class="px-6 py-3 rounded-full font-medium bg-white text-charcoal hover:bg-warm-amber hover:text-white transition-colors">
              Residential
            </button>
            <button data-filter="commercial" class="px-6 py-3 rounded-full font-medium bg-white text-charcoal hover:bg-warm-amber hover:text-white transition-colors">
              Commercial
            </button>
          </div>
          
          {/* Property Grid */}
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {properties.map(property => (
              <PropertyCard property={property} />
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </>,
    { title: 'Properties | Peaceful Abodes Realty' }
  )
})

// Property Detail Page
app.get('/properties/:id', (c) => {
  const id = c.req.param('id')
  const property = properties.find(p => p.id === id)
  
  if (!property) {
    return c.render(
      <>
        <Navigation />
        <main class="pt-24 pb-16 bg-soft-cream min-h-screen flex items-center justify-center">
          <div class="text-center">
            <h1 class="font-serif text-4xl text-charcoal font-bold mb-4">Property Not Found</h1>
            <a href="/properties" class="text-warm-amber hover:underline">Browse All Properties</a>
          </div>
        </main>
        <Footer />
      </>,
      { title: 'Property Not Found | Peaceful Abodes Realty' }
    )
  }
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0,
    }).format(price)
  }
  
  return c.render(
    <>
      <Navigation />
      
      <main class="pt-24 pb-16 bg-soft-cream">
        <div class="max-w-7xl mx-auto px-4">
          {/* Breadcrumb */}
          <nav class="mb-6 text-sm">
            <a href="/" class="text-mist-gray hover:text-warm-amber">Home</a>
            <span class="mx-2 text-mist-gray">/</span>
            <a href="/properties" class="text-mist-gray hover:text-warm-amber">Properties</a>
            <span class="mx-2 text-mist-gray">/</span>
            <span class="text-charcoal">{property.title}</span>
          </nav>
          
          <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div class="lg:col-span-2">
              {/* Image Gallery */}
              <div class="bg-white rounded-xl overflow-hidden shadow-md mb-8">
                <div class="aspect-video bg-gradient-to-br from-twilight-blue/20 to-mist-gray/20 flex items-center justify-center">
                  <div class="text-center text-mist-gray">
                    <i class="fas fa-images text-6xl mb-4"></i>
                    <p>Property Gallery</p>
                  </div>
                </div>
              </div>
              
              {/* Property Info */}
              <div class="bg-white rounded-xl p-8 shadow-md mb-8">
                <div class="flex flex-wrap items-start justify-between gap-4 mb-6">
                  <div>
                    <h1 class="font-serif text-3xl text-charcoal font-bold mb-2">{property.title}</h1>
                    <p class="text-mist-gray flex items-center gap-2">
                      <i class="fas fa-map-marker-alt text-warm-amber"></i>
                      {property.address}
                    </p>
                  </div>
                  <p class="text-warm-amber font-bold text-3xl font-mono">{formatPrice(property.price)}</p>
                </div>
                
                {/* Stats */}
                <div class="grid grid-cols-2 md:grid-cols-4 gap-6 py-6 border-y border-gray-100 mb-6">
                  <div class="text-center">
                    <i class="fas fa-bed text-warm-amber text-2xl mb-2"></i>
                    <p class="font-bold text-xl text-charcoal">{property.beds}</p>
                    <p class="text-mist-gray text-sm">Bedrooms</p>
                  </div>
                  <div class="text-center">
                    <i class="fas fa-bath text-warm-amber text-2xl mb-2"></i>
                    <p class="font-bold text-xl text-charcoal">{property.baths}</p>
                    <p class="text-mist-gray text-sm">Bathrooms</p>
                  </div>
                  <div class="text-center">
                    <i class="fas fa-ruler-combined text-warm-amber text-2xl mb-2"></i>
                    <p class="font-bold text-xl text-charcoal">{property.sqft.toLocaleString()}</p>
                    <p class="text-mist-gray text-sm">Square Feet</p>
                  </div>
                  <div class="text-center">
                    <i class="fas fa-calendar text-warm-amber text-2xl mb-2"></i>
                    <p class="font-bold text-xl text-charcoal">{property.yearBuilt || 'N/A'}</p>
                    <p class="text-mist-gray text-sm">Year Built</p>
                  </div>
                </div>
                
                <h2 class="font-serif text-xl text-charcoal font-bold mb-4">Description</h2>
                <p class="text-mist-gray leading-relaxed mb-6">{property.description}</p>
                
                {property.amenities && (
                  <>
                    <h2 class="font-serif text-xl text-charcoal font-bold mb-4">Amenities</h2>
                    <div class="flex flex-wrap gap-3">
                      {property.amenities.map(amenity => (
                        <span class="bg-soft-cream text-charcoal px-4 py-2 rounded-full text-sm">
                          <i class="fas fa-check text-forest-green mr-2"></i>{amenity}
                        </span>
                      ))}
                    </div>
                  </>
                )}
              </div>
            </div>
            
            {/* Sidebar */}
            <div class="lg:col-span-1">
              {/* Agent Card */}
              <div class="bg-white rounded-xl p-6 shadow-md mb-6">
                <h3 class="font-serif text-lg text-charcoal font-bold mb-4">Contact Agent</h3>
                <div class="flex items-center gap-4 mb-6">
                  <div class="w-16 h-16 bg-warm-amber rounded-full flex items-center justify-center">
                    <i class="fas fa-user text-white text-2xl"></i>
                  </div>
                  <div>
                    <p class="font-semibold text-charcoal">Abubakr Abdul-Latif</p>
                    <p class="text-mist-gray text-sm">Owner/CEO, Licensed Salesperson</p>
                  </div>
                </div>
                <div class="space-y-3 mb-6">
                  <a href="tel:5852108001" class="flex items-center gap-3 text-mist-gray hover:text-warm-amber transition-colors">
                    <i class="fas fa-phone text-warm-amber"></i>
                    585.210.8001
                  </a>
                  <a href="mailto:peacefulabodes@gmail.com" class="flex items-center gap-3 text-mist-gray hover:text-warm-amber transition-colors">
                    <i class="fas fa-envelope text-warm-amber"></i>
                    peacefulabodes@gmail.com
                  </a>
                </div>
                <a href="/contact" class="block w-full bg-warm-amber hover:bg-warm-amber/80 text-white py-3 rounded font-semibold text-center transition-colors">
                  Schedule Viewing
                </a>
              </div>
              
              {/* Quick Actions */}
              <div class="bg-white rounded-xl p-6 shadow-md">
                <h3 class="font-serif text-lg text-charcoal font-bold mb-4">Quick Actions</h3>
                <div class="space-y-3">
                  <button class="w-full flex items-center gap-3 text-charcoal hover:text-warm-amber transition-colors py-2">
                    <i class="fas fa-heart text-warm-amber"></i>
                    Save to Favorites
                  </button>
                  <button class="w-full flex items-center gap-3 text-charcoal hover:text-warm-amber transition-colors py-2">
                    <i class="fas fa-share-alt text-warm-amber"></i>
                    Share Property
                  </button>
                  <button class="w-full flex items-center gap-3 text-charcoal hover:text-warm-amber transition-colors py-2">
                    <i class="fas fa-print text-warm-amber"></i>
                    Print Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>,
    { title: `${property.title} | Peaceful Abodes Realty` }
  )
})

// Neighborhoods Page
app.get('/neighborhoods', (c) => {
  return c.render(
    <>
      <Navigation />
      
      <main class="pt-24 pb-16 bg-soft-cream min-h-screen">
        <div class="max-w-7xl mx-auto px-4">
          <div class="text-center mb-12">
            <h1 class="font-serif text-4xl md:text-5xl text-charcoal font-bold mb-4">Explore Neighborhoods</h1>
            <p class="text-mist-gray text-lg max-w-2xl mx-auto">
              From the energy of Manhattan to the serenity of the Catskills, discover your ideal location.
            </p>
          </div>
          
          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {neighborhoods.map(neighborhood => (
              <div class="bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-shadow">
                <div class="aspect-video bg-gradient-to-br from-twilight-blue/60 to-twilight-blue/40 flex items-center justify-center relative">
                  <i class="fas fa-map-marker-alt text-white/30 text-5xl"></i>
                  <div class="absolute bottom-4 left-4">
                    <span class="bg-warm-amber text-white px-3 py-1 rounded text-sm font-medium">
                      {neighborhood.properties} Properties
                    </span>
                  </div>
                </div>
                <div class="p-6">
                  <h3 class="font-serif text-2xl text-charcoal font-bold mb-2">{neighborhood.name}</h3>
                  <p class="text-mist-gray text-sm mb-4">{neighborhood.description}</p>
                  <div class="flex items-center justify-between">
                    <span class="text-warm-amber font-semibold">Avg. {neighborhood.avgPrice}</span>
                    <a href={`/neighborhoods/${neighborhood.id}`} class="text-twilight-blue hover:text-warm-amber font-medium transition-colors">
                      Explore <i class="fas fa-arrow-right ml-1"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </main>
      
      <Footer />
    </>,
    { title: 'Neighborhoods | Peaceful Abodes Realty' }
  )
})

// Contact Page
app.get('/contact', (c) => {
  return c.render(
    <>
      <Navigation />
      
      <main class="pt-24 pb-16 bg-soft-cream min-h-screen">
        <div class="max-w-7xl mx-auto px-4">
          <div class="text-center mb-12">
            <h1 class="font-serif text-4xl md:text-5xl text-charcoal font-bold mb-4">Get in Touch</h1>
            <p class="text-mist-gray text-lg max-w-2xl mx-auto">
              Ready to find your peaceful abode? Let's start the conversation.
            </p>
          </div>
          
          <div class="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div class="bg-white rounded-xl shadow-md p-8">
              <h2 class="font-serif text-2xl text-charcoal font-bold mb-6">Send Us a Message</h2>
              <form class="space-y-6">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label class="block text-charcoal font-medium mb-2">First Name *</label>
                    <input type="text" required class="w-full px-4 py-3 border border-mist-gray/30 rounded focus:outline-none focus:border-warm-amber transition-colors" />
                  </div>
                  <div>
                    <label class="block text-charcoal font-medium mb-2">Last Name *</label>
                    <input type="text" required class="w-full px-4 py-3 border border-mist-gray/30 rounded focus:outline-none focus:border-warm-amber transition-colors" />
                  </div>
                </div>
                <div>
                  <label class="block text-charcoal font-medium mb-2">Email *</label>
                  <input type="email" required class="w-full px-4 py-3 border border-mist-gray/30 rounded focus:outline-none focus:border-warm-amber transition-colors" />
                </div>
                <div>
                  <label class="block text-charcoal font-medium mb-2">Phone</label>
                  <input type="tel" class="w-full px-4 py-3 border border-mist-gray/30 rounded focus:outline-none focus:border-warm-amber transition-colors" />
                </div>
                <div>
                  <label class="block text-charcoal font-medium mb-2">I'm Interested In</label>
                  <select class="w-full px-4 py-3 border border-mist-gray/30 rounded focus:outline-none focus:border-warm-amber transition-colors bg-white">
                    <option>Buying a Property</option>
                    <option>Selling a Property</option>
                    <option>Investment Property Acquisition</option>
                    <option>Property Management</option>
                    <option>Financial Guidance</option>
                    <option>Other</option>
                  </select>
                </div>
                <div>
                  <label class="block text-charcoal font-medium mb-2">Message *</label>
                  <textarea rows={4} required class="w-full px-4 py-3 border border-mist-gray/30 rounded focus:outline-none focus:border-warm-amber transition-colors resize-none"></textarea>
                </div>
                <button type="submit" class="w-full bg-warm-amber hover:bg-warm-amber/80 text-white py-4 rounded font-semibold text-lg transition-colors">
                  Send Message
                </button>
              </form>
            </div>
            
            {/* Contact Info */}
            <div>
              <div class="bg-twilight-blue text-white rounded-xl p-8 mb-8">
                <h2 class="font-serif text-2xl font-bold mb-6">Contact Information</h2>
                <div class="space-y-6">
                  <div class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-warm-amber rounded-full flex items-center justify-center flex-shrink-0">
                      <i class="fas fa-user text-lg"></i>
                    </div>
                    <div>
                      <h3 class="font-semibold mb-1">Abubakr Abdul-Latif</h3>
                      <p class="text-white/70">Owner/CEO, Licensed Real Estate Salesperson</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-warm-amber rounded-full flex items-center justify-center flex-shrink-0">
                      <i class="fas fa-phone text-lg"></i>
                    </div>
                    <div>
                      <h3 class="font-semibold mb-1">Phone</h3>
                      <p class="text-white/70">585.210.8001</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-warm-amber rounded-full flex items-center justify-center flex-shrink-0">
                      <i class="fas fa-envelope text-lg"></i>
                    </div>
                    <div>
                      <h3 class="font-semibold mb-1">Email</h3>
                      <p class="text-white/70">peacefulabodes@gmail.com</p>
                    </div>
                  </div>
                  <div class="flex items-start gap-4">
                    <div class="w-12 h-12 bg-warm-amber rounded-full flex items-center justify-center flex-shrink-0">
                      <i class="fas fa-globe text-lg"></i>
                    </div>
                    <div>
                      <h3 class="font-semibold mb-1">Website</h3>
                      <p class="text-white/70">www.PeacefulAbodes.com</p>
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Tagline Card */}
              <div class="bg-warm-amber/10 border-2 border-warm-amber/30 rounded-xl p-6 text-center">
                <i class="fas fa-home text-warm-amber text-3xl mb-4"></i>
                <p class="font-serif text-xl text-charcoal italic">
                  "Helping you find your Peaceful Abode... Here and around the world"
                </p>
              </div>
            </div>
          </div>
        </div>
      </main>
      
      <Footer />
    </>,
    { title: 'Contact | Peaceful Abodes Realty' }
  )
})

// About Page
app.get('/about', (c) => {
  return c.render(
    <>
      <Navigation />
      
      <main class="pt-24 pb-16 bg-soft-cream">
        {/* Hero */}
        <section class="bg-twilight-blue text-white py-20 px-4">
          <div class="max-w-4xl mx-auto text-center">
            <h1 class="font-serif text-4xl md:text-5xl font-bold mb-6">About Peaceful Abodes Realty</h1>
            <p class="text-xl text-white/80 leading-relaxed italic">
              "Helping you find your Peaceful Abode... Here and around the world"
            </p>
          </div>
        </section>
        
        {/* Owner Bio Section */}
        <section class="py-16 px-4 bg-white">
          <div class="max-w-7xl mx-auto">
            <div class="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              {/* Photo */}
              <div class="order-2 lg:order-1">
                <div class="relative">
                  <div class="rounded-2xl overflow-hidden shadow-2xl">
                    <div class="aspect-[4/5] bg-gradient-to-br from-twilight-blue to-twilight-blue/80 flex items-center justify-center">
                      <div class="text-center">
                        <div class="w-48 h-48 mx-auto bg-warm-amber rounded-full flex items-center justify-center mb-6 shadow-lg">
                          <i class="fas fa-user text-white text-7xl"></i>
                        </div>
                        <p class="text-white/60 text-sm">Professional Photo Coming Soon</p>
                      </div>
                    </div>
                  </div>
                  {/* Decorative elements */}
                  <div class="absolute -bottom-4 -right-4 w-24 h-24 bg-warm-amber/20 rounded-full -z-10"></div>
                  <div class="absolute -top-4 -left-4 w-16 h-16 bg-warm-amber/30 rounded-full -z-10"></div>
                </div>
              </div>
              
              {/* Bio Content */}
              <div class="order-1 lg:order-2">
                <div class="inline-block bg-warm-amber/10 text-warm-amber px-4 py-2 rounded-full text-sm font-medium mb-4">
                  <i class="fas fa-star mr-2"></i>Owner/CEO & Licensed Real Estate Salesperson
                </div>
                <h2 class="font-serif text-4xl md:text-5xl text-charcoal font-bold mb-4">
                  Abubakr Abdul-Latif
                </h2>
                <p class="text-xl text-mist-gray mb-6">
                  Your Partner in Real Estate Investment
                </p>
                
                <div class="space-y-4 text-charcoal leading-relaxed">
                  <p>
                    As the founder and owner of Peaceful Abodes Realty, Abubakr Abdul-Latif brings a unique combination of 
                    investment expertise, personal dedication, and unwavering commitment to every client relationship. 
                    His journey in real estate began with a simple belief: that everyone deserves 
                    personalized, honest guidance when making important property decisions.
                  </p>
                  <p>
                    Specializing in investment property acquisition and property management, Abubakr's approach 
                    is built on trust, transparency, and a deep understanding of what it takes to build wealth 
                    through real estate. Whether you're a first-time investor or an experienced property owner, 
                    he provides the same level of dedicated service and financial guidance.
                  </p>
                  <p>
                    As an independent agent, Abubakr takes pride in offering flexible, client-focused service 
                    that prioritizes your investment goals. His mission is to help you find not just a property, 
                    but your own peaceful abode – wherever that may be.
                  </p>
                </div>
                
                {/* Contact Quick Links */}
                <div class="mt-8 flex flex-wrap gap-4">
                  <a href="/contact" class="inline-flex items-center gap-2 bg-warm-amber hover:bg-warm-amber/80 text-white px-6 py-3 rounded-lg font-medium transition-colors shadow-md">
                    <i class="fas fa-calendar-alt"></i>
                    Schedule a Meeting
                  </a>
                  <a href="tel:5852108001" class="inline-flex items-center gap-2 border-2 border-twilight-blue text-twilight-blue hover:bg-twilight-blue hover:text-white px-6 py-3 rounded-lg font-medium transition-colors">
                    <i class="fas fa-phone"></i>
                    Call Direct
                  </a>
                </div>
                
                {/* Credentials */}
                <div class="mt-8 pt-8 border-t border-gray-200">
                  <h3 class="font-semibold text-charcoal mb-4">Services & Expertise</h3>
                  <div class="grid grid-cols-2 gap-4">
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-forest-green/10 rounded-full flex items-center justify-center">
                        <i class="fas fa-check text-forest-green"></i>
                      </div>
                      <span class="text-sm text-charcoal">Investment Property Acquisition</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-forest-green/10 rounded-full flex items-center justify-center">
                        <i class="fas fa-check text-forest-green"></i>
                      </div>
                      <span class="text-sm text-charcoal">Property Management</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-forest-green/10 rounded-full flex items-center justify-center">
                        <i class="fas fa-check text-forest-green"></i>
                      </div>
                      <span class="text-sm text-charcoal">Financial Guidance</span>
                    </div>
                    <div class="flex items-center gap-3">
                      <div class="w-10 h-10 bg-forest-green/10 rounded-full flex items-center justify-center">
                        <i class="fas fa-check text-forest-green"></i>
                      </div>
                      <span class="text-sm text-charcoal">Licensed NY Salesperson</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        {/* Philosophy Section */}
        <section class="py-16 px-4">
          <div class="max-w-7xl mx-auto">
            <div class="text-center mb-12">
              <h2 class="font-serif text-3xl text-charcoal font-bold mb-4">My Commitment to You</h2>
              <p class="text-mist-gray text-lg max-w-2xl mx-auto">
                As an independent agent, I offer a personalized experience that puts your investment goals first.
              </p>
            </div>
            
            <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div class="bg-white rounded-xl p-8 shadow-md text-center">
                <div class="w-16 h-16 mx-auto mb-6 bg-warm-amber/10 rounded-full flex items-center justify-center">
                  <i class="fas fa-handshake text-warm-amber text-2xl"></i>
                </div>
                <h3 class="font-serif text-xl text-charcoal font-bold mb-3">Personal Attention</h3>
                <p class="text-mist-gray">
                  You work directly with me throughout your entire journey. No hand-offs, no assistants handling your important decisions.
                </p>
              </div>
              
              <div class="bg-white rounded-xl p-8 shadow-md text-center">
                <div class="w-16 h-16 mx-auto mb-6 bg-warm-amber/10 rounded-full flex items-center justify-center">
                  <i class="fas fa-shield-alt text-warm-amber text-2xl"></i>
                </div>
                <h3 class="font-serif text-xl text-charcoal font-bold mb-3">Honest Guidance</h3>
                <p class="text-mist-gray">
                  I'll always give you my honest opinion, even if it means advising against a purchase. Your best interest is my priority.
                </p>
              </div>
              
              <div class="bg-white rounded-xl p-8 shadow-md text-center">
                <div class="w-16 h-16 mx-auto mb-6 bg-warm-amber/10 rounded-full flex items-center justify-center">
                  <i class="fas fa-chart-line text-warm-amber text-2xl"></i>
                </div>
                <h3 class="font-serif text-xl text-charcoal font-bold mb-3">Investment Focus</h3>
                <p class="text-mist-gray">
                  Specializing in investment properties, I help you build wealth through smart real estate decisions.
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>
      
      <Footer />
    </>,
    { title: 'About | Peaceful Abodes Realty' }
  )
})

// Client Portal Page
app.get('/portal', (c) => {
  return c.render(
    <>
      <Navigation />
      
      <main class="pt-24 pb-16 bg-soft-cream min-h-screen flex items-center justify-center">
        <div class="max-w-md mx-auto px-4 w-full">
          <div class="bg-white rounded-xl shadow-md p-8">
            <div class="text-center mb-8">
              <div class="w-16 h-16 mx-auto mb-4 bg-warm-amber rounded-full flex items-center justify-center">
                <i class="fas fa-user-circle text-white text-3xl"></i>
              </div>
              <h1 class="font-serif text-2xl text-charcoal font-bold">Client Portal</h1>
              <p class="text-mist-gray mt-2">Sign in to access your account</p>
            </div>
            
            <form class="space-y-6">
              <div>
                <label class="block text-charcoal font-medium mb-2">Email</label>
                <input type="email" class="w-full px-4 py-3 border border-mist-gray/30 rounded focus:outline-none focus:border-warm-amber transition-colors" placeholder="you@example.com" />
              </div>
              <div>
                <label class="block text-charcoal font-medium mb-2">Password</label>
                <input type="password" class="w-full px-4 py-3 border border-mist-gray/30 rounded focus:outline-none focus:border-warm-amber transition-colors" placeholder="••••••••" />
              </div>
              <div class="flex items-center justify-between text-sm">
                <label class="flex items-center gap-2 text-charcoal">
                  <input type="checkbox" class="rounded text-warm-amber focus:ring-warm-amber" />
                  Remember me
                </label>
                <a href="#" class="text-warm-amber hover:underline">Forgot password?</a>
              </div>
              <button type="submit" class="w-full bg-warm-amber hover:bg-warm-amber/80 text-white py-3 rounded font-semibold transition-colors">
                Sign In
              </button>
            </form>
            
            <p class="text-center text-mist-gray text-sm mt-6">
              Don't have an account? <a href="/contact" class="text-warm-amber hover:underline">Contact us</a>
            </p>
          </div>
        </div>
      </main>
      
      <Footer />
    </>,
    { title: 'Client Portal | Peaceful Abodes Realty' }
  )
})

export default app

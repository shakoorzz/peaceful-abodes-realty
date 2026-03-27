import { FC } from 'hono/jsx'

export const Navigation: FC = () => {
  return (
    <>
      {/* Main Navigation Bar */}
      <nav class="fixed top-0 left-0 right-0 z-40 bg-twilight-blue/95 backdrop-blur-sm shadow-lg">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div class="flex items-center justify-between h-20">
            {/* Logo */}
            <a href="/" class="flex items-center space-x-3">
              <div class="w-10 h-10 bg-warm-amber rounded-full flex items-center justify-center">
                <i class="fas fa-home text-white text-lg"></i>
              </div>
              <span class="font-serif text-xl text-white font-semibold tracking-wide">Peaceful Abodes</span>
            </a>
            
            {/* Desktop Navigation */}
            <div class="hidden md:flex items-center gap-6">
              <a href="/properties" class="text-white hover:text-warm-amber transition-colors duration-300 font-medium">Properties</a>
              <a href="/neighborhoods" class="text-white hover:text-warm-amber transition-colors duration-300 font-medium">Neighborhoods</a>
              <a href="/about" class="text-white hover:text-warm-amber transition-colors duration-300 font-medium">About</a>
              <a href="/contact" class="text-white hover:text-warm-amber transition-colors duration-300 font-medium">Contact</a>
              <a href="/dashboard" data-dashboard-link class="text-white hover:text-warm-amber transition-colors duration-300 font-medium flex items-center gap-2">
                <i class="fas fa-lock text-xs"></i>
                Dashboard
              </a>
            </div>
            
            {/* CTA Buttons */}
            <div class="hidden md:flex items-center gap-4">
              <a href="/portal" class="text-white hover:text-warm-amber transition-colors flex items-center gap-2">
                <i class="fas fa-user-circle"></i>
                <span>Client Portal</span>
              </a>
              <a href="/agent" class="text-white hover:text-warm-amber transition-colors flex items-center gap-2">
                <i class="fas fa-briefcase"></i>
                <span>Agent Portal</span>
              </a>
              <a href="/contact" class="bg-warm-amber hover:bg-warm-amber/80 text-white px-6 py-3 rounded font-medium transition-all duration-300 shadow-md hover:shadow-lg">
                Schedule Consultation
              </a>
            </div>
            
            {/* Mobile Menu Button */}
            <button id="mobile-menu-btn" class="md:hidden text-white p-2 transition-transform duration-200 hover:scale-110" aria-label="Open menu">
              <i class="fas fa-bars text-2xl"></i>
            </button>
          </div>
        </div>
      </nav>
      
      {/* Mobile Menu Overlay */}
      <div id="mobile-menu" class="fixed inset-0 z-[100] md:hidden pointer-events-none">
        {/* Dark overlay background - fades in */}
        <div id="menu-backdrop" class="absolute inset-0 bg-black/50 opacity-0 transition-opacity duration-300 ease-out"></div>
        
        {/* Slide-in panel from right */}
        <div id="menu-panel" class="absolute top-0 right-0 bottom-0 w-full max-w-sm bg-twilight-blue transform translate-x-full transition-transform duration-300 ease-out shadow-2xl">
          {/* Menu content */}
          <div class="flex flex-col h-full p-6">
            {/* Header */}
            <div class="flex justify-between items-center mb-10">
              <span class="font-serif text-xl text-white font-semibold">Peaceful Abodes</span>
              <button id="close-menu-btn" class="text-white p-2 transition-transform duration-200 hover:scale-110 hover:rotate-90" aria-label="Close menu">
                <i class="fas fa-times text-2xl"></i>
              </button>
            </div>
            
            {/* Navigation Links - stagger animation */}
            <nav class="flex flex-col space-y-2 text-center">
              <a href="/" class="menu-item text-white text-xl font-medium py-3 rounded-lg hover:bg-white/10 hover:text-warm-amber transition-all duration-200 transform translate-x-8 opacity-0">
                <i class="fas fa-home mr-3 text-warm-amber"></i>Home
              </a>
              <a href="/properties" class="menu-item text-white text-xl font-medium py-3 rounded-lg hover:bg-white/10 hover:text-warm-amber transition-all duration-200 transform translate-x-8 opacity-0">
                <i class="fas fa-building mr-3 text-warm-amber"></i>Properties
              </a>
              <a href="/neighborhoods" class="menu-item text-white text-xl font-medium py-3 rounded-lg hover:bg-white/10 hover:text-warm-amber transition-all duration-200 transform translate-x-8 opacity-0">
                <i class="fas fa-map-marked-alt mr-3 text-warm-amber"></i>Neighborhoods
              </a>
              <a href="/about" class="menu-item text-white text-xl font-medium py-3 rounded-lg hover:bg-white/10 hover:text-warm-amber transition-all duration-200 transform translate-x-8 opacity-0">
                <i class="fas fa-info-circle mr-3 text-warm-amber"></i>About
              </a>
              <a href="/contact" class="menu-item text-white text-xl font-medium py-3 rounded-lg hover:bg-white/10 hover:text-warm-amber transition-all duration-200 transform translate-x-8 opacity-0">
                <i class="fas fa-envelope mr-3 text-warm-amber"></i>Contact
              </a>
              <a href="/dashboard" data-dashboard-link class="menu-item text-white text-xl font-medium py-3 rounded-lg hover:bg-white/10 hover:text-warm-amber transition-all duration-200 transform translate-x-8 opacity-0">
                <i class="fas fa-lock mr-3 text-warm-amber"></i>Dashboard
              </a>
            </nav>
            
            {/* Bottom CTA buttons */}
            <div class="mt-auto space-y-4">
              <a href="/portal" class="menu-item block text-center text-white border-2 border-white/50 py-4 rounded-lg font-medium hover:bg-white hover:text-twilight-blue transition-all duration-200 transform translate-y-4 opacity-0">
                <i class="fas fa-user-circle mr-2"></i>Client Portal
              </a>
              <a href="/agent" class="menu-item block text-center text-white border-2 border-white/50 py-4 rounded-lg font-medium hover:bg-white hover:text-twilight-blue transition-all duration-200 transform translate-y-4 opacity-0">
                <i class="fas fa-briefcase mr-2"></i>Agent Portal
              </a>
              <a href="/contact" class="menu-item block text-center bg-warm-amber text-white py-4 rounded-lg font-semibold hover:bg-warm-amber/80 transition-all duration-200 shadow-lg transform translate-y-4 opacity-0">
                Schedule Consultation
              </a>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

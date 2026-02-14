import { FC } from 'hono/jsx'

export const Footer: FC = () => {
  return (
    <footer class="bg-twilight-blue text-white">
      <div class="max-w-7xl mx-auto px-4 py-16">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Brand */}
          <div>
            <a href="/" class="flex items-center space-x-3 mb-6">
              <div class="w-10 h-10 bg-warm-amber rounded-full flex items-center justify-center">
                <i class="fas fa-home text-white text-lg"></i>
              </div>
              <span class="font-serif text-xl font-semibold">Peaceful Abodes</span>
            </a>
            <p class="text-white/70 mb-4 italic">
              "Helping you find your Peaceful Abode... Here and around the world"
            </p>
            <div class="flex space-x-4">
              <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-warm-amber transition-colors">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-warm-amber transition-colors">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center hover:bg-warm-amber transition-colors">
                <i class="fab fa-linkedin-in"></i>
              </a>
            </div>
          </div>
          
          {/* Quick Links */}
          <div>
            <h3 class="font-serif text-lg font-semibold mb-6">Quick Links</h3>
            <ul class="space-y-3">
              <li><a href="/properties" class="text-white/70 hover:text-warm-amber transition-colors">Properties</a></li>
              <li><a href="/neighborhoods" class="text-white/70 hover:text-warm-amber transition-colors">Neighborhoods</a></li>
              <li><a href="/about" class="text-white/70 hover:text-warm-amber transition-colors">About Us</a></li>
              <li><a href="/contact" class="text-white/70 hover:text-warm-amber transition-colors">Contact</a></li>
              <li><a href="/portal" class="text-white/70 hover:text-warm-amber transition-colors">Client Portal</a></li>
            </ul>
          </div>
          
          {/* Services */}
          <div>
            <h3 class="font-serif text-lg font-semibold mb-6">Services</h3>
            <ul class="space-y-3">
              <li><a href="#" class="text-white/70 hover:text-warm-amber transition-colors">Investment Property Acquisition</a></li>
              <li><a href="#" class="text-white/70 hover:text-warm-amber transition-colors">Property Management</a></li>
              <li><a href="#" class="text-white/70 hover:text-warm-amber transition-colors">Financial Guidance</a></li>
              <li><a href="#" class="text-white/70 hover:text-warm-amber transition-colors">Home Buying</a></li>
              <li><a href="#" class="text-white/70 hover:text-warm-amber transition-colors">Home Selling</a></li>
            </ul>
          </div>
          
          {/* Contact */}
          <div>
            <h3 class="font-serif text-lg font-semibold mb-6">Contact Us</h3>
            <ul class="space-y-4">
              <li class="flex items-start gap-3">
                <i class="fas fa-phone text-warm-amber mt-1"></i>
                <span class="text-white/70">585.210.8001</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-envelope text-warm-amber mt-1"></i>
                <span class="text-white/70">peacefulabodes@gmail.com</span>
              </li>
              <li class="flex items-start gap-3">
                <i class="fas fa-globe text-warm-amber mt-1"></i>
                <span class="text-white/70">www.PeacefulAbodes.com</span>
              </li>
            </ul>
          </div>
        </div>
        
        {/* Bottom bar */}
        <div class="border-t border-white/10 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p class="text-white/50 text-sm mb-4 md:mb-0">
            © {new Date().getFullYear()} Peaceful Abodes Realty. All rights reserved.
          </p>
          <div class="flex space-x-6 text-sm">
            <a href="#" class="text-white/50 hover:text-warm-amber transition-colors">Privacy Policy</a>
            <a href="#" class="text-white/50 hover:text-warm-amber transition-colors">Terms of Service</a>
            <a href="#" class="text-white/50 hover:text-warm-amber transition-colors">Fair Housing</a>
          </div>
        </div>
      </div>
    </footer>
  )
}

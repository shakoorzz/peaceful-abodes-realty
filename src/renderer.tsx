import { jsxRenderer } from 'hono/jsx-renderer'

export const renderer = jsxRenderer(({ children, title }) => {
  return (
    <html lang="en">
      <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>{title || 'Peaceful Abodes Realty | Your Trusted Real Estate Partner'}</title>
        <meta name="description" content="Helping you find your Peaceful Abode... Here and around the world. Professional real estate services with Abubakr Abdul-Latif." />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;500;600;700&family=Inter:wght@300;400;500;600;700&display=swap" rel="stylesheet" />
        <script src="https://cdn.tailwindcss.com"></script>
        <script dangerouslySetInnerHTML={{__html: `
          tailwind.config = {
            theme: {
              extend: {
                colors: {
                  'twilight-blue': '#1a2332',
                  'warm-amber': '#d4a574',
                  'soft-cream': '#f8f6f2',
                  'charcoal': '#2d2d2d',
                  'mist-gray': '#8a9ba8',
                  'gold-accent': '#c9a962',
                  'forest-green': '#3d5a45',
                  'sunset-orange': '#d97942',
                },
                fontFamily: {
                  'serif': ['Playfair Display', 'Georgia', 'serif'],
                  'sans': ['Inter', 'Helvetica Neue', 'Arial', 'sans-serif'],
                },
                animation: {
                  'fade-in': 'fadeIn 0.8s ease forwards',
                  'fade-in-delay-1': 'fadeIn 0.8s ease 0.2s forwards',
                  'fade-in-delay-2': 'fadeIn 0.8s ease 0.4s forwards',
                  'fade-in-delay-3': 'fadeIn 0.8s ease 0.6s forwards',
                },
              },
            },
          }
        `}} />
        <link href="https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@6.4.0/css/all.min.css" rel="stylesheet" />
        <link href="/static/style.css" rel="stylesheet" />
        <link rel="manifest" href="/static/manifest.json" />
        <meta name="theme-color" content="#1a2332" />
      </head>
      <body class="font-sans text-charcoal bg-soft-cream">
        {children}
        <script src="/static/app.js"></script>
      </body>
    </html>
  )
})

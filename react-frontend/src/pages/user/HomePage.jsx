import { useEffect, useRef } from 'react';

const HomePage = ({ onNavigate }) => {
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (heroRef.current) {
        const scrolled = window.scrollY;
        heroRef.current.style.transform = `translateY(${scrolled * 0.3}px)`;
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="bg-cream-100">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <div 
          ref={heroRef}
          className="absolute inset-0 w-full h-[120%]"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1920)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        >
          <div className="absolute inset-0 bg-charcoal-900/50" />
        </div>

        <div className="relative z-10 h-full flex flex-col items-center justify-center text-center px-6">
          <div className="max-w-4xl mx-auto">
            <p className="text-cream-200 text-sm tracking-[0.3em] uppercase font-sans mb-6 opacity-0 animate-fade-in-up" style={{ animationDelay: '200ms', animationFillMode: 'forwards' }}>
              Since 1985 · Beverly Hills
            </p>
            
            <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-cream-50 mb-6 leading-tight opacity-0 animate-fade-in-up" style={{ animationDelay: '400ms', animationFillMode: 'forwards' }}>
              Prestige
              <br />
              <span className="italic font-light">Automotive Gallery</span>
            </h1>

            <div className="w-16 h-px bg-gold-400 mx-auto mb-6 opacity-0 animate-fade-in" style={{ animationDelay: '600ms', animationFillMode: 'forwards' }} />

            <p className="text-cream-200 text-lg md:text-xl font-sans font-light max-w-2xl mx-auto mb-10 leading-relaxed opacity-0 animate-fade-in-up" style={{ animationDelay: '800ms', animationFillMode: 'forwards' }}>
              A curated collection of the world's most exceptional automobiles, 
              presented with the reverence they deserve.
            </p>

            <div className="opacity-0 animate-fade-in-up" style={{ animationDelay: '1000ms', animationFillMode: 'forwards' }}>
              <button onClick={() => onNavigate('listing')} className="btn-museum-light">
                <span>Explore Collection</span>
              </button>
            </div>
          </div>

          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 opacity-0 animate-fade-in" style={{ animationDelay: '1200ms', animationFillMode: 'forwards' }}>
            <div className="flex flex-col items-center gap-2 text-cream-200">
              <span className="text-xs tracking-widest uppercase font-sans">Scroll</span>
              <div className="w-px h-12 bg-cream-200/50 relative overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-1/2 bg-cream-200 animate-float" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Introduction Section */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <p className="text-charcoal-500 text-sm tracking-[0.2em] uppercase font-sans mb-6">Our Philosophy</p>
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal-800 mb-8 leading-tight">
            Where Engineering Meets Artistry
          </h2>
          <div className="w-16 h-px bg-gold-400 mx-auto mb-8" />
          <p className="text-charcoal-600 text-lg font-sans font-light leading-relaxed max-w-3xl mx-auto">
            Each automobile in our collection represents the pinnacle of design and performance. 
            We believe that exceptional vehicles deserve to be experienced, not merely observed. 
            Our gallery offers an intimate encounter with automotive masterpieces.
          </p>
        </div>
      </section>

      {/* Featured Car Section */}
      <section className="py-16 lg:py-24 bg-cream-50">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="relative group">
              <div className="aspect-[4/3] overflow-hidden">
                <img 
                  src="https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200"
                  alt="Lamborghini Aventador"
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
              </div>
              <div className="absolute -bottom-4 -right-4 w-full h-full border border-gold-400 -z-10" />
            </div>

            <div className="lg:pl-8">
              <p className="text-charcoal-500 text-sm tracking-[0.2em] uppercase font-sans mb-4">Featured</p>
              <h3 className="font-serif text-3xl md:text-4xl text-charcoal-800 mb-6">Lamborghini Aventador</h3>
              <div className="w-12 h-px bg-gold-400 mb-6" />
              <p className="text-charcoal-600 font-sans font-light leading-relaxed mb-8">
                The Aventador represents the ultimate expression of Lamborghini's design philosophy. 
                With its naturally aspirated V12 engine producing 730 horsepower, it delivers 
                an experience that transcends mere transportation.
              </p>
              <div className="flex flex-wrap gap-8 mb-10">
                <div>
                  <p className="text-charcoal-400 text-xs tracking-widest uppercase font-sans mb-1">Power</p>
                  <p className="font-serif text-2xl text-charcoal-800">730 HP</p>
                </div>
                <div>
                  <p className="text-charcoal-400 text-xs tracking-widest uppercase font-sans mb-1">0-60 mph</p>
                  <p className="font-serif text-2xl text-charcoal-800">2.9s</p>
                </div>
                <div>
                  <p className="text-charcoal-400 text-xs tracking-widest uppercase font-sans mb-1">Top Speed</p>
                  <p className="font-serif text-2xl text-charcoal-800">217 mph</p>
                </div>
              </div>
              <button onClick={() => onNavigate('listing')} className="btn-museum">
                <span>View Details</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Categories Section */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <p className="text-charcoal-500 text-sm tracking-[0.2em] uppercase font-sans mb-4">Categories</p>
            <h2 className="font-serif text-3xl md:text-4xl text-charcoal-800">Explore by Collection</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: 'Supercars', image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=800', count: '6 Vehicles' },
              { title: 'Grand Tourers', image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=800', count: '4 Vehicles' },
              { title: 'Luxury Coupes', image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=800', count: '5 Vehicles' },
            ].map((category) => (
              <button
                key={category.title}
                onClick={() => onNavigate('listing')}
                className="group relative aspect-[3/4] overflow-hidden text-left"
              >
                <img 
                  src={category.image}
                  alt={category.title}
                  className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-charcoal-900/80 via-charcoal-900/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-8">
                  <p className="text-cream-300 text-xs tracking-widest uppercase font-sans mb-2">{category.count}</p>
                  <h3 className="font-serif text-2xl text-cream-50 group-hover:text-gold-400 transition-colors">{category.title}</h3>
                  <div className="w-0 group-hover:w-12 h-px bg-gold-400 mt-4 transition-all duration-500" />
                </div>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-24 lg:py-32 bg-charcoal-800">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <svg className="w-12 h-12 text-gold-400 mx-auto mb-8 opacity-50" fill="currentColor" viewBox="0 0 24 24">
            <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.638-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.638-3.996 5.849h3.983v10h-9.983z" />
          </svg>
          <blockquote className="font-serif text-2xl md:text-3xl lg:text-4xl text-cream-100 leading-relaxed mb-8 italic">
            "A car is not just a machine. It is a work of art, a testament to human ingenuity, 
            and a vessel for unforgettable experiences."
          </blockquote>
          <div className="w-16 h-px bg-gold-400 mx-auto mb-6" />
          <p className="text-cream-400 text-sm tracking-widest uppercase font-sans">Enzo Ferrari</p>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 lg:py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl lg:text-5xl text-charcoal-800 mb-6">Begin Your Journey</h2>
          <div className="w-16 h-px bg-gold-400 mx-auto mb-8" />
          <p className="text-charcoal-600 text-lg font-sans font-light leading-relaxed mb-10 max-w-2xl mx-auto">
            Schedule a private viewing or browse our complete collection online. 
            Our specialists are available to guide you through every step.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button onClick={() => onNavigate('listing')} className="btn-museum">
              <span>View Collection</span>
            </button>
            <button onClick={() => onNavigate('order')} className="btn-museum">
              <span>Schedule Viewing</span>
            </button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;

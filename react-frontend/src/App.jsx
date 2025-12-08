import { useState, useEffect, useMemo } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import HomePage from './pages/user/HomePage';
import ProductListing from './pages/user/ProductListing';
import OrderForm from './pages/user/OrderPage';
import searchItems from './utils/searchItems';
import './App.css';

// --- Museum Art Collection ---
const BASE_ITEMS = [
  { id: 1, name: 'The Veiled Christ', price: 0, image: 'https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=1200', description: 'Giuseppe Sanmartino, 1753', category: 'Sculpture' },
  { id: 2, name: 'Modesty', price: 0, image: 'https://images.unsplash.com/photo-1561214115-f2f134cc4912?w=1200', description: 'Antonio Corradini, 1752', category: 'Sculpture' },
  { id: 3, name: 'Disillusion', price: 0, image: 'https://images.unsplash.com/photo-1544967082-d9d25d867d66?w=1200', description: 'Francesco Queirolo, 1753-54', category: 'Sculpture' },
  { id: 4, name: 'Glory of Paradise', price: 0, image: 'https://images.unsplash.com/photo-1582555172866-f73bb12a2ab3?w=1200', description: 'Francesco Maria Russo, 1749', category: 'Fresco' },
  { id: 5, name: 'Anatomical Machine (Male)', price: 0, image: 'https://images.unsplash.com/photo-1594736797933-d0501ba2fe65?w=1200', description: 'Giuseppe Salerno, c. 1763-64', category: 'Anatomical' },
  { id: 6, name: 'Anatomical Machine (Female)', price: 0, image: 'https://images.unsplash.com/photo-1578321272176-b7bbc0679853?w=1200', description: 'Giuseppe Salerno, c. 1763-64', category: 'Anatomical' },
  { id: 7, name: 'Divine Love', price: 0, image: 'https://images.unsplash.com/photo-1551913902-c92207136625?w=1200', description: 'Unknown Artist, 18th century', category: 'Sculpture' },
  { id: 8, name: 'Sincerity', price: 0, image: 'https://images.unsplash.com/photo-1549887534-1541e9326642?w=1200', description: 'Francesco Queirolo, 1754', category: 'Sculpture' },
  { id: 9, name: 'The Deposition', price: 0, image: 'https://images.unsplash.com/photo-1577720643272-265f09367456?w=1200', description: 'Francesco Celebrano, 1762', category: 'Sculpture' },
  { id: 10, name: 'Memorial to Cecco di Sangro', price: 0, image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200', description: 'Francesco Celebrano, 1766', category: 'Monument' },
];

const ALL_ITEMS = BASE_ITEMS;

const preloadImages = (urls) => urls.forEach((u) => { const img = new Image(); img.src = u; });

// --- Museum-style Navigation ---
const Navigation = ({ current, onNavigate, cartCount, onCartOpen, search, onSearchChange }) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { key: 'landing', label: 'Home' },
    { key: 'listing', label: 'Collection' },
    { key: 'order', label: 'Visit' },
  ];

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
      scrolled ? 'bg-cream-50/95 backdrop-blur-md shadow-sm' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="flex items-center justify-between h-20 lg:h-24">
          <button 
            onClick={() => onNavigate('landing')}
            className="font-serif text-xl lg:text-2xl tracking-wide text-charcoal-800 hover:text-charcoal-600 transition-colors"
          >
            <span className="font-light">Museo</span>
            <span className="font-semibold italic ml-1">Sansevero</span>
          </button>

          <div className="hidden lg:flex items-center gap-12">
            {navLinks.map((link) => (
              <button
                key={link.key}
                onClick={() => onNavigate(link.key)}
                className={`relative text-sm tracking-widest uppercase font-sans transition-colors duration-300 ${
                  current === link.key ? 'text-charcoal-800' : 'text-charcoal-500 hover:text-charcoal-800'
                }`}
              >
                {link.label}
                <span className={`absolute -bottom-1 left-0 h-px bg-charcoal-800 transition-all duration-300 ${
                  current === link.key ? 'w-full' : 'w-0'
                }`} />
              </button>
            ))}
          </div>

          <div className="flex items-center gap-6">
            <button 
              onClick={() => setSearchOpen(!searchOpen)}
              className="text-charcoal-600 hover:text-charcoal-800 transition-colors"
              aria-label="Search"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </button>

            <button 
              onClick={onCartOpen}
              className="relative text-charcoal-600 hover:text-charcoal-800 transition-colors"
              aria-label="Saved items"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {cartCount > 0 && (
                <span className="absolute -top-2 -right-2 w-5 h-5 bg-charcoal-800 text-cream-50 text-xs flex items-center justify-center rounded-full">
                  {cartCount}
                </span>
              )}
            </button>

            <button 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden text-charcoal-600 hover:text-charcoal-800 transition-colors"
              aria-label="Menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                {mobileMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        <div className={`overflow-hidden transition-all duration-500 ${searchOpen ? 'max-h-20 pb-4' : 'max-h-0'}`}>
          <div className="relative">
            <input
              type="text"
              value={search}
              onChange={(e) => onSearchChange(e.target.value)}
              placeholder="Search artworks..."
              className="w-full px-4 py-3 bg-transparent border-b border-charcoal-200 text-charcoal-800 placeholder:text-charcoal-400 focus:outline-none focus:border-charcoal-800 transition-colors font-sans text-sm"
            />
            {search && (
              <button 
                onClick={() => onSearchChange('')}
                className="absolute right-0 top-1/2 -translate-y-1/2 text-charcoal-400 hover:text-charcoal-800"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            )}
          </div>
        </div>
      </nav>

      <div className={`lg:hidden overflow-hidden transition-all duration-500 bg-cream-50 ${
        mobileMenuOpen ? 'max-h-64' : 'max-h-0'
      }`}>
        <div className="px-6 py-4 space-y-4">
          {navLinks.map((link) => (
            <button
              key={link.key}
              onClick={() => { onNavigate(link.key); setMobileMenuOpen(false); }}
              className={`block w-full text-left text-sm tracking-widest uppercase font-sans py-2 transition-colors ${
                current === link.key ? 'text-charcoal-800' : 'text-charcoal-500'
              }`}
            >
              {link.label}
            </button>
          ))}
        </div>
      </div>
    </header>
  );
};

// --- Saved Items Drawer ---
const SavedDrawer = ({ open, onClose, cart, onRemove }) => {
  return (
    <>
      {open && (
        <div 
          className="fixed inset-0 bg-charcoal-900/40 backdrop-blur-sm z-40 transition-opacity"
          onClick={onClose}
        />
      )}
      
      <div className={`fixed top-0 right-0 h-full w-full sm:w-[420px] bg-cream-50 z-50 transform transition-transform duration-500 ease-out ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between px-8 py-6 border-b border-cream-300">
          <h3 className="font-serif text-xl text-charcoal-800">Saved Artworks</h3>
          <button 
            onClick={onClose} 
            className="text-charcoal-500 hover:text-charcoal-800 transition-colors"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-8 py-6 overflow-auto h-[calc(100%-120px)]">
          {cart.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg className="w-16 h-16 text-charcoal-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              <p className="text-charcoal-500 font-sans text-sm">No saved artworks</p>
              <p className="text-charcoal-400 text-xs mt-2 font-sans">Save artworks to view them later</p>
            </div>
          ) : (
            <div className="space-y-6">
              {cart.map((item) => (
                <div key={item.id} className="flex gap-4 pb-6 border-b border-cream-200 last:border-b-0">
                  <div className="w-24 h-20 overflow-hidden bg-cream-200">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover" 
                      onError={(e) => (e.target.style.display = 'none')} 
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-serif text-charcoal-800 text-sm mb-1">{item.name}</h4>
                    <p className="text-charcoal-500 text-xs font-sans mb-3">{item.description}</p>
                    <button 
                      onClick={() => onRemove(item.id)} 
                      className="text-charcoal-400 hover:text-charcoal-800 text-xs font-sans tracking-wide uppercase transition-colors"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {cart.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 px-8 py-6 bg-cream-50 border-t border-cream-300">
            <button 
              onClick={onClose}
              className="btn-museum w-full"
            >
              <span>Continue Exploring</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

function App() {
  const [currentPage, setCurrentPage] = useState('landing');
  const [cart, setCart] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [search, setSearch] = useState('');
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => { preloadImages(ALL_ITEMS.map((item) => item.image)); }, []);

  const addToCart = (product) => {
    if (cart.some((item) => item.id === product.id)) {
      toast.error(`${product.name} is already saved.`, {
        style: { background: '#FAF8F5', color: '#1A1A1A', border: '1px solid #E0D6C8' }
      });
      return;
    }
    setCart((p) => [...p, { ...product, quantity: 1 }]);
    toast.success(`${product.name} saved`, {
      style: { background: '#FAF8F5', color: '#1A1A1A', border: '1px solid #E0D6C8' },
      icon: '♡'
    });
  };

  const removeFromCart = (productId) => {
    const removed = cart.find((i) => i.id === productId);
    if (!removed) return;
    setCart((p) => p.filter((i) => i.id !== productId));
    toast(`${removed.name} removed`, {
      style: { background: '#FAF8F5', color: '#1A1A1A', border: '1px solid #E0D6C8' }
    });
  };

  const handleSubmit = (formData) => {
    console.log('Booking submitted:', formData);
    toast.success('Booking request submitted', {
      style: { background: '#FAF8F5', color: '#1A1A1A', border: '1px solid #E0D6C8' },
      icon: '✓'
    });
    setCart([]);
    setCurrentPage('landing');
    setIsCartOpen(false);
  };

  const handleNavigate = (page) => { setCurrentPage(page); };

  useEffect(() => {
    const t = setTimeout(() => setSearchTerm(search), 250);
    return () => clearTimeout(t);
  }, [search]);

  const filteredItems = useMemo(() => {
    return searchItems(searchTerm, ALL_ITEMS);
  }, [searchTerm]);

  const renderPage = useMemo(() => {
    switch (currentPage) {
      case 'listing':
        return <ProductListing items={filteredItems} onAddToCart={addToCart} />;
      case 'order':
        return <OrderForm cart={cart} onRemove={removeFromCart} onSubmit={handleSubmit} />;
      default:
        return <HomePage onNavigate={handleNavigate} />;
    }
  }, [currentPage, filteredItems, cart]);

  return (
    <div className="min-h-screen bg-cream-100">
      <Toaster position="bottom-center" />

      <Navigation
        current={currentPage}
        onNavigate={handleNavigate}
        cartCount={cart.length}
        onCartOpen={() => setIsCartOpen(true)}
        search={search}
        onSearchChange={setSearch}
      />

      <main className="pt-20 lg:pt-24">{renderPage}</main>

      <footer className="bg-charcoal-800 text-cream-100 py-16">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
            <div>
              <h4 className="font-serif text-lg mb-4">Museo Cappella Sansevero</h4>
              <p className="text-cream-400 text-sm font-sans leading-relaxed">
                Via Francesco de Sanctis, 19/21<br />
                80134 Naples, Italy
              </p>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-4">Opening Hours</h4>
              <p className="text-cream-400 text-sm font-sans leading-relaxed">
                Wednesday – Monday<br />
                9:00 AM – 7:00 PM<br />
                <span className="text-cream-500">Closed on Tuesdays</span>
              </p>
            </div>
            <div>
              <h4 className="font-serif text-lg mb-4">Contact</h4>
              <p className="text-cream-400 text-sm font-sans leading-relaxed">
                info@museosansevero.it<br />
                +39 081 551 8470
              </p>
            </div>
          </div>
          <div className="border-t border-charcoal-700 pt-8 text-center">
            <p className="text-cream-500 text-xs font-sans tracking-wide">
              © {new Date().getFullYear()} Museo Cappella Sansevero. All rights reserved.
            </p>
          </div>
        </div>
      </footer>

      <SavedDrawer 
        open={isCartOpen} 
        onClose={() => setIsCartOpen(false)} 
        cart={cart} 
        onRemove={removeFromCart} 
      />
    </div>
  );
}

export default App;

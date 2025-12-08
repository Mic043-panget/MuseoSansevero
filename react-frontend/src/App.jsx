import { useState, useEffect, useMemo } from 'react';
import { Toaster, toast } from 'react-hot-toast';
import HomePage from './pages/user/HomePage';
import ProductListing from './pages/user/ProductListing';
import OrderForm from './pages/user/OrderPage';
import BottomNav from './components/ui/BottomNav';
import searchItems from './utils/searchItems';
import './App.css';

// --- Luxury Car Collection ---
const BASE_ITEMS = [
  { id: 1, name: 'Lamborghini Aventador', price: 450000, image: 'https://images.unsplash.com/photo-1544636331-e26879cd4d9b?w=1200', description: 'V12 Engine, 770 HP', category: 'Sports' },
  { id: 2, name: 'Ferrari 488 GTB', price: 330000, image: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?w=1200', description: 'Twin-Turbo V8, 661 HP', category: 'Sports' },
  { id: 3, name: 'Porsche 911 Turbo S', price: 230000, image: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?w=1200', description: 'Twin-Turbo Flat-6, 640 HP', category: 'Sports' },
  { id: 4, name: 'Mercedes-AMG GT', price: 180000, image: 'https://images.unsplash.com/photo-1618843479313-40f8afb4b4d8?w=1200', description: 'Handcrafted AMG V8, 523 HP', category: 'Luxury' },
  { id: 5, name: 'BMW M8 Competition', price: 150000, image: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?w=1200', description: 'Twin-Turbo V8, 617 HP', category: 'Luxury' },
  { id: 6, name: 'Audi R8 V10', price: 200000, image: 'https://images.unsplash.com/photo-1606664515524-ed2f786a0bd6?w=1200', description: 'Naturally Aspirated V10, 602 HP', category: 'Sports' },
  { id: 7, name: 'McLaren 720S', price: 310000, image: 'https://images.unsplash.com/photo-1621135802920-133df287f89c?w=1200', description: 'Twin-Turbo V8, 710 HP', category: 'Sports' },
  { id: 8, name: 'Bentley Continental GT', price: 250000, image: 'https://images.unsplash.com/photo-1563720360172-67b8f3dce741?w=1200', description: 'W12 Engine, 626 HP', category: 'Luxury' },
  { id: 9, name: 'Rolls-Royce Ghost', price: 350000, image: 'https://images.unsplash.com/photo-1631295868223-63265b40d9e4?w=1200', description: 'Twin-Turbo V12, 563 HP', category: 'Luxury' },
  { id: 10, name: 'Aston Martin DB11', price: 220000, image: 'https://images.unsplash.com/photo-1596468138838-0f34c2d0773b?w=1200', description: 'Twin-Turbo V8, 503 HP', category: 'Luxury' },
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
              placeholder="Search cars..."
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

// --- Saved Items Drawer (Mobile: bottom sheet, Desktop: side panel) ---
const SavedDrawer = ({ open, onClose, cart, onRemove }) => {
  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [open]);

  return (
    <>
      {/* Backdrop */}
      <div 
        className={`fixed inset-0 bg-charcoal-900/40 backdrop-blur-sm z-40 transition-opacity duration-300 ${
          open ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
        onClick={onClose}
      />
      
      {/* Desktop: Slide from right */}
      <div className={`hidden sm:block fixed top-0 right-0 h-full w-[420px] bg-cream-50 z-50 transform transition-transform duration-500 ease-out ${
        open ? 'translate-x-0' : 'translate-x-full'
      }`}>
        <div className="flex items-center justify-between px-8 py-6 border-b border-cream-300">
          <h3 className="font-serif text-xl text-charcoal-800">Saved Cars</h3>
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
          <SavedContent cart={cart} onRemove={onRemove} />
        </div>

        {cart.length > 0 && (
          <div className="absolute bottom-0 left-0 right-0 px-8 py-6 bg-cream-50 border-t border-cream-300">
            <button onClick={onClose} className="btn-museum w-full">
              <span>Continue Exploring</span>
            </button>
          </div>
        )}
      </div>

      {/* Mobile: Slide from bottom (modal sheet) */}
      <div className={`sm:hidden fixed bottom-0 left-0 right-0 bg-cream-50 z-50 rounded-t-3xl transform transition-transform duration-500 ease-out max-h-[85vh] ${
        open ? 'translate-y-0' : 'translate-y-full'
      }`}>
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-cream-300 rounded-full" />
        </div>
        
        <div className="flex items-center justify-between px-6 pb-4 border-b border-cream-300">
          <h3 className="font-serif text-lg text-charcoal-800">Saved Cars</h3>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full bg-cream-100 hover:bg-cream-200 transition-colors"
          >
            <svg className="w-5 h-5 text-charcoal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div className="px-6 py-4 overflow-auto max-h-[calc(85vh-160px)]">
          <SavedContent cart={cart} onRemove={onRemove} />
        </div>

        {cart.length > 0 && (
          <div className="px-6 py-4 bg-cream-50 border-t border-cream-300 pb-safe">
            <button onClick={onClose} className="btn-museum w-full">
              <span>Continue Exploring</span>
            </button>
          </div>
        )}
      </div>
    </>
  );
};

// Shared content for SavedDrawer
const SavedContent = ({ cart, onRemove }) => {
  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 text-center">
        <svg className="w-16 h-16 text-charcoal-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
        </svg>
        <p className="text-charcoal-500 font-sans text-sm">No saved cars</p>
        <p className="text-charcoal-400 text-xs mt-2 font-sans">Save cars to view them later</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {cart.map((item) => (
        <div key={item.id} className="flex gap-4 pb-4 border-b border-cream-200 last:border-b-0">
          <div className="w-20 h-16 sm:w-24 sm:h-20 overflow-hidden bg-cream-200 rounded-lg flex-shrink-0">
            <img 
              src={item.image} 
              alt={item.name} 
              className="w-full h-full object-cover" 
              onError={(e) => (e.target.style.display = 'none')} 
            />
          </div>
          <div className="flex-1 min-w-0">
            <h4 className="font-serif text-charcoal-800 text-sm mb-1 truncate">{item.name}</h4>
            <p className="text-charcoal-500 text-xs font-sans mb-2 line-clamp-1">{item.description}</p>
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

      <main className="pt-20 lg:pt-24 pb-20 lg:pb-0">{renderPage}</main>

      <BottomNav
        current={currentPage}
        onNavigate={handleNavigate}
        cartCount={cart.length}
        onCartOpen={() => setIsCartOpen(true)}
      />

      <footer className="bg-charcoal-800 text-cream-100 py-16 hidden lg:block">
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

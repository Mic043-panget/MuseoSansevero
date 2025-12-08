import ProductCard from "../../components/ui/ProductCard";

const ProductListing = ({ items, onAddToCart, onViewDetails }) => {
  return (
    <div className="min-h-screen bg-cream-100">
      <section className="relative py-24 lg:py-32 bg-cream-50 overflow-hidden">
        <div className="absolute top-0 left-0 w-64 h-64 border-l border-t border-cream-300 opacity-50" />
        <div className="absolute bottom-0 right-0 w-64 h-64 border-r border-b border-cream-300 opacity-50" />
        <div className="max-w-4xl mx-auto px-6 text-center relative z-10">
          <p className="text-charcoal-500 text-sm tracking-[0.2em] uppercase font-sans mb-6">The Collection</p>
          <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-charcoal-800 mb-6">Exceptional Automobiles</h1>
          <div className="w-16 h-px bg-gold-400 mx-auto mb-6" />
          <p className="text-charcoal-600 text-lg font-sans font-light leading-relaxed max-w-2xl mx-auto">
            Each vehicle in our gallery has been meticulously selected for its exceptional craftsmanship, performance, and timeless design.
          </p>
        </div>
      </section>

      <section className="py-8 border-b border-cream-300">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <p className="text-charcoal-600 text-sm font-sans"><span className="text-charcoal-800 font-medium">{items.length}</span> vehicles available</p>
            <div className="flex items-center gap-2 text-charcoal-500 text-sm font-sans">
              <span className="w-2 h-2 bg-gold-400 rounded-full" />
              <span>Private viewings available</span>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          {items.length === 0 ? (
            <div className="text-center py-24">
              <h3 className="font-serif text-2xl text-charcoal-800 mb-3">No Results Found</h3>
              <p className="text-charcoal-500 font-sans text-sm">Try adjusting your search criteria.</p>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
                {items.map((item, index) => (
                  <div key={item.id} className="animate-fade-in-up" style={{ animationDelay: `${index * 100}ms`, animationFillMode: 'forwards', opacity: 0 }}>
                    <ProductCard product={item} onAddToCart={onAddToCart} onViewDetails={onViewDetails} />
                  </div>
                ))}
              </div>
              <div className="text-center mt-16">
                <div className="inline-flex items-center gap-3">
                  <div className="w-12 h-px bg-cream-400" />
                  <span className="text-charcoal-500 text-sm font-sans">Showing all {items.length} vehicles</span>
                  <div className="w-12 h-px bg-cream-400" />
                </div>
              </div>
            </>
          )}
        </div>
      </section>
    </div>
  );
};

export default ProductListing;

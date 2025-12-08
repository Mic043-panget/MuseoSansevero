const ProductCard = ({ product, onAddToCart }) => {
  return (
    <div className="group card-museum">
      <div className="relative aspect-[4/3] overflow-hidden bg-cream-200">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-105"
          onError={(e) => { e.target.src = 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1200'; }}
        />
        <div className="absolute top-4 left-4">
          <span className="text-xs tracking-widest uppercase font-sans text-charcoal-800 bg-cream-50/90 backdrop-blur-sm px-3 py-1.5">{product.category}</span>
        </div>
        <div className="absolute inset-0 bg-charcoal-900/0 group-hover:bg-charcoal-900/20 transition-colors duration-500" />
      </div>
      <div className="p-6">
        <h3 className="font-serif text-xl text-charcoal-800 mb-2 group-hover:text-charcoal-600 transition-colors">{product.name}</h3>
        <p className="text-charcoal-500 text-sm font-sans mb-4">{product.description}</p>
        <div className="w-8 h-px bg-gold-400 mb-4" />
        <div className="flex items-end justify-between">
          <div>
            <p className="text-charcoal-400 text-xs tracking-widest uppercase font-sans mb-1">Price</p>
            <p className="font-serif text-2xl text-charcoal-800">${product.price.toLocaleString()}</p>
          </div>
          <button onClick={() => onAddToCart(product)} className="relative overflow-hidden px-5 py-2.5 border border-charcoal-800 text-charcoal-800 text-xs tracking-widest uppercase font-sans transition-all duration-300 hover:text-cream-50 group/btn">
            <span className="absolute inset-0 bg-charcoal-800 transform -translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300" />
            <span className="relative z-10 flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 6v6m0 0v6m0-6h6m-6 0H6" /></svg>
              Add
            </span>
          </button>
        </div>
      </div>
      <div className="h-px w-0 group-hover:w-full bg-gold-400 transition-all duration-500" />
    </div>
  );
};

export default ProductCard;

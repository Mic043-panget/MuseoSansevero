import Modal from './Modal';

const CarDetailModal = ({ car, open, onClose, onSave }) => {
  if (!car) return null;

  return (
    <Modal open={open} onClose={onClose} size="lg">
      <div className="relative">
        {/* Close button */}
        <button 
          onClick={onClose}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-cream-50/80 backdrop-blur-sm hover:bg-cream-100 transition-colors"
        >
          <svg className="w-5 h-5 text-charcoal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>

        {/* Car Image */}
        <div className="aspect-video sm:aspect-[16/9] overflow-hidden rounded-t-lg sm:rounded-t-lg">
          <img 
            src={car.image} 
            alt={car.name}
            className="w-full h-full object-cover"
          />
        </div>

        {/* Content */}
        <div className="p-6 sm:p-8">
          <div className="flex items-start justify-between gap-4 mb-4">
            <div>
              <p className="text-charcoal-500 text-xs tracking-widest uppercase font-sans mb-1">{car.category}</p>
              <h2 className="font-serif text-2xl sm:text-3xl text-charcoal-800">{car.name}</h2>
            </div>
            <div className="text-right">
              <p className="text-charcoal-400 text-xs tracking-widest uppercase font-sans mb-1">Price</p>
              <p className="font-serif text-xl sm:text-2xl text-charcoal-800">
                ${car.price.toLocaleString()}
              </p>
            </div>
          </div>

          <div className="w-12 h-px bg-gold-400 mb-6" />

          <p className="text-charcoal-600 font-sans leading-relaxed mb-6">
            {car.description}
          </p>

          {/* Specs Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
            <div className="bg-cream-100 rounded-lg p-4 text-center">
              <p className="text-charcoal-400 text-xs tracking-widest uppercase font-sans mb-1">Engine</p>
              <p className="font-serif text-lg text-charcoal-800">V8/V12</p>
            </div>
            <div className="bg-cream-100 rounded-lg p-4 text-center">
              <p className="text-charcoal-400 text-xs tracking-widest uppercase font-sans mb-1">0-60 mph</p>
              <p className="font-serif text-lg text-charcoal-800">2.9s</p>
            </div>
            <div className="bg-cream-100 rounded-lg p-4 text-center">
              <p className="text-charcoal-400 text-xs tracking-widest uppercase font-sans mb-1">Top Speed</p>
              <p className="font-serif text-lg text-charcoal-800">200+ mph</p>
            </div>
            <div className="bg-cream-100 rounded-lg p-4 text-center">
              <p className="text-charcoal-400 text-xs tracking-widest uppercase font-sans mb-1">Year</p>
              <p className="font-serif text-lg text-charcoal-800">2024</p>
            </div>
          </div>

          {/* Actions */}
          <div className="flex flex-col sm:flex-row gap-3">
            <button 
              onClick={() => { onSave(car); onClose(); }}
              className="btn-museum flex-1"
            >
              <span>Save to Favorites</span>
            </button>
            <button 
              onClick={onClose}
              className="flex-1 px-8 py-3 font-sans text-sm tracking-widest uppercase border border-cream-300 text-charcoal-600 hover:border-charcoal-400 hover:text-charcoal-800 transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default CarDetailModal;

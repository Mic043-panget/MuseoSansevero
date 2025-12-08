import React, { useEffect } from 'react';

const SidePanel = ({ open, onClose, title, children, width = 'w-96' }) => {
  useEffect(() => {
    const handleEscape = (e) => { if (e.key === 'Escape') onClose(); };
    if (open) {
      document.addEventListener('keydown', handleEscape);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      document.removeEventListener('keydown', handleEscape);
      document.body.style.overflow = 'unset';
    };
  }, [open, onClose]);

  return (
    <div className={`fixed inset-0 z-50 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`} aria-hidden={!open}>
      {/* Backdrop */}
      <div 
        onClick={onClose} 
        className={`fixed inset-0 bg-black/40 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`} 
      />

      {/* Desktop: Slide from right */}
      <aside className={`
        hidden sm:block absolute right-0 top-0 h-full bg-cream-50 ${width} shadow-2xl 
        transform transition-transform duration-300 ease-out overflow-auto
        ${open ? 'translate-x-0' : 'translate-x-full'}
      `}>
        <div className="sticky top-0 bg-cream-50 p-4 border-b border-cream-200 flex items-center justify-between z-10">
          <h3 className="text-lg font-serif text-charcoal-800">{title}</h3>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full bg-cream-100 hover:bg-cream-200 transition-colors"
          >
            <svg className="w-5 h-5 text-charcoal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        <div className="p-4 text-charcoal-700">
          {children}
        </div>
      </aside>

      {/* Mobile: Slide from bottom (modal sheet style) */}
      <aside className={`
        sm:hidden absolute bottom-0 left-0 right-0 bg-cream-50 rounded-t-3xl shadow-2xl 
        transform transition-transform duration-300 ease-out
        max-h-[85vh] overflow-hidden
        ${open ? 'translate-y-0' : 'translate-y-full'}
      `}>
        {/* Drag handle */}
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-cream-300 rounded-full" />
        </div>
        
        <div className="px-4 pb-2 flex items-center justify-between border-b border-cream-200">
          <h3 className="text-lg font-serif text-charcoal-800">{title}</h3>
          <button 
            onClick={onClose} 
            className="p-2 rounded-full bg-cream-100 hover:bg-cream-200 transition-colors"
          >
            <svg className="w-5 h-5 text-charcoal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div className="p-4 text-charcoal-700 overflow-auto max-h-[calc(85vh-80px)] pb-safe">
          {children}
        </div>
      </aside>
    </div>
  );
};

export default SidePanel;

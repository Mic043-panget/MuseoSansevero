import { useEffect } from 'react';

const Modal = ({ open, onClose, children, size = 'md' }) => {
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

  const sizeClasses = {
    sm: 'max-w-sm',
    md: 'max-w-lg',
    lg: 'max-w-2xl',
    xl: 'max-w-4xl',
    full: 'max-w-[95vw]'
  };

  return (
    <div className={`fixed inset-0 z-50 ${open ? 'pointer-events-auto' : 'pointer-events-none'}`}>
      {/* Backdrop */}
      <div 
        onClick={onClose}
        className={`fixed inset-0 bg-charcoal-900/60 backdrop-blur-sm transition-opacity duration-300 ${
          open ? 'opacity-100' : 'opacity-0'
        }`}
      />

      {/* Desktop Modal */}
      <div className={`hidden sm:flex fixed inset-0 items-center justify-center p-4 ${
        open ? '' : 'pointer-events-none'
      }`}>
        <div className={`
          relative bg-cream-50 rounded-lg shadow-2xl w-full ${sizeClasses[size]}
          transform transition-all duration-300
          ${open ? 'opacity-100 scale-100 translate-y-0' : 'opacity-0 scale-95 translate-y-4'}
        `}>
          {children}
        </div>
      </div>

      {/* Mobile: Bottom Sheet */}
      <div className={`
        sm:hidden fixed bottom-0 left-0 right-0 bg-cream-50 rounded-t-3xl shadow-2xl
        transform transition-transform duration-300 ease-out max-h-[90vh] overflow-hidden
        ${open ? 'translate-y-0' : 'translate-y-full'}
      `}>
        <div className="flex justify-center pt-3 pb-2">
          <div className="w-10 h-1 bg-cream-300 rounded-full" />
        </div>
        <div className="overflow-auto max-h-[calc(90vh-20px)] pb-safe">
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;

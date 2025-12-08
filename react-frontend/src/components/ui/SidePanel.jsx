import React, { useEffect } from 'react';
import { X } from 'lucide-react';

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
    <div className={`fixed inset-0 z-50 pointer-events-none ${open ? '' : 'opacity-0'}`} aria-hidden={!open}>
      {/* backdrop */}
      <div onClick={onClose} className={`fixed inset-0 bg-black bg-opacity-40 transition-opacity ${open ? 'opacity-100' : 'opacity-0'}`} />

      <aside className={`absolute right-0 top-0 h-full bg-white ${width} shadow-2xl transform transition-transform ${open ? 'translate-x-0' : 'translate-x-full'} pointer-events-auto overflow-auto`}>
        <div className="p-4 border-b border-gray-100 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
          <button onClick={onClose} className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"><X size={18} className="text-gray-600" /></button>
        </div>
        <div className="p-4 text-gray-700">
          {children}
        </div>
      </aside>
    </div>
  );
};

export default SidePanel;

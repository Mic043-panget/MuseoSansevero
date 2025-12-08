import React from 'react';

const PrimaryButton = ({ children, onClick, className = '', disabled = false, variant = 'default' }) => {
  const baseClasses = "relative inline-flex items-center justify-center px-8 py-3 font-sans text-sm tracking-widest uppercase overflow-hidden transition-all duration-500";
  
  const variants = {
    default: "border border-charcoal-800 text-charcoal-800 hover:text-cream-50",
    light: "border border-cream-100 text-cream-100 hover:text-charcoal-800",
    filled: "bg-charcoal-800 text-cream-50 hover:bg-charcoal-700",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={`${baseClasses} ${variants[variant]} ${disabled ? 'opacity-50 cursor-not-allowed' : ''} ${className} group`}
    >
      <span className={`absolute inset-0 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ${
        variant === 'light' ? 'bg-cream-100' : 'bg-charcoal-800'
      }`} />
      <span className="relative z-10">{children}</span>
    </button>
  );
};

export default PrimaryButton;

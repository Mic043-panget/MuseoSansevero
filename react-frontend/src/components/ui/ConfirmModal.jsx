import Modal from './Modal';

const ConfirmModal = ({ 
  open, 
  onClose, 
  onConfirm, 
  title = 'Confirm Action',
  message = 'Are you sure you want to proceed?',
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'default' // 'default' | 'danger'
}) => {
  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <Modal open={open} onClose={onClose} size="sm">
      <div className="p-6 sm:p-8">
        {/* Icon */}
        <div className={`w-12 h-12 mx-auto mb-4 rounded-full flex items-center justify-center ${
          variant === 'danger' ? 'bg-red-100' : 'bg-cream-200'
        }`}>
          {variant === 'danger' ? (
            <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
          ) : (
            <svg className="w-6 h-6 text-charcoal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          )}
        </div>

        {/* Title */}
        <h3 className="font-serif text-xl text-charcoal-800 text-center mb-2">{title}</h3>
        
        {/* Message */}
        <p className="text-charcoal-500 font-sans text-sm text-center mb-6">{message}</p>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <button 
            onClick={onClose}
            className="flex-1 px-6 py-3 font-sans text-sm tracking-widest uppercase border border-cream-300 text-charcoal-600 hover:border-charcoal-400 hover:text-charcoal-800 transition-colors rounded"
          >
            {cancelText}
          </button>
          <button 
            onClick={handleConfirm}
            className={`flex-1 px-6 py-3 font-sans text-sm tracking-widest uppercase rounded transition-colors ${
              variant === 'danger' 
                ? 'bg-red-600 text-white hover:bg-red-700' 
                : 'bg-charcoal-800 text-cream-50 hover:bg-charcoal-700'
            }`}
          >
            {confirmText}
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default ConfirmModal;

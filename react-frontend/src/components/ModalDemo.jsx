import React, { useState } from 'react';
import Modal from '../ui/Modal';
import PrimaryButton from '../ui/PrimaryButton';

const ModalDemo = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div>
      <PrimaryButton onClick={() => setIsOpen(true)}>
        Open Modal
      </PrimaryButton>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Example Modal"
      >
        <div className="space-y-4">
          <p className="text-slate-300">
            This is an example modal with some content. You can put anything here!
          </p>
          
          <div className="flex justify-end gap-3">
            <button
              onClick={() => setIsOpen(false)}
              className="px-4 py-2 rounded border border-slate-700 text-slate-300 hover:bg-slate-800"
            >
              Cancel
            </button>
            <PrimaryButton onClick={() => setIsOpen(false)}>
              Confirm
            </PrimaryButton>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ModalDemo;
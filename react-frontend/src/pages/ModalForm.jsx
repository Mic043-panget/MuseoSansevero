import React, { useState } from 'react';
import PrimaryButton from '../components/ui/PrimaryButton';

const ModalForm = ({ onClose, onSubmit }) => {
  const [form, setForm] = useState({ name: '', email: '' });

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = (e) => {
    e.preventDefault();
    if (onSubmit) onSubmit(form);
  };

  return (
    <form onSubmit={submit} className="space-y-4">
      <div>
        <label className="block text-sm text-gray-700">Full name</label>
        <input name="name" value={form.name} onChange={handleChange} className="mt-1 w-full border border-gray-200 rounded px-3 py-2" required />
      </div>
      <div>
        <label className="block text-sm text-gray-700">Email</label>
        <input name="email" type="email" value={form.email} onChange={handleChange} className="mt-1 w-full border border-gray-200 rounded px-3 py-2" required />
      </div>
      <div className="flex justify-end gap-3">
        <button type="button" onClick={onClose} className="px-4 py-2 rounded border border-gray-200 text-gray-700">Cancel</button>
        <PrimaryButton type="submit">Submit</PrimaryButton>
      </div>
    </form>
  );
};

export default ModalForm;

import { useState } from "react";

export default function OrderForm({ cart = [], onRemove, onUpdateQuantity, onSubmit }) {
  const [form, setForm] = useState({ name: "", email: "", phone: "", address: "", city: "", zip: "", notes: "" });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });
  const calculateTotal = () => cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cart.length === 0) {
      alert("Your cart is empty. Please add vehicles before ordering.");
      return;
    }
    if (onSubmit) onSubmit({ ...form, items: cart, total: calculateTotal() });
    setShowModal(true);
  };

  return (
    <div className="min-h-screen bg-cream-100">
      <section className="py-24 lg:py-32 bg-cream-50 border-b border-cream-300">
        <div className="max-w-4xl mx-auto px-6 text-center">
          <p className="text-charcoal-500 text-sm tracking-[0.2em] uppercase font-sans mb-6">Checkout</p>
          <h1 className="font-serif text-4xl md:text-5xl text-charcoal-800 mb-6">Complete Your Order</h1>
          <div className="w-16 h-px bg-gold-400 mx-auto mb-6" />
          <p className="text-charcoal-600 text-lg font-sans font-light leading-relaxed max-w-2xl mx-auto">
            Review your selection and provide your details to complete your purchase.
          </p>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-6xl mx-auto px-6 lg:px-12">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
            {/* Order Summary */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-serif text-2xl text-charcoal-800">Order Summary</h2>
                <div className="flex-1 h-px bg-cream-300" />
              </div>
              {cart.length === 0 ? (
                <div className="bg-cream-50 border border-cream-300 p-12 text-center">
                  <svg className="w-16 h-16 text-charcoal-200 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1" d="M16 11V7a4 4 0 00-8 0v4M5 9h14l1 12H4L5 9z" /></svg>
                  <p className="text-charcoal-600 font-serif text-lg mb-2">Your cart is empty</p>
                  <p className="text-charcoal-500 text-sm font-sans">Browse our collection to add vehicles.</p>
                </div>
              ) : (
                <div className="space-y-6">
                  {cart.map((item) => (
                    <div key={item.id} className="flex gap-4 pb-6 border-b border-cream-300 last:border-b-0">
                      <div className="w-32 h-24 overflow-hidden bg-cream-200 flex-shrink-0"><img src={item.image} alt={item.name} className="w-full h-full object-cover" /></div>
                      <div className="flex-1">
                        <h4 className="font-serif text-charcoal-800 mb-1">{item.name}</h4>
                        <p className="text-charcoal-500 text-sm font-sans mb-2">{item.description}</p>
                        <p className="text-charcoal-700 font-medium mb-3">${item.price.toLocaleString()} each</p>
                        <div className="flex items-center justify-between">
                          <div className="flex items-center border border-cream-300">
                            <button onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, Math.max(1, item.quantity - 1))} className="px-3 py-1 text-charcoal-600 hover:bg-cream-100 transition-colors">−</button>
                            <span className="px-4 py-1 text-charcoal-800 text-sm border-x border-cream-300">{item.quantity}</span>
                            <button onClick={() => onUpdateQuantity && onUpdateQuantity(item.id, item.quantity + 1)} className="px-3 py-1 text-charcoal-600 hover:bg-cream-100 transition-colors">+</button>
                          </div>
                          <button onClick={() => onRemove && onRemove(item.id)} className="text-charcoal-400 hover:text-charcoal-800 text-xs uppercase tracking-wide transition-colors">Remove</button>
                        </div>
                      </div>
                    </div>
                  ))}
                  
                  {/* Order Totals */}
                  <div className="bg-cream-50 border border-cream-300 p-6 mt-6">
                    <div className="space-y-3">
                      <div className="flex justify-between text-charcoal-600 text-sm font-sans">
                        <span>Subtotal ({cart.reduce((sum, item) => sum + item.quantity, 0)} items)</span>
                        <span>${calculateTotal().toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between text-charcoal-600 text-sm font-sans">
                        <span>Shipping</span>
                        <span>Calculated at delivery</span>
                      </div>
                      <div className="flex justify-between text-charcoal-600 text-sm font-sans">
                        <span>Tax</span>
                        <span>Calculated at checkout</span>
                      </div>
                      <div className="border-t border-cream-300 pt-3 mt-3">
                        <div className="flex justify-between items-center">
                          <span className="text-charcoal-800 font-medium">Total</span>
                          <span className="font-serif text-2xl text-charcoal-800">${calculateTotal().toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Customer Information Form */}
            <div>
              <div className="flex items-center gap-4 mb-8">
                <h2 className="font-serif text-2xl text-charcoal-800">Customer Information</h2>
                <div className="flex-1 h-px bg-cream-300" />
              </div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-xs uppercase tracking-widest text-charcoal-500 font-sans mb-2">Full Name *</label>
                  <input type="text" name="name" placeholder="John Doe" value={form.name} onChange={handleChange} required className="w-full px-4 py-3 bg-transparent border-b border-charcoal-200 text-charcoal-800 placeholder:text-charcoal-400 focus:outline-none focus:border-charcoal-800 transition-colors font-sans" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-charcoal-500 font-sans mb-2">Email Address *</label>
                  <input type="email" name="email" placeholder="john@example.com" value={form.email} onChange={handleChange} required className="w-full px-4 py-3 bg-transparent border-b border-charcoal-200 text-charcoal-800 placeholder:text-charcoal-400 focus:outline-none focus:border-charcoal-800 transition-colors font-sans" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-charcoal-500 font-sans mb-2">Phone Number *</label>
                  <input type="tel" name="phone" placeholder="+1 (555) 000-0000" value={form.phone} onChange={handleChange} required className="w-full px-4 py-3 bg-transparent border-b border-charcoal-200 text-charcoal-800 placeholder:text-charcoal-400 focus:outline-none focus:border-charcoal-800 transition-colors font-sans" />
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-charcoal-500 font-sans mb-2">Delivery Address *</label>
                  <input type="text" name="address" placeholder="123 Main Street" value={form.address} onChange={handleChange} required className="w-full px-4 py-3 bg-transparent border-b border-charcoal-200 text-charcoal-800 placeholder:text-charcoal-400 focus:outline-none focus:border-charcoal-800 transition-colors font-sans" />
                </div>
                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-charcoal-500 font-sans mb-2">City *</label>
                    <input type="text" name="city" placeholder="Los Angeles" value={form.city} onChange={handleChange} required className="w-full px-4 py-3 bg-transparent border-b border-charcoal-200 text-charcoal-800 placeholder:text-charcoal-400 focus:outline-none focus:border-charcoal-800 transition-colors font-sans" />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-widest text-charcoal-500 font-sans mb-2">ZIP Code *</label>
                    <input type="text" name="zip" placeholder="90210" value={form.zip} onChange={handleChange} required className="w-full px-4 py-3 bg-transparent border-b border-charcoal-200 text-charcoal-800 placeholder:text-charcoal-400 focus:outline-none focus:border-charcoal-800 transition-colors font-sans" />
                  </div>
                </div>
                <div>
                  <label className="block text-xs uppercase tracking-widest text-charcoal-500 font-sans mb-2">Order Notes (Optional)</label>
                  <textarea name="notes" placeholder="Special delivery instructions, customization requests..." value={form.notes} onChange={handleChange} rows="3" className="w-full px-4 py-3 bg-transparent border-b border-charcoal-200 text-charcoal-800 placeholder:text-charcoal-400 focus:outline-none focus:border-charcoal-800 transition-colors font-sans resize-none" />
                </div>
                <div className="pt-4">
                  <button type="submit" className="btn-museum w-full" disabled={cart.length === 0}>
                    <span>Place Order — ${calculateTotal().toLocaleString()}</span>
                  </button>
                  {cart.length === 0 && <p className="text-charcoal-400 text-xs font-sans text-center mt-3">Add items to your cart to place an order</p>}
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Success Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-charcoal-900/50 backdrop-blur-sm flex items-center justify-center z-50 p-4" onClick={() => setShowModal(false)}>
          <div className="bg-cream-50 p-8 md:p-12 max-w-md w-full border border-cream-300" onClick={(e) => e.stopPropagation()}>
            <div className="text-center">
              <div className="w-16 h-16 mx-auto mb-6 border border-gold-400 rounded-full flex items-center justify-center">
                <svg className="w-8 h-8 text-gold-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 13l4 4L19 7" /></svg>
              </div>
              <h3 className="font-serif text-2xl text-charcoal-800 mb-4">Order Confirmed!</h3>
              <div className="w-12 h-px bg-gold-400 mx-auto mb-4" />
              <p className="text-charcoal-600 font-sans text-sm mb-2">Thank you, <span className="text-charcoal-800 font-medium">{form.name}</span></p>
              <p className="text-charcoal-500 font-sans text-sm mb-2">Your order total: <span className="text-charcoal-800 font-medium">${calculateTotal().toLocaleString()}</span></p>
              <p className="text-charcoal-500 font-sans text-sm mb-6">Confirmation sent to {form.email}</p>
              <button className="btn-museum" onClick={() => setShowModal(false)}><span>Close</span></button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

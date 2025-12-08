import React, { useState } from "react";
import "./OrderPage.css";

export default function OrderPage() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    car: "",
  });
  const [showModal, setShowModal] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setShowModal(true);
  };

  const cars = [
    "Toyota Vios 2024",
    "Honda Civic 2024",
    "Mazda CX-5 2025",
    "Tesla Model 3 2025",
    "Ford Ranger 2024",
    "Nissan Almera 2024",
  ];

  return (
    <div className="order-container">
      <div className="order-card">
        <img src="OIP.jpg" alt="OIP.jpg" className="logo" />
        <h2 className="title">Car Order Form</h2>
        <p className="subtitle">Please complete your details below</p>

        <form onSubmit={handleSubmit} className="form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            value={form.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={form.email}
            onChange={handleChange}
            required
          />
          <select
            name="car"
            value={form.car}
            onChange={handleChange}
            required
          >
            <option value="">Select a Car Model</option>
            {cars.map((car, index) => (
              <option key={index} value={car}>
                {car}
              </option>
            ))}
          </select>

          <button type="submit" className="order-btn">
            Confirm Order
          </button>
        </form>
      </div>

      {/* ✅ Confirmation Modal */}
      {showModal && (
        <div className="modal-overlay" onClick={() => setShowModal(false)}>
          <div
            className="modal"
            onClick={(e) => e.stopPropagation()} // prevent overlay close
          >
            <div className="modal-header">
              <h3>Order Confirmed ✅</h3>
            </div>
            <div className="modal-body">
              <p>
                Thank you, <strong>{form.name}</strong>!
              </p>
              <p>
                Your order for <strong>{form.car}</strong> has been received.
              </p>
              <p>We’ll contact you soon at {form.email}.</p>
            </div>
            <div className="modal-footer">
              <button
                className="close-btn"
                onClick={() => setShowModal(false)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

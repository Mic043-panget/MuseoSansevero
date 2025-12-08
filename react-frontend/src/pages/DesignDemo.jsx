import React, { useState } from 'react';
import PrimaryButton from '../components/ui/PrimaryButton';
import LightModal from '../components/ui/LightModal';
import ModalForm from './ModalForm';
import SidePanel from '../components/ui/SidePanel';
import { Sun, Star, Info, Mail, Rocket } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { useRef } from 'react';

const DesignDemo = ({ onNavigate }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const [theme, setTheme] = useState('light');

  const toggleTheme = () => {
    const next = theme === 'light' ? 'dark' : 'light';
    setTheme(next);
    document.documentElement.setAttribute('data-theme', next);
    // add a class for easy styling if needed
    if (next === 'dark') document.documentElement.classList.add('dark-mode');
    else document.documentElement.classList.remove('dark-mode');
    toast(`Switched to ${next} mode`);
  };

  const heroRef = useRef(null);
  const featuresRef = useRef(null);
  const contactRef = useRef(null);

  const scrollTo = (ref) => {
    if (!ref) return;
    const el = ref.current || document.getElementById(ref);
    if (el && el.scrollIntoView) el.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const handleOrderNow = () => {
    toast.success('Opening Order Form');
    onNavigate('order');
  };

  return (
    <div className="min-h-screen bg-white text-gray-800">
      <header className="border-b border-gray-100">
        <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="text-2xl font-bold text-purple-600">MyBrand</div>
          <div className="flex items-center gap-4">
            <nav className="hidden sm:flex gap-6 text-gray-500">
              <button className="text-sm">Features</button>
              <button className="text-sm">About</button>
              <button className="text-sm">Contact</button>
            </nav>

            <button onClick={toggleTheme} aria-label="Toggle theme" className="p-2 rounded-full bg-gray-100 hover:bg-gray-200">
              <Sun className="text-yellow-400" />
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-6 py-12">
        <section id="hero" ref={heroRef} className="text-center py-12">
          <h1 className="text-4xl font-extrabold text-gray-900">Build Modern Web Apps with <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">Ease</span></h1>
          <p className="mt-4 text-gray-600 max-w-2xl mx-auto">Create fast, responsive, and modern web applications using React and Tailwind CSS. Get started in minutes with our flexible UI components and streamlined workflow.</p>
          <div className="mt-8 flex items-center justify-center gap-4">
            <PrimaryButton onClick={handleOrderNow}>Order Now →</PrimaryButton>
          </div>
        </section>

        <section id="features" ref={featuresRef} className="mt-8 flex flex-col items-center gap-4">
          <div className="flex gap-4">
            <PrimaryButton onClick={() => setIsModalOpen(true)}>Open Modal</PrimaryButton>
            <PrimaryButton onClick={() => setIsPanelOpen(true)}>Open Side Panel</PrimaryButton>
          </div>
          <div className="mt-6 text-center max-w-xl text-gray-600">
            <p className="mb-2">Interactive demo: open the modal to submit a quick form, or open the side panel for extra content.</p>
          </div>
        </section>

        <section id="contact" ref={contactRef} className="mt-12 text-center">
          <h3 className="text-lg font-semibold">Contact</h3>
          <p className="text-gray-600">Email: info@mybrand.com | Phone: (555) 555-5555</p>
        </section>
      </main>

      <LightModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} title="My Modal">
        <ModalForm onClose={() => setIsModalOpen(false)} onSubmit={(data) => { toast.success('Form submitted'); setIsModalOpen(false); onNavigate('order'); }} />
      </LightModal>

      <SidePanel open={isPanelOpen} onClose={() => setIsPanelOpen(false)} title="My Side Panel">
        <p>This is the side panel content.</p>
        <p className="mt-4">Add more content here. The panel is scrollable if content grows.</p>
        <div className="mt-6 flex justify-end">
          <PrimaryButton onClick={() => { setIsPanelOpen(false); toast('Opening Order Form'); onNavigate('order'); }}>Order</PrimaryButton>
        </div>
      </SidePanel>

      {/* Fixed bottom navigation */}
      <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-100 shadow-inner">
        <div className="max-w-5xl mx-auto px-6 py-2 flex items-center justify-between">
          <button className="flex flex-col items-center text-gray-600 text-xs">
            <Star className="w-5 h-5" />
            <span>Features</span>
          </button>
          <button className="flex flex-col items-center text-gray-600 text-xs">
            <Info className="w-5 h-5" />
            <span>About</span>
          </button>
          <button className="flex flex-col items-center text-gray-600 text-xs">
            <Mail className="w-5 h-5" />
            <span>Contact</span>
          </button>
          <button className="flex flex-col items-center text-gray-600 text-xs">
            <Rocket className="w-5 h-5" />
            <span>Start</span>
          </button>
        </div>
      </nav>
    </div>
  );
};

export default DesignDemo;

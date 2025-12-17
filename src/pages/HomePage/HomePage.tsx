import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { Navbar } from '../../components/Navbar';
import { Ship, Package, Clock, ArrowRight, Anchor, Truck, Users } from 'lucide-react';

const HomePage = () => {
    const [trackingCode, setTrackingCode] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const navigate = useNavigate();

    const handleTrack = (e: React.FormEvent) => {
        e.preventDefault();
        if (trackingCode.trim()) {
            navigate(`/track/${trackingCode.trim()}`);
        }
    };

    const stats = [
        { label: 'Active Vessels', value: '47', icon: Ship, color: 'text-blue-600' },
        { label: 'Containers Cleared', value: '12,450', icon: Package, color: 'text-green-600' },
        { label: 'Avg Transit Time', value: '18 days', icon: Clock, color: 'text-yellow-600' }
    ];

    const galleryImages = [
        {
            title: 'Vessel Operations',
            image: '/images/vessel_ops.png',
            description: 'Efficient berthing and stevedoring services',
            icon: Ship
        },
        {
            title: 'Terminal Handling',
            image: '/images/terminal_handling.png',
            description: 'State-of-the-art container terminals',
            icon: Anchor
        },
        {
            title: 'Logistics Network',
            image: '/images/logistics_network.png',
            description: 'Integrated road and rail connectivity',
            icon: Truck
        },
        {
            title: 'Our People',
            image: '/images/port_workers.png',
            description: 'Dedicated workforce ensuring safety',
            icon: Users
        }
    ];

    return (
        <>
            <Navbar />
            <div className="pt-20">
                <div
                    className="relative min-h-screen flex items-center justify-center text-white"
                    style={{
                        backgroundImage: 'linear-gradient(rgba(15, 23, 42, 0.7), rgba(15, 23, 42, 0.8)), url(/images/hero_bg.png)',
                        backgroundSize: 'cover',
                        backgroundPosition: 'center',
                        backgroundAttachment: 'fixed'
                    }}
                >
                    <div className="container text-center z-10 px-4">
                        <motion.h1
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                            className="text-5xl md:text-7xl font-bold mb-6 text-white drop-shadow-2xl"
                            style={{ fontFamily: 'var(--font-heading)' }}
                        >
                            Track your Cargo
                            <br />
                            <span className="text-gradient">across West Africa</span>
                        </motion.h1>
                        <motion.p
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.2 }}
                            className="text-xl md:text-2xl mb-12 max-w-2xl mx-auto text-gray-200"
                        >
                            Real-time cargo tracking at the Port Autonome de Dakar.
                            Connecting the world to Senegal.
                        </motion.p>

                        <motion.form
                            onSubmit={handleTrack}
                            initial={{ opacity: 0, y: 30 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8, delay: 0.4 }}
                            className="max-w-2xl mx-auto"
                        >
                            <motion.div
                                animate={{
                                    scale: isSearchFocused ? 1.02 : 1
                                }}
                                transition={{ duration: 0.2 }}
                                className="flex gap-3 p-2 bg-white/10 backdrop-blur-md rounded-2xl border-2 border-white/20 shadow-2xl"
                            >
                                <input
                                    type="text"
                                    placeholder="Enter Container Number (e.g., SHP-DKR-001, MSCU1234567)"
                                    className="flex-1 p-5 md:p-6 rounded-xl text-gray-900 border-none outline-none focus:ring-2 focus:ring-yellow-400 text-lg font-medium"
                                    value={trackingCode}
                                    onChange={(e) => setTrackingCode(e.target.value)}
                                    onFocus={() => setIsSearchFocused(true)}
                                    onBlur={() => setIsSearchFocused(false)}
                                />
                                <motion.button
                                    type="submit"
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-blue-900 font-bold py-5 md:py-6 px-8 md:px-12 rounded-xl flex items-center gap-2 transition-all shadow-lg hover:shadow-xl text-lg"
                                >
                                    Track <ArrowRight size={24} />
                                </motion.button>
                            </motion.div>
                        </motion.form>
                    </div>
                </div>

                <div className="container -mt-20 relative z-20 mb-20">
                    <motion.div
                        initial={{ opacity: 0, y: 50 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="premium-card"
                    >
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            {stats.map((stat, index) => {
                                const Icon = stat.icon;
                                return (
                                    <motion.div
                                        key={stat.label}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.5, delay: 0.7 + index * 0.1 }}
                                        className="text-center"
                                    >
                                        <div className="flex justify-center mb-4">
                                            <div className={`p-4 rounded-full bg-gray-100 ${stat.color}`}>
                                                <Icon size={32} />
                                            </div>
                                        </div>
                                        <div className="text-4xl font-bold mb-2" style={{ color: 'var(--color-primary)' }}>
                                            {stat.value}
                                        </div>
                                        <div className="text-gray-600 font-medium">{stat.label}</div>
                                    </motion.div>
                                );
                            })}
                        </div>
                    </motion.div>
                </div>

                <div className="container mb-20">
                    <motion.h2
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="text-4xl md:text-5xl font-bold text-center mb-16"
                        style={{ color: 'var(--color-primary)' }}
                    >
                        Port Operations
                    </motion.h2>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                        {galleryImages.map((item, index) => {
                            const Icon = item.icon;
                            return (
                                <motion.div
                                    key={item.title}
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.5, delay: index * 0.1 }}
                                    whileHover={{ y: -8 }}
                                    className="card-hover overflow-hidden group cursor-pointer"
                                >
                                    <div className="h-64 overflow-hidden relative">
                                        <motion.img
                                            src={item.image}
                                            alt={item.title}
                                            className="w-full h-full object-cover"
                                            whileHover={{ scale: 1.1 }}
                                            transition={{ duration: 0.5 }}
                                        />
                                        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                                        <div className="absolute bottom-4 left-4 right-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Icon className="text-yellow-400" size={24} />
                                                <h3 className="text-white font-bold text-lg">{item.title}</h3>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="p-6">
                                        <p className="text-gray-600 text-sm">{item.description}</p>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>

                <footer className="bg-gray-900 text-gray-400 py-12 text-center">
                    <div className="container">
                        <p>&copy; 2024 Sunugal Logistics - Port Autonome de Dakar. All rights reserved.</p>
                    </div>
                </footer>
            </div>
        </>
    );
};

export default HomePage;


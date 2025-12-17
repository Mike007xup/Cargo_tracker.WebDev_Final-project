import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, X, Anchor, LogOut, User, LayoutDashboard } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';

export const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const { isAuthenticated, isAdmin, logout, user } = useAuth();
    const navigate = useNavigate();

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            navigate(`/track/${searchQuery.trim()}`);
            setSearchQuery('');
            setIsOpen(false);
        }
    };

    return (
        <nav className="navbar fixed top-0 w-full z-50 shadow-md">
            <div className="container flex justify-between items-center w-full">
                <Link to="/" className="flex items-center gap-2 text-white no-underline">
                    <Anchor className="text-color-accent" size={24} style={{ color: 'var(--color-accent)' }} />
                    <span className="font-bold text-xl tracking-tight">
                        SUNUGAL <span style={{ color: 'var(--color-accent)' }}>LOGISTICS</span>
                    </span>
                </Link>

                <div className="hidden md:block flex-1 max-w-sm mx-8">
                    <form onSubmit={handleSearch} className="relative">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Track shipment..."
                            className="bg-white/10 border-white/20 text-white placeholder:text-white/60 focus:bg-white focus:text-gray-900 rounded-full py-1.5 px-4"
                            style={{ height: '36px' }}
                        />
                        <button type="submit" className="absolute right-3 top-1/2 -translate-y-1/2 text-white/60 hover:text-white">
                            <Search size={18} />
                        </button>
                    </form>
                </div>

                <div className="hidden md:flex items-center gap-6">
                    <Link to="/" className="text-white/90 hover:text-white font-medium">Home</Link>
                    {isAuthenticated ? (
                        <>
                            <Link to="/dashboard" className="text-white/90 hover:text-white font-medium flex items-center gap-1">
                                <LayoutDashboard size={18} /> Dashboard
                            </Link>
                            {isAdmin && (
                                <Link to="/admin" className="text-white/90 hover:text-white font-medium">Admin</Link>
                            )}
                            <div className="h-6 w-px bg-white/20 mx-2" />
                            <Link to="/profile" className="text-white/90 hover:text-white flex items-center gap-1">
                                <User size={18} /> {user?.name || 'Profile'}
                            </Link>
                            <button onClick={logout} className="text-white/90 hover:text-white flex items-center gap-1">
                                <LogOut size={18} />
                            </button>
                        </>
                    ) : (
                        <Link to="/login" className="btn-primary" style={{ padding: '0.4rem 1.2rem' }}>Login</Link>
                    )}
                </div>

                <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
                    {isOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </div>

            {isOpen && (
                <div className="md:hidden bg-color-primary p-4 absolute top-full left-0 w-full shadow-lg border-t border-white/10" style={{ backgroundColor: 'var(--color-primary)' }}>
                    <form onSubmit={handleSearch} className="mb-4">
                        <input
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Tracking code..."
                            className="bg-white/10 text-white"
                        />
                    </form>
                    <div className="flex flex-col gap-4 text-white">
                        <Link to="/" onClick={() => setIsOpen(false)}>Home</Link>
                        {isAuthenticated ? (
                            <>
                                <Link to="/dashboard" onClick={() => setIsOpen(false)}>Dashboard</Link>
                                {isAdmin && <Link to="/admin" onClick={() => setIsOpen(false)}>Admin</Link>}
                                <Link to="/profile" onClick={() => setIsOpen(false)}>Profile</Link>
                                <button onClick={() => { logout(); setIsOpen(false); }} className="text-left">Logout</button>
                            </>
                        ) : (
                            <Link to="/login" className="btn-primary text-center" onClick={() => setIsOpen(false)}>Login</Link>
                        )}
                    </div>
                </div>
            )}
        </nav>
    );
};



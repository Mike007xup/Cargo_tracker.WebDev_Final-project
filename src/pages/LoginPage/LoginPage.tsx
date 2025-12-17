import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Anchor, Eye, EyeOff, AlertCircle, ShieldCheck } from 'lucide-react';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [rememberMe, setRememberMe] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const { login, isAuthenticated } = useAuth();
    const navigate = useNavigate();
    const location = useLocation();

    useEffect(() => {
        if (isAuthenticated) {
            const from = (location.state as any)?.from?.pathname || '/dashboard';
            navigate(from, { replace: true });
        }
    }, [isAuthenticated, navigate, location]);

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};
        if (!email.trim()) newErrors.email = 'Email is required';
        if (!password) newErrors.password = 'Password is required';
        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        setErrors({});
        try {
            await login(email, password);
            const from = (location.state as any)?.from?.pathname || '/dashboard';
            navigate(from, { replace: true });
        } catch (error: any) {
            setErrors({ submit: 'Authentication failed. Please check your credentials.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50">
            <div className="w-full max-w-md">
                {/* Brand */}
                <div className="text-center mb-8">
                    <Link to="/" className="inline-flex items-center gap-3 mb-2">
                        <Anchor className="text-color-accent" size={32} style={{ color: 'var(--color-accent)' }} />
                        <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                            CARGO TRACKER
                        </span>
                    </Link>
                    <p className="text-gray-500">Secure Admin & Staff Portal</p>
                </div>

                <div className="card">
                    <div className="flex justify-center mb-6">
                        <div className="p-4 bg-blue-50 rounded-full text-color-primary">
                            <ShieldCheck size={40} style={{ color: 'var(--color-primary)' }} />
                        </div>
                    </div>

                    <h1 className="text-2xl font-bold text-center mb-8" style={{ color: 'var(--color-primary)' }}>
                        Staff Login
                    </h1>

                    {errors.submit && (
                        <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg text-sm flex items-center gap-3">
                            <AlertCircle size={20} />
                            {errors.submit}
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Email Address
                            </label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className={errors.email ? 'border-red-500' : ''}
                                placeholder="name@company.sn"
                                disabled={loading}
                            />
                            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-gray-700 mb-2">
                                Access Password
                            </label>
                            <div className="relative">
                                <input
                                    type={showPassword ? 'text' : 'password'}
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className={errors.password ? 'border-red-500' : ''}
                                    placeholder="••••••••"
                                    disabled={loading}
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                                >
                                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                                </button>
                            </div>
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                        </div>

                        <div className="flex items-center justify-between">
                            <label className="flex items-center gap-2 cursor-pointer">
                                <input
                                    type="checkbox"
                                    checked={rememberMe}
                                    onChange={(e) => setRememberMe(e.target.checked)}
                                    className="w-4 h-4 rounded"
                                />
                                <span className="text-sm text-gray-600">Secure remember</span>
                            </label>
                            <Link to="/forgot-password" style={{ color: 'var(--color-primary)' }} className="text-sm hover:underline">
                                Forgot Access?
                            </Link>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary w-full py-3 text-lg"
                        >
                            {loading ? 'Authenticating...' : 'Sign In to Portal'}
                        </button>
                    </form>

                    <div className="mt-8 text-center text-sm text-gray-500">
                        Operational status: <span className="text-green-600 font-bold">● Active</span>
                    </div>
                </div>

                <p className="mt-8 text-center text-xs text-gray-400">
                    Proprietary system for authorized personnel only.
                    Unauthorized access is strictly prohibited.
                </p>
            </div>
        </div>
    );
};

export default LoginPage;



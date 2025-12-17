import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';
import { Anchor, Eye, EyeOff, ShieldCheck } from 'lucide-react';
import { Navbar } from '../../components/Navbar';

const RegisterPage = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        company: '',
        password: '',
        confirmPassword: '',
    });
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});
    const [loading, setLoading] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const { register } = useAuth();
    const navigate = useNavigate();

    const validateEmail = (email: string): boolean => {
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return regex.test(email);
    };

    const validate = (): boolean => {
        const newErrors: Record<string, string> = {};

        if (!formData.name.trim()) newErrors.name = 'Full name is required';
        if (!formData.email.trim()) {
            newErrors.email = 'Email is required';
        } else if (!validateEmail(formData.email)) {
            newErrors.email = 'Invalid email format';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        } else if (formData.password.length < 8) {
            newErrors.password = 'Password must be at least 8 characters';
        }
        if (formData.password !== formData.confirmPassword) {
            newErrors.confirmPassword = 'Passwords do not match';
        }
        if (!agreedToTerms) {
            newErrors.terms = 'You must agree to the Terms & Conditions';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;

        setLoading(true);
        try {
            await register(formData.email, formData.password, formData.name);
            navigate('/dashboard');
        } catch (error: any) {
            setErrors({ submit: 'Registration failed. Please try again.' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-50">
            <Navbar />
            <div className="pt-32 pb-12 flex items-center justify-center px-4">
                <div className="w-full max-w-md">
                    <div className="text-center mb-8">
                        <Link to="/" className="inline-flex items-center gap-3 mb-2">
                            <Anchor className="text-color-accent" size={32} style={{ color: 'var(--color-accent)' }} />
                            <span className="text-2xl font-bold" style={{ color: 'var(--color-primary)' }}>
                                CARGO TRACKER
                            </span>
                        </Link>
                        <p className="text-gray-500">Global Logistics Portfolio</p>
                    </div>

                    <div className="card">
                        <div className="flex justify-center mb-6">
                            <div className="p-4 bg-blue-50 rounded-full text-color-primary">
                                <ShieldCheck size={40} style={{ color: 'var(--color-primary)' }} />
                            </div>
                        </div>

                        <h1 className="text-2xl font-bold text-center mb-8" style={{ color: 'var(--color-primary)' }}>
                            Operator Registration
                        </h1>

                        {errors.submit && (
                            <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-lg text-sm font-bold">
                                {errors.submit}
                            </div>
                        )}

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <InputGroup label="FULL NAME" value={formData.name} onChange={(v: string) => setFormData({ ...formData, name: v })} error={errors.name} placeholder="John Doe" />
                            <InputGroup label="OFFICIAL EMAIL" value={formData.email} onChange={(v: string) => setFormData({ ...formData, email: v })} error={errors.email} placeholder="name@company.sn" type="email" />

                            <div className="grid grid-cols-2 gap-4">
                                <InputGroup label="PHONE" value={formData.phone} onChange={(v: string) => setFormData({ ...formData, phone: v })} placeholder="+221 ..." />
                                <InputGroup label="COMPANY" value={formData.company} onChange={(v: string) => setFormData({ ...formData, company: v })} placeholder="Global Ltd" />
                            </div>

                            <PasswordInput label="ACCESS PASSWORD" value={formData.password} onChange={(v: string) => setFormData({ ...formData, password: v })} error={errors.password} show={showPassword} setShow={setShowPassword} />
                            <PasswordInput label="CONFIRM ACCESS" value={formData.confirmPassword} onChange={(v: string) => setFormData({ ...formData, confirmPassword: v })} error={errors.confirmPassword} show={showConfirmPassword} setShow={setShowConfirmPassword} />

                            <div className="flex items-center gap-2 mt-4">
                                <input type="checkbox" id="terms" checked={agreedToTerms} onChange={(e) => setAgreedToTerms(e.target.checked)} className="w-4 h-4 rounded" />
                                <label htmlFor="terms" className="text-xs text-gray-600">I agree to the <Link to="/terms" className="text-color-primary font-bold" style={{ color: 'var(--color-primary)' }}>Terms & Conditions</Link></label>
                            </div>
                            {errors.terms && <p className="text-red-500 text-[10px] mt-1 font-bold">{errors.terms}</p>}

                            <button type="submit" disabled={loading} className="btn-primary w-full py-4 mt-4 text-xs font-black tracking-widest uppercase">
                                {loading ? 'INITIATING REGISTRY...' : 'CREATE OPERATOR ACCOUNT'}
                            </button>
                        </form>

                        <div className="mt-8 text-center text-sm text-gray-500">
                            Already have an account? <Link to="/login" className="font-bold hover:underline" style={{ color: 'var(--color-primary)' }}>Login</Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const InputGroup = ({ label, value, onChange, error, placeholder, type = "text" }: any) => (
    <div>
        <label className="block text-[10px] font-black text-gray-400 mb-1 tracking-widest">{label}</label>
        <input type={type} value={value} onChange={(e) => onChange(e.target.value)} className={`w-full h-11 px-4 bg-gray-50 border-soft text-sm font-bold ${error ? 'border-red-500' : ''}`} placeholder={placeholder} />
        {error && <p className="text-red-500 text-[10px] mt-1 font-bold">{error}</p>}
    </div>
);

const PasswordInput = ({ label, value, onChange, error, show, setShow, placeholder = "••••••••" }: any) => (
    <div>
        <label className="block text-[10px] font-black text-gray-400 mb-1 tracking-widest">{label}</label>
        <div className="relative">
            <input type={show ? 'text' : 'password'} value={value} onChange={(e) => onChange(e.target.value)} className={`w-full h-11 px-4 bg-gray-50 border-soft text-sm font-bold ${error ? 'border-red-500' : ''}`} placeholder={placeholder} />
            <button type="button" onClick={() => setShow(!show)} className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                {show ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
        </div>
        {error && <p className="text-red-500 text-[10px] mt-1 font-bold">{error}</p>}
    </div>
);

export default RegisterPage;

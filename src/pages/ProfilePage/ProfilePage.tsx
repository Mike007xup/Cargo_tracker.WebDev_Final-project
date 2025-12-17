import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { useAuth } from '../../contexts/AuthContext';
import { User, Lock, Settings, Save, Edit2, Shield } from 'lucide-react';

const ProfilePage = () => {
    const { user } = useAuth();
    const [activeTab, setActiveTab] = useState<'personal' | 'security' | 'prefs'>('personal');
    const [editing, setEditing] = useState(false);
    const [formData, setFormData] = useState({
        name: user?.name || '',
        email: user?.email || '',
        phone: '+221 77 123 4567',
        company: 'Dakar Port Authority',
    });

    const tabs = [
        { id: 'personal' as const, label: 'Identity', icon: <User size={18} /> },
        { id: 'security' as const, label: 'Security', icon: <Shield size={18} /> },
        { id: 'prefs' as const, label: 'System', icon: <Settings size={18} /> },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="pt-32 container pb-12">
                <div className="card mb-8 overflow-hidden">
                    <div className="bg-color-primary p-8 -m-8 mb-8 flex items-center gap-6 text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
                        <div className="w-20 h-20 rounded-full border-4 border-white/20 flex items-center justify-center text-4xl font-black bg-white/10">
                            {user?.name?.charAt(0).toUpperCase() || 'P'}
                        </div>
                        <div>
                            <h1 className="text-3xl font-black tracking-tight">{user?.name || 'Authorized Personnel'}</h1>
                            <p className="text-white/60 font-bold text-xs uppercase tracking-widest">{user?.email}</p>
                        </div>
                    </div>

                    <div className="flex gap-2 p-1 bg-gray-100 rounded-xl mb-8 w-fit">
                        {tabs.map(t => (
                            <button
                                key={t.id}
                                onClick={() => setActiveTab(t.id)}
                                className={`flex items-center gap-2 px-6 py-2 rounded-lg font-bold text-sm transition-all ${activeTab === t.id ? 'bg-white text-color-primary shadow-sm' : 'text-gray-500 hover:text-gray-700'
                                    }`}
                                style={activeTab === t.id ? { color: 'var(--color-primary)' } : {}}
                            >
                                {t.icon} {t.label}
                            </button>
                        ))}
                    </div>

                    <div className="max-w-xl">
                        {activeTab === 'personal' && (
                            <div className="space-y-6">
                                <div className="flex justify-between items-center mb-4">
                                    <h3 className="font-black text-gray-400 uppercase tracking-widest text-xs">Profile Credentials</h3>
                                    <button onClick={() => setEditing(!editing)} className="text-color-primary font-bold text-xs flex items-center gap-1" style={{ color: 'var(--color-primary)' }}>
                                        <Edit2 size={14} /> {editing ? 'DISCARD' : 'MODIFY'}
                                    </button>
                                </div>
                                <div className="grid gap-4">
                                    <InputBlock label="FULL NAME" value={formData.name} disabled={!editing} />
                                    <InputBlock label="EMAIL ADDRESS" value={formData.email} disabled={!editing} />
                                    <InputBlock label="CONTACT PHONE" value={formData.phone} disabled={!editing} />
                                    <InputBlock label="ORGANIZATION" value={formData.company} disabled={!editing} />
                                </div>
                                {editing && <button className="btn-primary w-fit flex items-center gap-2 mt-4"><Save size={18} /> SAVE CHANGES</button>}
                            </div>
                        )}

                        {activeTab === 'security' && (
                            <div className="space-y-6">
                                <h3 className="font-black text-gray-400 uppercase tracking-widest text-xs">Authentication Guard</h3>
                                <div className="grid gap-4">
                                    <InputBlock label="CURRENT PASSWORD" type="password" placeholder="••••••••" />
                                    <InputBlock label="NEW SECURE PASSWORD" type="password" />
                                    <InputBlock label="CONFIRM NEW PASSWORD" type="password" />
                                </div>
                                <button className="btn-primary w-fit mt-4">UPDATE SECURITY KEYS</button>
                            </div>
                        )}

                        {activeTab === 'prefs' && (
                            <div className="space-y-6">
                                <h3 className="font-black text-gray-400 uppercase tracking-widest text-xs">System Environment</h3>
                                <div className="space-y-3">
                                    <Toggle label="Email Tracking Reports" checked />
                                    <Toggle label="SMS Arrival Notifications" checked />
                                    <Toggle label="Real-Time Vessel Telemetry" checked />
                                    <Toggle label="Security Audit Emails" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

const InputBlock = ({ label, ...props }: any) => (
    <div>
        <label className="block text-[10px] font-black text-gray-400 mb-1 tracking-widest">{label}</label>
        <input className="w-full h-10 px-4 bg-gray-50 border-soft font-bold text-sm" {...props} />
    </div>
);

const Toggle = ({ label, checked }: { label: string, checked?: boolean }) => (
    <label className="flex items-center justify-between p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
        <span className="font-bold text-sm text-gray-700">{label}</span>
        <input type="checkbox" defaultChecked={checked} className="w-5 h-5 accent-color-primary cursor-pointer" />
    </label>
);

export default ProfilePage;

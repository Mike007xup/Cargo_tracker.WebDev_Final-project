import React, { useEffect, useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { getAllShipments, Shipment } from '../../services/shipmentService';
import { useAuth } from '../../contexts/AuthContext';
import { Ship, Package, Users, AlertCircle, LayoutDashboard, Plus } from 'lucide-react';

const AdminDashboardPage = () => {
    const { logout } = useAuth();
    const navigate = useNavigate();
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadData();
    }, []);

    const loadData = async () => {
        try {
            const data = await getAllShipments();
            setShipments(data);
        } catch (e) { console.error(e); } finally { setLoading(false); }
    };

    const stats = [
        { label: 'Total Vessels', val: 47, icon: <Ship />, color: 'var(--color-primary)' },
        { label: 'Active Cargo', val: shipments.length, icon: <Package />, color: 'var(--color-secondary)' },
        { label: 'Port Users', val: 230, icon: <Users />, color: 'var(--color-primary)' },
        { label: 'Alerts', val: 3, icon: <AlertCircle />, color: 'var(--color-accent)' },
    ];

    const getStatusClass = (s: string) => `status ${s.toLowerCase().replace(' ', '-')}`;

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="pt-32 container pb-12">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold" style={{ color: 'var(--color-primary)' }}>PORT CONTROL CENTER</h1>
                        <p className="text-gray-500">Global Logistics Management System</p>
                    </div>
                    <button onClick={() => navigate('/admin/vessels')} className="btn-primary flex items-center gap-2">
                        <Plus size={18} /> REGISTER VESSEL
                    </button>
                </div>

                <div className="grid md:grid-cols-4 gap-6 mb-10">
                    {stats.map((s, i) => (
                        <div key={i} className="card text-center hover:translate-y-[-5px]">
                            <div className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4" style={{ backgroundColor: `${s.color}15`, color: s.color }}>
                                {s.icon}
                            </div>
                            <div className="text-3xl font-bold" style={{ color: 'var(--color-primary)' }}>{s.val}</div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest">{s.label}</div>
                        </div>
                    ))}
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    <div className="lg:col-span-2">
                        <div className="card p-0 overflow-hidden">
                            <div className="p-4 border-b border-soft bg-white font-bold flex justify-between items-center">
                                <span>LATEST SHIPMENTS</span>
                                <Link to="/dashboard" className="text-xs text-color-primary hover:underline" style={{ color: 'var(--color-primary)' }}>VIEW ALL</Link>
                            </div>
                            <table className="w-full text-left">
                                <thead className="bg-gray-50 text-xs font-bold text-gray-500 border-b border-soft">
                                    <tr>
                                        <th className="p-4">CODE</th>
                                        <th className="p-4">VESSEL</th>
                                        <th className="p-4">STATUS</th>
                                        <th className="p-4">ETA</th>
                                    </tr>
                                </thead>
                                <tbody className="divide-y divide-soft text-sm">
                                    {shipments.slice(0, 8).map(s => (
                                        <tr key={s.code} className="hover:bg-gray-50">
                                            <td className="p-4 font-mono font-bold">{s.code}</td>
                                            <td className="p-4">{s.vessel.name}</td>
                                            <td className="p-4"><span className={getStatusClass(s.status)}>{s.status}</span></td>
                                            <td className="p-4 font-bold">{new Date(s.eta).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>

                    <div className="space-y-6">
                        <div className="card">
                            <h3 className="font-bold mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                                <LayoutDashboard size={18} /> QUICK TOOLS
                            </h3>
                            <div className="space-y-2">
                                <button className="btn-secondary w-full text-left text-sm py-2">System Audit Logs</button>
                                <button className="btn-secondary w-full text-left text-sm py-2">Vessel Manifests</button>
                                <button className="btn-secondary w-full text-left text-sm py-2">User Access Control</button>
                                <button className="btn-secondary w-full text-left text-sm py-2">Port Schedules</button>
                            </div>
                        </div>

                        <div className="card bg-color-primary text-white" style={{ backgroundColor: 'var(--color-primary)' }}>
                            <h3 className="font-bold mb-2">SYSTEM STATUS</h3>
                            <div className="flex items-center gap-2 text-sm text-green-300 font-bold mb-4">
                                <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                                OPERATIONAL
                            </div>
                            <p className="text-xs text-white/60">Server Time: {new Date().toLocaleTimeString()}</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;

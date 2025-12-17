import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { useAuth } from '../../contexts/AuthContext';
import { getAllShipments, Shipment } from '../../services/shipmentService';
import { Ship, Package, Clock, Search, Eye, Filter, Anchor } from 'lucide-react';

const DashboardPage = () => {
    const { user } = useAuth();
    const [shipments, setShipments] = useState<Shipment[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState('');
    const [filter, setFilter] = useState<string>('all');

    useEffect(() => {
        loadShipments();
        const interval = setInterval(loadShipments, 30000);
        return () => clearInterval(interval);
    }, []);

    const loadShipments = async () => {
        try {
            const data = await getAllShipments();
            setShipments(data);
        } catch (e) { console.error(e); } finally { setLoading(false); }
    };

    const filtered = shipments.filter(s => {
        const match = s.code.toLowerCase().includes(searchQuery.toLowerCase()) ||
            s.vessel.name.toLowerCase().includes(searchQuery.toLowerCase());
        const matchFilter = filter === 'all' || s.status.toLowerCase() === filter;
        return match && matchFilter;
    });

    const getStatusClass = (s: string) => `status ${s.toLowerCase().replace(' ', '-')}`;

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="pt-32 container pb-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-4 mb-8">
                    <div>
                        <h1 className="text-3xl font-extrabold" style={{ color: 'var(--color-primary)' }}>
                            Welcome, {user?.name || 'Client'}
                        </h1>
                        <p className="text-gray-500">Managing {shipments.length} active consignments</p>
                    </div>
                    <div className="flex gap-4 w-full md:w-auto">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Tracking ID..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="pl-10 h-10 w-full md:w-64"
                            />
                        </div>
                        <select value={filter} onChange={(e) => setFilter(e.target.value)} className="h-10 border-soft">
                            <option value="all">All Status</option>
                            <option value="in transit">In Transit</option>
                            <option value="arrived">Arrived</option>
                            <option value="delivered">Delivered</option>
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-20"><div className="animate-spin h-10 w-10 border-4 border-color-primary border-t-transparent rounded-full mx-auto" /></div>
                ) : filtered.length === 0 ? (
                    <div className="card text-center py-12">
                        <Package size={48} className="mx-auto text-gray-300 mb-4" />
                        <p>No shipments matching your search.</p>
                    </div>
                ) : (
                    <div className="card p-0 overflow-hidden">
                        <table className="w-full text-left bg-white">
                            <thead className="bg-gray-50 text-xs font-bold uppercase text-gray-500 border-b border-soft">
                                <tr>
                                    <th className="p-4">Tracking Code</th>
                                    <th className="p-4">Vessel</th>
                                    <th className="p-4">Destination</th>
                                    <th className="p-4">Status</th>
                                    <th className="p-4">ETA</th>
                                    <th className="p-4 text-center">Action</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-soft">
                                {filtered.map(s => (
                                    <tr key={s.code} className="hover:bg-blue-50/30 transition-colors">
                                        <td className="p-4 font-mono font-bold text-sm">{s.code}</td>
                                        <td className="p-4 flex items-center gap-2">
                                            <Anchor size={16} className="text-color-primary" />
                                            {s.vessel.name}
                                        </td>
                                        <td className="p-4 text-sm">{s.destination}</td>
                                        <td className="p-4"><span className={getStatusClass(s.status)}>{s.status}</span></td>
                                        <td className="p-4 text-sm font-bold">{new Date(s.eta).toLocaleDateString()}</td>
                                        <td className="p-4 text-center">
                                            <Link to={`/shipments/${s.code}`} className="btn-primary py-1 px-4 text-xs">VIEW</Link>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DashboardPage;

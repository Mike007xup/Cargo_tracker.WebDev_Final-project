import React, { useState } from 'react';
import { Navbar } from '../../components/Navbar';
import { Ship, Plus, Edit, Trash2, Search, Filter, Anchor } from 'lucide-react';

const AdminVesselsPage = () => {
    const [searchQuery, setSearchQuery] = useState('');
    const [showAddModal, setShowAddModal] = useState(false);

    const vessels = [
        { id: '1', name: 'MV GLOBAL STAR', imo: 'IMO 9123456', status: 'Active', flag: 'Senegal', type: 'Container' },
        { id: '2', name: 'MV DAKAR FALCON', imo: 'IMO 9654321', status: 'At Port', flag: 'Panama', type: 'Bulk Carrier' },
        { id: '3', name: 'MV ATLANTIC PRIDE', imo: 'IMO 8765432', status: 'Active', flag: 'Liberia', type: 'Oil Tanker' },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="pt-32 container pb-12">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-10">
                    <div>
                        <h1 className="text-3xl font-extrabold" style={{ color: 'var(--color-primary)' }}>FLEET REGISTRY</h1>
                        <p className="text-gray-500">Manage and monitor authorized port vessels</p>
                    </div>
                    <div className="flex gap-4">
                        <button onClick={() => setShowAddModal(true)} className="btn-primary flex items-center gap-2">
                            <Plus size={18} /> REGISTER VESSEL
                        </button>
                    </div>
                </div>

                <div className="card mb-8">
                    <div className="flex flex-wrap gap-4">
                        <div className="flex-1 min-w-[300px] relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                            <input
                                type="text"
                                placeholder="Search by name, IMO or flag..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full pl-10 h-10 border-soft"
                            />
                        </div>
                        <div className="flex items-center gap-2">
                            <Filter size={18} className="text-gray-400" />
                            <select className="h-10 border-soft text-sm font-bold">
                                <option>Filter: All Vessels</option>
                                <option>Active Only</option>
                                <option>In Maintenance</option>
                            </select>
                        </div>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {vessels.map((vessel) => (
                        <div key={vessel.id} className="card hover:translate-y-[-5px] transition-all group overflow-hidden">
                            <div className="h-40 bg-gray-100 relative overflow-hidden">
                                <img
                                    src="/images/vessel_ops.png"
                                    alt="Vessel"
                                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 opacity-60 group-hover:opacity-100"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                                <div className="absolute top-4 right-4"><span className={`status ${vessel.status.toLowerCase().replace(' ', '-')}`}>{vessel.status}</span></div>
                            </div>
                            <div className="mb-6">
                                <h3 className="text-xl font-bold mb-1" style={{ color: 'var(--color-primary)' }}>{vessel.name}</h3>
                                <div className="space-y-1">
                                    <div className="flex justify-between text-xs font-bold text-gray-400"><span>REGISTRY</span> <span className="text-gray-700">{vessel.imo}</span></div>
                                    <div className="flex justify-between text-xs font-bold text-gray-400"><span>TYPE</span> <span className="text-gray-700">{vessel.type}</span></div>
                                    <div className="flex justify-between text-xs font-bold text-gray-400"><span>FLAG</span> <span className="text-gray-700">{vessel.flag}</span></div>
                                </div>
                            </div>
                            <div className="flex gap-2">
                                <button className="btn-secondary flex-1 text-xs py-2 flex items-center justify-center gap-2"><Edit size={14} /> EDIT</button>
                                <button className="btn-secondary flex-1 text-xs py-2 text-red-500 flex items-center justify-center gap-2 hover:bg-red-50 hover:border-red-200"><Trash2 size={14} /> RETIRE</button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {showAddModal && (
                <div className="fixed inset-0 bg-blue-900/40 backdrop-blur-sm flex items-center justify-center z-[100] p-4">
                    <div className="card max-w-lg w-full shadow-2xl animate-in fade-in zoom-in duration-200">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-black" style={{ color: 'var(--color-primary)' }}>VESSEL REGISTRATION</h2>
                            <button onClick={() => setShowAddModal(false)} className="text-gray-400 hover:text-gray-600 text-3xl">&times;</button>
                        </div>
                        <div className="space-y-5">
                            <InputBlock label="VESSEL NAME" placeholder="e.g. MV GLOBAL EXPRESS" />
                            <InputBlock label="IMO REGISTRY NUMBER" placeholder="IMO-1234567" />
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 mb-1 tracking-widest">VESSEL CATEGORY</label>
                                <select className="w-full h-10 px-4 bg-gray-50 border-soft font-bold text-sm">
                                    <option>Container Ship</option>
                                    <option>Bulk Carrier</option>
                                    <option>Tanker</option>
                                    <option>Cargo Frigate</option>
                                </select>
                            </div>
                            <div className="flex gap-4 pt-4">
                                <button onClick={() => setShowAddModal(false)} className="btn-secondary flex-1 py-3 text-xs font-bold">CANCEL</button>
                                <button className="btn-primary flex-1 py-3 text-xs font-bold">REGISTER FLEET</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

const InputBlock = ({ label, ...props }: any) => (
    <div>
        <label className="block text-[10px] font-black text-gray-400 mb-1 tracking-widest">{label}</label>
        <input className="w-full h-10 px-4 bg-gray-50 border-soft font-bold text-sm" {...props} />
    </div>
);

export default AdminVesselsPage;

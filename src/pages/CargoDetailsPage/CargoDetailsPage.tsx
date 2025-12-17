import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { StatusTimeline } from '../../components/StatusTimeline';
import { TrackingMap } from '../../components/TrackingMap';
import { getShipmentByCode, Shipment } from '../../services/shipmentService';
import { ArrowLeft, Package, MapPin, Calendar, FileText, History, Info, Anchor } from 'lucide-react';

const CargoDetailsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [shipment, setShipment] = useState<Shipment | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'map' | 'timeline' | 'docs'>('overview');

    useEffect(() => {
        if (!id) return;
        getShipmentByCode(id)
            .then(data => { setShipment(data); setLoading(false); })
            .catch(() => setLoading(false));
    }, [id]);

    if (loading) return <>
        <Navbar /><div className="pt-32 container text-center"><div className="animate-spin h-10 w-10 border-4 border-color-primary border-t-transparent rounded-full mx-auto" /></div>
    </>;

    if (!shipment) return <>
        <Navbar /><div className="pt-32 container text-center"><h2 className="text-2xl font-bold text-red-600 mb-4">Cargo Not Found</h2><Link to="/dashboard" className="btn-primary">Back to Registry</Link></div>
    </>;

    const tabs = [
        { id: 'overview' as const, label: 'Overview', icon: <Package size={18} /> },
        { id: 'timeline' as const, label: 'Timeline', icon: <History size={18} /> },
        { id: 'map' as const, label: 'Live Map', icon: <MapPin size={18} /> },
        { id: 'docs' as const, label: 'Docs', icon: <FileText size={18} /> },
    ];

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="pt-32 container pb-12">
                <div className="flex items-center justify-between mb-8">
                    <Link to="/dashboard" className="flex items-center gap-2 text-gray-500 hover:text-color-primary font-bold transition-colors">
                        <ArrowLeft size={20} /> BACK TO REGISTRY
                    </Link>
                    <div className="flex gap-3">
                        <button className="btn-secondary py-1 px-4 text-xs font-bold">EXPORT DATA</button>
                    </div>
                </div>

                <div className="card mb-8">
                    <div className="flex flex-wrap justify-between items-end gap-4">
                        <div>
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Tracking ID</div>
                            <h1 className="text-4xl font-black" style={{ color: 'var(--color-primary)' }}>{shipment.code}</h1>
                        </div>
                        <div className="text-right">
                            <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1">Status</div>
                            <span className={`status ${shipment.status.toLowerCase().replace(' ', '-')}`}>{shipment.status}</span>
                        </div>
                    </div>
                </div>

                <div className="grid lg:grid-cols-4 gap-8">
                    <div className="lg:col-span-1 space-y-4">
                        {tabs.map(t => (
                            <button
                                key={t.id}
                                onClick={() => setActiveTab(t.id)}
                                className={`w-full flex items-center gap-3 p-4 rounded-xl font-bold transition-all ${activeTab === t.id
                                        ? 'bg-color-primary text-white shadow-lg'
                                        : 'bg-white text-gray-500 hover:bg-white hover:text-color-primary shadow-sm'
                                    }`}
                                style={activeTab === t.id ? { backgroundColor: 'var(--color-primary)' } : {}}
                            >
                                {t.icon} {t.label}
                            </button>
                        ))}
                    </div>

                    <div className="lg:col-span-3">
                        <div className="card min-h-[500px]">
                            {activeTab === 'overview' && (
                                <div className="grid md:grid-cols-2 gap-10">
                                    <section>
                                        <h3 className="font-black text-lg mb-6 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}><Info size={18} /> SHIPMENT INTEL</h3>
                                        <div className="space-y-4">
                                            <DataPoint label="Consignor" value="Global Port Services Dakar" />
                                            <DataPoint label="Load Port" value={shipment.origin} />
                                            <DataPoint label="Discharge Port" value={shipment.destination} />
                                            <DataPoint label="Vessel" value={shipment.vessel.name} />
                                            <DataPoint label="IMO Registry" value={shipment.vessel.imo} />
                                        </div>
                                    </section>
                                    <section>
                                        <h3 className="font-black text-lg mb-6 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}><Anchor size={18} /> CARGO SPECS</h3>
                                        <div className="space-y-4">
                                            <DataPoint label="Gross Weight" value={shipment.specs.weight} />
                                            <DataPoint label="Volume" value={shipment.specs.volume} />
                                            <DataPoint label="Container #" value={shipment.specs.containerNumber} />
                                            <DataPoint label="ETA Schedule" value={new Date(shipment.eta).toLocaleDateString()} />
                                        </div>
                                    </section>
                                </div>
                            )}
                            {activeTab === 'timeline' && <StatusTimeline logs={shipment.history} />}
                            {activeTab === 'map' && (
                                <div className="h-[500px] rounded-xl overflow-hidden border-soft border-2">
                                    <TrackingMap currentLocation={shipment.currentLocation} vesselName={shipment.vessel.name} origin={shipment.origin} />
                                </div>
                            )}
                            {activeTab === 'docs' && (
                                <div className="space-y-4">
                                    <DocItem name="Master_BOL_001.pdf" />
                                    <DocItem name="Port_Health_Certificate.pdf" />
                                    <DocItem name="Customs_Release_Note.pdf" />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const DataPoint = ({ label, value }: { label: string, value: string }) => (
    <div className="flex justify-between items-center py-2 border-b border-soft last:border-0">
        <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{label}</span>
        <span className="font-bold text-gray-800">{value}</span>
    </div>
);

const DocItem = ({ name }: { name: string }) => (
    <div className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-blue-50 transition-colors">
        <div className="flex items-center gap-3">
            <FileText size={20} className="text-color-primary" style={{ color: 'var(--color-primary)' }} />
            <span className="font-bold text-sm">{name}</span>
        </div>
        <button className="text-xs font-black text-color-primary hover:underline" style={{ color: 'var(--color-primary)' }}>DOWNLOAD</button>
    </div>
);

export default CargoDetailsPage;

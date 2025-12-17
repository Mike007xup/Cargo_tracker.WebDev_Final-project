import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Navbar } from '../../components/Navbar';
import { StatusTimeline } from '../../components/StatusTimeline';
import { TrackingMap } from '../../components/TrackingMap';
import { getShipmentByCode, Shipment } from '../../services/shipmentService';
import { Ship, Anchor, Package, MapPin, Calendar, ArrowLeft, AlertCircle } from 'lucide-react';

const PublicTrackingPage = () => {
    const { trackingCode } = useParams<{ trackingCode: string }>();
    const [shipment, setShipment] = useState<Shipment | null>(null);
    const [status, setStatus] = useState<'loading' | 'error' | 'success'>('loading');

    useEffect(() => {
        if (!trackingCode) return;
        getShipmentByCode(trackingCode)
            .then(data => { setShipment(data); setStatus('success'); })
            .catch(() => setStatus('error'));
    }, [trackingCode]);

    if (status === 'loading') return (
        <>
            <Navbar />
            <div className="pt-32 container text-center">
                <Ship size={48} className="text-color-primary animate-bounce mx-auto mb-4" style={{ color: 'var(--color-primary)' }} />
                <p className="text-xl">Locating Shipment...</p>
            </div>
        </>
    );

    if (status === 'error' || !shipment) return (
        <>
            <Navbar />
            <div className="pt-32 container max-w-md text-center">
                <AlertCircle size={64} className="text-red-500 mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-4">Shipment Not Found</h2>
                <p className="text-gray-600 mb-8">The code "{trackingCode}" does not match our records.</p>
                <Link to="/" className="btn-primary flex items-center justify-center gap-2"><ArrowLeft size={18} /> Return Home</Link>
            </div>
        </>
    );

    const getStatusClass = (s: string) => `status ${s.toLowerCase().replace(' ', '-')}`;

    return (
        <div className="bg-gray-50 min-h-screen">
            <Navbar />
            <div className="pt-32 container pb-12">
                {/* Header */}
                <div className="flex flex-wrap justify-between items-end gap-4 mb-8">
                    <div>
                        <Link to="/" className="text-color-primary hover:underline text-sm font-bold flex items-center gap-1 mb-4" style={{ color: 'var(--color-primary)' }}>
                            <ArrowLeft size={16} /> BACK TO HOME
                        </Link>
                        <h1 className="text-4xl font-extrabold" style={{ color: 'var(--color-primary)' }}>
                            {shipment.vessel.name}
                        </h1>
                        <p className="text-gray-500 font-mono mt-1">CODE: {shipment.code}</p>
                    </div>
                    <span className={`${getStatusClass(shipment.status)} text-lg py-1 px-6`}>
                        {shipment.status}
                    </span>
                </div>

                <div className="grid lg:grid-cols-3 gap-8">
                    {/* Main Content */}
                    <div className="lg:col-span-2 space-y-8">
                        {/* Map */}
                        <div className="card p-0 overflow-hidden">
                            <div className="p-4 border-b border-soft bg-white font-bold flex items-center gap-2">
                                <MapPin size={18} /> Live Satellite Position
                            </div>
                            <div className="h-[450px]">
                                <TrackingMap
                                    currentLocation={shipment.currentLocation}
                                    vesselName={shipment.vessel.name}
                                    origin={shipment.origin}
                                />
                            </div>
                        </div>

                        {/* Details Cards */}
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="card">
                                <h3 className="font-bold border-b border-soft pb-2 mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                                    <Ship size={18} /> Vessel Info
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between"><span>IMO</span><span className="font-bold">{shipment.vessel.imo}</span></div>
                                    <div className="flex justify-between"><span>Type</span><span className="font-bold">{shipment.vessel.type}</span></div>
                                    <div className="flex justify-between"><span>Flag</span><span className="font-bold">{shipment.vessel.flag}</span></div>
                                </div>
                            </div>
                            <div className="card">
                                <h3 className="font-bold border-b border-soft pb-2 mb-4 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                                    <Package size={18} /> Cargo Specs
                                </h3>
                                <div className="space-y-2 text-sm">
                                    <div className="flex justify-between"><span>Weight</span><span className="font-bold">{shipment.specs.weight}</span></div>
                                    <div className="flex justify-between"><span>Containers</span><span className="font-bold">{shipment.specs.containerNumber}</span></div>
                                    <div className="flex justify-between"><span>Status</span><span className="font-bold">Operational</span></div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Timeline Sidebar */}
                    <div className="space-y-8">
                        <div className="card">
                            <h3 className="font-bold mb-6 flex items-center gap-2" style={{ color: 'var(--color-primary)' }}>
                                <Calendar size={18} /> Journey History
                            </h3>
                            <StatusTimeline logs={shipment.history} />
                        </div>

                        <div className="card bg-color-primary text-white" style={{ backgroundColor: 'var(--color-secondary)' }}>
                            <h3 className="font-bold mb-2">Need Help?</h3>
                            <p className="text-sm text-white/80 mb-4">Contact Port of Dakar Operations for detailed queries.</p>
                            <button className="btn-primary w-full">Support Desk</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default PublicTrackingPage;



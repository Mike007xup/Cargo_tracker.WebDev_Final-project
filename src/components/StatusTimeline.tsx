import React from 'react';
import { CheckCircle, Clock, MapPin, Package, Ship, Anchor } from 'lucide-react';

interface ShipmentHistory {
    status: string;
    location: string;
    description: string;
    date: string;
}

interface StatusTimelineProps {
    logs: ShipmentHistory[];
}

export const StatusTimeline: React.FC<StatusTimelineProps> = ({ logs }) => {
    const reversedLogs = [...logs].reverse();

    const getStatusIcon = (status: string) => {
        switch (status) {
            case 'Delivered': return <CheckCircle size={18} />;
            case 'In Transit': return <Ship size={18} />;
            case 'Arrived': return <Anchor size={18} />;
            case 'Pending': return <Clock size={18} />;
            default: return <Package size={18} />;
        }
    };

    const getStatusClass = (status: string) => {
        const base = status.toLowerCase().replace(' ', '-');
        return `status ${base}`;
    };

    return (
        <div className="relative py-4">
            <div className="absolute left-[19px] top-0 bottom-0 w-0.5 bg-gray-200" style={{ backgroundColor: 'var(--border-soft)' }} />

            <div className="space-y-10">
                {reversedLogs.map((log, index) => (
                    <div key={index} className="relative pl-12">
                        <div className="absolute left-0 top-0 w-10 h-10 rounded-full bg-white border-2 border-soft flex items-center justify-center z-10"
                            style={{ borderColor: 'var(--border-soft)', color: 'var(--color-primary)' }}>
                            {getStatusIcon(log.status)}
                        </div>

                        <div className="card" style={{ padding: '1rem' }}>
                            <div className="flex flex-wrap justify-between items-center gap-2 mb-2">
                                <span className={getStatusClass(log.status)}>{log.status}</span>
                                <time className="text-xs font-bold text-gray-400">
                                    {new Date(log.date).toLocaleDateString()}
                                </time>
                            </div>

                            <div className="flex items-center gap-2 text-sm font-bold mb-1" style={{ color: 'var(--color-primary)' }}>
                                <MapPin size={14} />
                                {log.location}
                            </div>
                            <p className="text-sm text-gray-600">{log.description}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

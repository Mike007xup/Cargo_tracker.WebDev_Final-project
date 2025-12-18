export interface Location {
    lat: number;
    lng: number;
}

export interface ShipmentHistory {
    date: string;
    status: string;
    location: string;
    description: string;
}

export interface Vessel {
    name: string;
    imo: string;
    flag: string;
    type: string;
}

export interface ShipmentSpecs {
    weight: string;
    volume: string;
    containerType: string;
    containerNumber: string;
}

export interface Shipment {
    code: string;
    origin: string;
    destination: string;
    status: 'Pending' | 'In Transit' | 'Arrived' | 'Delivered' | 'Delayed' | 'Customs Clearance';
    vessel: Vessel;
    eta: string;
    currentLocation: Location;
    history: ShipmentHistory[];
    specs: ShipmentSpecs;
    senderName?: string;
    receiverName?: string;
}

const MOCK_DATABASE: Shipment[] = [
    {
        code: "SHP-DKR-001",
        origin: "Shanghai, China",
        destination: "Port Autonome de Dakar (PAD)",
        status: "Delivered",
        vessel: {
            name: "MSC CAPO XO",
            imo: "IMO 9876543",
            flag: "Liberia",
            type: "Container Vessel"
        },
        eta: "2024-01-15",
        currentLocation: { lat: 14.6928, lng: -17.4467 },
        specs: {
            weight: "28,500 kg",
            volume: "67.7 m³",
            containerType: "40ft High Cube",
            containerNumber: "MSCU1234567"
        },
        senderName: "Shanghai International Logistics Co.",
        receiverName: "Senegal Logistics SARL",
        history: [
            {
                date: "2024-01-20",
                status: "Delivered",
                location: "Dakar Terminal",
                description: "Container cleared and collected by consignee"
            },
            {
                date: "2024-01-18",
                status: "Customs Clearance",
                location: "Dakar Port",
                description: "Customs inspection completed, ready for pickup"
            },
            {
                date: "2024-01-15",
                status: "Arrived",
                location: "Port Autonome de Dakar",
                description: "Vessel arrived at berth 12, container discharged"
            },
            {
                date: "2024-01-10",
                status: "In Transit",
                location: "Atlantic Ocean",
                description: "Vessel en route to Dakar, passing Canary Islands"
            },
            {
                date: "2024-01-05",
                status: "In Transit",
                location: "Indian Ocean",
                description: "Vessel departed from Shanghai port"
            },
            {
                date: "2024-01-01",
                status: "Pending",
                location: "Shanghai, China",
                description: "Cargo loaded, awaiting vessel departure"
            }
        ]
    },
    {
        code: "SHP-DKR-002",
        origin: "Le Havre, France",
        destination: "Port Autonome de Dakar (PAD)",
        status: "In Transit",
        vessel: {
            name: "CMA CGM DAKAR",
            imo: "IMO 8765432",
            flag: "France",
            type: "Container Vessel"
        },
        eta: "2024-02-05",
        currentLocation: { lat: 28.5, lng: -16.0 },
        specs: {
            weight: "32,000 kg",
            volume: "76.4 m³",
            containerType: "40ft Standard",
            containerNumber: "CMA9876543"
        },
        senderName: "Le Havre Shipping Lines",
        receiverName: "Dakar Import Export",
        history: [
            {
                date: "2024-01-25",
                status: "In Transit",
                location: "Near Canary Islands",
                description: "Vessel passing Canary Islands, expected arrival in 10 days"
            },
            {
                date: "2024-01-20",
                status: "In Transit",
                location: "Bay of Biscay",
                description: "Vessel navigating through Bay of Biscay"
            },
            {
                date: "2024-01-15",
                status: "In Transit",
                location: "English Channel",
                description: "Vessel departed from Le Havre port"
            },
            {
                date: "2024-01-12",
                status: "Pending",
                location: "Le Havre, France",
                description: "Cargo loaded, vessel preparing for departure"
            }
        ]
    },
    {
        code: "SHP-DKR-003",
        origin: "Shanghai, China",
        destination: "Port Autonome de Dakar (PAD)",
        status: "Pending",
        vessel: {
            name: "MAERSK SENEGAL",
            imo: "IMO 7654321",
            flag: "Denmark",
            type: "Container Vessel"
        },
        eta: "2024-03-10",
        currentLocation: { lat: 31.2304, lng: 121.4737 },
        specs: {
            weight: "24,800 kg",
            volume: "58.2 m³",
            containerType: "20ft Standard",
            containerNumber: "MAEU4567890"
        },
        senderName: "Shanghai Global Trading",
        receiverName: "West Africa Distribution Center",
        history: [
            {
                date: "2024-01-28",
                status: "Pending",
                location: "Shanghai Port",
                description: "Cargo received at terminal, awaiting vessel assignment"
            },
            {
                date: "2024-01-25",
                status: "Pending",
                location: "Shanghai, China",
                description: "Documentation processing and customs clearance"
            }
        ]
    }
];

export const getShipmentByCode = async (code: string): Promise<Shipment> => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            const shipment = MOCK_DATABASE.find(
                s => s.code.toLowerCase() === code.toLowerCase() ||
                    s.specs.containerNumber.toLowerCase() === code.toLowerCase()
            );
            if (shipment) {
                resolve(shipment);
            } else {
                reject(new Error(`Shipment with code "${code}" not found`));
            }
        }, 800);
    });
};

export const getAllShipments = async (): Promise<Shipment[]> => {
    return new Promise((resolve) => {
        setTimeout(() => resolve(MOCK_DATABASE), 500);
    });
};

export const getShipmentsByStatus = async (status: Shipment['status']): Promise<Shipment[]> => {
    return new Promise((resolve) => {
        setTimeout(() => {
            const filtered = MOCK_DATABASE.filter(s => s.status === status);
            resolve(filtered);
        }, 300);
    });
};


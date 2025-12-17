# Cargo Tracker: Senegal Port Authority Edition

A premium, high-performance logistics tracking application tailored for the **Port Autonome de Dakar (PAD)**. This application provides real-time "Intel" management for maritime shipments, vessels, and port operations using the exclusive **Senegal Port Theme**.

## Key Features

- **Live Vessel Tracking**: Real-time satellite positioning of maritime cargo.
- **Port Control Center**: Advanced administration dashboard for port operators.
- **Client Intel Registry**: Secure portal for consignees to monitor their shipment lifecycle.
- **Fleet Management**: Comprehensive registry for authorized port vessels.
- **Responsive Intel**: Optimized for both high-end desktop monitors and mobile field operations.

## Design System: Senegal Port Theme

The application utilizes a professional-grade color palette and design language:
- **Primary**: Deep Navy (#0B3C5D) - Represents stability and authority.
- **Secondary**: Emerald Green (#1D7044) - Represents successful delivery and growth.
- **Accent**: Port Gold (#D4AF37) - Used for critical status alerts and navigation highlights.
- **Typography**: Modern, bold sans-serif (Inter/Outfit) for maximum readability.

## Getting Started

### Prerequisites
- Node.js (v18+)
- PocketBase (Backend)

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the root with your PocketBase URL:
   ```env
   VITE_POCKETBASE_URL=http://127.0.0.1:8090
   ```

4. Run the development server:
   ```bash
   npm run dev
   ```

## Tech Stack

- **Frontend**: React 18, Vite, TypeScript
- **Styling**: Tailwind CSS (Optimized via custom `global.css` system)
- **Icons**: Lucide React
- **Maps**: React-Leaflet
- **Backend**: PocketBase SDK

## Project File Intel

### 📄 Pages [React.Page]
- **HomePage.tsx** (`React.Page`): Main Port Hub & Interactive Tracking.
- **LoginPage.tsx** (`React.Page`): Secure Security Access Portal.
- **RegisterPage.tsx** (`React.Page`): Official Operator Registry.
- **DashboardPage.tsx** (`React.Page`): Client Consignment Center.
- **AdminDashboardPage.tsx** (`React.Page`): Port Control Command Center.
- **CargoDetailsPage.tsx** (`React.Page`): Comprehensive Intel Hub.
- **ProfilePage.tsx** (`React.Page`): User Identity & Preferences.
- **AdminVesselsPage.tsx** (`React.Page`): Authorized Fleet Registry.
- **PublicTrackingPage.tsx** (`React.Page`): Live Cargo Status Results.

### 🏗️ Components [React.Component]
- **Navbar.tsx** (`React.Component`): Global Navigation System.
- **StatusTimeline.tsx** (`React.Component`): Vertical Shipment Status History.
- **TrackingMap.tsx** (`React.Component`): Satellite Map Visualization.
- **AdminRoute.tsx** (`React.Auth`): Administrative Control Gateway.
- **ProtectedRoute.tsx** (`React.Auth`): Secure Access Shield.

### 🎨 Styles [CSS.Theme]
- **variables.css** (`CSS.Variables`): Senegal Port Theme Design Tokens.
- **global.css** (`CSS.Global`): Premium Component Framework & Utilities.

### ⚙️ Services & Types [TS.Logic]
- **pb.ts** (`TS.Backend`): PocketBase Connection Protocol.
- **shipmentService.ts** (`TS.Service`): Shipment Intel Data Fetching.
- **users.ts** (`TS.Service`): User Identity Data Logic.
- **pocketbase.ts** (`TS.Types`): Type-Safe Schema Definitions.

---
*Created for the Port Autonome de Dakar Logistics Digitalization Initiative.*

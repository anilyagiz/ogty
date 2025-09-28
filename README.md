# Singularity AI SOC - Vehicle Security Operations Center

An advanced, AI-powered security operations center dashboard for monitoring and protecting connected and autonomous vehicle fleets.

![Singularity SOC Dashboard](images/dashboard-preview.png)

## Features

- **Real-time Fleet Monitoring**: Interactive OpenStreetMap integration showing global fleet status and threat alerts
- **Vehicle Systems Monitor**: Visual representation of vehicle component security status
- **AI-driven Threat Detection**: Advanced security agent monitoring with real-time alerting
- **Security Incident Timeline**: Chronological view of security events with severity ratings
- **Regulatory Compliance Tracking**: Track compliance with automotive cybersecurity standards
- **Attack Vector Analysis**: Visualization of common attack vectors affecting the fleet
- **CAN Bus Analysis**: Real-time monitoring of vehicle network communications
- **Weather & Location Intelligence**: Real-time weather data for Turkish cities with driving risk assessment
- **Multi-Stage Data Processing Pipeline**: End-to-end security data flow architecture
- **Anonymization & Normalization**: Privacy-preserving data processing capabilities
- **Machine Learning Profiling**: Behavioral analysis at vehicle, group and service levels 
- **Digital Twin Context**: Advanced context-based security analysis
- **Singularity Threat Intelligence**: Dedicated automotive security intelligence engine
- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Progressive Web App**: Can be installed and used offline
- **Interactive Notifications**: Real-time alerts for security incidents
- **Interactive Tours**: Guided explanations of security features and data flows

## Architecture

The Vehicle SOC platform integrates a sophisticated multi-stage data processing architecture:

### 1. Data Sources
- **Vehicles**: Telematics, CAN bus, and sensor data from connected vehicles
- **Application Servers**: Backend systems supporting vehicle services
- **Mobile Apps**: Driver and fleet management applications

### 2. Processing Pipeline
- **Anonymization & Normalization**: Privacy-preserving data processing
- **Big Data Processing**: Storage and management of normalized data with digital twin context
- **Machine Learning Profiling**: Behavioral analysis at multiple levels
- **Security Engines**: Dedicated threat detection and analysis engines
- **SIEM Integration**: Security event management and unified dashboard

### 3. Map & Location Features
- **OpenStreetMap Integration**: Real-time visualization of vehicle locations
- **Marker Clustering**: Efficient display of multiple vehicles in the same area
- **Vehicle Route Tracking**: Animated paths showing vehicle movements
- **Threat Zone Visualization**: Geographic display of security threat areas
- **Multiple Map Layers**: Switch between different map styles (Dark and Satellite)
- **Vehicle Search**: Quick search functionality to locate specific vehicles
- **Weather Risk Assessment**: Weather conditions with autonomous driving risk levels

## Technologies Used

- HTML5, CSS3, and JavaScript
- OpenStreetMap with Leaflet.js for interactive mapping
- Leaflet.markercluster for efficient vehicle clustering
- SVG and Canvas for visualizations
- Font Awesome for iconography
- Web Animations API
- Service Workers for offline support
- Progressive Web App (PWA) capabilities

## Getting Started

1. Clone this repository
2. Open `index.html` in your browser
3. Alternatively, serve using a local web server:
   ```
   python -m http.server 8000
   ```
   Then navigate to `http://localhost:8000`

## Installation as PWA

The dashboard can be installed as a Progressive Web App on supported browsers:

1. Visit the dashboard in a compatible browser (Chrome, Edge, Firefox, etc.)
2. Look for the install prompt in the address bar
3. Click "Install" to add it to your device

## Data Privacy Compliance

The Singularity Vehicle SOC is designed with privacy-by-design principles:

- All vehicle and user data is anonymized at the earliest possible stage
- Personal data is normalized and separated from security event processing
- Configurable data retention policies comply with GDPR and regional privacy regulations
- Auditable data processing ensures transparency and compliance

## License

MIT License - See LICENSE file for details

## About

This dashboard is a simulation demonstrating how an automotive security operations center might visualize and respond to cybersecurity threats in connected and autonomous vehicle fleets. It showcases UI/UX concepts and visualizations for vehicle security monitoring with an emphasis on data privacy and processing pipeline transparency.

## Contact

For more information, contact: info@singularitysoc.com 
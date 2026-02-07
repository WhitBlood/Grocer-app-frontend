// API Configuration
// Uses environment variable or falls back to relative URL
// This works because frontend and backend are on the same server

const API_BASE_URL = import.meta.env.VITE_API_URL || `${window.location.protocol}//${window.location.hostname}:8000`;

export default API_BASE_URL;

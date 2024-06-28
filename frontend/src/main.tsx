import { StrictMode } from 'react';

import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';

const googleApiKey = import.meta.env.VITE_GOOGLE_API_KEY;

const script = document.createElement('script');

script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}`;
script.async = true;

document.head.appendChild(script);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);

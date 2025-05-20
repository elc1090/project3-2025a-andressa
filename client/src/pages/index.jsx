import { createRoot } from 'react-dom/client';
import Flow from './Flow'; // Ou App, se for um App.js que usa Flow

import './index.css';

const container = document.querySelector('#app');
const root = createRoot(container);

root.render(<Flow />);

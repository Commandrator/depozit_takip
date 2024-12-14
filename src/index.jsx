import {StrictMode} from 'react';
import "./index.css"
import {createRoot} from 'react-dom/client';
import { routerProvider } from './router';
const root = createRoot(document.getElementById('root'));
root.render(<StrictMode children={routerProvider}/>);
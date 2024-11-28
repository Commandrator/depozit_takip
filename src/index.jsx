import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import { routerProvider } from './router';
const root = createRoot(document.getElementById('root'));
root.render(<StrictMode children={routerProvider}/>);
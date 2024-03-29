import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './components/App';
import { defineCustomElements } from 'protean-elements/loader';

defineCustomElements();

const rootElement = document.querySelector('#root') as HTMLDivElement;
const root = createRoot(rootElement);

root.render(
    <StrictMode>
        <App />
    </StrictMode>
);

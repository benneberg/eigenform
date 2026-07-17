import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import { SubstrateProvider } from './context/SubstrateContext.tsx';
import './index.css';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <SubstrateProvider>
      <App />
    </SubstrateProvider>
  </StrictMode>,
);

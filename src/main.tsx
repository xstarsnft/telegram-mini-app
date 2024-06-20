import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';
import { ContractProvider } from './components/ContractProvider';

const manifestUrl = 'https://xstarsnft.github.io/telegram-mini-app/tonconnect-manifest.json';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <ContractProvider>
      <App />
    </ContractProvider>
  </TonConnectUIProvider>
)

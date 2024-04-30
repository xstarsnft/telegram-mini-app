import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';
import { TonConnectUIProvider } from '@tonconnect/ui-react';

// this manifest is used temporarily for development purposes
// const manifestUrl = 'https://raw.githubusercontent.com/ton-community/tutorials/main/03-client/test/public/tonconnect-manifest.json';
// const manifestUrl = 'https://raw.githubusercontent.com/ton-connect/demo-dapp/master/public/tonconnect-manifest.json';
const manifestUrl = 'https://xstarsnft.github.io/telegram-mini-app/tonconnect-manifest.json';


ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
  <TonConnectUIProvider manifestUrl={manifestUrl}>
    <App />
  </TonConnectUIProvider>,
)

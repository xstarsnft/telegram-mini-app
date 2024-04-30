import './App.css';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from './hooks/useTonConnect';
import { useCounterContract } from './hooks/useCounterContract';

function App() {
  const { connected } = useTonConnect();
  const { info, countdown, address, sendStart, sendBid } = useCounterContract();

  return (
    <div className='App'>
      <div className='Container'>
        <TonConnectButton />

        <div className='Card'>
          <b>Counter Address</b>
          <div className='Hint'>{address?.slice(0, 30) + '...'}</div>
        </div>

        <div className='Card'>
          <b>Game state</b>
          <div>{info?.state ?? 'Loading...'}</div>
          <b>Expiration</b>
          <div>{info?.expiration.toString() ?? 'Loading...'}</div>
          <div>{countdown?.toFixed(2).toString() ?? 'Loading...'}</div>
          <b>Bank</b>
          <div>{info?.bank.toString() ?? 'Loading...'}</div>
        </div>

        {info?.state && info?.state == "PREPARED" &&
          <div className='Card'>
            <a
              className={`Button ${connected ? 'Active' : 'Disabled'}`}
              onClick={() => {
                sendStart();
              }}
            >
              Start
            </a>
          </div>
        }

        <div className='Card'>
          <a
            className={`Button ${connected ? 'Active' : 'Disabled'}`}
            onClick={() => {
              sendBid();
            }}
          >
            Bid
          </a>
        </div>
      </div>
    </div>
  );
}

export default App
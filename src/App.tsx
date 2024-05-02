import '@twa-dev/sdk';
import './App.css';
import { fromNano } from '@ton/core';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from './hooks/useTonConnect';
import { useCounterContract } from './hooks/useCounterContract';

function App() {
  const { sender, connected } = useTonConnect();
  const { info, countdown, address, sendStart, sendBid, sendWithdraw } = useCounterContract();

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
          {info?.state == "ONGOING" && countdown && countdown >= 0 &&
            <div>
              <b>Countdown</b>
              <div>{countdown?.toFixed(2).toString() ?? 'Loading...'}</div>
            </div>
          }
          <b>Bank</b>
          <div>{info?.bank ? fromNano(info?.bank).toString() + ' TON' : 'Loading...'}</div>
          {info?.state == "ONGOING" &&
            <div>
              <b>Challenger</b>
              <div>{info?.challenger?.toString() ?? 'Loading...'}</div>
              {sender?.address && info?.challenger?.equals(sender?.address) ?
                <div>This is you</div> :
                <div>This someone else. Bid to have a chance at winning</div>
              }
            </div>
          }
          {info?.state == "ENDED" &&
            <div>
              <b>Winner</b>
              <div>{info?.challenger?.toString() ?? 'Loading...'}</div>
              {sender?.address && info?.challenger?.equals(sender?.address) ?
                <div>This is you</div> :
                <div>This someone else</div>
              }
            </div>
          }
        </div>

        {info?.state &&
          <div className='Card'>
            {info?.state == "PREPARED" &&
              <a
                className={`Button ${connected ? 'Active' : 'Disabled'}`}
                onClick={() => {
                  sendStart();
                }}
              >
                Start
              </a>
            }
            {info?.state == "ONGOING" &&
              <a
                className={`Button ${connected ? 'Active' : 'Disabled'}`}
                onClick={() => {
                  sendBid();
                }}
              >
                Bid 0.01 TON
              </a>
            }
            {info?.state == "ENDED" && sender?.address && info?.challenger?.equals(sender?.address) &&
              <a
                className={`Button ${connected ? 'Active' : 'Disabled'}`}
                onClick={() => {
                  sendWithdraw();
                }}
              >
                Withdraw
              </a>
            }
          </div>
        }
      </div>
    </div>
  );
}

export default App
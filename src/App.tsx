import { useEffect, useState } from 'react';
import '@twa-dev/sdk';
import './App.css';
import { TonConnectButton } from '@tonconnect/ui-react';
import { useTonConnect } from './hooks/useTonConnect';
import { ContractProvider, useContract } from './components/ContractProvider';
import { Idle } from './components/Idle';
import { Ongoing } from './components/Ongoing';
import { Ended } from './components/Ended';

function App() {
  const { sender, connected } = useTonConnect();
  const { info, countdown } = useContract();
  const [rate, setRate] = useState<null | number>(null);

  useEffect(() => {
    function updateRate() {
      fetch('https://tonapi.io/v2/rates?tokens=ton&currencies=usd')
        .then(response => response.json())
        .then(data => setRate(Number(data['rates']['TON']['prices']['USD'])));
    }

    const interval = setInterval(() => {updateRate();}, 10000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ContractProvider>
      <div className='App'>
        <div className='Container'>
          <TonConnectButton />
          {
            (() => {
              if (info?.state == "ONGOING" && countdown) {
                if (countdown < -20) return <Idle connected={connected} rate={rate}/>
                else return <Ongoing connected={connected} is_challenger={!!(sender?.address && info?.challenger?.equals(sender?.address))} rate={rate}/>
              } else if (info?.state == "ENDED") return <Ended connected={connected} is_challenger={!!(sender?.address && info?.challenger?.equals(sender?.address))} rate={rate}/>
              else return <div/>
            })()
          }
        </div>
      </div>
    </ContractProvider>
  );
}

export default App
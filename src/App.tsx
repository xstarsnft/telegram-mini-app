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

  return (
    <ContractProvider>
      <div className='App'>
        <div className='Container'>
          <TonConnectButton />
          {
            (() => {
              if (info?.state == "ONGOING" && countdown) {
                if (countdown < -20) return <Idle connected={connected} bank={info.bank}/>
                else return <Ongoing connected={connected} is_challenger={!!(sender?.address && info?.challenger?.equals(sender?.address))}/>
              } else if (info?.state == "ENDED") return <Ended connected={connected} is_challenger={!!(sender?.address && info?.challenger?.equals(sender?.address))}/>
              else return <div/>
            })()
          }
        </div>
      </div>
    </ContractProvider>
  );
}

export default App
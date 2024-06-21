import { fromNano } from '@ton/core';
import { useContract } from './ContractProvider';

type Props = {
  connected: boolean,
  bank: bigint | null,
};

export function Idle({connected, bank}: Props) {
  const { info, sendBid } = useContract();

  return (
    <div>
      <div className='Card'>
        <b>Bank</b>
        <div>{bank ? fromNano(bank * 5n / 10n) + ' TON' : 'Loading...'}</div>
      </div>

      <div className='Card'>
        <p>Bid to claim for yourself</p>
        <a className={`Button ${connected ? 'Active' : 'Disabled'}`} onClick={() => sendBid()}>
          {fromNano(info.bid)} TON
        </a>
      </div>
    </div>
  )
}

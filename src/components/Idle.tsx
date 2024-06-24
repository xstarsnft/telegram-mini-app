import { fromNano } from '@ton/core';
import { useContract } from './ContractProvider';

type Props = {
  connected: boolean,
  rate: number | null,
};

export function Idle({connected, rate}: Props) {
  const { info, sendBid } = useContract();

  return (
    <div>
      <div className='Card'>
        <b>Bank</b>
        {info.bank
          ? <>
            <div>{fromNano(info.bank * 5n / 10n) + ' TON'}</div>
            <div>{rate ? '(' + (Number(fromNano(info.bank * 5n / 10n)) * rate).toFixed(2) + ' USD)' : ''}</div>
          </>
          : 'Loading...'
        }
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

import { fromNano } from '@ton/core';
import { useContract } from './ContractProvider';

type Props = {
  connected: boolean,
  is_challenger: boolean,
  rate: number | null,
};

export function Ongoing({connected, is_challenger, rate}: Props) {
  const { info, countdown, sendBid } = useContract();

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
      {
        (() => {
          if (!countdown) return <div>Loading...</div>
          else if (countdown < 0) return <div>'Resolving...'</div>
          else if (is_challenger) return <div>
            <div className='Card'>
              <b>You will win in {countdown?.toFixed(1) ?? 'Loading...'}</b>
            </div>
          </div>;
          else return <div>
            <div className='Card'>
              <div>Someone else has claimed</div>
              <div>They will win in {countdown?.toFixed(1) ?? 'Loading...'}</div>
            </div>

            <div className='Card'>
              <p>Bid to claim for yourself</p>
              <a className={`Button ${connected ? 'Active' : 'Disabled'}`} onClick={() => sendBid()}>
                {fromNano(info.bid)} TON
              </a>
            </div>
          </div>
        })()
      }
    </div>
  )
}

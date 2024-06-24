import { fromNano } from '@ton/core';
import { useContract } from './ContractProvider';

type Props = {
  connected: boolean,
  is_challenger: boolean,
  rate: number | null,
};

export function Ended({connected, is_challenger, rate}: Props) {
  const { info, countdown, sendWithdraw } = useContract();
  const remaining = countdown ? countdown + 120 : undefined;

  if (is_challenger && remaining && remaining > 0) return <>
    <div className='Card'>
      <b>Congratulations, you have won!</b>
      {info.bank
        ? <>
          <div>{fromNano(info.bank * 5n / 10n) + ' TON'}</div>
          <div>{rate ? '(' + (Number(fromNano(info.bank * 5n / 10n)) * rate).toFixed(2) + ' USD)' : ''}</div>
        </>
        : 'Loading...'
      }
    </div>
    <div className='Card'>
      <div>You have {remaining.toFixed(1)} seconds to withdraw.</div>
      <a
        className={`Button ${connected ? 'Active' : 'Disabled'}`}
        onClick={() => {
        sendWithdraw();
        }}
      >
        Withdraw
      </a>
    </div>
  </>
  else return <div className='Card'>
    <b>Game over!</b>
    <div>Game will restart shortly!</div>
    <div>Next bank: {info.bank ? fromNano(info.bank * (is_challenger ? 5n :4n) / 10n) + ' TON' : 'Loading...'}</div>
  </div>
}

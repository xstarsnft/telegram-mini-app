import { useEffect, useState } from 'react';
import { Info, PennyAuction } from '../contracts/tact_PennyAuction';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect';
import { Address, OpenedContract, toNano } from '@ton/core';

export function useCounterContract() {
  const client = useTonClient();
  const [info, setInfo] = useState<Info>({} as Info);
  const { sender } = useTonConnect();

  const contract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = PennyAuction.fromAddress(
      Address.parse('EQBt31E0iAW4Hw-PqXyaJu7oDCmfVyQ5DxhauTieofYsN_Ig')
    );
    return client.open(contract) as OpenedContract<PennyAuction>;
  }, [client]);

  useEffect(() => {
    async function getInfo() {
      console.log("QUERY");
      try {
        if (!contract) return;
        const info = await contract.getInfo();
        setInfo(info);
      } catch (e: unknown) {
        //
      }
    }

    if (contract) {
      const interval = setInterval(() => {
        getInfo();
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [contract]);

  return {
    info: info,
    address: contract?.address.toString(),
    sendStart: () => {
      return contract?.send(
        sender,
        {
          value: toNano('0.1'),
        },
        'start',
      );
    },
    sendBid: () => {
      return contract?.send(
        sender,
        {
          value: info.bid + toNano('0.01'),
        },
        'bid',
      );
    },
    sendWithdraw: () => {
      return contract?.send(
        sender,
        {
          value: toNano('0.01'),
        },
        'withdraw',
      );
    },
  };
}

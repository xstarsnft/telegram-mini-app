import { useEffect, useState } from 'react';
import { Info, SimpleCounter } from '../contracts/penny';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect';
import { Address, OpenedContract, toNano } from '@ton/core';

export function useCounterContract() {
  const client = useTonClient();
  const [info, setInfo] = useState<null | Info>();
  const { sender } = useTonConnect();

  const counterContract = useAsyncInitialize(async () => {
    if (!client) return;
    const contract = SimpleCounter.fromAddress(
      Address.parse('EQCdQwH3sxp_ziAyXQiAHYn8igJbwqM4_NDFRI92WOOlL1C6')
    );
    return client.open(contract) as OpenedContract<SimpleCounter>;
  }, [client]);

  useEffect(() => {
    async function getInfo() {
      console.log("QUERY");
      try {
        if (!counterContract) return;
        const info = await counterContract.getInfo();
        setInfo(info);
      } catch (e: unknown) {
        //
      }
    }

    if (counterContract) {
      const interval = setInterval(() => {
        getInfo();
      }, 2000);

      return () => clearInterval(interval);
    }
  }, [counterContract]);

  return {
    info: info,
    address: counterContract?.address.toString(),
    sendStart: () => {
      return counterContract?.send(
        sender,
        {
          value: toNano('0.1'),
        },
        'start',
      );
    },
    sendBid: () => {
      return counterContract?.send(
        sender,
        {
          value: toNano('0.1'),
        },
        'bid',
      );
    },
    sendWithdraw: () => {
      return counterContract?.send(
        sender,
        {
          value: toNano('0.1'),
        },
        'withdraw',
      );
    },
  };
}

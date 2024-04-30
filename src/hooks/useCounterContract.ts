import { useEffect, useState } from 'react';
import { Info, SimpleCounter } from '../contracts/penny';
import { useTonClient } from './useTonClient';
import { useAsyncInitialize } from './useAsyncInitialize';
import { useTonConnect } from './useTonConnect';
import { Address, OpenedContract, toNano } from '@ton/core';

export function useCounterContract() {
  const client = useTonClient();
  const [info, setInfo] = useState<null | Info>();
  const [countdown, setCountdown] = useState<null | number>();
  const { sender } = useTonConnect();

  const sleep = (time: number) => new Promise((resolve) => setTimeout(resolve, time));

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
        //   setInfo(null);
        const info = await counterContract.getInfo();
        setInfo(info);
        // const timestamp = new Date().getTime() / 1000;
        // setCountdown(Number(info.expiration) - timestamp);
      } catch (e: unknown) {
        // if (info) {
        //     console.log("FINALLY");
        //     const timestamp = new Date().getTime() / 1000;
        //     setCountdown(Number(info.expiration) - timestamp);
        // }
      }
      await sleep(1000); // sleep 5 seconds and poll value again
      await getInfo();
    }
    getInfo();
  }, [counterContract]);

  useEffect(() => {
    async function updateCountdown() {
        const timestamp = new Date().getTime() / 1000;
        if (info) {
            setCountdown(Number(info.expiration) - timestamp);
        }
        await sleep(100);
        await updateCountdown();
    }
    updateCountdown();
  });

  return {
    info: info,
    countdown: countdown,
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
  };
}

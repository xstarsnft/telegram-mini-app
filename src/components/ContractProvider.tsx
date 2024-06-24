import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { Info } from '../contracts/tact_PennyAuction';
import { useCounterContract } from '../hooks/useCounterContract';

interface IContractContext {
  info: Info,
  address: string | undefined,
  countdown: number | null | undefined,
  sendStart: () => Promise<void> | undefined,
  sendBid: () => Promise<void> | undefined,
  sendWithdraw: () => Promise<void> | undefined,
}

const ContractContext = createContext<IContractContext>({} as IContractContext);

type ContextProviderProps = {
  children?: ReactNode
}

export const ContractProvider = ({ children }: ContextProviderProps) => {
  const { info, address, sendStart, sendBid, sendWithdraw } = useCounterContract();
  const [countdown, setCountdown] = useState<null | number>();

  useEffect(() => {
    function updateCountdown() {
      const timestamp = new Date().getTime() / 1000;
      if (info) setCountdown(Number(info.expiration) - timestamp);
    }

    const interval = setInterval(() => {updateCountdown();}, 100);

    return () => clearInterval(interval);
  }, [info]);

  return (
    <ContractContext.Provider value={{ info, address, countdown, sendStart, sendBid, sendWithdraw }}>
      {children}
    </ContractContext.Provider>
  )
};

export const useContract = () => {
  return useContext(ContractContext);
};

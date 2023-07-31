import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { useObservable } from 'micro-observables';
import GasService from '../../../services/blockchain/GasService';

export default function Prices() {
  const gasService: GasService = getGlobalInstance(GasService);
  const gasPrice: number | undefined = useObservable(gasService.getGasPrice());
  const ethPrice: number | undefined = useObservable(gasService.getEthPrice());

  return (
    <div>
      <div>Gas : {gasPrice ?? ''} </div>
      <div>Eth : {ethPrice ?? ''} €</div>
    </div>
  );
}

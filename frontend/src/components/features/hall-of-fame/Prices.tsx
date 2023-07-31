import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { useObservable } from 'micro-observables';
import GasService from '../../../services/blockchain/GasService';

export default function Prices() {
  const gasService: GasService = getGlobalInstance(GasService);
  const gasPrice: number | undefined = useObservable(gasService.getGasPrice());
  const ethPrice: number | undefined = useObservable(gasService.getEthPrice());

  /**
   * Clean the eth price to have only 2 decimals
   * @param price
   */
  function cleanEthPrice(price: number | undefined): number | undefined {
    if (price) {
      return Math.round(price * 100) / 100;
    }
    return undefined;
  }

  return (
    <div>
      {gasPrice && (<div>Gas : {gasPrice} </div>)}
      {ethPrice && (<div>Eth : {cleanEthPrice(ethPrice)} €</div>)}
    </div>
  );
}

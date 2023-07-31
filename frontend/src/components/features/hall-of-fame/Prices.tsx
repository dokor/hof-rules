import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { useObservable } from 'micro-observables';
import GasService from '../../../services/blockchain/GasService';
import { buyGasUsage, giftGasUsage, sellGasUsage } from '../../../api/blockchain/gas/GasApi';

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
      {gasPrice && ethPrice && (<div>Gas Envoie : {(gasPrice * giftGasUsage * ethPrice).toFixed(2)} €</div>)}
      {gasPrice && ethPrice && (<div>Gas Vente : {(gasPrice * sellGasUsage * ethPrice).toFixed(2)} €</div>)}
      {gasPrice && ethPrice && (<div>Gas Achat : {(gasPrice * buyGasUsage * ethPrice).toFixed(2)} €</div>)}
      {ethPrice && (<div>Eth : {cleanEthPrice(ethPrice)} €</div>)}
    </div>
  );
}

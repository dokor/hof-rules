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

  /**
   * Calculate the gas price for each type of transaction
   * @param gasUsage
   */
  function calculateGasPrice(gasUsage: number): string | undefined {
    if (gasPrice && ethPrice) {
      return (gasPrice * gasUsage * ethPrice).toFixed(2);
    }
    return undefined;
  }

  return (
    <>
      {
        ethPrice ? (
            <div>
              {(<div>Eth : {cleanEthPrice(ethPrice)} €</div>)}
              {gasPrice && (<div>Echange : {calculateGasPrice(giftGasUsage)} €</div>)}
              {gasPrice && (<div>Vente : {calculateGasPrice(sellGasUsage)} €</div>)}
              {gasPrice && (<div>Achat : {calculateGasPrice(buyGasUsage)} €</div>)}
            </div>
        )
          : (<div>Chargement...</div>)
      }
    </>
  );
}

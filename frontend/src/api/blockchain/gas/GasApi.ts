import ApiHttpClient from '../../ApiHttpClient';

export const giftGasUsage = 5009;
export const sellGasUsage = 4987;
export const buyGasUsage = 13682;

export default class GasApi {

  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
  }

  // eslint-disable-next-line class-methods-use-this
  async fetchEthPrice() {
    return fetch('https://api.coinbase.com/v2/prices/ETH-EUR/spot')
      .then((response) => response.json());
  }

  // eslint-disable-next-line class-methods-use-this
  async fetchGasPrice() {
    return fetch('https://alpha-mainnet.starknet.io/feeder_gateway/get_block?blockNumber=pending')
      .then((response) => response.json());
  }

  // async fetchMaxGasPrice(event) {
  //   return fetch(`https://api.rules.art/v1/maximum-gas-price?for=${event}`)
  //     .then((response) => response.json());
  // }
}

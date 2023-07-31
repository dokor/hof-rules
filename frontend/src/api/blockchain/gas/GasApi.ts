export const giftGasUsage: number = 5009;
export const sellGasUsage: number = 4987;
export const buyGasUsage: number = 13682;

export default class GasApi {
  // eslint-disable-next-line @typescript-eslint/no-useless-constructor
  constructor() {
    // this constructor is empty
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
}

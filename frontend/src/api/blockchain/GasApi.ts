import ApiHttpClient from '../ApiHttpClient';

const giftGasUsage = 5009;
const sellGasUsage = 4987;
const buyGasUsage = 13682;

export default class GasApi {
  constructor(
    private readonly httpClient: ApiHttpClient,
  ) {
  }

  async fetchEthPrice() {
    return fetch('https://api.coinbase.com/v2/prices/ETH-EUR/spot')
      .then((response) => response.json());
  }

  async fetchGasPrice() {
    return fetch('https://alpha-mainnet.starknet.io/feeder_gateway/get_block?blockNumber=pending')
      .then((response) => response.json());
  }

  // async fetchMaxGasPrice(event) {
  //   return fetch(`https://api.rules.art/v1/maximum-gas-price?for=${event}`)
  //     .then((response) => response.json());
  // }
}

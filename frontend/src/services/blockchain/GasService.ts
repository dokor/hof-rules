import GasApi from '../../api/blockchain/GasApi';

export default class GasService {
  constructor(
    private readonly gasApi: GasApi,
  ) {
  }

  async getGasPrice(): Promise<number> {
    return parseInt((await this.gasApi.fetchGasPrice()).gas_price, 16);
  }

  async getEthPrice(): Promise<number> {
    return parseFloat((await this.gasApi.fetchEthPrice()).data.amount);
  }
}

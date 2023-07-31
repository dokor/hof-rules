import { Observable, observable, WritableObservable } from 'micro-observables';
import GasApi from '../../api/blockchain/gas/GasApi';

export default class GasService {
  private readonly gasPrice: WritableObservable<number | undefined>;

  private readonly ethPrice: WritableObservable<number | undefined>;

  constructor(
    private readonly gasApi: GasApi,
  ) {
    // will first, try to load from local storage.
    this.gasPrice = observable(undefined);
    this.ethPrice = observable(undefined);
    this.fetchGasPrice();
    this.fetchEthPrice();
  }

  fetchGasPrice(): void {
    this.gasApi.fetchGasPrice()
      .then((response) => {
        let gasPrice: number = parseInt(response.gas_price, 16);
        gasPrice /= 10 ** 18;
        this.gasPrice.set(gasPrice);
      });
  }

  fetchEthPrice(): void {
    this.gasApi.fetchEthPrice()
      .then((response) => this.ethPrice.set(parseFloat(response.data.amount)));
  }

  getGasPrice(): Observable<number | undefined> {
    return this.gasPrice.readOnly();
  }

  getEthPrice(): Observable<number | undefined> {
    return this.ethPrice.readOnly();
  }
}

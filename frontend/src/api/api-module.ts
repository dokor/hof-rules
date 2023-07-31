import { Injector } from 'plume-ts-di';
import ApiHttpClient from './ApiHttpClient';
import ApiHttpClientAuthenticated from './ApiHttpClientAuthenticated';
import SessionApi from './session/SessionApi';
import PlumeAdminHttpClient from '../lib/plume-admin-api/PlumeHttpClient';
import ScoresApi from './scores/ScoresApi';
import GasApi from './blockchain/gas/GasApi';

export default function installApiModule(injector: Injector) {
  injector.registerSingleton(ApiHttpClient);
  injector.registerSingleton(ApiHttpClientAuthenticated);
  injector.registerSingleton(ApiHttpClientAuthenticated, PlumeAdminHttpClient);
  injector.registerSingleton(SessionApi);

  injector.registerSingleton(ScoresApi);

  injector.registerSingleton(GasApi);
}

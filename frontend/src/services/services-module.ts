import { Scheduler } from 'simple-job-scheduler';
import { Injector } from 'plume-ts-di';
import SessionService from './session/SessionService';
import IdlenessDetector from '../lib/user-session/IdlenessDetector';
import BrowserPageActivityManager from '../lib/user-session/page-activity/BrowserPageActivityManager';
import PageActivityManager from '../lib/user-session/page-activity/PageActivityManager';
import BrowserUserActivityListener from '../lib/user-session/user-activity/BrowserUserActivityListener';
import ObservableNotificationEngine from '../lib/plume-notification/ObservableNotificationEngine';
import UserActivityListener from '../lib/user-session/user-activity/UserActivityListener';
import NotificationEngine from '../lib/plume-notification/NotificationEngine';
import ScoresService from './scores/ScoresService';
import SearchService from './search/SearchService';
import GasService from './blockchain/GasService';
import EnvironmentService from './utils/EnvironmentService';

export default function installServicesModule(injector: Injector) {
  // browser dependent services
  injector.registerSingleton(BrowserPageActivityManager, PageActivityManager);
  injector.registerSingleton(BrowserUserActivityListener, UserActivityListener);

  // internal services
  injector.registerSingleton(IdlenessDetector);
  injector.registerSingleton(SessionService);
  injector.registerSingleton(ObservableNotificationEngine);
  injector.registerSingleton(ObservableNotificationEngine, NotificationEngine);
  injector.registerSingleton(Scheduler);
  injector.registerSingleton(EnvironmentService);

  // metier
  injector.registerSingleton(ScoresService);
  injector.registerSingleton(SearchService);

  injector.registerSingleton(GasService);
}

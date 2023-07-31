import UserActivityListener from './UserActivityListener';

export default class NoneUserActivityListener implements UserActivityListener {
  // eslint-disable-next-line class-methods-use-this
  startUserActivityDetector(): void {
    // this method 'startUserActivityDetector' is empty
  }

  // eslint-disable-next-line class-methods-use-this
  stopUserActivityDetector(): void {
    // this method 'stopUserActivityDetector' is empty
  }
}

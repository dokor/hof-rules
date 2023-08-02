import { Observable, observable, WritableObservable } from 'micro-observables';
import ScoresApi, { UserProfile } from '../../api/scores/ScoresApi';
import Season from '../../api/scores/types/Season';

export default class ScoresService {
  private readonly firstSeasonScores: WritableObservable<UserProfile[]>;

  private readonly secondSesonScores: WritableObservable<UserProfile[]>;

  private readonly lastTimeRefreshed: WritableObservable<Date | undefined>;

  constructor(
    private readonly scoresApi: ScoresApi,
  ) {
    this.firstSeasonScores = observable([]);
    this.secondSesonScores = observable([]);
    this.lastTimeRefreshed = observable(undefined);
    this.init(Season.SEASON_1);
    this.init(Season.SEASON_2);
    this.lastTimeRefreshed.set(new Date());
  }

  fetchScores(season: Season) {
    if (season === Season.SEASON_1) {
      return this.firstSeasonScores.readOnly();
    }
    return this.secondSesonScores.readOnly();
  }

  init(season: Season) {
    if (season === Season.SEASON_1) {
      return this.scoresApi.fetchScores(season)
        .then((scores: UserProfile[]) => this.firstSeasonScores.set(scores));
    }
    return this.scoresApi.fetchScores(season)
      .then((scores: UserProfile[]) => this.secondSesonScores.set(scores));
  }

  refresh() {
    this.scoresApi.refresh()
      .then((response: Date) => {
        this.init(Season.SEASON_1);
        this.init(Season.SEASON_2);
        this.lastTimeRefreshed.set(response);
      });
  }

  getLastTimeRefreshed(): Observable<Date | undefined> {
    return this.lastTimeRefreshed.readOnly();
  }

  getUserRank(slug: string, season: Season): UserProfile | undefined {
    if (season === Season.SEASON_1 && this.firstSeasonScores.get() !== undefined) {
      const firstSeason: UserProfile | undefined = this.firstSeasonScores.get()
        .find((user: UserProfile) => user.slug === slug || user.username === slug);
      if (firstSeason) {
        return firstSeason;
      }
    }
    if (season === Season.SEASON_2 && this.secondSesonScores.get() !== undefined) {
      const secondSeason: UserProfile | undefined = this.secondSesonScores.get()
        .find((user: UserProfile) => user.slug === slug || user.username === slug);
      if (secondSeason) {
        return secondSeason;
      }
    }
    return undefined;
  }
}

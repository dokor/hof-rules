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
    this.initAllSeasons();
    this.scoresApi.getLastTimeUpdateScore()
      .then((response: Date) => this.lastTimeRefreshed.set(response));
  }

  fetchScores(season: Season) {
    if (season === Season.SEASON_1) {
      return this.firstSeasonScores.readOnly();
    }
    return this.secondSesonScores.readOnly();
  }

  initAllSeasons() {
    this.scoresApi.fetchScores(Season.SEASON_1)
      .then((scores: UserProfile[]) => this.firstSeasonScores.set(scores));
    this.scoresApi.fetchScores(Season.SEASON_2)
      .then((scores: UserProfile[]) => this.secondSesonScores.set(scores));
  }

  refresh() {
    this.scoresApi.refresh()
      .then((response: Date) => {
        this.initAllSeasons();
        this.lastTimeRefreshed.set(response);
      });
  }

  getLastTimeRefreshed(): Observable<Date | undefined> {
    return this.lastTimeRefreshed.readOnly();
  }

  // todo : passer le cache dans un MAP<Season, Map<slug, UserProfile>> pour gagner en qualité
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

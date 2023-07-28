import { observable, WritableObservable } from 'micro-observables';
import ScoresApi, { UserProfile } from '../../api/scores/ScoresApi';
import Season from '../../api/scores/types/Season';

export default class ScoresService {
  private readonly firstSeasonScores: WritableObservable<UserProfile[]>;

  private readonly secondSesonScores: WritableObservable<UserProfile[]>;

  constructor(
    private readonly scoresApi: ScoresApi,
  ) {
    // will first, try to load from local storage.
    this.firstSeasonScores = observable([]);
    this.secondSesonScores = observable([]);
    this.init(Season.C_SCORE_SEASON_1);
    this.init(Season.C_SCORE_SEASON_2);
  }

  fetchScores(season: Season) {
    if (season === Season.C_SCORE_SEASON_1) {
      return this.firstSeasonScores.readOnly();
    }
    return this.secondSesonScores.readOnly();
  }

  init(season: Season) {
    if (season === Season.C_SCORE_SEASON_1) {
      return this.scoresApi.fetchScores(season)
        .then((scores: UserProfile[]) => this.firstSeasonScores.set(scores));
    }
    return this.scoresApi.fetchScores(season)
      .then((scores: UserProfile[]) => this.secondSesonScores.set(scores));
  }

  refresh() {
    this.scoresApi.refresh()
      .then(() => {
        this.init(Season.C_SCORE_SEASON_1);
        this.init(Season.C_SCORE_SEASON_2);
      });
  }

  getUserRank(slug: string, season: Season): UserProfile | undefined {
    if (season === Season.C_SCORE_SEASON_1) {
      const firstSeason = this.firstSeasonScores.get()
        .find((user: UserProfile) => user.slug === slug || user.username === slug);
      if (firstSeason) {
        return firstSeason;
      }
    }
    if (season === Season.C_SCORE_SEASON_2) {
      const secondSeason = this.secondSesonScores.get()
        .find((user: UserProfile) => user.slug === slug || user.username === slug);
      if (secondSeason) {
        return secondSeason;
      }
    }
    return undefined;
  }
}

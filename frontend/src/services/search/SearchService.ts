import {Observable, observable, WritableObservable} from 'micro-observables';
import ScoresApi, {UserProfile} from '../../api/scores/ScoresApi';
import { Season } from "../scores/ScoresService";

export default class SearchService {
  private readonly firstSeasonScores: WritableObservable<UserProfile[]>;

  private readonly secondSesonScores: Observable<UserProfile[]>;

  constructor(
    private readonly scoresApi: ScoresApi,
  ) {
    // will first, try to load from local storage.
    this.firstSeasonScores = observable([]);
    this.secondSesonScores = observable([]);
  }


  getUserRank(slug: string, season: Season): UserProfile | undefined {
    if (season === Season.C_SCORE_SEASON_1) {
      const firstSeason = this.firstSeasonScores.get().find((user: UserProfile) => user.slug === slug || user.username === slug);
      if (firstSeason) {
        return firstSeason;
      }
    }
    if (season === Season.C_SCORE_SEASON_2) {
      const secondSeason = this.secondSesonScores.get().find((user: UserProfile) => user.slug === slug || user.username === slug);
      if (secondSeason) {
        return secondSeason;
      }
    }
    return undefined;
  }
}

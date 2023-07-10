import ScoresApi from '../../api/scores/ScoresApi';

export default class ScoresService {
  constructor(
    private readonly scoresApi: ScoresApi,
  ) {

  }

  fetchScores() {
    return this.scoresApi.fetchScores('C_SCORE_SEASON_1');
  }

  refresh() {
    return this.scoresApi.refresh();
  }
}

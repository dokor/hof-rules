import { UserProfile } from '../../api/scores/ScoresApi';
import Season from '../../api/scores/types/Season';
import ScoresService from '../scores/ScoresService';

export default class SearchService {
  constructor(
    private readonly scoresService: ScoresService,
  ) {

  }

  // todo : rappatrier la logique de recherche ici
  getUserRank(slug: string, season: Season): UserProfile | undefined {
    return this.scoresService.getUserRank(slug, season);
  }
}

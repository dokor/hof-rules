import { HttpMethod } from 'simple-http-request-builder';
import ApiHttpClient from '../ApiHttpClient';

export type UserProfile = {
  cscore: string;
  profile: {
    fallbackUrl: string,
    pictureUrl: string;
  };
  username: string;
  rank: string;
  slug: string;
};
export default class ScoresApi {
  constructor(
    private readonly httpClient: ApiHttpClient,
  ) {
  }

  fetchScores(season: string) {
    return this
      .httpClient
      .restRequest<UserProfile[]>(HttpMethod.GET, `/scores/season/${season}`)
      .execute();
  }

  refresh() {
    return this
      .httpClient
      .restRequest<Date>(HttpMethod.POST, '/scores/refresh')
      .execute();
  }

  getLastTimeUpdateScore() {
    return this
      .httpClient
      .restRequest<Date>(HttpMethod.GET, '/scores/refresh/last-update')
      .execute();
  }
}

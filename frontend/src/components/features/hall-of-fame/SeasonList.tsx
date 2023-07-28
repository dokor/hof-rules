import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { useObservable } from 'micro-observables';
import ScoresService from '../../../services/scores/ScoresService';
import { UserProfile } from '../../../api/scores/ScoresApi';
import UserTile from './UserTile';
import Season from '../../../api/scores/types/Season';

type Props = {
  season: Season;
};

export default function SeasonList({ season }: Props) {
  const scoresService = getGlobalInstance(ScoresService);
  const seasonListOfUsers = useObservable(scoresService.fetchScores(season));
  const seasonName: string = season === Season.C_SCORE_SEASON_1 ? 'Saison 1' : 'Saison 2';
  return (
    <div className="hof-season">
      <h1>{seasonName}</h1>
      <div>
        {
          seasonListOfUsers && seasonListOfUsers?.map(
            (userProfile: UserProfile) => (
              <UserTile
                key={`${season}-${userProfile.slug}`}
                userProfile={userProfile}
              />
            ),
          )
        }
      </div>
    </div>
  );
}

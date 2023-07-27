import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import ScoresService, { Season } from '../../../services/scores/ScoresService';
import { UserProfile } from '../../../api/scores/ScoresApi';
import UserTile from "./UserTile";
import { useObservable } from 'micro-observables';

export default function HallOfFamePage() {
  const scoresService = getGlobalInstance(ScoresService);
  const firstSeason = useObservable(scoresService.fetchScores(Season.C_SCORE_SEASON_1));
  const secondSeason = useObservable(scoresService.fetchScores(Season.C_SCORE_SEASON_2));

  return (
    <div className="hof-page">
      <button onClick={() => scoresService.refresh()}>Refresh ALL</button>
      <div className="hof-seasons">
        <div className="hof-season">
          <h1>Saison 1</h1>
          <div>
            {
              firstSeason && firstSeason?.map(
                (userProfile: UserProfile) => {
                  return (
                      <UserTile
                          key={`firstSeason-${userProfile.slug}`}
                          userProfile={userProfile}
                      />
                  )
                }
              )
            }
          </div>
        </div>
        <div className="hof-season">
          <h1>Saison 2</h1>
          <div>
            {
              secondSeason && secondSeason?.map(
                (userProfile: UserProfile) => {
                  return (<UserTile  key={`secondSeason-${userProfile.slug}`} userProfile={userProfile} />)
                }
              )
            }
          </div>
        </div>
      </div>
    </div>
  );
}

import {getGlobalInstance} from 'plume-ts-di';
import React from 'react';
import ScoresService, {Season} from '../../../services/scores/ScoresService';
import SeasonList from "./SeasonList";
import SearchComponent from "./SearchComponent";

export default function HallOfFamePage() {
  const scoresService = getGlobalInstance(ScoresService);

  return (
    <div className="hof-page">
      <button onClick={() => scoresService.refresh()}>Refresh ALL</button>
      <SearchComponent />
      <div className="hof-seasons">
        <SeasonList season={Season.C_SCORE_SEASON_1}/>
        <SeasonList season={Season.C_SCORE_SEASON_2}/>
      </div>
    </div>
  );
}

import React from 'react';
import SeasonList from './SeasonList';
import Season from '../../../api/scores/types/Season';

/**
 * Gestion de la page du hall of fame
 */
export default function HallOfFamePage() {
  return (
    <div className="hof-page">
      <div className="hof-seasons">
        <SeasonList season={Season.C_SCORE_SEASON_1} />
        <SeasonList season={Season.C_SCORE_SEASON_2} />
      </div>
    </div>
  );
}

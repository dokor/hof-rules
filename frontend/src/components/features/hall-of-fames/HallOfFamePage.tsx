import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';
import ScoresService from '../../../services/scores/ScoresService';
import { UserProfile } from '../../../api/scores/ScoresApi';
import UserTile from "./UserTile";

export default function HallOfFamePage() {
  const scoresService = getGlobalInstance(ScoresService);

  const [scores, setScores] = useState([]);

  scoresService.fetchScores()
    .then((json: UserProfile[]) => setScores(json))
    .catch((error: any) => console.log(error));

  return (
    <div className="login-layout">
      {scores.map((userProfile: UserProfile) => <UserTile userProfile={userProfile} />}
    </div>
  );
}

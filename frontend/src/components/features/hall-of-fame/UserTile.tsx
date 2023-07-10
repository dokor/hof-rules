import React from 'react';
import { UserProfile } from '../../../api/scores/ScoresApi';
import RankTile from "./RankTile";

type Props = {
  userProfile: UserProfile;
};

export default function UserTile({ userProfile }: Props) {
  return (
    <div className="user-tile">
      <div className="user-tile-title">
        <RankTile rank={userProfile.rank} />
      </div>
      <div className="user-tile-sub-title">
        <div>{userProfile.username}</div>
        <div>Score : {userProfile.cscore}</div>
      </div>
    </div>
);
}

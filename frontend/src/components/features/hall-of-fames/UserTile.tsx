import React from 'react';
import { UserProfile } from '../../../api/scores/ScoresApi';

type Props = {
  userProfile: UserProfile;
};

export default function UserTile({ userProfile }: Props) {
  return (
    <div className="user-tile">
      <div className="user-tile-title">
        <div>{userProfile.rank}éme</div>
      </div>
      <div className="user-tile-sub-title">
        <div>{userProfile.username}</div>
        <div>Score : {userProfile.cscore}</div>
      </div>
    </div>
  );
}

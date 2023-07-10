import React from 'react';
import { UserProfile } from '../../../api/scores/ScoresApi';

type Props = {
  userProfile: UserProfile;
};

export default function UserTile({ userProfile }: Props) {
  return (
    <div className="user-tile">
      <div>{userProfile.username}</div>
      <div>{userProfile.slug}</div>
      <div>{userProfile.rank}</div>
      <div>{userProfile.cscore}</div>
    </div>
  );
}

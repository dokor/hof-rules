import React from 'react';
import {UserProfile} from '../../../api/scores/ScoresApi';
import RankTile from './RankTile';

type Props = {
  userProfile: UserProfile;
};

const URSER_URL_RULES = 'https://rules.art/user/';

const computeProfileImage = (pictureUrl: string, fallbackUrl: string) => (
  <img width={34} height={34}
       src={pictureUrl}
       onError={() => `this.onerror=null;this.src=${fallbackUrl}`}
  />);
export default function UserTile({userProfile}: Props) {
  return (
    <div className="user-tile">
      <div className="user-tile-title">
        <RankTile rank={userProfile.rank}/>
      </div>
      <div className="user-tile-content">
        <div>
          {computeProfileImage(userProfile.profile.pictureUrl, userProfile.profile.fallbackUrl)}
        </div>
        <div>
          <div>
            <a href={URSER_URL_RULES + userProfile.slug} target="_blank" rel="noreferrer">{userProfile.username}</a>
          </div>
          <div>Score : {userProfile.cscore}</div>
        </div>
      </div>
    </div>
  );
}

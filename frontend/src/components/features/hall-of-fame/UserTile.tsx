import React from 'react';
import { UserProfile } from '../../../api/scores/ScoresApi';
import RankTile from './RankTile';

type Props = {
  userProfile: UserProfile;
};

const URSER_URL_RULES = 'https://rules.art/user/';

const computeUsername = (pictureUrl: string, fallbackUrl: string, username: string, slug: string) => (
  <div>
    <img width={25} height={25}
         src={pictureUrl}
         onError={() => `this.onerror=null;this.src=${fallbackUrl}`}
    />
    <a href={URSER_URL_RULES + slug} target="_blank" rel="noreferrer">{username}</a>
  </div>);
export default function UserTile({ userProfile }: Props) {
  return (
    <div className="user-tile">
      <div className="user-tile-title">
        <RankTile rank={userProfile.rank} />
      </div>
      <div className="user-tile-sub-title">
        {computeUsername(
          userProfile.profile.pictureUrl,
          userProfile.profile.fallbackUrl,
          userProfile.username,
          userProfile.slug,
        )}
        <div>Score : {userProfile.cscore}</div>
      </div>
    </div>
  );
}

import React from 'react';
import { UserProfile } from '../../../api/scores/ScoresApi';
import RankTile from './RankTile';

type Props = {
  userProfile: UserProfile;
};

const URSER_URL_RULES = 'https://rules.art/user/';

const computeUsername = (fallbackUrl: string, username: string, slug: string) =>
// todo : refacto le compute et le css pour afficher l'image du user en passant par pictureUrl ou fallbackUrl dans IMG
// todo : virer le css du <a>
// if (!!fallbackUrl && fallbackUrl !== '') {
     <div><a href={URSER_URL_RULES + slug} target="_blank">{username}</a></div>
// }
// return <div>{username}</div>;
;

export default function UserTile({ userProfile }: Props) {
  return (
    <div className="user-tile">
      <div className="user-tile-title">
        <RankTile rank={userProfile.rank} />
      </div>
      <div className="user-tile-sub-title">
        {computeUsername(userProfile.profile.fallbackUrl, userProfile.username, userProfile.slug)}
        <div>Score : {userProfile.cscore}</div>
      </div>
    </div>
  );
}

import React from 'react';
import { UserProfile } from '../../../api/scores/ScoresApi';
import RankTile from './RankTile';

type Props = {
  userProfile: UserProfile;
};

// Url des profils de rules
const USER_URL_RULES = 'https://rules.art/user/';

// Hauteur / Largeur de la photo de profil
const HEIGHT = 34;

/**
 * Gestion de l'image de profil de l'utilisateur
 * @param pictureUrl : image principale
 * @param fallbackUrl : image de secours
 */
const computeProfileImage = (pictureUrl: string, fallbackUrl: string) => (
  // eslint-disable-next-line jsx-a11y/alt-text
  <img width={HEIGHT} height={HEIGHT}
       src={pictureUrl}
       loading="lazy"
       onError={() => `this.onerror=null;this.src=${fallbackUrl}`}
  />);

/**
 * Tuile d'un utilisateur
 */
export default function UserTile({ userProfile }: Props) {
  return (
    <div className="user-tile">
      <div className="user-tile-title">
        <RankTile rank={userProfile.rank} />
      </div>
      <div className="user-tile-content">
        <div>
          {computeProfileImage(userProfile.profile.pictureUrl, userProfile.profile.fallbackUrl)}
        </div>
        <div>
          <div>
            <a href={USER_URL_RULES + userProfile.slug} target="_blank" rel="noreferrer">{userProfile.username}</a>
          </div>
          <div>Score : {userProfile.cscore}</div>
        </div>
      </div>
    </div>
  );
}

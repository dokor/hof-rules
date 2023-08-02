import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';
import { Skeleton } from '@mui/material';
import UserTile from './UserTile';
import { UserProfile } from '../../../api/scores/ScoresApi';
import SearchService from '../../../services/search/SearchService';
import Season from '../../../api/scores/types/Season';
import { useOnDependenciesChange } from '../../../lib/react-hooks-alias/ReactHooksAlias';

/**
 * Composant complet de gestion de la recherche d'utilisateurs
 */
export default function SearchComponent() {
  const searchService: SearchService = getGlobalInstance(SearchService);
  const [userProfileFirst, setUserProfileFirst] = useState<UserProfile | undefined>(undefined);
  const [userProfileSecond, setUserProfileSecond] = useState<UserProfile | undefined>(undefined);
  const [inputText, setInputText] = useState<string | undefined>(undefined);

  function cleanTileOfUser(profile: UserProfile | undefined, seasonName: string = 'Saison 1') {
    if (profile) {
      return (
        <div className='user-tile-with-season'>
          <div>{seasonName}</div>
          <UserTile userProfile={profile} />
        </div>
      );
    }
    return <Skeleton variant="rectangular" width={150} height={40} sx={{ bgcolor: 'grey.900' }} />;
  }

  function userRank(): void {
    if (inputText === undefined) return;
    setUserProfileFirst(searchService.getUserRank(inputText, Season.SEASON_1));
    setUserProfileSecond(searchService.getUserRank(inputText, Season.SEASON_2));
  }

  useOnDependenciesChange(() => userRank(), [inputText]);

  return (
    <div className="sub-header_actions">
      <div className="search-input">
        <input type="text" placeholder="Search for a user" onChange={(e) => setInputText(e.target.value)} />
      </div>
      {
        inputText
        && (
          <div className="header_actions">
            <div className="header_action">
              {cleanTileOfUser(userProfileFirst, 'Saison 1')}
            </div>
            <div className="header_action">
              {cleanTileOfUser(userProfileSecond, 'Saison 2')}
            </div>
          </div>
        )}
    </div>
  );
}

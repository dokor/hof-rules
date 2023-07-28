import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';
import UserTile from './UserTile';
import { UserProfile } from '../../../api/scores/ScoresApi';
import SearchService from '../../../services/search/SearchService';
import Season from '../../../api/scores/types/Season';

export default function SearchComponent() {
  const searchService: SearchService = getGlobalInstance(SearchService);
  const [userProfileFirst, setUserProfileFirst] = useState<UserProfile | undefined>(undefined);
  const [userProfileSecond, setUserProfileSecond] = useState<UserProfile | undefined>(undefined);

  function userRank(inputSlug: string): void {
    setUserProfileFirst(searchService.getUserRank(inputSlug, Season.C_SCORE_SEASON_1));
    setUserProfileSecond(searchService.getUserRank(inputSlug, Season.C_SCORE_SEASON_2));
  }

  return (
    <div>
      <div>
        <input type="text" placeholder="Search for a user" onChange={(e) => userRank(e.target.value)} />
      </div>
      {userProfileFirst ? <UserTile userProfile={userProfileFirst} /> : <></>}
      {userProfileSecond ? <UserTile userProfile={userProfileSecond} /> : <></>}
    </div>
  );
}

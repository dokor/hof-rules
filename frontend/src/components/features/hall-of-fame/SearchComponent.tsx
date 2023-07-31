import { getGlobalInstance } from 'plume-ts-di';
import React, { useState } from 'react';
import { Skeleton } from '@mui/material';
import UserTile from './UserTile';
import { UserProfile } from '../../../api/scores/ScoresApi';
import SearchService from '../../../services/search/SearchService';
import Season from '../../../api/scores/types/Season';
import { useOnDependenciesChange } from '../../../lib/react-hooks-alias/ReactHooksAlias';

export default function SearchComponent() {
  const searchService: SearchService = getGlobalInstance(SearchService);
  const [userProfileFirst, setUserProfileFirst] = useState<UserProfile | undefined>(undefined);
  const [userProfileSecond, setUserProfileSecond] = useState<UserProfile | undefined>(undefined);
  const [inputText, setInputText] = useState<string | undefined>(undefined);

  function userRank(): void {
    if (inputText === undefined) return;
    setUserProfileFirst(searchService.getUserRank(inputText, Season.C_SCORE_SEASON_1));
    setUserProfileSecond(searchService.getUserRank(inputText, Season.C_SCORE_SEASON_2));
  }

  useOnDependenciesChange(() => userRank(), [inputText]);

  return (
    <div>
      <div>
        <input type="text" placeholder="Search for a user" onChange={(e) => setInputText(e.target.value)} />
      </div>
      <>
        {userProfileFirst
          ? <UserTile userProfile={userProfileFirst} />
          : (
            <>
              <Skeleton variant="rectangular" width={150} height={40} sx={{ bgcolor: 'grey.900' }} />
              <br />
            </>
          )
        }
        {userProfileSecond
          ? <UserTile userProfile={userProfileSecond} />
          : <Skeleton variant="rectangular" width={150} height={40} sx={{ bgcolor: 'grey.900' }} />
        }
      </>
    </div>
  );
}

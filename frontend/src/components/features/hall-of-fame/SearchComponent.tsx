import {getGlobalInstance} from 'plume-ts-di';
import React, {useState} from 'react';
import ScoresService, {Season} from '../../../services/scores/ScoresService';
import UserTile from "./UserTile";
import {UserProfile} from "../../../api/scores/ScoresApi";

export default function SearchComponent() {
    const scoresService = getGlobalInstance(ScoresService);
    const [userProfileFirst, setUserProfileFirst] = useState<UserProfile | undefined>(undefined);
    const [userProfileSecond, setUserProfileSecond] = useState<UserProfile | undefined>(undefined);

    const userRank = function (inputSlug: string): void {
        setUserProfileFirst(scoresService.getUserRank(inputSlug, Season.C_SCORE_SEASON_1));
        setUserProfileSecond(scoresService.getUserRank(inputSlug, Season.C_SCORE_SEASON_2));
    }

    return (
        <div>
            <div>
                <input type="text" placeholder="Search for a user" onChange={(e) => userRank(e.target.value)}/>
            </div>
            {userProfileFirst ? <UserTile userProfile={userProfileFirst}/> : <div>NOT FOUND</div>}
            {userProfileSecond ? <UserTile userProfile={userProfileSecond}/> : <div>NOT FOUND</div>}
        </div>
    );
}

import { MenuItem } from '@mui/material';
import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { useObservable } from 'micro-observables';
import LocaleService from '../../i18n/locale/LocaleService';
import SessionService from '../../services/session/SessionService';
import DropdownMenu from '../theme/DropdownMenu';
import LocaleSelector from '../theme/LocaleSelector';
import useMessages from '../../i18n/hooks/messagesHook';
import Prices from "../features/hall-of-fame/Prices";
import SearchComponent from "../features/hall-of-fame/SearchComponent";
import ScoresService from '../../services/scores/ScoresService';

function makeInitials(fullName?: string): string {
  if (!fullName) {
    return '';
  }
  const names = fullName.split(' ');
  let initials = names[0].substring(0, 1).toUpperCase();

  if (names.length > 1) {
    initials += names[names.length - 1].substring(0, 1).toUpperCase();
  }
  return initials;
}

export default function Header() {
  const scoresService = getGlobalInstance(ScoresService);

  return (
    <header id="main-header">
      <h1 className="section_name">Hof-rules by lelouet</h1>
      <div className="header_actions">
        <div className="header_action">
          <Prices />
        </div>
        <div className="header_action">
          <button onClick={() => scoresService.refresh()}>Refresh ALL</button>
        </div>
        <div className="header_action">
          <SearchComponent />
        </div>
      </div>
    </header>
  );
}

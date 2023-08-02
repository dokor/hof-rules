import { getGlobalInstance } from 'plume-ts-di';
import React from 'react';
import { useObservable } from 'micro-observables';
import Prices from '../features/hall-of-fame/Prices';
import ScoresService from '../../services/scores/ScoresService';
import EnvironmentService, { ScreenSize } from '../../services/utils/EnvironmentService';

export default function Header() {
  const scoresService: ScoresService = getGlobalInstance(ScoresService);
  const environementService: EnvironmentService = getGlobalInstance(EnvironmentService);
  const screenSize: ScreenSize = useObservable(environementService.screenSize());
  const lastTimeRefreshed: Date | undefined = useObservable(scoresService.getLastTimeRefreshed());

  return (
    <header id="main-header">
      {screenSize.isDesktop && <h1 className="section_name">Hof-rules by lelouet</h1>}
      <div className="header_actions">
        <div className="header_action">
          <Prices />
        </div>
        <div className="header_action">
          <button onClick={() => scoresService.refresh()}>Refresh ALL</button>
          {lastTimeRefreshed && (<div>{lastTimeRefreshed.toUTCString()}</div>)}
        </div>
      </div>
    </header>
  );
}

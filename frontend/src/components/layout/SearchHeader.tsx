import React from 'react';
import SearchComponent from '../features/hall-of-fame/SearchComponent';

/**
 * SubHeader temporaire pour gérer la recherche d'utilisateur
 */
export default function SearchHeader() {
  return (
    <header id="sub-header">
      <div className="sub-header_actions">
        <SearchComponent />
      </div>
    </header>
  );
}

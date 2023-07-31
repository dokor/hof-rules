import React from 'react';
import SearchComponent from '../features/hall-of-fame/SearchComponent';

export default function SearchHeader() {
  return (
    <header id="main-header">
      <div className="sub-header_actions">
        <SearchComponent />
      </div>
    </header>
  );
}

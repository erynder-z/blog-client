import React from 'react';
import { ITag } from '../../interfaces/Tag';
import SearchSection from './SearchSection/SearchSection';
import './Sidebar.css';
import SocialLinks from './SocialLinks/SocialLinks';
import TagsSection from './TagsSection/TagsSection';
import ThemeSwitch from './ThemeSwitch/ThemeSwitch';

interface Props {
  handleTagFilter: (tag: ITag) => void;
  handleSearch: (query: string) => void;
}

export default function Sidebar({ handleTagFilter, handleSearch }: Props) {
  return (
    <div className="sidebar">
      <header className="sidebar-header">
        <SearchSection handleSearch={handleSearch} />
      </header>
      <nav className="sidebar-nav">
        <TagsSection handleTagFilter={handleTagFilter} />
      </nav>
      <div className="sidebar-theme-switch">
        <ThemeSwitch aria-label="Toggle dark/light theme" />
      </div>
      <div className="sidebar-social-links">
        <SocialLinks />
      </div>
    </div>
  );
}

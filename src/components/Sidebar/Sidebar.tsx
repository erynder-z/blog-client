import React from 'react';
import { ITag } from '../../interfaces/Tag';
import ClearSearch from './ClearSearch/ClearSearch';
import SearchSection from './SearchSection/SearchSection';
import './Sidebar.css';
import SocialLinks from './SocialLinks/SocialLinks';
import TagsSection from './TagsSection/TagsSection';
import ThemeSwitch from './ThemeSwitch/ThemeSwitch';

interface Props {
  handleTagFilter: (tag: ITag) => void;
  handleSearch: (query: string | null) => void;
  filter: ITag | string | null;
}

export default function Sidebar({ handleTagFilter, handleSearch, filter }: Props) {
  return (
    <div className="sidebar">
      <section className="sidebar-section">
        <SearchSection handleSearch={handleSearch} filter={filter} />
      </section>
      <section className="sidebar-section">
        <TagsSection handleTagFilter={handleTagFilter} />
      </section>
      <section className="sidebar-section">
        <ClearSearch handleSearch={handleSearch} />
      </section>
      <div className="sidebar-theme-switch">
        <ThemeSwitch aria-label="Toggle theme" />
      </div>
      <div className="sidebar-social-links">
        <SocialLinks />
      </div>{' '}
    </div>
  );
}

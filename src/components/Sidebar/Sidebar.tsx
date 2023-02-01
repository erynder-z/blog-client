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
      <section className="sidebar-section">
        <SearchSection handleSearch={handleSearch} />
      </section>
      <section className="sidebar-section">
        <TagsSection handleTagFilter={handleTagFilter} />
      </section>
      <section className="sidebar-section">
        <div className="sidebar-theme-switch">
          <ThemeSwitch aria-label="Toggle theme" />
        </div>
        <div className="sidebar-social-links">
          <SocialLinks />
        </div>{' '}
      </section>
    </div>
  );
}

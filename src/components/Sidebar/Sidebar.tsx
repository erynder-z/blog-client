import React from 'react';
import ClearSearch from './ClearSearch/ClearSearch';
import ReadRandomArticle from './ReadRandomArticle/ReadRandomArticle';
import SearchSection from './SearchSection/SearchSection';
import SocialLinks from './SocialLinks/SocialLinks';
import TagsSection from './TagsSection/TagsSection';
import ThemeSwitch from './ThemeSwitch/ThemeSwitch';
import './Sidebar.css';

export default function Sidebar() {
  return (
    <div className="sidebar">
      <section className="sidebar-section">
        <SearchSection />
      </section>
      <section className="sidebar-section">
        <TagsSection />
      </section>
      <section className="sidebar-section">
        <ClearSearch />
      </section>
      <div className="sidebar-random-article">
        <ReadRandomArticle />
      </div>
      <div className="sidebar-theme-switch">
        <ThemeSwitch aria-label="Toggle theme" />
      </div>
      <div className="sidebar-social-links">
        <SocialLinks />
      </div>{' '}
    </div>
  );
}

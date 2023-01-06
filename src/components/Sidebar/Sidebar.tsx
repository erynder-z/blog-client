import React, { Dispatch, SetStateAction } from 'react';
import { ITag } from '../../interfaces/Tag';
import AdminSection from './AdminSection/AdminSection';
import SearchSection from './SearchSection/SearchSection';
import './Sidebar.css';
import TagsSection from './TagsSection/TagsSection';

interface Props {
  handleTagFilter: (tag: ITag) => void;
  handleSearch: (query: string) => void;
}

export default function Sidebar({ handleTagFilter, handleSearch }: Props) {
  return (
    <div className="sidebar">
      <SearchSection handleSearch={handleSearch} />
      <TagsSection handleTagFilter={handleTagFilter} />
      <AdminSection />
    </div>
  );
}

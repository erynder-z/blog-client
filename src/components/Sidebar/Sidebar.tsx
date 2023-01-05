import React, { Dispatch, SetStateAction } from 'react';
import { ITag } from '../../Interfaces/Tag';
import './Sidebar.css';
import TagsSection from './TagsSection/TagsSection';

interface Props {
  setActiveTag: Dispatch<SetStateAction<ITag | null>>;
}

export default function Sidebar({ setActiveTag }: Props) {
  return (
    <div className="sidebar">
      <TagsSection setActiveTag={setActiveTag} />
    </div>
  );
}

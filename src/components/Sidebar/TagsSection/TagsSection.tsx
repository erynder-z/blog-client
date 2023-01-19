import React, { Dispatch, SetStateAction, useContext, useEffect, useState } from 'react';
import ActiveTagContext from '../../../contexts/ActiveTagContext';
import { fetchTagListData } from '../../../helpers/FetchTagListData';
import { ITag } from '../../../interfaces/Tag';
import './TagSection.css';

interface Props {
  handleTagFilter: (tag: ITag) => void;
}

export default function TagsSection({ handleTagFilter }: Props) {
  const [tagList, setTagList] = useState<ITag[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const { activeTag, setActiveTag } = useContext(ActiveTagContext);

  const handleTagClick = (tag: ITag) => {
    tag !== activeTag ? setActiveTag(tag) : setActiveTag(null);
  };

  useEffect(() => {
    fetchTagListData(setTagList, setLoading, setError);
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <div className="tag-section">
      <h1 className="side-tags-heading">All tags</h1>
      <ul className="side-tag-list">
        {tagList?.map((tag: ITag) => (
          <li
            key={tag._id.toString()}
            className={`side-tag-list-item ${activeTag == tag ? 'active' : ''}`}
            onClick={() => {
              handleTagFilter(tag);
              handleTagClick(tag);
            }}>
            {tag.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

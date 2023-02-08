import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import FilterContext from '../../../contexts/FilterContext';
import { ITag } from '../../../interfaces/Tag';
import { fetchTagListData } from '../../../helpers/FetchTagListData';
import './TagSection.css';

export default function TagsSection() {
  const { filter, setFilter } = useContext(FilterContext);
  const [tagList, setTagList] = useState<ITag[]>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const navigate = useNavigate();

  const handleTagClick = (tag: ITag) => {
    if (tag !== filter) {
      navigate('/code-blog/search');
    } else {
      setFilter(null);
      navigate(-1);
    }
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
      <h1 className="side-tags-heading" aria-label="List of all tags">
        All tags
      </h1>
      <ul className="side-tag-list" aria-label="List of all tags">
        {tagList?.map((tag: ITag) => (
          <li
            key={tag._id.toString()}
            className={`side-tag-list-item ${filter == tag ? 'active' : ''}`}
            onClick={() => {
              setFilter(tag);
              handleTagClick(tag);
            }}
            role="button"
            aria-label={`Filter by tag: ${tag.name}`}
            tabIndex={0}>
            {tag.name}
          </li>
        ))}
      </ul>
    </div>
  );
}

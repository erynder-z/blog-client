import React, { useEffect, useState } from 'react';
import { IPost } from '../../../Interfaces/Post';
import { ITag } from '../../../Interfaces/Tag';
import PostItem from '../PostPreview/PostPreview';
import './LatestPosts.css';

interface Props {
  activeTag: ITag | null;
}

export default function LatestPosts({ activeTag }: Props) {
  const [activePostList, setActivePostList] = useState<IPost[]>([]);
  const [fullPostList, setFullPostList] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/posts/latest');
        const data = await res.json();
        setActivePostList(data.post_list);
        setFullPostList(data.post_list);
      } catch (err: any) {
        setError(err);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const getFilterPosts = (activeTag: ITag | null) => {
      const filteredPosts = fullPostList.filter((post) =>
        post?.tags?.some((tag) => tag._id == activeTag?._id)
      );

      return filteredPosts;
    };

    setActivePostList(getFilterPosts(activeTag));
  }, [activeTag]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <main className="latest-posts-list">
      {activePostList?.map((post) => (
        <div key={post._id.toString()} className="post-container">
          <PostItem postData={post} />
        </div>
      ))}
    </main>
  );
}

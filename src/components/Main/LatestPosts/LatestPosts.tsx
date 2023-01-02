import React, { useEffect, useState } from 'react';
import { IPost } from '../../../Interfaces/Post';
import PostItem from '../PostItem/PostItem';
import './LatestPosts.css';

export default function LatestPosts() {
  const [posts, setPosts] = useState<IPost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/posts/latest');
        const data = await res.json();
        setPosts(data.post_list);
      } catch (err: any) {
        setError(err);
      }
      setLoading(false);
    };

    fetchPosts();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }

  return (
    <main className="main">
      {posts?.map((post) => (
        <div key={post._id.toString()} className="post-container">
          <PostItem postData={post} />
        </div>
      ))}
    </main>
  );
}

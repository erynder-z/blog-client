import React, { useEffect, useState } from 'react';
import './AllPosts.css';

type Post = {
  _id: String;
  author: String;
  title: String;
  text: String;
  timestamp: Date;
  image: {
    data: Buffer;
    contentType: String;
  };
  tags: String[];
  comments: String[];
};

export default function AllPosts() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const res = await fetch('http://localhost:8000/api/posts/all');
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
        <div key={post._id.toString()} className="post">
          <h2 className="post-title">{post.title}</h2>
          <p className="post-text">{post.text}</p>
        </div>
      ))}
    </main>
  );
}

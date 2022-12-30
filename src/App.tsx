import React, { useState, useEffect } from 'react';
import './App.css';

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

function App() {
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
    <div className="app-container">
      <main className="main">
        {posts?.map((post) => (
          <div key={post._id.toString()} className="post">
            <h2 className="post-title">{post.title}</h2>
            <p className="post-text">{post.text}</p>
          </div>
        ))}
      </main>
      <aside className="sidebar">
        <h3>Sidebar</h3>
        <p>Content goes here</p>
      </aside>
    </div>
  );
}

export default App;

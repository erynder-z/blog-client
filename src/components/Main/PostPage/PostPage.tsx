import { format } from 'date-fns';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { IPost } from '../../../Interfaces/Post';
import './PostPage.css';

export default function PostPage() {
  const params = useParams();
  const id: string | undefined = params.id;

  const [post, setPost] = useState<IPost>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const res = await fetch(`http://localhost:8000/api/posts/${id}`);
        const data = await res.json();
        setPost(data.post);
      } catch (err: any) {
        setError(err);
      }
      setLoading(false);
    };

    fetchPost();
  }, [id]);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>An error occurred: {error.message}</p>;
  }
  return (
    <main className="post_page">
      <div className="timestamp">
        {format(new Date(post?.timestamp || ''), 'EEEE, dd. MMMM yyyy')}
      </div>
      <div className="author">by {post?.author?.username}</div>
      <h1 className="post_title">{post?.title}</h1>
      <ul className="tag-list">
        {/*   <li className="tag-list-item">test</li>
        <li className="tag-list-item">test2</li>
        <li className="tag-list-item">test3</li> */}
        {post?.tags?.map((tag) => (
          <li key={tag.toString()} className="tag-list-item">
            {tag}
          </li>
        ))}
      </ul>

      <p>{post?.text}</p>
    </main>
  );
}

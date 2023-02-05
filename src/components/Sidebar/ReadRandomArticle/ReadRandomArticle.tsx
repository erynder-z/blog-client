import React, { useEffect, useState } from 'react';
import './ReadRandomArticle.css';
import { FaRandom } from 'react-icons/fa';
import { Link } from 'react-router-dom';

export default function ReadRandomArticle() {
  const [articleId, setArticleId] = useState<string | null>('');
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    if (!buttonClicked) {
      return;
    }

    const fetchData = async () => {
      try {
        const serverURL = import.meta.env.VITE_SERVER_URL;
        const res = await fetch(`${serverURL}/api/articles/random`);
        if (res.ok) {
          const data = await res.json();
          setArticleId(data.articleId);
          setButtonClicked(false);
        } else {
          throw new Error(`Server returned ${res.status} ${res.statusText}`);
        }
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [buttonClicked]);

  const handleClick = () => {
    setButtonClicked(true);
  };

  return (
    <Link to={`/article/${articleId}`} className="randomArticleBtn" onClick={handleClick}>
      Random article <FaRandom />
    </Link>
  );
}

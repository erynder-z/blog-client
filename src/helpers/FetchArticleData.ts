export const fetchArticleData = async (
  id: string | undefined,
  setArticle?: Function,
  setLoading?: Function,
  setError?: Function
) => {
  try {
    const serverURL = import.meta.env.VITE_SERVER_URL;
    const res = await fetch(`${serverURL}/api/articles/${id}`);
    const data = await res.json();
    if (setArticle) {
      setArticle(data.article);
    }
  } catch (err: any) {
    if (setError) {
      setError(err);
    }
  }
  if (setLoading) {
    setLoading(false);
  }
};

export const fetchArticles = async (
  endpoint: string,
  setActiveArticleList: Function,
  setFullArticleList: Function,
  setLoading: Function,
  setError: Function
) => {
  try {
    const serverURL = import.meta.env.VITE_SERVER_URL;
    const res = await fetch(`${serverURL}/api/articles/${endpoint}`, {});
    const data = await res.json();
    setActiveArticleList(data.article_list);
    setFullArticleList(data.article_list);
  } catch (err: any) {
    setError(err);
  }
  setLoading(false);
};

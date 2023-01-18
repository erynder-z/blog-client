export const fetchArticles = async (
  endpoint: string,
  setActiveArticleList: Function,
  setFullArticleList: Function,
  setLoading: Function,
  setError: Function
) => {
  try {
    const res = await fetch(`http://localhost:8000/api/articles/${endpoint}`, {});
    const data = await res.json();
    setActiveArticleList(data.article_list);
    setFullArticleList(data.article_list);
  } catch (err: any) {
    setError(err);
  }
  setLoading(false);
};

export const fetchPosts = async (
  endpoint: string,
  setActivePostList: Function,
  setFullPostList: Function,
  setLoading: Function,
  setError: Function
) => {
  try {
    const res = await fetch(`http://localhost:8000/api/posts/${endpoint}`, {});
    const data = await res.json();
    setActivePostList(data.post_list);
    setFullPostList(data.post_list);
  } catch (err: any) {
    setError(err);
  }
  setLoading(false);
};

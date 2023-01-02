export interface IPost {
  _id: String;
  author: {
    username: string;
    _id: string;
  };
  title: String;
  text: String;
  timestamp: Date;
  image: {
    data: Buffer;
    contentType: String;
  };
  tags: String[];
  comments: String[];
}

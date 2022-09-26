import { apiPath } from 'common/enums/enums';
import { Http } from './http/http.service';
import { PostsApi } from './posts/posts.service';
import { Storage } from './storage/storage.service';
import { TagsApi } from './tags/tags.serveice';

const storage = new Storage({
  storage: localStorage,
});

const http = new Http({
  storage,
})

const postsApi = new PostsApi({
  http,
  apiPrefix: apiPath.POSTS,
});

const tagsApi = new TagsApi({
  apiPrefix: apiPath.TAGS
})

export { storage, http, postsApi, tagsApi };
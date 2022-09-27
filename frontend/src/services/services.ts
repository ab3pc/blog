import { apiPath } from 'common/enums/enums';
import { AuthApi } from './auth-api/auth-api.service';
import { Http } from './http/http.service';
import { Notification } from './nofitication/notification.service';
import { PostsApi } from './posts-api/posts.service';
import { Storage } from './storage/storage.service';
import { TagsApi } from './tags-api/tags.serveice';

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
});

const authApi = new AuthApi({
  apiPrefix: apiPath.AUTH
});

const notification = new Notification();

export { storage, http, postsApi, tagsApi, authApi, notification };
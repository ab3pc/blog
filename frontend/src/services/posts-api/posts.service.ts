import { Post } from "common/types/types";
import { Http } from "services/http/http.service";
import axios from '../http/axios';

type Constructor = {
  http: Http
  apiPrefix: string
}
export type GetPostRequestDto = {
  postId: string
};

class PostsApi {
  #http: Http;
  #apiPrefix: string;

  public constructor({http, apiPrefix}: Constructor) {
    this.#http = http;
    this.#apiPrefix = apiPrefix;
  }

  public async getAll(): Promise<Post[]> {
    const { data } = await axios.get(this.#apiPrefix);

    return data
  }

  public async getPost(payload: string): Promise<Post> {
    const { data } = await axios.get(`${this.#apiPrefix}/${payload}`);

    return data
  }
}

export { PostsApi };
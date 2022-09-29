import { CreatePostRequestDto, CreatePostResponseDto, Post } from "common/types/types";
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

  public async uploadImage(file: FormData) {
    try {
      const { data } = await axios.post('/upload', file);
      return data;
    } catch (error) {
      const { response: {data} } = error;
      if(Array.isArray(data) ) {
        throw new Error (data[0].msg)  
      }
      else  throw new Error (data.message)  
    }
   
  };

  public async createPost(payload: CreatePostRequestDto): Promise<CreatePostResponseDto>  {
    try {
      const { data } = await axios.post(this.#apiPrefix, payload);

    return data
    } catch (error) {
      const { response: {data} } = error;
      if(Array.isArray(data) ) {
        throw new Error (data[0].msg)  
      }
      else  throw new Error (data.message)  
    }
    
  }
}

export { PostsApi };
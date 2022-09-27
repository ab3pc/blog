import axios from '../http/axios';

type Constructor = {
  apiPrefix: string;
}

class TagsApi {
 #apiPrefix: string;

 public constructor({apiPrefix} : Constructor) {
  this.#apiPrefix = apiPrefix;
 }

 public async getAll(): Promise<string[]> {
  const { data } = await axios.get(this.#apiPrefix);

  return data;
 };

}

export { TagsApi} ;
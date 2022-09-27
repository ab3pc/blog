import { UserSignInRequestDto, UserSignInResponseDto } from 'common/types/types';
import axios from '../http/axios';

type Constructor = {
  apiPrefix: string
}

class AuthApi {
  #apiPrefix: string;

  public constructor({ apiPrefix }: Constructor) {
    this.#apiPrefix = apiPrefix
  }

  public async signIn(params: UserSignInRequestDto): Promise<UserSignInResponseDto | void> {
       const  { data } = await axios.post(`${this.#apiPrefix}/login`, params);
        return data
   
   
  }
}

export { AuthApi };
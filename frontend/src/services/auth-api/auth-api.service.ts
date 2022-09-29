import { UserRegisterRequestDto, UserRegisterResponseDto, UserSignInRequestDto, UserSignInResponseDto } from 'common/types/types';
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
  };

  public async getUser() { 
    const { data } = await axios.get(`${this.#apiPrefix}/me`);

    return data
  };

  public async register(params: UserRegisterRequestDto): Promise<UserRegisterResponseDto> {
    try {
      const response = await axios.post(`${this.#apiPrefix}/register`, params);
      console.log(response);
      return response.data
    } catch (error) {
       const { response: {data} } = error;
      if(Array.isArray(data) ) {
        throw new Error (data[0].msg)  
      }
      else  throw new Error (data.message)  
    }
  

   
  }

}

export { AuthApi };
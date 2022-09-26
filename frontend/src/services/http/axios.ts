import axios from "axios";
import { ENV } from "common/enums/enums";


const instance = axios.create({
  baseURL: ENV.API_PATH
});

export default instance;
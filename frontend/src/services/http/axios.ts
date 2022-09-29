import axios from "axios";
import { ENV, StorageKey } from "common/enums/enums";
import { storage } from "services/services";


const instance = axios.create({
  baseURL: ENV.API_PATH
});

instance.interceptors.request.use((config) => {
  const token = storage.getItem(StorageKey.TOKEN);
  if(token) {
    config.headers.Authorization = token;
  }
  
  return config;
})

export default instance;
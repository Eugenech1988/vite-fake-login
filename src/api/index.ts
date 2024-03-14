import axios from 'axios';
import { BASE_URL } from './constants';

const apiRequest = (
  url: string,
  method: string,
  data: any,
  headers: string,
  timeout: number,
  responseType: string
) => (
  axios({
    url,
    method,
    baseURL: BASE_URL,
    data,
    headers,
    timeout,
    responseType
  })
    .then(res => res.data)
    .catch(err => {
      console.log(err);
    }));

export default apiRequest;

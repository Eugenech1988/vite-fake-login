import axios, { AxiosError } from 'axios';
import { BASE_URL } from './constants';

interface ApiResponse<T> {
  data: T;
  error: AxiosError | null;
}

const apiRequest = async <T>(
  url: string,
  method: string,
  data: any,
): Promise<ApiResponse<T>> => {
  try {
    const response = await axios({
      url,
      method,
      baseURL: BASE_URL,
      data,
      validateStatus: () => true,
    });
    return {
      data: response.data,
      error: null,
    } as ApiResponse<T>;
  } catch (error) {
    // console.log('err', error.response?.status);
    return {
      data: null,
      error: error as AxiosError,
    } as ApiResponse<T>;
  }
};

export default apiRequest;

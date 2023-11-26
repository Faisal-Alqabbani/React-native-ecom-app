import axios from 'axios';

// Define an interface for the API response
interface ApiResponse {
  withError: boolean;
  response?: any;
  error?: any;
}

// Define an interface for the params
interface ApiParams {
  [key: string]: any;
}

class APISetup {
  baseURL: string;

  constructor(baseURL: string = 'https://fakestoreapi.com') {
    this.baseURL = baseURL;
  }

  async postAPICall(url: string, params: ApiParams): Promise<ApiResponse> {
    try {
      const response = await axios.post(this.baseURL + url, params);
      return {withError: false, response: response.data};
    } catch (e) {
      return {withError: true, error: e};
    }
  }

  async getAPICall(url: string, params: ApiParams): Promise<ApiResponse> {
    try {
      const response = await axios.get(this.baseURL + url, {params});
      return {withError: false, response: response.data};
    } catch (e) {
      return {withError: true, error: e};
    }
  }
}

export default APISetup;

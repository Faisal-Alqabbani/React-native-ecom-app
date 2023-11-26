import APISetup from './setup';
import {AxiosError} from 'axios';

interface PlateOptions {
  limit?: number;
  sort?: 'desc' | 'asc' | string;
}
interface GetProductInterface {
  id: string | number;
}

class ProductManagement extends APISetup {
  constructor(apiURL: string) {
    super();
  }

  async getAllProducts(options: PlateOptions): Promise<{
    withError: boolean;
    response?: any;
    error?: AxiosError;
  }> {
    const queryString = Object.entries(options)
      .filter(([key, value]) => value !== undefined)
      .map(([key, value]) => `${key}=${value}`)
      .join('&');
    return await this.getAPICall(`/products?${queryString}`, {});
  }

  async getProductById({id: id}: GetProductInterface): Promise<{
    withError: boolean;
    response?: any;
    error?: AxiosError;
  }> {
    return await this.getAPICall(`/products/${id}`, {});
  }

  async getProductsByCategory(name: string): Promise<{
    withError: boolean;
    response?: any;
    error?: AxiosError;
  }> {
    return await this.getAPICall(`/products/category/${name}`, {});
  }
}

export default ProductManagement;

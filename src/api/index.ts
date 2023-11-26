import APISetup from './setup';
import ProductManagement from './productManagement';

class AP extends APISetup {
  APIList: {
    ProductManagement?: ProductManagement;
  };

  constructor() {
    // TODO: replace it with .env
    super('https://fakestoreapi.com');
    this.APIList = {}; // Initialize as an empty object
    this.initialize();
  }

  initialize() {
    this.APIList.ProductManagement = new ProductManagement(this.baseURL);
  }
}

const API = new AP();
export default API;

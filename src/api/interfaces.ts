export interface APIInterface {
  productManagement: {
    login: (email: string, password: string) => Promise<string>;
  };
}

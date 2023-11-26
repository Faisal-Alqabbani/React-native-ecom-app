import {RouteConstants} from './constants';
import MainPage from '../pages/MainPage';
import ProductDetails from '../pages/productDetails';
import {Cart} from '../pages';
import React from 'react';

type PublicRoute = {
  name: string;
  component: React.ComponentType<any>;
  options?: {headerShown: boolean};
};

export const PublicRoutes: PublicRoute[] = [
  {
    name: RouteConstants.PUBLIC_ROUTES.MAIN_PAGE,
    component: MainPage,
  },
  {
    name: RouteConstants.PUBLIC_ROUTES.ProductDetails,
    component: ProductDetails,
  },
  {
    name: RouteConstants.PUBLIC_ROUTES.CART,
    component: Cart,
  },
  // TODO: add another routes here
];

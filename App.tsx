/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React from 'react';
import MainRoutes from './src/navigation';
import {Provider} from 'react-redux';
import {store} from './src/redux/store';
import axios from 'axios';
import API from './src/api';
function App(): JSX.Element {
  React.useEffect(() => {
    axios.interceptors.request.use(request => {
      return request;
    });
    axios.interceptors.response.use(response => {
      return response;
    });
    API.initialize();
  }, []);
  return (
    <Provider store={store}>
      <MainRoutes />
    </Provider>
  );
}

export default App;

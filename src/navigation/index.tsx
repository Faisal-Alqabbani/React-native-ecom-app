import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import PublicRoutes from './public';
import {ToastMessage} from '../components';
import {RootState} from '../redux/store';
import {useSelector} from 'react-redux';

const MainRoutes = (): React.ReactElement => {
  const {visible, message, status} = useSelector(
    (state: RootState) => state.toast,
  );
  return (
    <NavigationContainer>
      <PublicRoutes />
      {visible && (
        <ToastMessage message={message} isVisible={visible} type={status} />
      )}
    </NavigationContainer>
  );
};

export default MainRoutes;

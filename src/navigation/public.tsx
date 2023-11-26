import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {RouteConstants} from './constants';
import {PublicRoutes} from './routesConfig';

const Stack = createNativeStackNavigator();

const PublicNavigation: React.FC = () => {
  return (
    <Stack.Navigator
      // @ts-ignore
      headerMode={'none'}
      initialRouteName={RouteConstants.PUBLIC_ROUTES.MAIN_PAGE}>
      {PublicRoutes.map(route => (
        <Stack.Screen
          key={route.name}
          name={route.name}
          component={route.component}
          options={{headerShown: false}}
        />
      ))}
    </Stack.Navigator>
  );
};

export default PublicNavigation;

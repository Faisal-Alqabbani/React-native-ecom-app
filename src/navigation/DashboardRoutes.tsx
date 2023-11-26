import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {MainPage} from '../pages';
export type DashboardStackParamList = {
  MainPage: undefined;
  Profile?: undefined;
  OfferDetails?: undefined;
};

const StackNavigation = createNativeStackNavigator<DashboardStackParamList>();

const DashboardRoutes: React.FC = () => {
  return (
    <StackNavigation.Navigator screenOptions={{headerShown: false}}>
      <StackNavigation.Screen name="MainPage" component={MainPage} />
    </StackNavigation.Navigator>
  );
};

export default DashboardRoutes;

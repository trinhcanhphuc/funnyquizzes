import { NavigationActions } from 'react-navigation';
const config = {};
export function setNavigator(nav) {
 if (nav) {
  config.navigator = nav;
 }
}

export function navigate(routeName, params) {
 if (config.navigator && routeName) {
  let action = NavigationActions.navigate({ routeName, params });
  config.navigation.dispatch(action);
 }
}

export function goBack() {
 if (config.navigator) {
  let action = NavigationActions.back({});
  config.navigation.dispatch(action);
 }
}
import React from 'react';
import { createSwitchNavigator, createAppContainer } from "react-navigation";
import { createStackNavigator } from 'react-navigation-stack'
import HomeScreen from '../screens/HomeScreen';
import AuthLoadingScreen from '../screens/AuthLoadingScreen';
import IntroScreen from '../screens/IntroScreen';
import IntroFormScreen from '../screens/IntroFormScreen';
import DetailsScreen from '../screens/DetailsScreen';
import AddCityScreen from '../screens/AddCityScreen';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const HomeStack = createStackNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: (props) => {
            const options = {
                title: 'METEO',
                headerStyle: {
                    backgroundColor: '#33ccff',
                },
                headerTitleStyle: {
                    color: "white",
                },
            };
            return options;
        }
    },
    Details: {
        screen: DetailsScreen,
        navigationOptions: (props) => {
            const { navigation } = props;
            const villeNom = navigation.getParam('ville');
            const options = {
                title: villeNom,
                headerStyle: {
                    backgroundColor: '#33ccff',
                },
                headerBackTitleStyle: {
                    color: "white",
                },
                headerTitleStyle: {
                    color: "white",
                },

            };
            return options;
        }
    }
}, {
    intialRouteName: 'Home'
});

const AppStack = createBottomTabNavigator(
    {
        Home: {
            screen: HomeStack,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome5
                        name="home"
                        size={30}
                        color='#33ccff'
                    />
                ),
            }
        },
        AddCity: {
            screen: AddCityScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome5
                        name="plus-square"
                        size={30}
                        color='#33ccff'
                    />
                ),
            }
        },
        EditUser: {
            screen: IntroFormScreen,
            navigationOptions: {
                tabBarIcon: ({ tintColor }) => (
                    <FontAwesome5
                        name="user-edit"
                        size={30}
                        color='#33ccff'
                    />
                ),
            }
        },
    },
    {
        tabBarOptions: { showLabel: false }
    }
);

const AuthStack = createStackNavigator({
    SignIn: {
        screen: IntroFormScreen
    },
    Welcome: {
        screen: IntroScreen,
        navigationOptions: (props) => {
            const options = {
                title: 'WELCOME',
                headerStyle: {
                    backgroundColor: '#33ccff',
                },
                headerTitleStyle: {
                    color: "white",
                },
            };
            return options;
        }
    }
});

export default createAppContainer(createSwitchNavigator(
    {
        AuthLoading: AuthLoadingScreen,
        App: AppStack,
        Auth: AuthStack,
    },
    {
        intialRouteName: 'AuthLoading'
    }
));

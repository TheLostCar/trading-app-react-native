import React from 'react';
import { Text, View } from 'react-native';
import { connect } from 'react-redux';
import { createStackNavigator } from 'react-navigation-stack';
import { createAppContainer } from 'react-navigation';
import Constants from 'expo-constants';

import Listings from './Listings';
import ListingInfo from './ListingInfo';
import Messages from './Messages';
import Profile from './Profile';
import { createDrawerNavigator } from 'react-navigation-drawer';
import { createBottomTabNavigator } from 'react-navigation-tabs';
import { loadItems, loadListings, loadUsers } from '../redux/actions';
import { useEffect } from 'react';
import { Icon, SearchBar } from 'react-native-elements';

const mapDispatchToProps = {
    loadListings,
    loadItems,
    loadUsers,
}

const mapStateToProps = state => {
    return {
        listings: state.listings,
        items: state.items,
        users: state.users,
    }

}
const ListingsNavigator = createStackNavigator(
    {
        Listings: {
            screen: Listings,

            navigationOptions: ({ navigation }) => ({
                title: 'Search Listings',
            })
        },
        ListingInfo: {
            screen: ListingInfo,
            navigationOptions: ({ navigation }) => ({
                title: 'Trade Details'
            })
        }
    },
    {
        initialRouteName: 'Listings',
        defaultNavigationOptions: {

        }
    }
)


const BottomTabNavigator = createBottomTabNavigator(
    {
        Profile: {
            screen: Profile,
            navigationOptions: ({ navigation }) => ({
                tabBarIcon: ({ focused, tintColor }) => {
                    return <Icon
                        type='font-awesome'
                        name={focused ? 'user-o' : 'user'}
                        color={tintColor}
                    />
                }
            })
        },
        Search: {
            screen: ListingsNavigator,
            navigationOptions: ({ navigation }) => ({
                tabBarIcon: ({ tintColor }) => {
                    return <Icon
                        type='font-awesome'
                        name='search'
                        color={tintColor}
                    />
                },
            })
        },
        Messages: {
            screen: () => <Text>TBD</Text>
            ,
            navigationOptions: ({ navigation }) => ({
                tabBarIcon: ({ focused, tintColor }) => {
                    return <Icon
                        type='font-awesome'
                        name={focused ? 'commenting-o' : 'commenting'}
                        color={tintColor}
                    />
                }
            })
        }
    }
)


const MainNavigator = createDrawerNavigator(
    {
        Home: {
            screen: BottomTabNavigator,
            navigationOptions: ({ navigation }) => ({
                drawerIcon: <Icon
                    name='home'
                    type='font-awesome'
                />
            })
        },
        Events: {
            screen: () => (<Text>Events</Text>),
            navigationOptions: ({ navigation }) => ({
                drawerIcon: <Icon
                    name='trophy'
                    type='font-awesome'
                />
            })

        },
        Settings: {
            screen: () => <Text>Settings</Text>,
            navigationOptions: ({ navigation }) => ({
                drawerIcon: <Icon
                    name='gear'
                    type='font-awesome'
                />
            })
        },
        AboutUs: {
            screen: () => <Text>About Us</Text>,
            navigationOptions: ({ navigation }) => ({
                title: 'About Us',
                drawerIcon: <Icon
                    name='info'
                    type='font-awesome'
                />
            })
        }
    },
    {
        drawerBackgroundColor: '#9fc3a1',
    }
)

const AppNavigator = createAppContainer(MainNavigator);



const Main = ({ loadListings, loadItems, loadUsers, listings, items, users }) => {

    useEffect(() => {
        loadListings()
        loadItems()
        loadUsers()
    }, [])


    if (users.status.success) {
        return (
            <View style={{
                flex: 1,
                paddingTop: Platform.OS === 'ios' ? 0 : Constants.statusBarHeight
            }}
            >

                <AppNavigator />

            </View>)
    } else if (users.status.loading) {
        return (<Text>Loading . . . {'' + users.status.status}</Text>)

    } else if (users.status.failure) {
        return (<Text>LOADING FAILED {'' + users.error}</Text>)
    }

    return <View></View>



};

export default connect(mapStateToProps, mapDispatchToProps)(Main);

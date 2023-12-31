import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React, { Component } from 'react';
import 'react-native-gesture-handler';
//import messaging from '@react-native-firebase/messaging';
import CustomSidebarMenu from './src/navigation/CustomSidebarMenu';
import CategoryScreen from './src/screen/CategoryScreen';
import HomeScreen from './src/screen/HomeScreen/HomeScreen';
import LoginScreen from './src/screen/LoginScreen';
import Notification from './src/screen/Notification';
import OTPScreen from './src/screen/OTPScreen';
import PreRegisterScreen from './src/screen/PreRegisterScreen';
import ProductView from './src/screen/ProductView';
import Products from './src/screen/Products';
import ProfileScreen from './src/screen/ProfileScreen';
import ManageProfile from './src/screen/ProfileScreen/ManageProfile';
import RegisterScreen from './src/screen/RegisterScreen';
import SplashScreen from './src/screen/SplashScreen';
import WelcomeScreen from './src/screen/WelcomeScreen';

import CartScreen from "./src/screen/CartScreen";
import Checkout from "./src/screen/CheckoutScreen";
import OrderScreen from "./src/screen/OrderScreen";
import OrderDelivery from "./src/screen/OrderScreen/OrderDelivery";
import OrderStatus from "./src/screen/OrderScreen/OrderStatus";
import OrderSuccess from "./src/screen/OrderSuccess";
import { notificationListener, requestUserPermission } from './src/utils/NotificationService';

const MainStack = createStackNavigator();
const RootStack = createStackNavigator();
const OrderStack = createStackNavigator();
const Drawer = createDrawerNavigator();

global.currentScreenIndex = 0;

class App extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    createDrawer = () => (
        <Drawer.Navigator
            initialRouteName="Home"
            drawerContent={props => <CustomSidebarMenu {...props} />}>
            <Drawer.Screen name="Home" component={HomeScreen}/>
            <Drawer.Screen name="Profile" component={ProfileScreen}/>
            <Drawer.Screen name="ManageProfile" component={ManageProfile}/>
            <Drawer.Screen name="Category" component={CategoryScreen}/>
            <Drawer.Screen name="Products" component={Products}/>
            <Drawer.Screen name="ProductView" component={ProductView}/>
            <Drawer.Screen name="Notification" component={Notification}/>
            <Drawer.Screen name="CartScreen" component={CartScreen}/>
            <Drawer.Screen name="OrderScreen" component={OrderScreen}/>
            <Drawer.Screen name="OrderStatus" component={OrderStatus}/>
            <Drawer.Screen name="OrderDelivery" component={OrderDelivery}/>
        </Drawer.Navigator>
    );

    MainStackScreen = () => (
         <MainStack.Navigator
            screenOptions={{
                headerShown: false,
                animationEnabled: false,
            }}>
            <MainStack.Screen name="SplashScreen" component={SplashScreen}/>
            <MainStack.Screen name="WelcomeScreen" component={WelcomeScreen}/>
            <MainStack.Screen name="PreRegisterScreen" component={PreRegisterScreen}/>
            <MainStack.Screen name="LoginScreen" component={LoginScreen}/>
            <MainStack.Screen name="RegisterScreen" component={RegisterScreen}/>
            <MainStack.Screen name="OTPScreen" component={OTPScreen}/>

        </MainStack.Navigator>
    );

    OrderScreenStack=()=>(
         <OrderStack.Navigator
             initialRouteName="Checkout"
            screenOptions={{
                headerShown: false,
                animationEnabled: false,
            }}>

            <OrderStack.Screen name="Checkout" component={Checkout}/>
            <OrderStack.Screen name="OrderSuccess" component={OrderSuccess}/>
        </OrderStack.Navigator>
    )
    RootStackScreen = () => (
        <RootStack.Navigator
            screenOptions={{
                headerShown: false,
                animationEnabled: false,
            }}>
            <RootStack.Screen name="Main" component={this.MainStackScreen}/>
            <RootStack.Screen name="HomeScreen" children={this.createDrawer}/>
            <RootStack.Screen name="Orders" component={this.OrderScreenStack}/>

        </RootStack.Navigator>
    );
    componentDidMount = async () => {
        requestUserPermission();
        notificationListener();
    };

   
    render() {
        return <NavigationContainer>{this.RootStackScreen()}</NavigationContainer>;
    }
}

export default App;

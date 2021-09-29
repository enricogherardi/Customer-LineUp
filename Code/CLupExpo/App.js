import React from 'react';
import { LogBox } from "react-native";
import { NavigationContainer, DefaultTheme } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Lineup from "./pages/Lineup";

LogBox.ignoreAllLogs(); // ignore warnings on device

global.apiUrl = "http://192.168.1.10:8080/CLupWEB"
global.googleKey = "AIzaSyBjKvb5BZ2ukThPojDmY9Z1ptRVhIGUeXE";

const Stack = createStackNavigator();

class App extends React.Component {
	render = () => (
    	<NavigationContainer theme={DefaultTheme}>
			<Stack.Navigator screenOptions={{headerShown: false}}>
				<Stack.Screen name="Login" component={Login}/>
				<Stack.Screen name="Signup" component={Signup}/>
				<Stack.Screen name="Lineup" component={Lineup}/>
			</Stack.Navigator>
		</NavigationContainer>
  	);
}

export default App;
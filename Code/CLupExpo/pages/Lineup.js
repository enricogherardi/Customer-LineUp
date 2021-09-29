import React from 'react';
import { createStackNavigator } from "@react-navigation/stack";
import CreateLineup from "./CreateLineup";
import ShowLineup from "./ShowLineup";
import ShowQRcode from "./ShowQRcode";

const Stack = createStackNavigator();

class Lineup extends React.Component {
    render = () => (
        <Stack.Navigator screenOptions={{headerShown: false}}>
			<Stack.Screen name="CreateLineup" component={CreateLineup}/>
			<Stack.Screen name="ShowLineup" component={ShowLineup}/>
			<Stack.Screen name="ShowQRcode" component={ShowQRcode}/>
		</Stack.Navigator>
    );
}

export default Lineup;
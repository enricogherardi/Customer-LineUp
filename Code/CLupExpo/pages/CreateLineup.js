import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { Picker } from "@react-native-picker/picker";
import { RadioButton } from 'react-native-paper';
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import LineupRequest from "../models/LineupRequest";
import Header from "../components/Header";
import { Colors, Fonts, Styles, SCREEN_WIDTH } from "../Styles";

class CreateLineup extends React.Component {
    constructor() {
        super();

        this.transportsList = [
            {id: "0", label: "Car", mode: "driving"},
            {id: "1", label: "Public means", mode: "transit"},
            {id: "2", label: "Bicycle", mode: "bicycling"},
            {id: "3", label: "Feet", mode: "walking"},
        ]

        this.state = {
            supermarketList: [],
            supermarketId: undefined,
            transportId: undefined,
            errorText: ""
        }

    }

    componentDidMount() {
        this.retrieveMarkets();
    }

    retrieveMarkets = async () => {
        try {
            var response = await fetch(global.apiUrl + "/retrmarkets");
            
            var status = response.status;
            if (status == 200) {
                response = await response.json();
            } else {
                console.log("[" + status + "] Error while retrieving markets");
                this.setState({errorText: "Error while retrieving markets"});
                return;
            }
        }catch (error) {
            console.log(error);
            this.setState({errorText: "Error while retrieving markets"});
            return;
        }

        let supermarketList = [];
        response.forEach((market) => 
            supermarketList.push({
                id: market.id,
                label: market.name,
                position: [market.latitude, market.longitude]
            })
        );
        this.setState({supermarketList: supermarketList});
        this.setState({errorText: ""});
    }

    createLineup = async () => {
        if (this.state.supermarketId === undefined || this.state.transportId === undefined) {
            this.setState({errorText: "Please select a valid market and mean of transport"});
            return;
        }
        if (this.state.transportId < 0 || this.state.transportId >= this.transportsList.length) {
            this.setState({errorText: "Please select a valid mean of transport"});
            return;
        }
        
        let lineupData = {
            username: global.username,
            supermarket: this.state.supermarketList[this.state.supermarketId],
            meanOfTransport: this.transportsList[this.state.transportId]
        };

        let lineupRequest = await LineupRequest.sendLineupRequest(lineupData);
        if (lineupRequest === undefined) {
            this.setState({errorText: "Error while requesting a new lineup"});
            return;
        }

        this.setState({errorText: ""}, () =>
            this.props.navigation.reset({
		    	index: 0,
                routes: [{
                    name: "ShowLineup",
                    params: {lineupRequest: lineupRequest}
                }]
		    })
        );
    }

    logout = async () => {
        try	{
            await AsyncStorage.removeItem("@username");
            await AsyncStorage.removeItem("@password");
        } catch (error) {
            console.log(error);
            return;
        }

        this.setState({errorText: ""}, () =>
            this.props.navigation.reset({
		    	index: 0,
                routes: [{
                    name: "Login"
                }]
		    })
        );
    }

    pickerItems() {
        let items = [];
        for (let i = 0; i < this.state.supermarketList.length; i++) {
            items.push(
            <Picker.Item 
            key={this.state.supermarketList[i].id}
            value={i}
            label={this.state.supermarketList[i].label}/>);
        }
        return items
    }

    radioGroup() {
        let items = [];
        for (let i = 0; i < this.transportsList.length; i++) {
            items.push(
            <RadioButton.Item
            color={Colors.green}
            style={{width: SCREEN_WIDTH*0.9}}
            labelStyle={{fontSize: Fonts.fontSize3}}
            key={this.transportsList[i].id}
            value={this.transportsList[i].id}
            label={this.transportsList[i].label}/>);
        }
        return (
            <RadioButton.Group
            value={this.state.transportId}
            onValueChange={(value) => this.setState({transportId: value})}>
                {items}
            </RadioButton.Group>
        )
    }

    render = () => (
        <View style={Styles.container}>
            <Header section="LineUp"/>

            <Text style={Styles.normalText}>You can send a new LineUp request.</Text>

            <Text style={Styles.boldText}>Supermarket:</Text>
            <View style={createLineUpStyles.pickerView}>
                <Picker
                selectedValue={this.state.supermarketId}
                mode="dialog"
                onValueChange={(value) =>
                  this.setState({supermarketId: value})
                }>
                    {this.pickerItems()}
                </Picker>
            </View>

            <Text style={Styles.boldText}>Mean of Transport:</Text>
            {this.radioGroup()}

            {
                this.state.errorText.length == 0 ? null :
                <Text style={Styles.errorText}>{this.state.errorText}</Text>
            }

            <Button buttonStyle={Styles.button} title="LineUp" onPress={this.createLineup}/>
            
            <Button buttonStyle={[Styles.button, {backgroundColor: Colors.lightGray}]} title="Log out" onPress={this.logout}/>
        </View>
    );
}

const createLineUpStyles = StyleSheet.create({
    pickerView: {
        borderRadius: 5,
        borderWidth: 2,
        marginBottom: 10,
        width: SCREEN_WIDTH*0.9
    }
});

export default CreateLineup;
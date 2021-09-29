import React from 'react';
import { StyleSheet, View, Text } from "react-native";
import { Button } from "react-native-elements";
//import {Notifications} from "react-native-notifications";
import * as Utilities from "../Utilities";
import Header from "../components/Header";
import { Colors, SCREEN_WIDTH, Styles } from "../Styles";

class ShowLineup extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
            lineupRequest: props.route.params.lineupRequest,
            position: undefined,
            distance: undefined,
            remainingTime: undefined
        }
    }
    
    // set updatePosition or updatePositionExpo
    componentDidMount() {
        Utilities.updatePositionExpo(
            (position) => {
                this.setState({position: position},
                    () => {
                        Utilities.updateDistance(
                            this.state.position,
                            this.state.lineupRequest.supermarket.position,
                            this.state.lineupRequest.meanOfTransport.mode,
                            (distance) => {
                                this.setState({distance: distance}, () => this.updateRemainingTime());
                            }
                        );
                    }
                );
            }
        );
    }

    cancelLineup = async () => {
        if (await this.state.lineupRequest.deleteLineupRequest() == true) {
            this.props.navigation.reset({
                index: 0,
                routes: [{name: "CreateLineup"}],
            });
        }
    }

    showQRcode = () => {
        this.props.navigation.navigate("ShowQRcode", {qrCode: this.state.lineupRequest.qrCode});
    }

    updateRemainingTime = () => {
        let secs = this.state.lineupRequest.waitingTime - this.state.distance.duration.value;
        /*
        setTimeout(() => {
            Notifications.postLocalNotification({
            title: "It's time to go!",
            body: "If you leave now you will reach the destination at the perfect time!"})
        }, secs*1000);
        */
        this.setState({
            remainingTime:
            secs <= 0 ? secs = "It's time to go!" :
            this.formatSecsToMins(secs)
        });
    }

    formatSecsToMins(secs) {
        let mins = parseInt(secs / 60) + " mins";
        secs = secs % 60;
        if (secs == 0) secs = "";
        else secs += " secs";
        return mins + " " + secs;
    }

    render = () => (
        <View style={Styles.container}>
            <Header section="LineUp"/>
            
            <Text style={Styles.boldText}>Supermarket selected:</Text>
            <Text style={Styles.normalText}>{this.state.lineupRequest.supermarket.label}</Text>

            <Text style={Styles.boldText}>Number of people inside the market:</Text>
            <Text style={Styles.normalText}>{this.state.lineupRequest.numInside}</Text>
            
            <Text style={Styles.boldText}>Mean of transport selected:</Text>
            <Text style={Styles.normalText}>{this.state.lineupRequest.meanOfTransport.label}</Text>
            
            <Text style={Styles.boldText}>Number of people in the queue:</Text>
            <Text style={Styles.normalText}>{this.state.lineupRequest.queue}</Text>
            
            <Text style={Styles.boldText}>Time to reach the Supermarket:</Text>
            <Text style={Styles.normalText}>
                {
                    this.state.distance === undefined ? "Loading..." :
                    this.formatSecsToMins(this.state.distance.duration.value) +
                    " (" + this.state.distance.distance.text + ")"
                }
            </Text>

            <Text style={Styles.boldText}>Waiting time:</Text>
            <Text style={Styles.normalText}>
                {this.formatSecsToMins(this.state.lineupRequest.waitingTime)}
            </Text>
            
            <Text style={Styles.boldText}>You have to start in:</Text>
            <Text style={Styles.normalText}>
                {
                    this.state.remainingTime === undefined ? "Loading..." : this.state.remainingTime
                }
            </Text>

            <View style={showLineupStyles.buttonsView}>
                <Button title="Show QR code"
                disabled={this.state.lineupRequest===undefined ? true : false}
                buttonStyle={[Styles.button, {width: SCREEN_WIDTH*0.35}]}
                onPress={this.showQRcode}/>
                <Button title="Cancel LineUp"
                buttonStyle={[Styles.button, {width: SCREEN_WIDTH*0.35, backgroundColor: Colors.lightGray}]}
                onPress={this.cancelLineup}/>
            </View>
            
        </View>
    );
}


const showLineupStyles = StyleSheet.create({
    buttonsView: {
        flexDirection: "row",
        width: SCREEN_WIDTH*0.9,
        justifyContent: "space-around"
    }
});

export default ShowLineup;
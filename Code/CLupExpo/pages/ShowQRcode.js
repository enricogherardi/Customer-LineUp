import React from 'react';
import { View, Text } from "react-native";
import { Button } from "react-native-elements";
import QRCode from 'react-native-qrcode-svg';
import Header from "../components/Header";
import { Colors, Styles, SCREEN_WIDTH } from "../Styles";

class ShowQRcode extends React.Component {
    constructor(props) {
        super(props);
    }

    showLineup = () => {
        this.props.navigation.navigate("ShowLineup");
    }

    render = () => (
        <View style={Styles.container}>
            <Header section="LineUp"/>  

            <Text style={[Styles.boldText, {textAlign: "center", marginBottom: 20}]}>Scan the QR code at the supermarket entrance!</Text>

            <QRCode value={this.props.route.params.qrCode.toString()} size={250}/>

            <Button title="Back"
            buttonStyle={[Styles.button, {width: SCREEN_WIDTH*0.35, backgroundColor: Colors.lightGray}]}
            onPress={this.showLineup}/>
        </View>
    );
}

export default ShowQRcode;
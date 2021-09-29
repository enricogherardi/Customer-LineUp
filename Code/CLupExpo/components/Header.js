import React from "react";
import { StyleSheet, View, Text, Dimensions } from "react-native";
import { getStatusBarHeight } from 'react-native-status-bar-height';
import { Colors, Fonts } from "../Styles";

class Header extends React.Component {	
	render = () => (
        <>
        {
            this.props.section == "Sign In" || this.props.section == "Sign Up" ?
            <>
            <View style={headerStyles.logoView}/>
		    <View style={[headerStyles.titleView, {justifyContent: "center", marginTop: 0, marginBottom: 0}]}>
                <Text style={[headerStyles.titleText, {color: Colors.darkGray}]}>Customers </Text>
		    	<Text style={[headerStyles.titleText, {color: Colors.green}]}>Line-up</Text>
		    </View>
            <Text style={headerStyles.staySafeText}>STAY SAFE</Text>
            </>
            :
            <View style={headerStyles.titleView}>
                <Text style={[headerStyles.titleText, {color: Colors.darkGray}]}>CL</Text>
		    	<Text style={[headerStyles.titleText, {color: Colors.green}]}>up</Text>
		    </View>
        }
        
        {
            this.props.section == "Sign In" || this.props.section == "Sign Up" ? null :
            <>
            <Text style={headerStyles.sectionText}>{this.props.section}</Text>
            <View style={headerStyles.separatorView}/>
            </>
        }
        </>
	);
};

const headerStyles = StyleSheet.create({
    logoView: {
        height: 50,
        width: 150,
        borderRadius: 25,
        backgroundColor: Colors.green,
		marginTop: getStatusBarHeight()
    },
	titleView: {
		flexDirection: "row",
		width: Dimensions.get("window").width*0.9,
		marginTop: getStatusBarHeight(),
        marginBottom: 20,
        justifyContent: "flex-start"
	},
	titleText: {
		fontWeight: "bold",
		fontSize: Fonts.fontSize1
    },
    staySafeText: {
        fontSize: Fonts.fontSize3,
        color: Colors.lightGray,
        marginBottom: 20,
    },
    sectionText: {
        width: Dimensions.get("window").width*0.9,
        color: Colors.darkGray,
        fontWeight: "bold",
        fontSize: Fonts.fontSize2
    },
    separatorView: {
        height: 3,
        width: Dimensions.get("window").width*0.9,
        borderRadius: 2,
        marginVertical: 10,
        backgroundColor: Colors.darkGray
    }
});

export default Header;
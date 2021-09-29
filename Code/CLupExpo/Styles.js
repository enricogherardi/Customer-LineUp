import { StyleSheet, Dimensions }from "react-native";
import { StatusBar } from "react-native"; //expo version only

const SCREEN_WIDTH = Dimensions.get("window").width;

const Colors = {
    darkGray: "#373737",
    lightGray: "#959595",
    green: "#0FB309",
    backColor: "white"
};

const Fonts = {
    fontSize1: 24,
    fontSize2: 18,
    fontSize3: 14
};

const Styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: StatusBar.currentHeight, // expo version only
        backgroundColor: Colors.backColor,
        alignItems: "center"
    },
    button: {
        backgroundColor: Colors.green,
        borderRadius: 5,
        width: SCREEN_WIDTH*0.7,
        height: 50,
        marginTop: 50,
        marginBottom: 20
    },
    normalText: {
		width: SCREEN_WIDTH*0.9,
        fontSize: Fonts.fontSize3,
        marginBottom: 10
    },
    boldText: {
		width: SCREEN_WIDTH*0.9,
        fontSize: Fonts.fontSize3,
        fontWeight: "bold",
        marginBottom: 5
    },
    errorText: {
        width: "100%",
        fontSize: Fonts.fontSize3,
        color: "red",
        textAlign: "center",
        marginBottom: 5
    }
});

export { Colors, Styles, Fonts, SCREEN_WIDTH };
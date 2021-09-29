import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Header from "../components/Header";
import { Styles, Fonts, Colors, SCREEN_WIDTH } from '../Styles';

class Login extends React.Component {
    constructor() {
        super();

        this.state = {
            username: "",
            password: "",
            errorText: ""
        };
    }

    componentDidMount() {
        this.checkSavedCredentials();
    }

    toSignup = () => {
        this.setState({errorText: ""}, () =>
            this.props.navigation.navigate("Signup")
        );
    }

    toLineup = () => {
        this.setState({errorText: ""}, () =>
            this.props.navigation.reset({
		    	index: 0,
		    	routes: [{name: "Lineup"}]
		    })
        );
    }

    checkSavedCredentials = async () => {
		try {
			var username = await AsyncStorage.getItem("@username");
            var password = await AsyncStorage.getItem("@password");
            global.username = username;
            this.setState({username: username, password: password});
		} catch (error) {
			console.log(error);
			return;
        }

        if (username == null || password == null) return;

        this.login();
	}

    login = async () => {
        if (this.state.username.length < 1 || this.state.password.length < 1) {
            this.setState({errorText: "Please insert valid credentials"});
            return;
        }

        let params = "?username=" + this.state.username + "&password=" + this.state.password;
        try {
            var response = await fetch(global.apiUrl + "/login" + params);
        
            var status = response.status;
            if (status == 200) {
                response = await response.json();
            } else {
                console.log("[" + status + "] Error while logging in");
                this.setState({errorText: "Error while logging in"});
                return;
            }
        } catch (error) {
            console.log(error);
            this.setState({errorText: "Error while logging in"});
            return;
        }
        
        if (response.success != 1) {
            console.log("[" + status + "] Wrong username or password");
            this.setState({errorText: "Wrong username or password"});
            return;
        }
        
        try {
            await AsyncStorage.setItem("@username", this.state.username);
            await AsyncStorage.setItem("@password", this.state.password);
        } catch (error) {
            console.log(error);
        }
        
        global.username = this.state.username;
        
        console.log("Logged as " + this.state.username)
        this.toLineup();
    }

    render = () => (
        <View style={Styles.container}>
            <Header section="Sign In"/>
            
            <View style={loginStyles.credentialsView}>

                <Text style={loginStyles.titleText}>Sign In</Text>

                <Text style={loginStyles.welcomeText}>Hi there! Nice to see you again.</Text>

                <Text style={Styles.boldText}>Username</Text>

                <TextInput
                style={loginStyles.textInput}
                placeholder="Your username"
                autoCapitalize="none"
                blurOnSubmit={false}
			    onChangeText={text => this.setState({username: text})}
                onSubmitEditing={() => this.pwdTextInput.focus()}/>

                <Text style={Styles.boldText}>Password</Text>
                <TextInput
                style={loginStyles.textInput}
                placeholder="Your password"
                autoCapitalize="none"
			    secureTextEntry={true}
			    onChangeText={text => this.setState({password: text})}
                ref={(ref) => this.pwdTextInput = ref}/>
            
                {
                    this.state.errorText.length == 0 ? null :
                    <Text style={Styles.errorText}>{this.state.errorText}</Text>
                }
            </View>


            <Button buttonStyle={Styles.button} title="Sign In" onPress={this.login}/>

            <View style={loginStyles.signupButtonView}>
                <TouchableOpacity>
                    <Text style={loginStyles.signupButtonText}>Forgot password?</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={this.toSignup}>
                    <Text style={[loginStyles.signupButtonText, {color: Colors.darkGray}]}>Sign Up</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const loginStyles = StyleSheet.create({
    credentialsView: {
        width: SCREEN_WIDTH*0.7
    },
    titleText: {
        fontSize: Fonts.fontSize1,
        fontWeight: "bold",
        color: Colors.darkGray,
        marginBottom: 20
    },
    welcomeText: {
        fontSize: Fonts.fontSize3,
        color: Colors.lightGray,
        marginBottom: 20,
    },
    textInput: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.lightGray,
        marginBottom: 20
    },
    signupButtonText: {
        fontWeight: "bold",
        fontSize: Fonts.fontSize3,
        color: Colors.lightGray
    },
    signupButtonView: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: SCREEN_WIDTH*0.7
    }
});

export default Login;
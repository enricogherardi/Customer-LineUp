import React from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity } from "react-native";
import { Button } from "react-native-elements";
import Header from "../components/Header";
import { Styles, Fonts, Colors, SCREEN_WIDTH } from '../Styles';

class Signup extends React.Component {
    constructor() {
        super();

        this.state = {
            email: "",
            username: "",
            password: "",
            passwordConfirm: "",
            errorText: ""
        };
    }

    signup = async () => {
        if (this.state.username.length < 1 || this.state.password.length < 1) {
            this.setState({errorText: "Please insert valid credentials"});
            return;
        }
        if (this.state.password != this.state.passwordConfirm) {
            this.setState({errorText: "You must insert the same password in the fields"});
            return;
        }

        let params = "?email=" + this.state.email +
        "&username=" + this.state.username +
        "&password=" + this.state.password;

        try {
            var response = await fetch(global.apiUrl + "/signup" + params, {
                method: "POST"
            });
            
            var status = response.status;
            if (status == 200) {
                response = await response.json();
            } else {
                console.log("[" + status + "] Error while signing up");
                return;    
            }
        } catch (error) {
            console.log(error);
            return;
        }
        
        if (response.success != 1) {    
            console.log("[" + status + "] Error while signing up");
            return;
        }

        console.log("Registered as " + this.state.username)
        this.toLogin();
    }

    toLogin = () => {
        this.setState({errorText: ""},
            this.props.navigation.navigate("Login")
        );
    }

    render = () => (
        <View style={Styles.container}>
            <Header section="Sign Up"/>

            <View style={signupStyles.credentialsView}>
                <Text style={signupStyles.titleText}>Sign Up</Text>
                
                <Text style={Styles.boldText}>Email</Text>
                <TextInput
                style={signupStyles.textInput}
                placeholder="Your email address"
                autoCapitalize="none"
                keyboardType="email-address"
                blurOnSubmit={false}
			    onChangeText={text => this.setState({email: text})}
                onSubmitEditing={() => this.usernameTextInput.focus()}/>

                <Text style={Styles.boldText}>Username</Text>
                <TextInput
                style={signupStyles.textInput}
                placeholder="Your username"
                autoCapitalize="none"
                blurOnSubmit={false}
			    onChangeText={text => this.setState({username: text})}
                ref={(ref) => this.usernameTextInput = ref}
                onSubmitEditing={() => this.pwdTextInput.focus()}/>

                <Text style={Styles.boldText}>Password</Text>
                <TextInput
                style={signupStyles.textInput}
                placeholder="Your password"
                autoCapitalize="none"
                secureTextEntry={true}
                blurOnSubmit={false}
			    onChangeText={text => this.setState({password: text})}
                ref={(ref) => this.pwdTextInput = ref}
                onSubmitEditing={() => this.repeatPwdTextInput.focus()}/>

                <Text style={Styles.boldText}>Repeat password</Text>
                <TextInput
                style={signupStyles.textInput}
                placeholder="Repeat password"
                autoCapitalize="none"
                secureTextEntry={true}
			    onChangeText={text => this.setState({passwordConfirm: text})}
                ref={(ref) => this.repeatPwdTextInput = ref}/>
            </View>

            {
                this.state.errorText.length == 0 ? null :
                <Text style={Styles.errorText}>{this.state.errorText}</Text>
            }

            <Button buttonStyle={Styles.button} title="Register" onPress={this.signup}/>

            <TouchableOpacity style={signupStyles.loginButtonView} onPress={this.toLogin}>
                <Text style={signupStyles.loginButtonText}>Have an account? </Text>
                <Text style={[signupStyles.loginButtonText, {color: Colors.darkGray}]}>Sign In</Text>
            </TouchableOpacity>
        </View>
    );
}

const signupStyles = StyleSheet.create({
    credentialsView: {
        width: SCREEN_WIDTH*0.7
    },
    titleText: {
        fontSize: Fonts.fontSize1,
        fontWeight: "bold",
        color: Colors.darkGray,
        marginBottom: 20
    },
    textInput: {
        borderBottomWidth: 2,
        borderBottomColor: Colors.lightGray,
        marginBottom: 20
    },
    loginButtonView: {
        flexDirection: "row"
    },  
    loginButtonText: {
        fontWeight: "bold",
        fontSize: Fonts.fontSize3,
        color: Colors.lightGray
    }
});

export default Signup;
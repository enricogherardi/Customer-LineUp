import { PermissionsAndroid } from "react-native";
import Geolocation from "react-native-geolocation-service";
// just for expo based app version
import * as Location from "expo-location";

let requestLocationPermission = async () => {
    try {
        const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION
        );
        if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            return true;
        } else {
            console.log("Geolocation permission denied");
            return false;
        }
    } catch (error) {
        console.log(error);
        return false;
    }
}

// just for expo based app version
let updatePositionExpo = async (updateCallback) => {
    let { status } = await Location.requestPermissionsAsync();
    if (status !== "granted") {
        console.log("Permission to access location was denied");
        updateCallback(undefined);
    }

    // check location format
    let position = await Location.getCurrentPositionAsync({});
    updateCallback([position.coords.latitude, position.coords.longitude]);
}

let updatePosition = async (updateCallback) => {
    if (requestLocationPermission()) {
        Geolocation.getCurrentPosition(
            (position) => updateCallback([position.coords.latitude, position.coords.longitude]),
            (error) => {
                console.log(error.code, error.message);
                updateCallback(undefined);
            },
            {
                enableHighAccuracy: true,
                timeout: 15000
            }
        );
    } else {
        updateCallback(undefined);
    }
}

let updateDistance = async (origin, destination, mode, updateCallback) => {
    let url = "https://maps.googleapis.com/maps/api/distancematrix/json?";    
    let params = "origins=" + origin +
    "&destinations=" + destination +
    "&mode=" + mode +
    "&key=" + global.googleKey;
    
    try {
        var response = await fetch(url + params);
        var status = response.status;
        response = await response.json();
    } catch (error) {
        console.log(error);
        updateCallback(undefined);
    }
    
    if (status == 200 && response.status == "OK") {
        updateCallback(response.rows[0].elements[0]);
    } else {
        console.log("Error while calculating the distance");
        updateCallback(undefined);
    }
}

export { requestLocationPermission, updatePosition, updatePositionExpo, updateDistance };
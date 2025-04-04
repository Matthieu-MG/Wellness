import { Pedometer } from "expo-sensors";

async function IsPedometerAllowedAsync() {
    if(!(await Pedometer.getPermissionsAsync())){
        const request = await Pedometer.requestPermissionsAsync();
        return request.granted;
    }
    return true;
}

async function GetStepsToday() {
    if(await Pedometer.isAvailableAsync()) {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        console.log("Today: ",today);
        
        return (await Pedometer.getStepCountAsync(today, new Date())).steps;
    }
    return 0;
}

export {IsPedometerAllowedAsync, GetStepsToday}
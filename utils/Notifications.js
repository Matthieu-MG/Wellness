import * as Notifications from 'expo-notifications'
import { DAILY, WEEKLY, MONTHLY } from './Days';

async function allowsNotificationsAsync() {
    const settings = await Notifications.getPermissionsAsync();
    return (
      settings.granted || settings.ios?.status === Notifications.IosAuthorizationStatus.PROVISIONAL
    );
}

async function requestPermissionsAsync() {
    return await Notifications.requestPermissionsAsync({
      ios: {
        allowAlert: true,
        allowBadge: true,
        allowSound: true,
      },
    });
}

//* Time should be an object {hour: number, minute: number}
function getTreatmentNotificationId(name, i, time) {
    return `${name}-${i}-${time.hour}-${time.minute}`
}

//* Times should be an array of objects : {hour: int, minute: int}
async function scheduleDailyTreatmentNotifications(times, name) {

    for (const [i, time] of times.entries()) {

        console.log(`Scheduling Notification ${name}-${i}-${time.hour}-${time.minute}`);
        console.log(`hour: ${typeof(time.hour)}`)
        console.log(`minute: ${typeof(time.minute)}`)

        try {

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: `Treatment ${name}`,
                    body: "Time for your meds!",
                },
                identifier: getTreatmentNotificationId(name, i, time),
                trigger: {
                    type: "daily",
                    hour: time.hour,
                    minute: time.minute,
                },
            });
        }
        catch (error) {
            console.error('ERROR scheduling notification: ', error);
        }
            
    }
    
    console.log("finished")
}

// TODO --------------------------------------------------------------------------
async function scheduleMonthlyOrWeeklyTreatmentNotifications(times, days, name) {

    //* Loop over days array
        //* Loop over times array
            //* Set Notification id to be i*j or 'i-j' or idk ?
        //* End Loop
    //* End Loop

    //* Add additional logic to delete monthly or weekly treatment due to nested loop
}

async function scheduleTreatmentNotifications(treatment) {

    let settings = await allowsNotificationsAsync();
    console.log(settings);

    if(!settings) {
        console.log("Doesn't authorize notifications")
        await requestPermissionsAsync();
        settings = await allowsNotificationsAsync()
        if (!settings) return;
    }

    Notifications.setNotificationHandler({
        handleNotification: async () => ({
          shouldShowAlert: true,
          shouldPlaySound: false,
          shouldSetBadge: true,
        }),
    });

    console.log(settings)

    const times = treatment.times;
    console.log(times);
    console.log(treatment.days)

    if(treatment.frequency === DAILY) {
        console.log('daily');
        scheduleDailyTreatmentNotifications(times, treatment.treatmentName);
    }
    else {
        //? Check days obj structure
        console.log('not daily');
    }
}

async function removeTreatmentNotifications(id) {
    Notifications.cancelScheduledNotificationAsync(id);
}

async function cancelScheduledNotifications() {
    await Notifications.cancelAllScheduledNotificationsAsync();
}

async function getAllScheduledNotifications() {
    try {
        const notifs = Notifications.getAllScheduledNotificationsAsync();
        return notifs;
    }
    catch (error) {
        console.error("ERROR from getAllScheduledNotifications (Notifications.js): ", error);
        return []
    }
    
}

export {cancelScheduledNotifications, removeTreatmentNotifications, scheduleTreatmentNotifications, getTreatmentNotificationId, getAllScheduledNotifications}
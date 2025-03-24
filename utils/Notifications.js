import * as Notifications from 'expo-notifications'
import { DAILY, WEEKLY, MONTHLY, frequency } from './Days';

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

//* Time should be an object {hour: number, minute: number}
//* weekday should be a number (int) between 1-7
function getTreatmentWeeklyNotificationId(name, i, j, time, weekday) {
    return `${name}-${i}-${j}-${weekday}-${time.hour}-${time.minute}`
}

//* Times should be an array of objects : {hour: int, minute: int}
async function scheduleDailyTreatmentNotifications(times, name) {

    for (const [i, time] of times.entries()) {

        console.log(`Scheduling Notification ${name}-${i}-${time.hour}-${time.minute}`);

        try {

            await Notifications.scheduleNotificationAsync({
                content: {
                    title: `Treatment ~ ${name}`,
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

// TODO For weekly 1 = Sunday while currently 1 = Monday so we need to add 1 (2 to 8) , then mod 7 (0 to 6) add 1 again (1 [Sun] - 7 [Sat])
async function scheduleMonthlyOrWeeklyTreatmentNotifications(times, days, frequency, name) {

    for (const [i, day] of days.entries()) {

        const weekday = parseInt(day)
        
        for (const [j, time] of times.entries()) {
        
            console.log(`Scheduling Notification ${name}-${i}-${j}-${weekday}-${time.hour}-${time.minute}`);

            try {
                await Notifications.scheduleNotificationAsync({
                    content: {
                        title: `Treatment ~ ${name}`,
                        body: "Time for your meds!",
                    },
                    identifier: getTreatmentWeeklyNotificationId(name, i, j, time, weekday),
                    trigger: {
                        type: frequency,
                        hour: time.hour,
                        minute: time.minute,
                        ...(frequency === 'weekly' ? {weekday: weekday} : {day: weekday})
                    },
                });
            }
            catch (error) {
                console.error('ERROR scheduling notification: ', error);
            }
        }   
    }
}

async function scheduleTreatmentNotifications(treatment) {

    let settings = await allowsNotificationsAsync();

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

    const times = treatment.times;
    const days = treatment.days.map(d => d.day);


    if(treatment.frequency === DAILY) {
        scheduleDailyTreatmentNotifications(times, treatment.treatmentName);
    }
    else {
        let frequency = 'weekly'
        if(treatment.frequency === MONTHLY) {
            frequency = 'monthly'
        }

        scheduleMonthlyOrWeeklyTreatmentNotifications(times, days, frequency, treatment.treatmentName);
    }
}

async function removeDailyTreatmentNotifications(treatment) {
    for (const [i, time] of treatment.times.entries()) {
        
        try {
            console.log(await getAllScheduledNotifications())
            await removeTreatmentNotifications(getTreatmentNotificationId(treatment.treatmentName, i, time))
            console.log(await getAllScheduledNotifications())

        }
        catch (error) {
            console.error('ERROR FROM removeDailyTreatmentNotifications -> Deleting notification: ', error);
        }
            
    }
}

async function removeWeeklyOrMonthlyTreatmentNotifications(treatment) {
    const days = treatment.days.map(d => d.day);
    const times = treatment.times;
    const name = treatment.treatmentName;

    for (const [i, day] of days.entries()) {

        const weekday = parseInt(day)
        
        for (const [j, time] of times.entries()) {
        
            console.log(`Deleting Notification ${name}-${i}-${j}-${weekday}-${time.hour}-${time.minute}`);

            try {
                await removeTreatmentNotifications(getTreatmentWeeklyNotificationId(treatment.treatmentName, i, j, time, weekday));
            }
            catch (error) {
                console.error('ERROR FROM removeWeeklyOrMonthlyTreatmentNotifications -> Deleting weekly notification: ', error);
            }
        }   
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
        const notifs = await Notifications.getAllScheduledNotificationsAsync();
        console.log('ALL SCHEDULED NOTIFICATIONS: ', notifs);
        return notifs;
    }
    catch (error) {
        console.error("ERROR from getAllScheduledNotifications (Notifications.js): ", error);
        return []
    }
    
}

export {cancelScheduledNotifications, removeTreatmentNotifications,
        scheduleTreatmentNotifications, getTreatmentNotificationId, 
        getAllScheduledNotifications, removeDailyTreatmentNotifications,
        removeWeeklyOrMonthlyTreatmentNotifications
    }
import { Platform } from 'react-native';
import firebase from 'react-native-firebase';

class PushNotifications {
    notificationListener = null;
	notificationOpenedListener = null;
    onNotificationTaped = null;
    onFirebaseTokenChanged = null;
    isChatOpened = false;

	async config(onNotificationTaped, onFirebaseTokenChanged) {
        this.onNotificationTaped = onNotificationTaped;
        this.onFirebaseTokenChanged = onFirebaseTokenChanged;

		this.checkPermission();
		this.createNotificationListeners();
	}

    removeListeners = () => {
        this.onTokenRefreshListener();
        this.notificationListener();
        this.notificationOpenedListener();
    }

	createNotificationListeners = () => {
        this.onTokenRefreshListener = firebase.messaging().onTokenRefresh(fcmToken => {
            if (this.onFirebaseTokenChanged) {
                this.onFirebaseTokenChanged(fcmToken);
            }
        });

		// Triggered when a particular notification has been received in foreground
		this.notificationListener = firebase.notifications().onNotification(notification => {
            const { title, body, data, notificationId } = notification; 

            if (data.type === "Chat" && this.isChatOpened) {
                return;
            }

            if (Platform.OS == "ios") {
				const localNotification = new firebase.notifications.Notification().setNotificationId(notificationId).setTitle(title).setBody(body).setData(data);
                firebase.notifications().displayNotification(localNotification);
			} else if (Platform.OS == "android" && Platform.Version >= 26) {
				const newNotification = new firebase.notifications.Notification()
            										.setNotificationId(notificationId)
            										.setTitle(title)
            										.setBody(body)
													.setData(data)
													.setSound("default")
													.android.setChannelId(notificationId)
													.android.setAutoCancel(true)
													.android.setSmallIcon("ic_launcher")
													.android.setCategory(firebase.notifications.Android.Category.Alarm);

                const channel = new firebase.notifications.Android.Channel(notificationId, "test-name", firebase.notifications.Android.Importance.Max);
				firebase.notifications().android.createChannel(channel);
				firebase.notifications().displayNotification(newNotification);
			} else if (Platform.OS == "android" && Platform.Version < 26) {
				const newNotification = new firebase.notifications.Notification()
													.setNotificationId(notificationId)
													.setTitle(title)
													.setSubtitle("subtitle")
													.setBody(body)
													.setData(data)
													.setSound("default")
													.android.setChannelId(notificationId)
													.android.setSmallIcon("ic_notification")
													.android.setColor("#ff0000")
													.android.setPriority(firebase.notifications.Android.Priority.High);

                firebase.notifications().displayNotification(newNotification);
			}
		});

		// // If your app is in background, you can listen for when a notification is clicked / tapped / opened as follows:
		this.notificationOpenedListener = firebase.notifications().onNotificationOpened(notificationOpen => {
            const { data, notificationId } = notificationOpen.notification;
            firebase.notifications().removeDeliveredNotification(notificationId);
            this.parseDataAndSentToNatigator(data);
        });

		// // If your app is closed, you can check if it was opened by a notification being clicked / tapped / opened as follows:
		firebase.notifications().getInitialNotification().then(notificationOpen => {
            if (notificationOpen) {
                if (Platform.OS == "ios") {
                    const { data, notificationId } = notificationOpen.notification;
                    firebase.notifications().removeDeliveredNotification(notificationId);
                    this.parseDataAndSentToNatigator(data);
                } else {
                    const { data, notificationId } = notificationOpen.notification;
                    firebase.notifications().removeDeliveredNotification(notificationId);
                    this.parseDataAndSentToNatigator(data);
                }
            }
        });        
    }

    parseDataAndSentToNatigator = (data) => {
        if (this.onNotificationTaped) {
            this.onNotificationTaped({ id: data.id, type: data.type });
        }
    };

	checkPermission = () => {
		firebase.messaging().hasPermission().then(enabled => {
            if (!enabled) {
                this.requestPermission();
            }
        });
	}

	requestPermission = () => {
		firebase.messaging().requestPermission().catch(() => {
            setTimeout(() => {
                firebase.messaging().hasPermission().then(enabled => {
                    if (!enabled) {
                        firebase.messaging().requestPermission();   
                    }
                });
            }, 3000);
        });
    }

    getFcmToken = async () => {
        try {
            return await firebase.messaging().getToken();
        } catch (error) {
            return "default-token"

    // Error: AUTHENTICATION_FAILED
    //        at createErrorFromErrorData (NativeModules.js:155)
    //        at NativeModules.js:104
    //        at MessageQueue.__invokeCallback (MessageQueue.js:414)
    //        at MessageQueue.js:127
    //        at MessageQueue.__guard (MessageQueue.js:314)
    //        at MessageQueue.invokeCallbackAndReturnFlushedQueue (MessageQueue.js:126)
    //        at debuggerWorker.js:80
        }
	}
}

const Notifications = new PushNotifications();
export default Notifications;
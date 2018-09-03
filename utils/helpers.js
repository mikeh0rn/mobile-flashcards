// import { FontAwesome, MaterialIcons, MaterialCommunityIcons } from '@expo/vector-icons'
// Allow users to create a deck which can hold an unlimited number of cards.
// export function submitDeckTitle (title) {
//   return AsyncStorage.mergeItem(DECK_STORAGE_KEY, JSON.stringify({
//     [title]: {
//       title,
//       questions: []
//     }
//   }))
// }

// Allow users to add a card to a specific deck.
// export function submitDeckQuestion ({ entry, key }) {
//   // To do: add question to a specific deck
//   return AsyncStorage.mergeItem(DECK_QUESTION_STORAGE_KEY, JSON.stringify({
//     [key]: entry
//   }))
// }
//
import { AsyncStorage } from 'react-native';
import { Notifications, Permissions } from 'expo';

const NOTIFICATION_KEY = 'MobileFlashcards:notifications';

export function clearLocalNotification () {
  return AsyncStorage.removeItem(NOTIFICATION_KEY)
    .then(Notifications.cancelAllScheduledNotificationsAsync)
}

function createNotification() {
  return {
    title: 'REMINDER',
    body: "👋 DON'T GO TODAY WITHOUT STUDYING!!!",
    ios: {
      sound: true,
    },
    android: {
      sound: true,
      priority: 'high',
      sticky: false,
      vibrate: true,
    }
  }
}

export function setLocalNotification() {
  AsyncStorage.getItem(NOTIFICATION_KEY)
    .then(JSON.parse)
    .then((data) => {
      if (data === null) {
        Permissions.askAsync(Permissions.NOTIFICATIONS)
          .then(({ status }) => {
            if (status === 'granted') {
              Notifications.cancelAllScheduledNotificationsAsync()
              let tomorrow = new Date()
              tomorrow.setDate(tomorrow.getDate() + 1)
              tomorrow.setHours(20)
              tomorrow.setMinutes(0)
              Notifications.scheduleLocalNotificationAsync(
                createNotification(),
                {
                  time: tomorrow,
                  repeat: 'day',
                }
              )
              AsyncStorage.setItem(NOTIFICATION_KEY, JSON.stringify(true))
            }
          })
      }
    })
}

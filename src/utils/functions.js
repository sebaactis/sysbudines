import Toast from "react-native-toast-message"

export const calculate_total_price = (items) => {
     return items.reduce((acc, item) => (acc += item.precio * item.quantity), 0)
}

export const showToast = (type, text1, text2, visibilityTime) => {
     Toast.show({
          type,
          text1,
          text2,
          visibilityTime,
     });
}
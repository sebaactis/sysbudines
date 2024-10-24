import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OrderCard from '../../components/OrderCard'

const orders = [
  {
    id: 'NFSDKW32',
    date: 1728829975000,
    total: 14000
  },
  {
    id: 'FWSDWE22',
    date: 1728991255000,
    total: 20000
  },
  {
    id: 'HFDSF55',
    date: 1728156655000,
    total: 8000
  }

]

export default function OrdersScreen() {
  return (
    <View style={styles.ordersCont}>
      {
        orders.map(order => (
          <OrderCard key={order.id} order={order}/>

        ))
      }
    </View>
  )
}

const styles = StyleSheet.create({
  ordersCont: {
    margin: 20,
    gap: 30
  }
})
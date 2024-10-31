import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback } from 'react'
import OrderCard from '../../components/OrderCard'
import { useGetOrdersQuery } from '../../services/orderService';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../global/colors';
import { useFocusEffect } from '@react-navigation/native';
import { useSelector } from 'react-redux';


export default function OrdersScreen({ navigation }) {

  const user = useSelector(state => state.authReducer.email)
  const { data: orders, error, isLoading, refetch } = useGetOrdersQuery(user);

  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [refetch])
  );

  return (
    <>
      {isLoading
        ? <ActivityIndicator style={styles.spinner} size="large" color={colors.principal} />
        :
        <View style={styles.ordersCont}>
          {
            orders.map(order => (
              <OrderCard key={order.orderId} order={order} navigation={navigation} />
            ))
          }
        </View>}
    </>
  )
}

const styles = StyleSheet.create({
  ordersCont: {
    margin: 20,
    gap: 30
  }
})
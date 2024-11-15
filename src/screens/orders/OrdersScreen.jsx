import { Pressable, StyleSheet, Text, View, ScrollView } from 'react-native'
import React, { useCallback } from 'react'
import OrderCard from '../../components/OrderCard'
import { useGetOrdersQuery } from '../../services/orderService';
import { ActivityIndicator } from 'react-native';
import { colors } from '../../global/colors';
import { useFocusEffect } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '../../features/auth/authSlice';


export default function OrdersScreen({ navigation }) {

  const user = useSelector(state => state.authReducer.email)
  const dispatch = useDispatch();
  const { data: orders, error, isLoading, refetch } = useGetOrdersQuery(user);

  useFocusEffect(
    useCallback(() => {
      refetch()
    }, [refetch])
  );

  return (
    <>
      {user === 'Invited'
        ? <View style={styles.loginEmptyContainer}>
          <Pressable onPress={() => dispatch(setUser(""))} style={styles.loginBtnEmpty}>
            <Text style={styles.loginEmpty}>Debes loguearte para ver tus ordenes</Text>
          </Pressable>
        </View>
        : isLoading
          ? <ActivityIndicator style={styles.spinner} size="large" color={colors.principal} />
          :
          <ScrollView style={styles.ordersCont}>
            {
              orders.map(order => (
                <OrderCard key={order.orderId} order={order} navigation={navigation} />
              ))
            }
          </ScrollView>}
    </>
  )
}

const styles = StyleSheet.create({
  ordersCont: {
    margin: 20,
    gap: 30
  },
  loginEmptyContainer: {
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%'
  },
  loginBtnEmpty: {
    backgroundColor: colors.cardColor,
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 15
  },
  loginEmpty: {
    textAlign: 'center',
    fontWeight: 'bold',
    fontSize: 17
  }
})
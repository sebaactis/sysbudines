import { Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { BackArrow } from '../Icons'

const PressableBack = ({callback}) => {
  return (
    <Pressable onPress={callback}>
        <BackArrow />
    </Pressable>
  )
}

export default PressableBack

const styles = StyleSheet.create({})
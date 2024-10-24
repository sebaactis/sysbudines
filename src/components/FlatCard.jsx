import { StyleSheet, Text, View, Image } from 'react-native'

export default function FlatCard({ children, style }) {
    return (
        <View style={{ ...styles.cardContainer, ...style }}>
            {children}
        </View>
    )
}

const styles = StyleSheet.create({
})
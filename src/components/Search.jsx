import { View, Text, TextInput, StyleSheet } from 'react-native'
import React from 'react'

const Search = ({ setSearch }) => {

    return (
        <TextInput
            style={styles.search}
            placeholder='Search a product'
            onChangeText={(text) => setSearch(text)}
        />
    )
}

const styles = StyleSheet.create({
    search: {
        backgroundColor: "#0000001d",
        alignSelf: "center",
        width: "70%",
        borderRadius: 5,
        paddingVertical: 13,
        paddingHorizontal: 10,
        marginBottom: 13
    }
})

export default Search
import { StyleSheet } from "react-native"
import Svg, { Path } from "react-native-svg"

export const BackArrow = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={36}
            height={36}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-arrow-back-up"
            style={styles.backArrow}
            {...props}
        >
            <Path d="M0 0h24v24H0z" stroke="none" />
            <Path d="M9 14l-4-4 4-4" />
            <Path d="M5 10h11a4 4 0 110 8h-1" />
        </Svg>
    )
}

export const HeartFavorite = (props) => {
    return (
        <Svg
            xmlns="http://www.w3.org/2000/svg"
            width={24}
            height={24}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-heart"
            {...props}
            style={styles.heartFavorite}
        >
            <Path d="M0 0h24v24H0z" stroke="none" />
            <Path d="M19.5 12.572L12 20l-7.5-7.428A5 5 0 1112 6.006a5 5 0 117.5 6.572" />
        </Svg>
    )
}

const styles = StyleSheet.create({

    backArrow: {
        color: "#ffffff",
        backgroundColor: "#28747a",
        borderRadius: 12,
        marginLeft: 10,
        marginTop: 5
    },
    heartFavorite: {
        color: "#000000",
        borderRadius: 12
    }
})
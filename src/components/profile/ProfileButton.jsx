import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import CameraIcon from '../CameraIcon';
import { colors } from '../../global/colors';

const ProfileButton = ({ onPress, text, isIcon = false }) => (
    <Pressable onPress={onPress} style={isIcon ? styles.buttonIcon : styles.button}>
        {isIcon ? <CameraIcon style={styles.cameraIcon} /> : <Text style={styles.text}>{text}</Text>}
    </Pressable>
);

export default ProfileButton;

const styles = StyleSheet.create({
    buttonIcon: {
        marginTop: 10
    },
    button: {
        backgroundColor: colors.principal,
        paddingHorizontal: 20,
        paddingVertical: 10,
        margin: 'auto',
        borderRadius: 10,
        marginBottom: 190
    },
    text: {
        textAlign: "center",
        fontSize: 15,
        fontWeight: "bold"
    },
    cameraIcon: {
        marginTop: 10
    }
});
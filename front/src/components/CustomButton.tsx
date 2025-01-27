import React from 'react';
import { Pressable, Text, StyleSheet, PressableProps, Dimensions } from 'react-native';
import {colors} from '../constants';

interface CustomButtonProps extends PressableProps {
    label: string;
    variant?: 'filled' | 'outlined';
    size?: 'medium' | 'large';
    inValid?: boolean;
}

const deviceHeight = Dimensions.get('screen').height;

const CustomButton = ({
    label, 
    variant = "filled", 
    size = "large",
    inValid = false,
    ...props
}: CustomButtonProps) => {
    return (
        <Pressable 
            disabled={inValid} 
            style={({pressed}) => 
                [
                    styles.container, 
                    styles[variant], 
                    styles[size], 
                    inValid && styles.inValid,
                    pressed && styles[`${variant}Pressed`]
                ]
            } 
            {...props}
        >
            <Text style={[styles.text, styles[`${variant}Text`]]}>{label}</Text>
        </Pressable>
    );
};

const styles = StyleSheet.create({
    container: {
        borderRadius: 3,
        justifyContent: 'center',
    },
    filled: {
        backgroundColor: colors.PINK_700,
    },
    outlined: {
        borderColor: colors.PINK_700,
        borderWidth: 1,
    },
    inValid: {
        opacity: 0.5,
    },
    large: {
        width: '100%',
        paddingVertical: deviceHeight > 700 ? 15 : 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    medium: {
        width: '50%',
        paddingVertical: deviceHeight > 700 ? 12: 8,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        fontSize: 16,
        fontWeight: '700',
    },
    filledPressed: {
        backgroundColor: colors.PINK_500,
    },
    outlinedPressed: {
        opacity: 0.6,
    },
    filledText: {  
        color: colors.WHITE,
    },
    outlinedText: {
        color: colors.PINK_700,
    },
});

export default CustomButton;
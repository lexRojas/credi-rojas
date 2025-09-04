import { useEffect, useRef } from "react";
import { Animated, Easing } from "react-native";

type PulsingTextProps = {
    children: React.ReactNode;
    style?: any;
};

export function PulsingText({ children, style }: PulsingTextProps) {
    const scaleAnim = useRef(new Animated.Value(1)).current;

    useEffect(() => {
        const pulse = Animated.loop(
            Animated.sequence([
                Animated.timing(scaleAnim, {
                    toValue: 1.2,
                    duration: 500,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease),
                }),
                Animated.timing(scaleAnim, {
                    toValue: 1,
                    duration: 500,
                    useNativeDriver: true,
                    easing: Easing.inOut(Easing.ease),
                }),
            ])
        );
        pulse.start();

        return () => pulse.stop();
    }, []);

    return (
        <Animated.Text style={[style, { transform: [{ scale: scaleAnim }] }]}>
            {children}
        </Animated.Text>
    );
}

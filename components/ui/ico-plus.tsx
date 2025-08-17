import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

interface IcoPlusProps {
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export function IcoPlus({ color = 'white', size = 24, style }: IcoPlusProps) {
  return (
    <Svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      style={style}
    >
      <Path
        fill="none"
        stroke={color}
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 5v14m-7-7h14"
      />
    </Svg>
  );
}

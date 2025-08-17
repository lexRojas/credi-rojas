import React from 'react';
import Svg, { Path } from 'react-native-svg';
import { StyleProp, ViewStyle } from 'react-native';

interface IcoArrowProps {
  color?: string;
  size?: number;
  style?: StyleProp<ViewStyle>;
}

export function IcoArrow({ color = 'black', size = 24, style }: IcoArrowProps) {
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
        d="m9 5l7 7l-7 7"
      />
    </Svg>
  );
}

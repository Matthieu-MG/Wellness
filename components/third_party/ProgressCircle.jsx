import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import Svg, { Circle, Text as SvgText } from 'react-native-svg';

function ProgressCircle({ radius, strokeWidth, progress, color,}) {
  const [circumference, setCircumference] = useState(0);

    if(progress > 1.0) {
        progress = 1.0; 
    }

  useEffect(() => {
    const circumferenceValue = 2 * Math.PI * radius;
    setCircumference(circumferenceValue);
  }, [radius]);

  const strokeDashoffset = circumference * (1 - progress);
  const progressValue = Math.round(progress * 2000); // Assuming progress is between 0 and 1 and total is 2000

  return (
    <View style={{ aspectRatio: 1, width: radius * 2 }}>
      <Svg width={radius * 2} height={radius * 2}>
        <Circle
          stroke={color}
          fill="transparent"
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          cx={radius}
          cy={radius}
          r={radius - strokeWidth / 2}
        />
        <SvgText
          x="50%"
          y="50%"
          textAnchor="middle"
          alignmentBaseline="middle"
          fontSize={radius / 2.5}
          fill={'white'}
          fontWeight="bold"
        >
          {progressValue}
        </SvgText>
      </Svg>
    </View>
  );
};

export default ProgressCircle;
import React, { useState, useRef } from "react";
import { View, Dimensions, ScrollView, Image, Button } from "react-native";
import {
  GestureHandlerRootView,
  PanGestureHandler,
  State
} from "react-native-gesture-handler";
import Animated, {
  useSharedValue,
  useAnimatedGestureHandler,
  useAnimatedStyle,
  withTiming,
  runOnJS,
  Easing,
  withSpring
} from "react-native-reanimated";

const { width } = Dimensions.get("window");
const perspective = width;
const angle = Math.atan(perspective / (width / 2));
const imageWidth = 200;
const imageHeight = 200;

type GestureContext = {
  startX: number;
};

const imagesSet1 = [
  require("./stories/story2.jpg"),
  require("./stories/story1.jpg"),
  require("./stories/story2.jpg")
];
const imagesSet2 = [
  require("./stories/story2.jpg"),
  require("./stories/story1.jpg"),
  require("./stories/story2.jpg")
];

const CubeAnimation: React.FC = () => {
  const [currentImageSet, setCurrentImageSet] = useState(imagesSet1);
  const [isGestureCompleted, setIsGestureCompleted] = useState(false);
  const translateX = useSharedValue(0);
  const scrollViewRef = useRef<ScrollView | null>(null);

  const handleGestureEnd = () => {
    setIsGestureCompleted(true);
  };

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx: GestureContext) => {
      ctx.startX = translateX.value;
    },
    onActive: (event, ctx: GestureContext) => {
      translateX.value = ctx.startX + event.translationX;
    },
    onEnd: (event) => {
      if (event.velocityX > 0) {
        // Swipe to the right, load previous images if available
        setCurrentImageSet(imagesSet1);
      } else {
        // Swipe to the left, load next images if available
        setCurrentImageSet(imagesSet2);
      }

      translateX.value = withTiming(0, {
        duration: 300,
        easing: Easing.inOut(Easing.ease)
      });

      runOnJS(handleGestureEnd)();
    }
  });

  const animatedStyle = useAnimatedStyle(() => {
    const rotateY = (angle * translateX.value) / (width / 2);
    const perspectiveStyle = {
      perspective,
      transform: [
        { translateX: translateX.value },
        { rotateY: `${rotateY}rad` }
      ]
    };
    return perspectiveStyle;
  });

  const startAnimation = () => {
    // Programmatically start the animation from a specific translation value
    translateX.value = withTiming(-width / 2, {
      duration: 500,
      easing: Easing.inOut(Easing.ease)
    });

    setIsGestureCompleted(false);
  };

  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <ScrollView
        ref={scrollViewRef}
        horizontal
        pagingEnabled
        contentContainerStyle={{ width: width * currentImageSet.length }}
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
      >
        {currentImageSet.map((image, index) => (
          <Image
            key={index}
            source={image}
            style={{ width: imageWidth, height: imageHeight }}
          />
        ))}
      </ScrollView>
      <GestureHandlerRootView>
        <PanGestureHandler onGestureEvent={gestureHandler}>
          <Animated.View
            style={[
              {
                width: imageWidth,
                height: imageHeight,
                backgroundColor: "transparent",
                position: "absolute"
              },
              animatedStyle
            ]}
          />
        </PanGestureHandler>
      </GestureHandlerRootView>
      <Button title="Start Animation" onPress={startAnimation} />
    </View>
  );
};

export default CubeAnimation;

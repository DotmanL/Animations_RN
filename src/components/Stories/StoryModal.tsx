import { Ionicons } from "@expo/vector-icons";
import { Audio, ResizeMode, Video } from "expo-av";
import React, { useEffect, useRef, useState } from "react";
import {
  Animated,
  Button,
  Image,
  Modal,
  Pressable,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  useWindowDimensions
} from "react-native";
import { IUserStory } from "./storiesData";
import Swipeable from "react-native-gesture-handler/Swipeable";
import { GestureHandlerRootView } from "react-native-gesture-handler";

type Props = {
  allData: IUserStory[];
  userName: string;
  isModalVisible: boolean;
  activeStoryIndex: number;
  setActiveStoryIndex: React.Dispatch<React.SetStateAction<number>>;
  setIsModalVisible: React.Dispatch<React.SetStateAction<boolean>>;
  stories: any;
  maxStoriesLength: number;
};

function StoryModal(props: Props) {
  const {
    allData,
    userName,
    isModalVisible,
    activeStoryIndex,
    setActiveStoryIndex,
    setIsModalVisible,
    stories,
    maxStoriesLength
  } = props;
  const { width } = useWindowDimensions();
  const video = useRef<Video | null>(null);
  const [activeStory, setActiveStory] = useState<number>(0);
  const [status, setStatus] = React.useState({});
  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  });

  useEffect(() => {
    if (activeStory || isModalVisible) {
      animateProgressBar();
    }
    return () => {
      progress.setValue(0);
    };
  }, [activeStory, isModalVisible]);

  const animateProgressBar = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 3000,
      useNativeDriver: false
    }).start((finished) => {
      if (finished.finished) {
        handleChangeStoryForward();
      }
    });
  };

  const interpolatedWidth = progress.interpolate({
    inputRange: [0, 1],
    outputRange: ["0%", "100%"]
  });

  const animatedStyle = {
    width: interpolatedWidth,
    transform: [{ scaleX: 1 }]
  };

  function generateSteps(storiesLength: number) {
    const stepsArray = [];
    for (let i = 0; i < storiesLength; i++) {
      stepsArray.push(i);
    }
    return stepsArray;
  }

  function handleChangeStoryForward() {
    if (activeStory < stories.length - 1) {
      setActiveStory(activeStory + 1);
    } else if (activeStoryIndex < maxStoriesLength - 1) {
      setActiveStory(0);
      setActiveStoryIndex(activeStoryIndex + 1);
    } else {
      setActiveStory(0);
      setActiveStoryIndex(0);
      setIsModalVisible(false);
    }
  }

  function handleChangeStoryBackward() {
    if (activeStory != 0 && activeStory <= stories.length - 1) {
      setActiveStory(activeStory - 1);
    } else if (
      activeStoryIndex != 0 &&
      activeStoryIndex < maxStoriesLength - 1
    ) {
      setActiveStoryIndex(activeStoryIndex - 1);

      if (activeStory === 0) {
        setActiveStory(allData[activeStoryIndex - 1].assets.length - 1);
      } else {
        setActiveStory(activeStory - 1);
      }
    } else if (
      activeStoryIndex === 0 &&
      activeStory !== stories.length &&
      activeStory !== 0
    ) {
      setActiveStory(activeStory - 1);
    } else {
      setActiveStoryIndex(0);
      setIsModalVisible(false);
      setActiveStory(0);
    }
  }

  function handleMoveNextUserStory() {
    if (activeStoryIndex < maxStoriesLength - 1) {
      setActiveStoryIndex(activeStoryIndex + 1);
      setActiveStory(0);
    } else {
      setActiveStoryIndex(0);
      setIsModalVisible(false);
      setActiveStory(0);
    }
  }

  function handleSwipe(direction: any) {
    console.log(direction);

    if (direction === "left") {
      handleChangeStoryBackward();
    }
    if (direction === "right") {
      handleMoveNextUserStory();
    }
  }

  return (
    <TouchableWithoutFeedback style={styles.container}>
      <Modal
        style={styles.modal}
        presentationStyle="overFullScreen"
        visible={isModalVisible}
        animationType="fade"
      >
        <View style={styles.storyContainer}>
          <View style={styles.progressBarContainer}>
            {generateSteps(stories.length).map((_, index) => (
              <View
                key={index}
                style={{
                  height: 4,
                  borderRadius: 6,
                  backgroundColor: "gray",
                  width: width / (stories.length + 0.3)
                }}
              >
                <Animated.View
                  style={[
                    styles.progressBar,
                    index === activeStory && animatedStyle,
                    index <= activeStory
                      ? { backgroundColor: "white" }
                      : { backgroundColor: "gray" }
                  ]}
                ></Animated.View>
              </View>
            ))}
          </View>
          <View style={styles.closeContainer}>
            <Text style={styles.userNameText}>{userName}</Text>
            <Ionicons
              name="close-outline"
              color={"white"}
              size={48}
              onPress={() => {
                setIsModalVisible(false);
                setActiveStoryIndex(0);
                setActiveStory(0);
              }}
            />
          </View>
          <Pressable
            style={styles.assetsContainer}
            onLongPress={() => console.log("long pressed")}
          >
            <GestureHandlerRootView>
              <Swipeable
                onSwipeableClose={(direction) => handleSwipe(direction)}
              >
                <View>
                  <Pressable
                    style={styles.prevContainer}
                    onPress={handleChangeStoryBackward}
                  />
                  <Pressable
                    style={styles.forwardContainer}
                    onPress={handleChangeStoryForward}
                  />

                  {stories[activeStory].type === "image" ? (
                    <Image
                      style={styles.image}
                      source={stories[activeStory].story}
                      resizeMode="cover"
                    />
                  ) : (
                    <Video
                      ref={video}
                      style={styles.image}
                      source={stories[activeStory].story}
                      useNativeControls
                      resizeMode={ResizeMode.COVER}
                      shouldPlay
                      usePoster
                      isLooping
                      volume={1}
                      isMuted={false}
                    />
                  )}
                </View>
              </Swipeable>
            </GestureHandlerRootView>
          </Pressable>
        </View>
      </Modal>
    </TouchableWithoutFeedback>
  );
}

export default StoryModal;

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  modal: {
    flex: 1,
    marginTop: 50
  },
  storyContainer: {
    flex: 1
  },
  progressBarContainer: {
    position: "absolute",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    top: 50,
    zIndex: 10,
    width: "100%",
    paddingHorizontal: 4,
    height: 10
  },
  progressBar: {
    height: 4,
    borderRadius: 6
  },
  closeContainer: {
    position: "absolute",
    width: "100%",
    top: 60,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    zIndex: 10
  },
  userNameText: {
    fontSize: 24,
    fontWeight: "700",
    color: "white"
  },
  assetsContainer: {
    position: "absolute",
    top: 40,
    left: 0,
    right: 0,
    height: "100%",
    flex: 1,
    zIndex: 0
  },
  prevContainer: {
    zIndex: 30,
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  forwardContainer: {
    zIndex: 30,
    position: "absolute",
    top: 0,
    left: "50%",
    right: 0,
    width: "50%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center"
  },
  image: {
    width: "100%",
    height: "100%"
  }
});

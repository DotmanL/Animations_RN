import { Ionicons } from "@expo/vector-icons";
import React, { useEffect, useRef, useState } from "react";
import {
  Modal,
  StyleSheet,
  View,
  Image,
  useWindowDimensions,
  Pressable,
  Text,
  Animated
} from "react-native";
import { Video, ResizeMode, Audio } from "expo-av";

type Props = {
  isModalVisible: boolean;
  setActiveStoryIndex: React.Dispatch<React.SetStateAction<number>>;
  storiesLength: number;
  stories: any;
};

function StoryModal(props: Props) {
  const { isModalVisible, setActiveStoryIndex, stories, storiesLength } = props;
  const { width } = useWindowDimensions();
  const video = useRef(null);
  const [activeStory, setActiveStory] = useState<number>(0);

  useEffect(() => {
    Audio.setAudioModeAsync({ playsInSilentModeIOS: true });
  });

  const [progress] = useState(new Animated.Value(0));

  useEffect(() => {
    animateProgressBar();
  }, []);

  const animateProgressBar = () => {
    Animated.timing(progress, {
      toValue: 1,
      duration: 30000,
      useNativeDriver: false
    }).start();
  };

  function generateSteps(storiesLength: number) {
    const stepsArray = [];
    for (let i = 0; i < storiesLength; i++) {
      stepsArray.push(i);
    }
    return stepsArray;
  }

  function handleChangeStory() {
    if (activeStory < storiesLength - 1) {
      setActiveStory(activeStory + 1);
    } else {
      setActiveStory(0);
    }
  }

  return (
    <View style={styles.container}>
      <Modal
        style={styles.modal}
        presentationStyle="overFullScreen"
        visible={isModalVisible}
        animationType="fade"
      >
        <View style={styles.storyContainer}>
          <View style={styles.progressBarContainer}>
            {generateSteps(storiesLength).map((_, index) => (
              <View
                key={index}
                style={{ height: 4, borderRadius: 6, backgroundColor: "red" }}
              >
                <Animated.View
                  key={index}
                  style={[
                    styles.progressBar,
                    {
                      width: width / (storiesLength + 0.3)
                    },
                    index <= activeStory
                      ? { backgroundColor: "white" }
                      : { backgroundColor: "gray" }
                  ]}
                ></Animated.View>
              </View>
            ))}
          </View>
          <View style={styles.closeContainer}>
            <Ionicons
              name="close-outline"
              color={"white"}
              size={48}
              onPress={() => {
                setActiveStoryIndex(-1);
                setActiveStory(0);
              }}
            />
          </View>
          <Pressable
            style={{
              position: "absolute",
              top: 40,
              left: 0,
              right: 0,
              height: "100%",
              flex: 1
            }}
            onPress={handleChangeStory}
          >
            <View
              style={{
                zIndex: 30,
                position: "absolute",
                top: 40,
                left: 50,
                right: 0
              }}
            >
              <Text
                style={{ fontSize: 36 }}
                onPress={() => {
                  setActiveStoryIndex(2);
                }}
              >
                Next
              </Text>
            </View>
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
                isLooping
                volume={1}
                isMuted={false}
              />
            )}
          </Pressable>
        </View>
      </Modal>
    </View>
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
    top: 60,
    right: 0,
    flexDirection: "row",
    justifyContent: "flex-end",
    paddingHorizontal: 20,
    zIndex: 10
  },
  image: {
    width: "100%",
    height: "100%"
  }
});

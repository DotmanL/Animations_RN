import { useState } from "react";
import { View, Text, Pressable, StyleSheet } from "react-native";
import StoryModal from "./StoryModal";
import { GlobalStyles } from "constants/styles";

type Props = {
  index: number;
  id?: string;
  userName: string;
  assets: any[];
};

function StoryItem(props: Props) {
  const { index, userName, assets } = props;
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(-1);

  function handleOnPressStory(currIndex: number) {
    console.log("press story");
    console.log(index);

    setActiveStoryIndex(currIndex);
  }

  return (
    <View style={{ alignItems: "center" }}>
      <Pressable
        android_ripple={{ color: "#cccc" }}
        style={({ pressed }) => [
          {
            opacity: pressed ? 0.6 : 1,
            marginLeft: index === 0 ? 15 : 15,
            marginRight: index !== 0 ? 10 : 0
          },
          styles.container
        ]}
        onPress={() => handleOnPressStory(1)}
      />
      <Text
        style={{
          marginTop: 4,
          marginLeft: 8
        }}
      >
        {userName}
      </Text>
      <StoryModal
        isModalVisible={activeStoryIndex !== -1 ? true : false}
        setActiveStoryIndex={setActiveStoryIndex}
        storiesLength={assets.length}
        stories={assets}
      />
    </View>
  );
}

export default StoryItem;

const styles = StyleSheet.create({
  container: {
    width: 100,
    height: 100,
    borderRadius: 100,
    backgroundColor: GlobalStyles.colors.primary,
    borderWidth: 4,
    borderColor: "purple"
  }
});

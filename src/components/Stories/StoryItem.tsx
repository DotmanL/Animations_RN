import { GlobalStyles } from "constants/styles";
import { useState } from "react";
import { Pressable, ScrollView, StyleSheet, Text, View } from "react-native";
import StoriesList from "./StoriesList";
import { UserStories } from "./storiesData";

function StoryItem() {
  const [activeStoryIndex, setActiveStoryIndex] = useState<number>(0);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);

  function handleOnPressStory(currIndex: number) {
    setIsModalVisible(true);
    setActiveStoryIndex(currIndex);
  }

  return (
    <View>
      <ScrollView horizontal showsHorizontalScrollIndicator={false}>
        {UserStories.map((user, index) => (
          <View key={index} style={{ alignItems: "center" }}>
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
              onPress={() => handleOnPressStory(index)}
            >
              <Text style={styles.thumbnailText}>
                {user.userName.substring(0, 2).toUpperCase()}
              </Text>
            </Pressable>
            <Text
              style={{
                marginTop: 4,
                marginLeft: 8
              }}
            >
              {user.userName}
            </Text>
          </View>
        ))}
      </ScrollView>
      <StoriesList
        data={UserStories}
        userName={UserStories[activeStoryIndex].userName}
        isModalVisible={isModalVisible}
        setIsModalVisible={setIsModalVisible}
        activeStoryIndex={activeStoryIndex}
        setActiveStoryIndex={setActiveStoryIndex}
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
    borderColor: "purple",
    justifyContent: "center",
    alignItems: "center"
  },
  thumbnailText: {
    fontSize: 28,
    fontWeight: "500"
  }
});

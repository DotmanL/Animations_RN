import { Ionicons } from "@expo/vector-icons";
import PostsList from "components/Posts/PostsList";
import { GlobalStyles } from "constants/styles";
import { useState } from "react";
import { Animated, Text, View } from "react-native";

function Posts() {
  const [scrollY] = useState(new Animated.Value(0));
  const headerHeight = 50;

  const headerHeightAnimated = scrollY.interpolate({
    inputRange: [0, headerHeight],
    outputRange: [headerHeight, 0],
    extrapolate: "clamp"
  });

  return (
    <View style={{ flex: 1, backgroundColor: GlobalStyles.colors.secondary }}>
      <Animated.View
        style={{
          height: headerHeightAnimated,
          justifyContent: "center",
          overflow: "hidden",
          backgroundColor: GlobalStyles.colors.secondary,
          paddingHorizontal: 20
        }}
      >
        <View style={{ flexDirection: "row", justifyContent: "space-between" }}>
          <Text style={{ fontSize: 30, fontStyle: "italic" }}>DotFeed</Text>
          <View style={{ flexDirection: "row" }}>
            <Ionicons
              name="chatbubble-ellipses-outline"
              color={"black"}
              size={24}
            />
            <Ionicons
              name="notifications-outline"
              color={"black"}
              size={24}
              style={{ marginLeft: 8 }}
            />
          </View>
        </View>
      </Animated.View>
      <PostsList scrollY={scrollY} />
    </View>
  );
}

export default Posts;

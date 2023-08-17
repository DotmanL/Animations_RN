import { View } from "react-native";
import PostsList from "components/Posts/PostsList";

function Posts() {
  return (
    <View style={{ flex: 1 }}>
      <PostsList />
    </View>
  );
}

export default Posts;

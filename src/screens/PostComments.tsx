import { View, Text } from "react-native";

function PostComments() {
  return (
    <View style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 1,
          width: "100%",
          height: 400,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "orange",
          padding: 8
        }}
      >
        <Text style={{ fontSize: 20 }}>This should house each image</Text>
      </View>
    </View>
  );
}

export default PostComments;

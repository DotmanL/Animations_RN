import { View, Text, ScrollView } from "react-native";

function PostComments() {
  return (
    <ScrollView style={{ flex: 1 }}>
      <View
        style={{
          marginTop: 1,
          width: "100%",
          height: 400,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "red",
          padding: 8
        }}
      >
        <Text style={{ fontSize: 20 }}>
          This should house random first image
        </Text>
      </View>
      <View
        style={{
          marginTop: 1,
          width: "100%",
          height: 400,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "blue",
          padding: 8
        }}
      >
        <Text style={{ fontSize: 20 }}>
          This should house random second image
        </Text>
      </View>
      <View
        style={{
          marginTop: 1,
          width: "100%",
          height: 400,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "yellow",
          padding: 8
        }}
      >
        <Text style={{ fontSize: 20 }}>
          This should house random third imagee
        </Text>
      </View>
      <View
        style={{
          marginTop: 1,
          width: "100%",
          height: 400,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "green",
          padding: 8
        }}
      >
        <Text style={{ fontSize: 20 }}>
          This should house random fourth image
        </Text>
      </View>
      <View
        style={{
          marginTop: 1,
          width: "100%",
          height: 400,
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "purple",
          padding: 8
        }}
      >
        <Text style={{ fontSize: 20 }}>
          This should house random fifth image
        </Text>
      </View>
    </ScrollView>
  );
}

export default PostComments;

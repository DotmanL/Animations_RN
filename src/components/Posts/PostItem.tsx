import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppNavigationParameterList } from "interfaces/AppNavigationParameterList";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";

type Props = {
  id: string;
  title: string;
  url: string;
};

function PostItem(props: Props) {
  const { title, url } = props;
  const navigation =
    useNavigation<NavigationProp<AppNavigationParameterList>>();

  return (
    <Pressable style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.postItem}>
        <Image style={styles.image} source={{ uri: url }} />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{title}</Text>
          <Ionicons
            name="chatbubble-outline"
            size={24}
            onPress={() => navigation.navigate("PostComments")}
          />
        </View>
      </View>
    </Pressable>
  );
}

export default PostItem;

const styles = StyleSheet.create({
  pressed: {
    opacity: 0.75
  },
  postItem: {
    marginVertical: 10,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "space-between",
    borderRadius: 6,
    elevation: 3
  },
  image: {
    flex: 1,
    width: "100%",
    height: 400,
    padding: 8
  },
  titleContainer: {
    flexDirection: "row",
    width: "100%",
    paddingHorizontal: 20,
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20
  },
  title: {
    fontSize: 14,
    marginBottom: 4,
    fontWeight: "bold",
    color: "black"
  }
});

import { Ionicons } from "@expo/vector-icons";
import { NavigationProp, useNavigation } from "@react-navigation/native";
import { AppNavigationParameterList } from "interfaces/AppNavigationParameterList";
import { Button, Image, Pressable, StyleSheet, Text, View } from "react-native";
import * as Notifications from "expo-notifications";
import { moderateScale } from "utility/scaling";
import { useEffect } from "react";
import axios from "axios";

type Props = {
  id: string;
  title: string;
  url: string;
};

//This for local notifications
Notifications.setNotificationHandler({
  handleNotification: async () => {
    return {
      shouldPlaySound: false,
      shouldSetBadge: false,
      shouldShowAlert: true
    };
  }
});

function PostItem(props: Props) {
  const { title, url } = props;
  const navigation =
    useNavigation<NavigationProp<AppNavigationParameterList>>();

  useEffect(() => {
    const subscription1 = Notifications.addNotificationReceivedListener(
      (notification) => {
        const userName = notification.request.content.data.userName;
        console.log(userName);
      }
    );

    const subscription2 = Notifications.addNotificationResponseReceivedListener(
      (response) => {
        const userName = response.notification.request.content.data.userName;
        console.log(userName, "in response");
      }
    );

    return () => {
      subscription1.remove();
      subscription2.remove();
    };
  });

  async function scheduleNotifcationHandler() {
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Test Local Notification",
        body: "Body of the notification",
        data: { userName: "Ola" }
      },
      trigger: {
        seconds: 5
      }
    });
  }

  async function sendPushNotificationHandler() {
    axios.post(
      "https://exp.host/--/api/v2/push/send",
      {
        to: "ExponentPushToken[OgmlQnAuAq4onKqhB01oF1]",
        title: "Test Notification sent from a device",
        body: "This is a test notification"
      },
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );
  }

  return (
    <Pressable style={({ pressed }) => pressed && styles.pressed}>
      <View style={styles.postItem}>
        <Image style={styles.image} source={{ uri: url }} />
        <View style={styles.titleContainer}>
          <Button
            title="Send Local Notification"
            onPress={scheduleNotifcationHandler}
          />
          <Button
            title="Send Push Notification"
            onPress={sendPushNotificationHandler}
          />
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              width: "100%",
              marginTop: 5
            }}
          >
            <Text style={styles.title}>{title}</Text>
            <Ionicons
              name="chatbubble-outline"
              size={24}
              onPress={() => navigation.navigate("PostComments")}
            />
          </View>
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
    borderRadius: 6
  },
  image: {
    flex: 1,
    width: "100%",
    height: 400,
    padding: 8
  },
  titleContainer: {
    width: "100%",
    paddingHorizontal: 20,
    alignItems: "center",
    marginTop: 20
  },
  title: {
    fontSize: moderateScale(12),
    marginBottom: 4,
    fontWeight: "bold",
    color: "black"
  }
});

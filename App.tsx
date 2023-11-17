import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalStyles } from "constants/styles";
import { StatusBar } from "expo-status-bar";
import { Alert, Platform, SafeAreaView, View, StyleSheet } from "react-native";
import { AppNavigationParameterList } from "interfaces/AppNavigationParameterList";
import PlayGround from "screens/PlayGround";
import PostComments from "screens/PostComments";
import Posts from "screens/Posts";
import ThreeDimension from "screens/ThreeDimension";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import Constants from "expo-constants";
import { useEffect } from "react";
import { createMaterialTopTabNavigator } from "@react-navigation/material-top-tabs";
import SecondBottomTab from "screens/SecondBottomTab";
import ThirdBottomTab from "screens/ThirdBottomTab";
// import PlayThreeDimension from "screens/PlayThreeDimension";

const Stack = createNativeStackNavigator<AppNavigationParameterList>();
const BottomTabs = createBottomTabNavigator<AppNavigationParameterList>();

const Tab = createMaterialTopTabNavigator();

function PostsOverview() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.secondary
        },
        headerTintColor: GlobalStyles.colors.primary
      }}
    >
      <Stack.Screen
        name="Posts"
        component={Posts}
        options={{ headerTitle: "Posts", headerShown: false }}
      />
      <Stack.Screen
        name="PostComments"
        component={PostComments}
        options={{ headerTitle: "Comments" }}
      />
    </Stack.Navigator>
  );
}

function TopNavigation() {
  return (
    <Tab.Navigator
      screenOptions={{
        // headerStyle: { backgroundColor: GlobalStyles.colors.secondary },
        // headerTintColor: GlobalStyles.colors.primary,
        tabBarStyle: { backgroundColor: GlobalStyles.colors.secondary },
        tabBarInactiveTintColor: GlobalStyles.colors.primary,
        tabBarActiveTintColor: GlobalStyles.colors.accent500
      }}
    >
      <Tab.Screen
        name="PostsOverview"
        component={PostsOverview}
        options={{
          title: "Posts",
          // headerShown: false,
          tabBarLabel: "Posts"
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="apps-outline" size={size} color={color} />
          // )
        }}
      />
      <Tab.Screen
        name="ThreeDimension"
        component={ThreeDimension}
        options={{
          title: "3D Animation",
          tabBarLabel: "3D"
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="baseball-outline" size={size} color={color} />
          // )
        }}
      />

      {/* <BottomTabs.Screen
        name="PlayThreeDimension"
        component={PlayThreeDimension}
        options={{
          title: "3Dxc Animation",
          tabBarLabel: "3Dxcxc",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="baseball-outline" size={size} color={color} />
          )
        }}
      /> */}
      <Tab.Screen
        name="PlayGround"
        component={PlayGround}
        options={{
          title: "3D PlayGround",
          tabBarLabel: "PlayGround"
          // tabBarIcon: ({ color, size }) => (
          //   <Ionicons name="play-outline" size={size} color={color} />
          // )
        }}
      />
    </Tab.Navigator>
  );
}

function BottomNavigation() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.secondary },
        headerTintColor: GlobalStyles.colors.primary,
        tabBarStyle: { backgroundColor: "black" },
        tabBarInactiveTintColor: GlobalStyles.colors.primary,
        tabBarActiveTintColor: GlobalStyles.colors.accent500
      }}
    >
      {/* <Stack.Screen
              name="TopNavigationOverview"
              component={TopNavigation}
              options={{ headerShown: false }}
            /> */}

      <BottomTabs.Screen
        name="TopNavigationOverview"
        component={TopNavigation}
        options={{
          title: "Explore",
          headerShown: false,
          tabBarLabel: "Explore",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="apps-outline" size={size} color={color} />
          )
        }}
      />
      <BottomTabs.Screen
        name="SecondBottomTab"
        component={SecondBottomTab}
        options={{
          title: "Second Tab",
          tabBarLabel: "Second Tab",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="football-outline" size={size} color={color} />
          )
        }}
      />

      {/* <BottomTabs.Screen
        name="PlayThreeDimension"
        component={PlayThreeDimension}
        options={{
          title: "3Dxc Animation",
          tabBarLabel: "3Dxcxc",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="baseball-outline" size={size} color={color} />
          )
        }}
      /> */}
      <BottomTabs.Screen
        name="ThirdBottomTab"
        component={ThirdBottomTab}
        options={{
          title: "Third Tab",
          tabBarLabel: "Third Tab",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="car-outline" size={size} color={color} />
          )
        }}
      />
    </BottomTabs.Navigator>
  );
}

//the permission is required for ios
async function registerForPushNotificationsAsync() {
  let token;
  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();

    let finalStatus = existingStatus;

    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }

    if (finalStatus !== "granted") {
      Alert.alert("Failed to get push token for push notification!");
      return;
    }

    token = await Notifications.getExpoPushTokenAsync({
      projectId: Constants?.expoConfig?.extra?.eas.projectId
    });
    // console.log(token);
  } else {
    Alert.alert("Must use physical device for Push Notifications");
  }

  if (Platform.OS === "android") {
    Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.DEFAULT,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C"
    });
  }

  return token;
}

export default function App() {
  const queryClient = new QueryClient();

  useEffect(() => {
    async function registerForPushNotifications() {
      await registerForPushNotificationsAsync();
    }
    registerForPushNotifications();
  }, []);

  return (
    <View style={{ flex: 1, backgroundColor: "white" }}>
      <QueryClientProvider client={queryClient}>
        <SafeAreaView style={styles.statusBar}>
          <StatusBar style="dark" translucent backgroundColor="white" />
        </SafeAreaView>
        <NavigationContainer>
          <Stack.Navigator
            screenOptions={{
              headerStyle: {
                backgroundColor: GlobalStyles.colors.primary
              },
              headerTintColor: "white"
            }}
          >
            <Stack.Screen
              name="BottomNavigationOverview"
              component={BottomNavigation}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  statusBar: {
    height: 50,
    backgroundColor: "white"
  }
});

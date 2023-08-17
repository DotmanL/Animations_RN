import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { GlobalStyles } from "constants/styles";
import { StatusBar } from "expo-status-bar";
import { AppNavigationParameterList } from "interfaces/AppNavigationParameterList";
import PlayGround from "screens/PlayGround";
import PostComments from "screens/PostComments";
import Posts from "screens/Posts";
import ThreeDimension from "screens/ThreeDimension";
// import PlayThreeDimension from "screens/PlayThreeDimension";

const Stack = createNativeStackNavigator<AppNavigationParameterList>();
const BottomTabs = createBottomTabNavigator<AppNavigationParameterList>();

function PostsOverview() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: GlobalStyles.colors.primary
        },
        headerTintColor: "white"
      }}
    >
      <Stack.Screen
        name="Posts"
        component={Posts}
        options={{ headerTitle: "Posts" }}
      />
      <Stack.Screen
        name="PostComments"
        component={PostComments}
        options={{ headerTitle: "Comments" }}
      />
    </Stack.Navigator>
  );
}

function AnimationsOverview() {
  return (
    <BottomTabs.Navigator
      screenOptions={{
        headerStyle: { backgroundColor: GlobalStyles.colors.primary },
        headerTintColor: "white",
        tabBarStyle: { backgroundColor: GlobalStyles.colors.primary },
        tabBarInactiveTintColor: "white",
        tabBarActiveTintColor: GlobalStyles.colors.accent500
      }}
    >
      <BottomTabs.Screen
        name="PostsOverview"
        component={PostsOverview}
        options={{
          title: "Posts",
          headerShown: false,
          tabBarLabel: "Posts",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="apps-outline" size={size} color={color} />
          )
        }}
      />
      <BottomTabs.Screen
        name="ThreeDimension"
        component={ThreeDimension}
        options={{
          title: "3D Animation",
          tabBarLabel: "3D",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="baseball-outline" size={size} color={color} />
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
        name="PlayGround"
        component={PlayGround}
        options={{
          title: "3D PlayGround",
          tabBarLabel: "PlayGround",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="play-outline" size={size} color={color} />
          )
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  const queryClient = new QueryClient();

  return (
    <>
      <QueryClientProvider client={queryClient}>
        <StatusBar style="light" />
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
              name="AnimationsOverview"
              component={AnimationsOverview}
              options={{ headerShown: false }}
            />
          </Stack.Navigator>
        </NavigationContainer>
      </QueryClientProvider>
    </>
  );
}

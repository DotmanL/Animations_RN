import { StatusBar } from "expo-status-bar";
import { NavigationContainer } from "@react-navigation/native";
import { Ionicons } from "@expo/vector-icons";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AppNavigationParameterList } from "interfaces/AppNavigationParameterList";
import { GlobalStyles } from "constants/styles";
import ThreeDimension from "screens/ThreeDimension";
import TwoDimension from "screens/TwoDimension";
import PlayGround from "screens/PlayGround";

const Stack = createNativeStackNavigator<AppNavigationParameterList>();
const BottomTabs = createBottomTabNavigator<AppNavigationParameterList>();

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
      <BottomTabs.Screen
        name="TwoDimension"
        component={TwoDimension}
        options={{
          title: "2D Animation",
          tabBarLabel: "2D",
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="bulb-outline" size={size} color={color} />
          )
        }}
      />
    </BottomTabs.Navigator>
  );
}

export default function App() {
  return (
    <>
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
    </>
  );
}

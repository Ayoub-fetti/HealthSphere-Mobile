import { GestureHandlerRootView } from "react-native-gesture-handler";
import { Drawer } from "expo-router/drawer";
import { Colors } from "@/constants/theme";

export default function DrawerLayout() {
  return (
    <Drawer
      screenOptions={{
        headerStyle: { backgroundColor: "#0a7ea4" },
        headerTintColor: "#fff",
        headerTitleStyle: { fontWeight: "700" },
        drawerActiveTintColor: "#0a7ea4",
        drawerStyle: { backgroundColor: "#F4F8FB" },
      }}
    >
      <Drawer.Screen
        name="(tabs)"
        options={{ title: "HealthSphere", drawerLabel: "🏠 Home" }}
      />
      <Drawer.Screen
        name="profile"
        options={{ title: "Profile", drawerLabel: "👤 Profile" }}
      />
      <Drawer.Screen
        name="settings"
        options={{ title: "Settings", drawerLabel: "⚙️ Settings" }}
      />
      <Drawer.Screen
        name="add-workout"
        options={{ title: "Add Workout", drawerItemStyle: { display: "none" } }}
      />
      <Drawer.Screen
        name="workout/[id]"
        options={{
          title: "Workout Details",
          drawerItemStyle: { display: "none" },
        }}
      />
    </Drawer>
  );
}

import { Stack } from "expo-router";
import { Provider } from "react-redux";
import store from "../../store";

export default function Layout() {
  return (
    <Provider store={store}>
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="index" />
        <Stack.Screen name="hotel" />
        <Stack.Screen name="cart" />
        <Stack.Screen name="order" />
      </Stack>
    </Provider>
  );
}

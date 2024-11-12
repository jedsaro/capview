import { SafeAreaProvider } from "react-native-safe-area-context";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import Home from "@/app/HomeScreen/Home";
import Devices from "@/app/(tabs)/Devices";
import LogIn from "@/app/LoginScreen/LogIn";

const Stack = createNativeStackNavigator();

const App = () => {
   return (
            <Stack.Navigator initialRouteName="Home" screenOptions={{headerShown:false}}>
               <Stack.Screen name="Home" component={Home} />
               <Stack.Screen name="Login" component={LogIn} />
               <Stack.Screen name="Devices" component={Devices} />
            </Stack.Navigator>
   );
};

export default App;
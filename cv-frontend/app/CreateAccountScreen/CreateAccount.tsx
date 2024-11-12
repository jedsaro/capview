import {View, Text} from "react-native";
import LogInForm from "@/components/LogInForm";

const CreateAccount = () => {
   return (
      <View>
         <Text>Create account</Text>
         <LogInForm path={"account"}/>
      </View>
   );
};

export default CreateAccount;
import React from 'react';
import {View} from "react-native";
import LogInForm from "@/components/LogInForm";
import {Image} from "expo-image";

const LogIn = () => {
   return (
      <View>
         <Image source={"./"}/>
         <LogInForm path={"login"}/>
      </View>
   );
};

export default LogIn;
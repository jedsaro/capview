import {Button, Text, TextInput} from "react-native";
import {Controller, useForm} from "react-hook-form";
import usePostData from "@/hooks/usePostData";
import {useSelector} from "react-redux";
import {useEffect} from "react";
import {Container, Section} from "@/styles/Defaults.styled";
import {LoginButton} from "@/app/LoginScreen/styles/index.styled";
import { useNavigation } from '@react-navigation/native';

type LogInFormProps = {
   path?: string;
}

export default function LogInForm({path}: LogInFormProps) {
   const {
      control,
      handleSubmit,
      formState: {errors},
   } = useForm({
      defaultValues: {
         username: "",
         password: "",
      },
   });

   const {isAuthenticated} = useSelector((state: any) => state.auth);

   const {postDataToAPI} = usePostData();

   const onSubmit = (data: any) => {
      postDataToAPI({
         "username": "jedsaro14",
         "password": "Eduardo14.+",
      }, path).then().catch();
   };

   const navigation = useNavigation();

   useEffect(() => {
      if (isAuthenticated && path !== 'account') {
         navigation.replace('Devices');
      }
   }, [isAuthenticated, path, navigation]);

   return (
      <Section>
         <Container>
            <Controller
               control={control}
               rules={{required: false}}
               render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                     placeholder="Username"
                     onBlur={onBlur}
                     onChangeText={onChange}
                     value={value}
                     style={{height:50}}
                  />
               )}
               name="username"
            />
            {errors.username && <Text>This is required.</Text>}

            <Controller
               control={control}
               rules={{maxLength: 100}}
               render={({field: {onChange, onBlur, value}}) => (
                  <TextInput
                     placeholder="Password"
                     onBlur={onBlur}
                     onChangeText={onChange}
                     value={value}
                     style={{height:50}}
                     secureTextEntry={true}
                  />
               )}
               name="password"
            />
            {errors.password && <Text>Password is required.</Text>}

            <LoginButton title="Submit" onPress={handleSubmit((e) => onSubmit(e))}/>
         </Container>
      </Section>


   );
}

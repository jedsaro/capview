import {Text} from "react-native";
import {
   BaseTitleText,
   Container, ContentText,
   HeroImage,
   HeroInputContainer, HomeWrapper,
   Section,
   VerticalWrapper
} from "@/styles/Defaults.styled";
import {Link} from "expo-router";
import LogInForm from "@/components/LogInForm";
import React from "react";

export default function Home() {
   return (
      <Section>
         <Container debug={true}>
            <HomeWrapper>
               <HeroImage
                  source={require('../../assets/images/background.png')}/>
               <HeroInputContainer>
                  <BaseTitleText>Welcome to Capview</BaseTitleText>

                  <LogInForm path={"login"}/>
                  <Link href="/CreateAccountScreen/CreateAccount" asChild>
                     <ContentText>Create Account</ContentText>
                  </Link>
               </HeroInputContainer>
            </HomeWrapper>
         </Container>
      </Section>
   );
}

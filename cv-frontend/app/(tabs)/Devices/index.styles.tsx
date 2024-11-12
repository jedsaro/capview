import styled from "styled-components/native";
import {Card} from "react-native-paper";

export const Container = styled.ScrollView`
    flex-direction: row;
    align-items: center;
    display: flex;
`

export const InformationWrapper = styled.View`
    flex-direction: column;
    text-align: left;
    display: flex;
    gap:10px;
    margin-top: 20px;
    max-width: 250px;
`


export const Title = styled.Text`
    text-align: left;
    font-weight: bold;
    font-size: 16px;
`

export const SubTitle = styled.Text`
    text-align: left;
    font-size: 16px;
`
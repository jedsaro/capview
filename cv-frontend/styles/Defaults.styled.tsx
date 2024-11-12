import styled from 'styled-components/native'


type debugSettings = {
   debug?: boolean;
   position?: 'vertical' | 'horizontal';
};

export const BaseTitleText = styled.Text`
    font-family: Helvetica;
    font-size: 22px;
    font-weight: bold;
    text-align: center;
`

export const HeroImage = styled.Image`
   height: 300px;
    width: 300px;
    margin: 0 auto;

`

export const Section = styled.ScrollView`
    display: flex;
`

export const Container = styled.View<debugSettings>`
    //background-color: ${({debug}) => (debug ? "#BF4F74" : "white")};
    //flex: ${({position}) => position === 'horizontal' ? 'column' : 'row'};
    display: flex;
    width: 100%;
    margin: 0 auto;
    justify-content: space-evenly;
`


export const HomeButton = styled.TouchableOpacity`
    background-color: #1e6dd3;
    color: white;
    border: none;
    padding: 10px 20px;
    text-align: center;
    text-decoration: none;
    display: inline-block;
    justify-content: center;
    align-items: center;
    width: 300px;
    font-size: 16px;
    margin: 0 auto;
    cursor: pointer;
    border-radius: 15px;
`;

export const VerticalWrapper = styled.View`
    flex-direction: column;
    display: flex;
`

export const HomeWrapper = styled.View`
    flex-direction: column;
    display: flex;
    margin-top: 200px;
`
 export const TempContainer = styled.View`
margin-top: 100px;
`;


export const HorizontalWrapper = styled.View`
    flex-direction: row;
    display: flex;
`
export const ContentText = styled.Text`
    text-align: center;
    font-size: 12px;
    margin: auto 0;
`

export const HeroInputContainer= styled.View`
    display: flex;
    padding: 30px;
    gap: 15px;
`

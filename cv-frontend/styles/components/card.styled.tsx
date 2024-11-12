import styled from 'styled-components/native';

export const CardContainer = styled.View`
    background-color: #fff;
    border-radius: 10px;
    width: 100%;
    padding: 20px;
    margin: 10px;
    shadow-color: #000;
    shadow-offset: 0px 4px;
    shadow-opacity: 0.1;
    shadow-radius: 5px;
    elevation: 5;
`;

export const CardTitle = styled.Text`
    font-size: 18px;
    font-weight: bold;
    margin-bottom: 10px;
`;

export const CardContent = styled.Text`
    font-size: 14px;
    color: #555;
`;

export const MainHorizontalWrapper = styled.View`
    flex-direction: row;
    display: flex;
    justify-content: space-around;
`
export const NameVerticalWrapper = styled.View`
    flex-direction: column;
    justify-content: space-evenly;
    display: flex;`

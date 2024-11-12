import {Text} from "react-native";
import React, {useEffect, useState} from "react";
import io from "socket.io-client";
import {useSelector} from "react-redux";
import {Section, TempContainer, VerticalWrapper} from "@/styles/Defaults.styled";
import {InformationWrapper, SubTitle, Title} from "@/app/(tabs)/Devices/index.styles";
import {CardContainer, MainHorizontalWrapper, NameVerticalWrapper} from "@/styles/components/card.styled";
import ComputerSVG from "@/assets/svgs/ComputerSVG";
import {ProgressBar} from 'react-native-paper';
import {roundUp, TBtoGB, totalHDDUsage} from "@/utils/roundup";
import {ActivityIndicator} from "react-native";


type BasicSystemInfo = {
   sessionID?: string;
   computer_name?: string;
   release?: string;
   machine?: string;
   processor?: string;
   memory_utilization_percent: number;
   total_disk_space_bytes: number;
   used_disk_space_bytes: number;
   free_disk_space_bytes: number;
   disk_space_utilization_percent?: number;
};

type SocketDeviceState = {
   computerName: any;
   status: boolean;
   data: BasicSystemInfo;
}

const Devices = () => {
   const apiUrl = process.env.EXPO_PUBLIC_BACKEND_URL;
   const {token} = useSelector((state: any) => state.auth);

   const socket = io(apiUrl, {
      extraHeaders: {
         'Authorization': `Bearer ${token}`,
         'type': 'host',
      },
   });

   const [isConnected, setIsConnected] = useState(socket.connected);
   const [socketDevices, setSocketDevices] = useState<SocketDeviceState[]>([]);

   useEffect(() => {
      const onConnect = () => {
         setIsConnected(true);
      };

      const onDisconnect = (user: any) => {
         setIsConnected(false);
      };

      const receiveMessage = (message: BasicSystemInfo) => {

         const {computer_name, ...rest} = message;

         const incomingMessage: SocketDeviceState = {
            computerName: computer_name,
            status: true,
            data: rest
         }

         if (socketDevices.some(item => item.data.sessionID === incomingMessage.data.sessionID)) {
            setSocketDevices((prevDevicesList) =>
               prevDevicesList.map((item) =>
                  item.data.sessionID === incomingMessage.data.sessionID
                     ? {...item, data: {...item.data, ...incomingMessage.data}}
                     : item
               )
            );
         } else {
            setSocketDevices(item => [...item, incomingMessage])
         }
      }

      socket.on('connect', onConnect);
      socket.on("message", receiveMessage);
      socket.on('disconnect', onDisconnect);
      socket.on('userDisconnected', handleDeviceDisconnect)

      return () => {
         socket.off('connection', onConnect);
         socket.off('disconnect', onDisconnect);
         socket.off("message", receiveMessage);
         socket.off('userDisconnected', handleDeviceDisconnect)
      };
   }, [socketDevices]);

   const handleDeviceDisconnect = async (data: any) => {
      setSocketDevices((prevUsers) =>
         prevUsers.map((item) => {
            if (item.data.sessionID === data.id) {
               return {...item, status: false};
            }
            return item;
         })
      );
   }

   const statusColorBarHandler = (percentage: number) => {
      return percentage > 82 ? "red" : "green";
   }


   return (
      <Section
         bounces={false}
         overScrollMode="never"
         alwaysBounceVertical={false}
         contentContainerStyle={{display: "flex", alignItems: "center"}}>
         <Text>Mobile Connected: {isConnected ? "Yes" : "No"}</Text>
         {   socketDevices.length === 0 ? (
            <TempContainer>
               <ActivityIndicator size="large" color="#007FFF" />
            </TempContainer>
         ) : (
            socketDevices.map((device) => (
               <CardContainer key={device.data.sessionID}>
                  <MainHorizontalWrapper>
                     <ComputerSVG status={device.status}/>
                     <NameVerticalWrapper>
                        <Title>Device Name:</Title>
                        <SubTitle>{device.computerName}</SubTitle>
                        <SubTitle>{`Status: ${device.status ? "online" : "offline"}`}</SubTitle>
                     </NameVerticalWrapper>
                  </MainHorizontalWrapper>

                  <InformationWrapper>
                     <VerticalWrapper>
                        <Title>RAM Utilization:</Title>
                        <SubTitle>{device.data.memory_utilization_percent}%</SubTitle>
                        <ProgressBar
                           progress={device.data.memory_utilization_percent / 100}
                           color={statusColorBarHandler(device.data.memory_utilization_percent)}
                        />
                     </VerticalWrapper>
                     <VerticalWrapper>
                        <Title>Total Disk Usage:</Title>
                        <SubTitle>{`${roundUp(totalHDDUsage(device.data.free_disk_space_bytes, device.data.total_disk_space_bytes))}%`}</SubTitle>
                        <ProgressBar
                           progress={roundUp(totalHDDUsage(device.data.free_disk_space_bytes, device.data.total_disk_space_bytes)) / 100}
                           color={statusColorBarHandler(roundUp(totalHDDUsage(device.data.free_disk_space_bytes, device.data.total_disk_space_bytes)))}
                        />
                     </VerticalWrapper>
                     <VerticalWrapper>
                        <Title>Remaining Disk Capacity:</Title>
                        <SubTitle>{TBtoGB(device.data.free_disk_space_bytes)} GB</SubTitle>
                     </VerticalWrapper>
                     <VerticalWrapper>
                        <Title>Disk Size:</Title>
                        <SubTitle>{`${TBtoGB(device.data.total_disk_space_bytes)} GB`}</SubTitle>
                     </VerticalWrapper>
                  </InformationWrapper>
               </CardContainer>
            ))
         )}
      </Section>
   );
};

export default Devices;

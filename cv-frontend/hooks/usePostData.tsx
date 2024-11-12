import { useState } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { login } from "@/store/store";

export type UserInformation = {
   username: string;
   password: string;
};

export default function usePostData() {

   const dispatch = useDispatch();

   const { token } = useSelector((state: any) => state.auth);

   const [loading, setLoading] = useState<boolean>(false);
   const [error, setError] = useState<string>("");

   const getDataAPI = (address: string) => {
      return axios.get(address, {
         headers: {
            Authorization: `Bearer ${token}`,
         },
      });
   };

   const loginPostDataToAPI = async (data: UserInformation, path: any): Promise<void> => {
      const apiUrl = process.env.EXPO_PUBLIC_BACKEND_URL;

      setLoading(true);
      setError("");
      try {
         const res = await axios.post(`${apiUrl}/v1/account/${path}`, data, {
            headers: {
               Authorization: `Bearer ${token}`,  // Use the token if required
            },
         });
         if (res.status === 200) {
            dispatch(login({token:res.data.token, username:res.data.username, owner:res.data.owner}));
         }
      } catch (e) {
         setError("Error posting data");
         console.log(e);
      } finally {
         setLoading(false);
      }
   };

   return { loading, error, postDataToAPI: loginPostDataToAPI, getDataAPI };
}

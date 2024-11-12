import { useState, useEffect } from "react";
import axios from "axios";

const useFetchData = <T = any>(url: string) => {
   const [data, setData] = useState<T | null>(null);
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<string | null>(null);

   useEffect(() => {
      const fetchData = async () => {
         try {
            const response = await axios.get<T>(url);
            setData(response.data);
         } catch (err) {
            setError(err instanceof Error ? err.message : "Something went wrong");
         } finally {
            setLoading(false);
         }
      };

      fetchData().then();
   }, [url]);

   return { data, loading, error };
};

export default useFetchData;

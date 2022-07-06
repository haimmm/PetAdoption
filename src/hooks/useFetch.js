import { useNavigate } from "react-router-dom";

const { useState, useRef } = require("react");

export const useFetch = () => {
    const [data, setData] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState(null);
    const navigator = useNavigate()
    const nestCount = useRef(0);


    const fetchData = async (cb, newPath) => {
      setError(null);
      if(!nestCount.current) setIsLoading(true);
      nestCount.current++;
      try {
        const result = await cb();
        if(result) setData(result.data || result);
      } catch (error) {
        return setError(error?.response?.data.message || error.message);
      }finally{
        if(nestCount.current === 1) setIsLoading(false);
        nestCount.current--;
      }
      if(newPath) navigator(newPath);
    }
  
    return {
      data,
      isLoading, 
      error, 
      fetchData
    };
  }
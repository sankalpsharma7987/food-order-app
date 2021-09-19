import { useCallback } from "react";

const useHttp = () => {
  const sendRequest = useCallback(async (requestConfig, applyData=null) => {
    const res = await fetch(requestConfig.url, {
      method: requestConfig.method ? requestConfig.method : "GET",
      body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      headers: requestConfig.header ? requestConfig.header : {},
    });

    const data = await res.json();
    if (applyData) {
      applyData(data);
    }

    else {
      return data;
    }
  }, []);

  return { sendRequest };
};

export default useHttp;

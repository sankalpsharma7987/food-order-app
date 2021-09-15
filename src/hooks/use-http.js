import { useCallback } from "react";

const useHttp = () => {

  const sendRequest = useCallback(async (requestConfig, applyData) => {
    const res = await fetch(requestConfig.url, {
      method: requestConfig.method ? requestConfig.method : "GET",
      body: requestConfig.body ? JSON.stringify(requestConfig.body) : null,
      headers: requestConfig.header ? requestConfig.header : {},
    });

    if(!res.ok)
    {
      throw new Error();
    }

    const data = await res.json();
    applyData(data);
  }, []);

  return { sendRequest };
};

export default useHttp;

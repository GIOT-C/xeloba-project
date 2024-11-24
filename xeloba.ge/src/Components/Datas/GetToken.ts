import { useState, useEffect } from "react";

function GetToken() {
  const [token, setToken] = useState<string>("");

  useEffect(() => {
    const fetchToken = async () => {
      try {
        const response = await fetch("https://xeloba.ge/token.json", {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData = await response.json();
        setToken(responseData.csrf_token);
      } catch (error) {
        console.error("Error fetching token:", error);
      }
    };

    fetchToken();
  }, []);

  return token;
}

export default GetToken;

import { useState, useEffect } from "react";
import { CraftsmanDataInterface } from "../Interfaces/CraftsmanDataInterface";

function GetData() {
  const [data, setData] = useState<CraftsmanDataInterface[]>([]);
  const serverBaseUrl = "https://xeloba.ge/";

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${serverBaseUrl}craftsman.json`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const responseData: CraftsmanDataInterface[] = await response.json();
        setData(responseData);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return data;
}

export default GetData;

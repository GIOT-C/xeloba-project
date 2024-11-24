import { useEffect } from "react";

function useEnterKeyPress(callback: () => void) {
  useEffect(() => {
    const handleEnterPress = (event: KeyboardEvent) => {
      if (event.key === "Enter") {
        callback();
      }
    };

    // Add the event listener for "keydown"
    document.addEventListener("keydown", handleEnterPress);

    // Remove the event listener on component unmount
    return () => {
      document.removeEventListener("keydown", handleEnterPress);
    };
  }, [callback]); // Run effect only when the callback changes
}

export default useEnterKeyPress;

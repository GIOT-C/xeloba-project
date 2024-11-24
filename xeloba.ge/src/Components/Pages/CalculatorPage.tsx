import styles from "../Styles/CalculatorPage.module.scss";
import InputComponent from "../Calculator/CalcInput";
import { useState } from "react";
import CalcResults from "../Calculator/CalcResults";

function CalculatorPage() {
  const [lengthOfRoom, setLengthOfRoom] = useState<string>("");
  const [widthOfRoom, setWidthOfRoom] = useState<string>("");
  const [wallHeight, setWallHeight] = useState<string>("");
  const [floorPrice, setFloorPrice] = useState<string>("");
  const [wallPrice, setWallPrice] = useState<string>("");
  const [ceilingPrice, setCeilingPrice] = useState("");

  return (
    <>
    
      <div className={styles.parentContainer}>
      <h4 className={styles.header}>
          გაითვალისწინეთ, რომ კალკულატორით დათვლილი ფართობი/ღირებულება საორიენტაციოა და
          ზუსტი ფართობის/ღირებულების დათვლაში შესაბამისი სპეციალისტი დაგეხმარებათ.
        </h4>
        <div className={styles.CalcContainer}>
        
        <div className={styles.inputContainer}>
          <InputComponent
            lengthOfRoom={lengthOfRoom}
            setLengthOfRoom={setLengthOfRoom}
            widthOfRoom={widthOfRoom}
            setWidthOfRoom={setWidthOfRoom}
            wallHeight={wallHeight}
            setWallHeight={setWallHeight}
            floorPrice={floorPrice}
            setFloorPrice={setFloorPrice}
            wallPrice={wallPrice}
            setWallPrice={setWallPrice}
            ceilingPrice={ceilingPrice}
            setCeilingPrice={setCeilingPrice}
          />
        </div>
        <div className={styles.outputContainer}>
          <CalcResults
            lengthOfRoom={lengthOfRoom}
            setLengthOfRoom={setLengthOfRoom}
            widthOfRoom={widthOfRoom}
            setWidthOfRoom={setWidthOfRoom}
            wallHeight={wallHeight}
            setWallHeight={setWallHeight}
            floorPrice={floorPrice}
            setFloorPrice={setFloorPrice}
            wallPrice={wallPrice}
            setWallPrice={setWallPrice}
            ceilingPrice={ceilingPrice}
            setCeilingPrice={setCeilingPrice}
          />
        </div>
        </div>
      </div>
    </>
  );
}

export default CalculatorPage;

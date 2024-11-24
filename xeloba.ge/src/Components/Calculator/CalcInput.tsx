import styles from "../Styles/CalcInput.module.scss";
import { preventInvalidInput } from "../Hooks/PreventInvalidInput";

type PropsTypes = {
  lengthOfRoom: string;
  setLengthOfRoom: React.Dispatch<React.SetStateAction<string>>;
  widthOfRoom: string;
  setWidthOfRoom: React.Dispatch<React.SetStateAction<string>>;
  wallHeight: string;
  setWallHeight: React.Dispatch<React.SetStateAction<string>>;
  floorPrice: string;
  setFloorPrice: React.Dispatch<React.SetStateAction<string>>;
  wallPrice: string;
  setWallPrice: React.Dispatch<React.SetStateAction<string>>;
  ceilingPrice: string;
  setCeilingPrice: React.Dispatch<React.SetStateAction<string>>;
};

function InputComponent(props: PropsTypes) {
  const handleClear = () => {
    props.setLengthOfRoom("");
    props.setWidthOfRoom("");
    props.setWallHeight("");
    props.setFloorPrice("");
    props.setWallPrice("");
    props.setCeilingPrice("");
  };

  return (
    <div className={styles.parentContainer}>
      <div className={styles.calcInputContainer}>
        <div className={styles.calcInput}>
          <div className={styles.calcInput__labelContainer}>
            <label htmlFor="lengthOfRoom">ოთახის სიგრძე(მ)</label>
          </div>
          <input
            type="number"
            id="lengthOfRoom"
            className={styles.calcInput__input}
            value={props.lengthOfRoom}
            onChange={(e) => props.setLengthOfRoom(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "-" || e.key === "E" || e.key === "e") {
                e.preventDefault();
              }
            }}
          />
        </div>

        <div className={styles.calcInput}>
          <div className={styles.calcInput__labelContainer}>
            <label htmlFor="widthOfRoom">ოთახის სიგანე(მ)</label>
          </div>
          <input
            type="number"
            id="widthOfRoom"
            className={styles.calcInput__input}
            value={props.widthOfRoom}
            onChange={(e) => props.setWidthOfRoom(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "-" || e.key === "E" || e.key === "e") {
                e.preventDefault();
              }
            }}
          />
        </div>

        <div className={styles.calcInput}>
          <div className={styles.calcInput__labelContainer}>
            <label htmlFor="wallHeight">კედლის სიმაღლე(მ)</label>
          </div>
          <input
            type="number"
            id="wallHeight"
            className={styles.calcInput__input}
            value={props.wallHeight}
            onChange={(e) => props.setWallHeight(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "-" || e.key === "E" || e.key === "e") {
                e.preventDefault();
              }
            }}
          />
        </div>

        <div className={styles.calcInput}>
          <div className={styles.calcInput__labelContainer}>
            <label htmlFor="floorPrice">
              1 კვ.მ შესრულების ღირებულება - (იატაკი)
            </label>
          </div>
          <input
            type="number"
            id="floorPrice"
            className={styles.calcInput__input}
            value={props.floorPrice}
            onChange={(e) => props.setFloorPrice(e.target.value)}
            onKeyDown={preventInvalidInput}
          />
        </div>

        <div className={styles.calcInput}>
          <div className={styles.calcInput__labelContainer}>
            <label htmlFor="ceilingPrice">
              1 კვ.მ შესრულების ღირებულება - (ჭერი)
            </label>
          </div>
          <input
            type="number"
            id="ceilingPrice"
            className={styles.calcInput__input}
            value={props.ceilingPrice}
            onChange={(e) => props.setCeilingPrice(e.target.value)}
            onKeyDown={preventInvalidInput}
          />
        </div>

        <div className={styles.calcInput}>
          <div className={styles.calcInput__labelContainer}>
            <label htmlFor="wallPrice">
              1 კვ.მ შესრულების ღირებულება - (კედლები)
            </label>
          </div>
          <input
            type="number"
            id="wallPrice"
            className={styles.calcInput__input}
            value={props.wallPrice}
            onChange={(e) => props.setWallPrice(e.target.value)}
            onKeyDown={preventInvalidInput}
          />
        </div>
        <button className={styles.clearBtn} onClick={handleClear}>
          გასუფთავება
        </button>
      </div>
    </div>
  );
}

export default InputComponent;

import styles from "../Styles/CalcResults.module.scss";

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

function CalcResults(props: PropsTypes) {
  const floorOrCeilingArea = +props.lengthOfRoom * +props.widthOfRoom;
  const longWallArea = +props.lengthOfRoom * +props.wallHeight;
  const shortWallArea = +props.widthOfRoom * +props.wallHeight;
  const totalWallArea = longWallArea * 2 + shortWallArea * 2;
  const entireRoomArea = floorOrCeilingArea * 2 + totalWallArea;
  const priceOfFloorReapair = floorOrCeilingArea * +props.floorPrice;
  const priceOfCeilingRepair = floorOrCeilingArea * +props.ceilingPrice;
  const priceOfWallRepair = totalWallArea * +props.wallPrice;
  const priceOfEntireRoom =
    priceOfFloorReapair + priceOfCeilingRepair + priceOfWallRepair;
  return (
    <div className={styles.parentContainer}>
      <div className={styles.calcOutputContainer}>
        <div className={styles.calcOutput}>
          <div className={styles.repairArea}>
            <div className={styles.description}>სარემონტო ფართი(კვ.მ)</div>

            <div className={styles.calculationArea}>
              <p className={styles.calculationArea__key}>იატაკი</p>
              <p className={styles.calculationArea__value}>
                {floorOrCeilingArea}
              </p>
            </div>

            <div className={styles.calculationArea}>
              <p className={styles.calculationArea__key}>ჭერი</p>
              <p className={styles.calculationArea__value}>
                {floorOrCeilingArea}
              </p>
            </div>

            <div className={styles.calculationArea}>
              <p className={styles.calculationArea__key}>ოთხივე კედელი</p>
              <p className={styles.calculationArea__value}>
                {props.lengthOfRoom === "" ||
                props.widthOfRoom === "" ||
                props.lengthOfRoom === "0" ||
                props.widthOfRoom === "0"
                  ? "0"
                  : totalWallArea}
              </p>
            </div>

            <div className={styles.calculationArea}>
              <p className={styles.calculationArea__key}>სრული ოთახი</p>
              <p className={styles.calculationArea__value}>
                {props.lengthOfRoom === "" ||
                props.widthOfRoom === "" ||
                props.wallHeight === "" ||
                props.lengthOfRoom === "0" ||
                props.widthOfRoom === "0" ||
                props.wallHeight === "0"
                  ? "0"
                  : entireRoomArea}
              </p>
            </div>
          </div>

          <div className={styles.totalPrice}>
            <div className={styles.priceDescription}>ჯამური ფასი</div>

            <div className={styles.calculationPrice}>
              <p>{priceOfFloorReapair}</p>
            </div>

            <div className={styles.calculationPrice}>
              <p>{priceOfCeilingRepair}</p>
            </div>

            <div className={styles.calculationPrice}>
              <p>
              {props.lengthOfRoom === "" ||
                props.widthOfRoom === "" ||
                props.lengthOfRoom === "0" ||
                props.widthOfRoom === "0"
                  ? "0"
                  : priceOfWallRepair}
              </p>
            </div>

            <div className={styles.calculationPrice}>
              <p>
              {props.lengthOfRoom === "" ||
                props.widthOfRoom === "" ||
                props.lengthOfRoom === "0" ||
                props.widthOfRoom === "0"
                  ? "0"
                  : priceOfEntireRoom}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CalcResults;

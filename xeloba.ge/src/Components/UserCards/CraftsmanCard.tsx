import styles from "../Styles/CraftsmanCard.module.scss";
import { useNavigate } from "react-router-dom";
import { FC } from "react";
import { CraftsmanDataInterface } from "../Interfaces/CraftsmanDataInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCircleXmark,
  faCircleCheck,
  faLocationDot,
} from "@fortawesome/free-solid-svg-icons";

interface CraftsmanCardProps {
  craftsman: CraftsmanDataInterface;
}
const CraftsmanCard: FC<CraftsmanCardProps> = ({ craftsman }) => {
  const navigate = useNavigate();
  const serverBaseUrl = "https://xeloba.ge/";

  const craftsmanProfileHandler = (userID: string) => {
    navigate(`/craftsman/${userID}`);
  };

  return (
    <div
      key={craftsman.userID}
      className={styles.craftsmanCard}
      onClick={() => craftsmanProfileHandler(craftsman.userID)}
    >
      <div className={styles.imgContainer}>
        <img
          src={`${serverBaseUrl}${craftsman.profileImgs}`}
          alt={craftsman.name}
          className={styles.craftsmanCard__userImg}
        />
      </div>
      <div className={styles.craftsmanCard__verificationStatus}>
        <FontAwesomeIcon
          icon={craftsman.status === "true" ? faCircleCheck : faCircleXmark}
          className={
            craftsman.status === "true"
              ? styles.faCircleCheck
              : styles.faCircleXmark
          }
        />
        <p>
          {craftsman.status === "true"
            ? "ვერიფიცირებულია"
            : "არ არის ვერიფიცირებული"}
        </p>
      </div>
      <p className={styles.craftsmanCard__userIdentity}>
        {craftsman.name} {craftsman.lastname}
      </p>
      <div className={styles.craftsmanCard__location}>
        <FontAwesomeIcon
          icon={faLocationDot}
          className={styles.faLocationDot}
        />
        <p>
          {craftsman.city}{craftsman.city === "თბილისი" ? ',' : ''} {craftsman.city === "თბილისი" ? craftsman.district : ''}
        </p>
      </div>
      <p className={styles.craftsmanCard__profession}>{craftsman.profession}</p>
      <p className={styles.craftsmanCard__price}>
        ფასი: {craftsman.price}ლ (1კვ/მ)
      </p>
    </div>
  );
};

export default CraftsmanCard;

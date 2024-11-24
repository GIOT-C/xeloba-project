import styles from "../Styles/CraftsmanProfile.module.scss";
import { useParams } from "react-router-dom";
import GetData from "../Datas/GetData";
import { CraftsmanDataInterface } from "../Interfaces/CraftsmanDataInterface";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faSquareWhatsapp } from "@fortawesome/free-brands-svg-icons";

function CraftsmanProfile() {
  const data = GetData();
  const { userID } = useParams<{ userID: string }>();
  const serverBaseUrl = "https://xeloba.ge/";
  const filteredData: CraftsmanDataInterface[] = data.filter(
    (craftsman) => craftsman.userID === userID
  );

  const handleCallClick = (phoneNumber: string) => {
    window.location.href = `tel:${phoneNumber}`;
  };

  const handleWhatsAppClick = (phoneNumber: string) => {
    const whatsappUrl = `https://wa.me/+995${phoneNumber}`;
    window.location.href = whatsappUrl;
  };

  const handleEmailClick = (email: string) => {
    const subject = encodeURIComponent("გამარჯობა!");
    const body = encodeURIComponent("");
    window.location.href = `mailto:${email}?subject=${subject}&body=${body}`;
  };

  return (
    <div className={styles.parentContainer}>
      {filteredData.map((user) => (
        <div key={user.userID} className={styles.userProfileCard}>
          <div className={styles.userImgContainer}>
            <img
              src={`${serverBaseUrl}${user.profileImgs}`}
              alt={user.name}
              className={styles.userImgContainer__userImg}
            />
          </div>

          <div className={styles.contact}>
            <div
              className={styles.contact__phone}
              onClick={() => handleCallClick(user.phone_number)}
            >
              <FontAwesomeIcon icon={faPhone} className={styles.faPhone} />
            </div>

            <div
              className={styles.contact__mail}
              onClick={() => handleEmailClick(user.email)}
            >
              <FontAwesomeIcon
                icon={faEnvelope}
                className={styles.faEnvelope}
              />
            </div>

            <div
              className={styles.contact__whatsapp}
              onClick={() => handleWhatsAppClick(user.phone_number)}
            >
              <FontAwesomeIcon
                icon={faSquareWhatsapp}
                className={styles.faSquareWhatsapp}
              />
            </div>
          </div>

          <div className={styles.info}>
            <div className={styles.info__key}>ხელოსანი</div>
            <p className={styles.info__value}>
              {user.name} {user.lastname}
            </p>
          </div>

          <div className={styles.info}>
            <div className={styles.info__key}>სტატუსი</div>
              <p className={`${styles.info__value} ${user.status === "true" ? styles.info__statusIsTrue : styles.info__statusIsFalse}`}>
                {user.status === "true"
                  ? "ვერიფიცირებულია"
                  : "არ არის ვერიფიცირებული"}
              </p>
          </div>

          <div className={styles.info}>
            <div className={styles.info__key}>ტელეფონი</div>
            <p className={styles.info__value}>{user.phone_number}</p>
          </div>

          <div className={styles.info}>
            <div className={styles.info__key}>ელ-ფოსტა</div>
            <p className={styles.info__value}>{user.email}</p>
          </div>

          <div className={styles.info}>
            <div className={styles.info__key}>ლოკაცია</div>
            
            <p className={styles.info__value}>
          {user.city}{user.city === "თბილისი" ? ',' : ''} {user.city === "თბილისი" ? user.district : ''}
        </p>
          </div>

          <div className={styles.info}>
            <div className={styles.info__key}>პროფესია</div>
            <p className={`${styles.info__value} ${styles.info__profession}`}>{user.profession}</p>
          </div>

          <div className={styles.info}>
            <div className={styles.info__key}>(1კვ/მ)-ის ფასი</div>
            <p className={styles.info__value}>{user.price} ლარი</p>
          </div>

          <div className={styles.info}>
            <div className={styles.info__key}>მინიმალური გამოძახების საფასური</div>
            <p className={styles.info__value}>{user.visitPrice} ლარი</p>
          </div>

          <div className={styles.info}>
            <div className={styles.info__key}>სამუშაო გამოცდილება</div>
            <p className={styles.info__value}>{user.experience} წელი</p>
          </div>

          {user.moreInfo === "" ? "" :
          <div className={styles.info}>
            <div className={styles.info__key}>დამატებითი ინფორმაცია</div>
            <p className={styles.info__value}>{user.moreInfo}</p>
          </div>
}
        </div>
      ))}
    </div>
  );
}

export default CraftsmanProfile;

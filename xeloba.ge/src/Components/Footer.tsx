import styles from "./Styles/Footer.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faLocationDot,
  faSquarePhone,
  faEnvelope,
} from "@fortawesome/free-solid-svg-icons";
import { faCopyright } from "@fortawesome/free-regular-svg-icons";
import {
  faSquareFacebook,
  faSquareWhatsapp,
  faSquareInstagram,
  faSquareYoutube,
  faLinkedin,
} from "@fortawesome/free-brands-svg-icons";
import front from "../Components/assets/front.jpg";
import back from "../Components/assets/back.jpg";

function Footer() {
  const handleCallClick = () => {
    window.location.href = `tel:550059196`;
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
    <>
      <div className={styles.parentContainer}>
        <div className={styles.mainContainer}>
          <footer className={styles.footer}>
            <div className={styles.footer__leftSide}>
              <div className={styles.footer__leftSide__childContainer}>
                <div className={styles.footer__leftSide__aboutUs}>
                  <p>
                    ჩვენი მიზანია, მოგეხმაროთ სასურველი სპეციალისტის მოძიებაში
                    ხელსაყრელ ფასად, სასურველ ლოკაციაზე და შესაბამისი
                    გამოცდილებით.
                  </p>
                </div>
              </div>
            </div>

            <div className={styles.footer__rightSide}>
              <div className={styles.footer__rightSide__childContainer}>
                <div className={styles.footer__rightSide__location}>
                  <FontAwesomeIcon
                    icon={faLocationDot}
                    className={styles.faLocationDot}
                  />
                  <span> ქ. თბილისი, რეზო გაბაშვილის N10</span>
                </div>

                <div
                  className={styles.footer__rightSide__contact}
                  onClick={() =>
                    handleEmailClick("info@xeloba.ge")
                  }
                >
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className={styles.faEnvelope}
                  />
                  <span>info@xeloba.ge</span>
                </div>

                <div
                  className={styles.footer__rightSide__contact}
                  onClick={() => handleCallClick()}
                >
                  <FontAwesomeIcon
                    icon={faSquarePhone}
                    className={styles.faSquarePhone}
                  />
                  <span>550 05 91 96</span>
                </div>

                <div className={styles.footer__rightSide__socialNetworks}>
                  <a
                    target="_blank"
                    href="https://www.facebook.com/people/%E1%83%AE%E1%83%94%E1%83%9A%E1%83%9D%E1%83%91%E1%83%90-Xeloba/61555048217915/"
                  >
                    <FontAwesomeIcon
                      icon={faSquareFacebook}
                      className={styles.faFacebook}
                    />
                  </a>

                  <a
                    target="_blank"
                    href="https://www.instagram.com/xeloba7?igsh=MWFrNmxzemt4ZmgzZA=="
                  >
                    <FontAwesomeIcon
                      icon={faSquareInstagram}
                      className={styles.faSquareInstagram}
                    />
                  </a>

                  <FontAwesomeIcon
                    icon={faSquareWhatsapp}
                    className={styles.faSquareWhatsapp}
                    onClick={() => handleWhatsAppClick("550059196")}
                  />

                  <FontAwesomeIcon
                    icon={faSquareYoutube}
                    className={styles.faSquareYoutube}
                  />
                </div>
              </div>
            </div>
          </footer>
        </div>

        <div className={styles.copyright}>
          <div className={styles.copyright__text}>
            <FontAwesomeIcon
              icon={faCopyright}
              className={styles.faCopyright}
            />
            <span>{`2024 "xeloba.ge" ყველა უფლება დაცულია`}</span>
          </div>
        </div>

        <div className={styles.creatorsContainer}>
          <div className={styles.creatorsChildContainer}>
            <div className={styles.creators}>
              <div className={styles.creatorsTitle}>Creators:</div>

              <div className={styles.developers}>
                <div className={styles.dev}>
                  <img src={front} alt="frontDev" className={styles.devImg} />
                  <span className={styles.devName}>Giorgi Otarashvili</span>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/gio-otarashvili-ba2175271?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  >
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      className={styles.devsocialNetwork}
                    />
                  </a>
                  <FontAwesomeIcon
                    icon={faEnvelope}
                    className={styles.devsocialNetwork}
                    onClick={() =>
                      handleEmailClick("giootarashvili77@gmail.com")
                    }
                  />
                  <FontAwesomeIcon
                    icon={faSquareWhatsapp}
                    className={styles.devsocialNetwork}
                    onClick={() => handleWhatsAppClick("511410903")}
                  />
                </div>

                <div className={styles.dev}>
                  <img src={back} alt="backDev" className={styles.devImg} />
                  <span className={styles.devName}>Mikheil Kuprava</span>
                  <a
                    target="_blank"
                    href="https://www.linkedin.com/in/mikheil-kuprava-764491249?utm_source=share&utm_campaign=share_via&utm_content=profile&utm_medium=android_app"
                  >
                    <FontAwesomeIcon
                      icon={faLinkedin}
                      className={styles.devsocialNetwork}
                    />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Footer;

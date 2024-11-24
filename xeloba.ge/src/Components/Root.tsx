import styles from "./Styles/Root.module.scss";
import { Link, Outlet } from "react-router-dom";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { MainContext } from "../App";
import logo from "./assets/logo.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faUser,
  faAddressCard,
  faCalculator,
  faBars,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import UseScrollToTop from "./Hooks/useScrollsToTheTop";
import Filter from "./Finding/Filter";
import Footer from "./Footer";


function Root() {
  UseScrollToTop();
  const navigate = useNavigate();
  const context = useContext(MainContext);

  const {
    menuBar,
    setMenuBar,
    selectedNavigation,
    setSelectedNavigation,
    setSearchByDistrict,
    setSearchByProfession,
    setSearchByVerification,
    setSearchByExperience,
    setSearchByPriceFrom,
    setSearchByPriceUpTo,
  } = context;

  const handleNavigation = (nav: string) => {
    navigate(nav);
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    setSelectedNavigation(nav);
    setMenuBar(false);
    setSearchByDistrict("");
    setSearchByProfession("");
    setSearchByVerification("");
    setSearchByExperience([]);
    setSearchByPriceFrom("");
    setSearchByPriceUpTo("");
    // context?.setFilterByDistrict("");
    // context?.setFilterByProfession("");
  };
  return (
    <>
      <div className={styles.parentContainer}>
        <div className={styles.navContainer}>
          <nav className={styles.nav}>
            <div className={styles.logoContainer}>
              <Link
                to="/"
                onClick={() => {
                  handleNavigation("home");
                }}
              >
                <img src={logo} alt="logo" className={styles.logoImg} />
              </Link>

              <div className={styles.logoContainer__menuBarIcon}>
                {!menuBar ? (
                  <div>
                    <FontAwesomeIcon
                      icon={faBars}
                      className={styles.faBars}
                      onClick={() => {
                        setMenuBar(!menuBar);
                      }}
                    />
                  </div>
                ) : (
                  <FontAwesomeIcon
                    icon={faXmark}
                    className={styles.faXmark}
                    onClick={() => {
                      setMenuBar(!menuBar);
                    }}
                  />
                )}
              </div>
            </div>

            <div
              className={
                menuBar ? styles.mobileNavigation : styles.desktopNavigation
              }
            >
              <Link
                to="/calculator"
                className={`${styles.navElement} ${
                  selectedNavigation === "CalculatorPage"
                    ? styles.selectedNavElement
                    : ""
                }`}
                onClick={() => {
                  handleNavigation("CalculatorPage");
                }}
              >
                <FontAwesomeIcon
                  icon={faCalculator}
                  className={styles.faCalculator}
                />
                <span>კალკულატორი</span>
              </Link>

              <Link
                to="/search"
                className={`${styles.navElement} ${
                  selectedNavigation === "searchPage"
                    ? styles.selectedNavElement
                    : ""
                }`}
                onClick={() => {
                  handleNavigation("searchPage");
                }}
              >
                <FontAwesomeIcon
                  icon={faMagnifyingGlass}
                  className={styles.faMagnifyingGlass}
                />
                <span>დეტალური ძებნა</span>
              </Link>

              <Link
                to="/authorization"
                className={`${styles.navElement} ${
                  selectedNavigation === "myPage"
                    ? styles.selectedNavElement
                    : ""
                }`}
                onClick={() => {
                  handleNavigation("myPage");
                }}
              >
                <FontAwesomeIcon icon={faUser} className={styles.faUser} />
                <span>ჩემი გვერდი</span>
              </Link>

              <Link
                to="/registration"
                className={`${styles.navElement} ${
                  selectedNavigation === "registration"
                    ? styles.selectedNavElement
                    : ""
                }`}
                onClick={() => {
                  handleNavigation("registration");
                }}
              >
                <FontAwesomeIcon
                  icon={faAddressCard}
                  className={styles.faAddressCard}
                />
                <span>რეგისტრაცია</span>
              </Link>
            </div>
          </nav>
        </div>

        <Filter/>

        <div className={styles.outlet}>
            <div className={styles.outletInCenter}>
        <Outlet />
        </div>
        </div>

      </div>
      <Footer/>
    </>
  );
}

export default Root;

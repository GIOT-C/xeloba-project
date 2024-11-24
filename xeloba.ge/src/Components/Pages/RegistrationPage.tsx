import styles from "../Styles/SelectUserRole.module.scss";
import { useNavigate } from "react-router-dom";

function RegistrationPage() {
  const navigate = useNavigate();

  const handleCraftsmanRegistration = () => {
    navigate(`/registration/craftsman-registration`);
  };

  const handleClientRegistration = () => {
    navigate(`/registration/client-registration`);
  };

  return (
    <>
      <div className={styles.parentContainer}>
        <div className={styles.options}>
         
          <div
            className={styles.craftsman}
            onClick={handleCraftsmanRegistration}
          >
            <p>ხელოსნის რეგისტრაცია</p>
          </div>

          <div
            className={styles.client}
            onClick={handleClientRegistration}
          >
            <p>მომხმარებლის რეგისტრაცია</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default RegistrationPage;

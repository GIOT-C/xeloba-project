import styles from "../Styles/SelectUserRole.module.scss";
import { useNavigate } from "react-router-dom";

function MyPage() {
  const navigate = useNavigate();

  const handleCraftsmanAuthorization = () => {
    navigate(`/authorization/craftsman-authorization`);
  };

  const handleClientAuthorization = () => {
    navigate(`/authorization/client-authorization`);
  };
  return (
    <>
      <div className={styles.parentContainer}>
        <div className={styles.options}>
          <div
            className={styles.craftsman}
            onClick={handleCraftsmanAuthorization}
          >
            <p>ხელოსნის ავტორიზაცია</p>
          </div>

          <div className={styles.client} onClick={handleClientAuthorization}>
            <p>მომხმარებლის ავტორიზაცია</p>
          </div>
        </div>
      </div>
    </>
  );
}

export default MyPage;

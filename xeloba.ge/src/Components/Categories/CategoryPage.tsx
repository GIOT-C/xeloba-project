import styles from "../Styles/CardParentsStyles.module.scss";
import { useParams } from "react-router-dom";
import GetData from "../Datas/GetData";
import { CraftsmanDataInterface } from "../Interfaces/CraftsmanDataInterface";
import CraftsmanCard from "../UserCards/CraftsmanCard";
import notFoundImg from "../assets/notFound.png"

function CategoryPage(){
    const data = GetData();
    const { title } = useParams<{ title: string }>();

    const filteredData: CraftsmanDataInterface[] = data.filter(
        (craftsman) => craftsman.profession === title
      );
      
    return(
      <div className={styles.parentContaier}>
        {filteredData.length === 0 ? (
        <div className={styles.emptyResult}>
          <img src={notFoundImg} alt="notFoundImg" className={styles.notFoundImg} />
          <h3>ხელოსანი არ მოიძებნა!!!</h3>
        </div>
      ) : (
        <div className={styles.craftsmanContainer}>
            {filteredData.map((craftsman) => (
          <CraftsmanCard key={craftsman.userID} craftsman={craftsman} />
        ))}
           </div>
           )}
        </div>
    )
}

export default CategoryPage

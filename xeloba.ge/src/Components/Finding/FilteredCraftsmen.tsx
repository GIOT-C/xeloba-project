import styles from "../Styles/CardParentsStyles.module.scss";
import { useContext} from "react";
import { MainContext } from "../../App";
import GetData from "../Datas/GetData";
import CraftsmanCard from "../UserCards/CraftsmanCard";
import notFoundImg from "../assets/notFound.png"

function FilteredCraftsmen() {
  const data = GetData();
  const context = useContext(MainContext);
  const { filterByCity, filterByDistrict, filterByProfession } = context;

  const filteredData = data.filter((craftsman) => {
    const matchesCity = filterByCity ? craftsman.city === filterByCity : true;
    const matchesDistrict = filterByDistrict
      ? craftsman.district === filterByDistrict
      : true;
    const matchesProfession = filterByProfession
      ? craftsman.profession === filterByProfession
      : true;

    return matchesCity && matchesDistrict && matchesProfession;
  });

  return (
    <div className={styles.parentContaier}>
      {filteredData.length === 0 ? (
        <div className={styles.emptyResult}>
           <img src={notFoundImg} alt="notFoundImg" className={styles.notFoundImg} />
          <h3>შერჩეული მონაცემებით ხელოსანი არ მოიძებნა!!!</h3>
        </div>
      ) : (
        <div className={styles.craftsmanContainer}>
          {filteredData.map((craftsman) => (
            <CraftsmanCard key={craftsman.userID} craftsman={craftsman} />
          ))}
        </div>
      )}
    </div>
  );
}

export default FilteredCraftsmen;

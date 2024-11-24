import styles from "../Styles/CardParentsStyles.module.scss";
import { useContext } from "react";
import { MainContext } from "../../App";
import CraftsmanCard from "../UserCards/CraftsmanCard";
import GetData from "../Datas/GetData";
import notFoundImg from "../assets/notFound.png";

function SearchResults(){
    const data = GetData();
    const context = useContext(MainContext);
    const {searchByCity, searchByDistrict, searchByProfession, searchByVerification, searchByExperience, searchByPriceFrom, searchByPriceUpTo} = context;

    const filteredData = data.filter((craftsman)=>{
        const experienceNumberArray = searchByExperience.map(Number); 

        const matchesCity = searchByCity ? craftsman.city === searchByCity : true;
        const matchesDistrict = searchByDistrict ? craftsman.district === searchByDistrict : true;
        const matchesProfession = searchByProfession ? craftsman.profession === searchByProfession : true;
        const matchesVerification = searchByVerification ? craftsman.status === searchByVerification : true;
       
        const matchespriceFrom = searchByPriceFrom ? +craftsman.price >= +searchByPriceFrom : true;
        const mathesPriceUpTo = searchByPriceUpTo ? +craftsman.price <= +searchByPriceUpTo : true;

        const matchesExperience = searchByExperience.length > 0 ? +craftsman.experience >= experienceNumberArray[0] &&
        +craftsman.experience <= experienceNumberArray[experienceNumberArray.length -1] : true;

        return matchesCity && matchesDistrict && matchesProfession && matchesVerification && matchespriceFrom && mathesPriceUpTo && matchesExperience;
      })


    return(
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
    )
}

export default SearchResults;
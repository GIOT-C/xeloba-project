import styles from "../Styles/Filter.module.scss";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { MainContext } from "../../App";

function Filter() {
  const context = useContext(MainContext);
  const navigate = useNavigate();

  const handleCityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    context?.setFilterByCity(e.target.value);
  };

  const handleDistrictChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    context?.setFilterByDistrict(e.target.value);
  };

  const handleProfessionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    context?.setFilterByProfession(e.target.value);
  };

  const filterHandler = () => {
    navigate(`/filter`);
  };

  useEffect(() => {
    if (context.filterByCity !== "თბილისი") {
      context.setFilterByDistrict("");
    }
  }, [context.filterByCity]);

  return (
    <>
      <div className={styles.parentContainer}>
        <div className={styles.filter}>
          <div className={styles.selectContainer}>
            <select
              name="selectedCity"
              id="city"
              className={styles.selectContainer__select}
              value={context?.filterByCity}
              onChange={handleCityChange}
            >
              <option value="">ქალაქი</option>
              <option value="თბილისი">თბილისი</option>
              <option value="ბათუმი">ბათუმი</option>
              <option value="რუსთავი">რუსთავი</option>
              <option value="გორი">გორი</option>
              <option value="ქუთაისი">ქუთაისი</option>
            </select>
          </div>
          <div className={styles.selectContainer}>
            <select
              name="selectedDistrict"
              id="district"
              className={styles.selectContainer__select}
              value={context?.filterByDistrict}
              onChange={handleDistrictChange}
              disabled={context.filterByCity !== "თბილისი"}
            >
              <option value="">რაიონი</option>
              <option value="საბურთალო">საბურთალო</option>
              <option value="ვაკე">ვაკე</option>
              <option value="მთაწმინდა">მთაწმინდა</option>
              <option value="ორთაჭალა">ორთაჭალა</option>
              <option value="კრწანისი">კრწანისი</option>
              <option value="ისანი">ისანი</option>
              <option value="ვარკეთილი">ვარკეთილი</option>
              <option value="ავლაბარი">ავლაბარი</option>
              <option value="სამგორი">სამგორი</option>
              <option value="ნაძალადევი">ნაძალადევი</option>
              <option value="გლდანი">გლდანი</option>
              <option value="ზღვისუბანი">ზღვისუბანი</option>
              <option value="სანზონა">სანზონა</option>
              <option value="დიდუბე-ჩუღურეთი">დიდუბე-ჩუღურეთი</option>
              <option value="ავჭალა">ავჭალა</option>
              <option value="ვაზისუბანი">ვაზისუბანი</option>
              <option value="ლილოს დასახლება">ლილოს დასახლება</option>
              <option value="ფონიჭალა">ფონიჭალა</option>
            </select>
          </div>
          <div className={styles.selectContainer}>
            <select
              name="selectedProfession"
              id="profession"
              className={styles.selectContainer__select}
              value={context?.filterByProfession}
              onChange={handleProfessionChange}
            >
              <option value="">კატეგორია</option>
              <option value="მალიარი">მღებავი (მალიარი)</option>
              <option value="კაფელ-მეტლახის ხელოსანი">
                კაფელ-მეტლახის ხელოსანი
              </option>
              <option value="ელექტრიკოსი">ელექტრიკოსი</option>
              <option value="სანტექნიკი">სანტექნიკი</option>
              <option value="თაბაშირ-მუყაოს ხელოსანი">
                თაბაშირ-მუყაოს ხელოსანი
              </option>
              <option value="გათბობა-გაგრილების სისტემა">
                გათბობა-გაგრილების სისტემა
              </option>
              <option value="მეტალო პლასტმასის ხელოსანი">
                მეტალო პლასტმასის ხელოსანი
              </option>
              <option value="სახლის დალაგება">სახლის დალაგება</option>
              <option value="იატაკის სამუშაოები">იატაკის სამუშაოები</option>
              <option value="სახურავის სპეციალისტი">
                სახურავის სპეციალისტი
              </option>
              <option value="დამხმარე(მუშა)">დამხმარე(მუშა)</option>
              <option value="უნივერსალური ხელოსანი">
                უნივერსალური ხელოსანი
              </option>
              <option value="მშენებელი">მშენებელი</option>
              <option value="ავეჯის ხელოსანი">ავეჯის ხელოსანი</option>
              <option value="სამშენებლო სპეც-ტექნიკა">
                სამშენებლო სპეც-ტექნიკა
              </option>
              <option value="ელ-შემდუღებელი">ელ-შემდუღებელი</option>
              <option value="არქიტექტორი">არქიტექტორი</option>
              <option value="კარის ხელოსანი">კარის ხელოსანი</option>
            </select>
          </div>
          <button className={styles.button} onClick={filterHandler}>
            ძებნა
          </button>
        </div>
        </div>
    </>
  );
}

export default Filter;

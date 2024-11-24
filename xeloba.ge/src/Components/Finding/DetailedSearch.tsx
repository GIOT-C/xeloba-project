import styles from "../Styles/DetailedSearch.module.scss";
import { useContext, useState, useEffect } from "react";
import { MainContext } from "../../App";
import { preventInvalidInput } from "../Hooks/PreventInvalidInput";

function DetailedSearch() {
  const context = useContext(MainContext);
  const [priceInputError, setPriceInputError] = useState<boolean>(false);
  const [moveRangeTextFrom, setMoveRangeTextFrom] = useState<boolean>(false);
  const [moveRangeTextUpTo, setMoveRangeTextUpTo] = useState<boolean>(false);

  const {
    searchByCity,
    setSearchByCity,
    searchByDistrict,
    setSearchByDistrict,
    searchByProfession,
    setSearchByProfession,
    searchByVerification,
    setSearchByVerification,
    searchByExperience,
    setSearchByExperience,
    searchByPriceFrom,
    setSearchByPriceFrom,
    searchByPriceUpTo,
    setSearchByPriceUpTo,
  } = context;

  const handleExperienceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const experienceArray = value.split(","); // Convert the string to an array
    setSearchByExperience(experienceArray);
  };

  const handlePriceChange =
    (setter: (value: string) => void) =>
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      if (value === "" || /^[1-9]\d*$/.test(value)) {
        setter(value);
      }
    };

  useEffect(() => {
    if (
      searchByPriceFrom &&
      searchByPriceUpTo &&
      +searchByPriceFrom > +searchByPriceUpTo
    ) {
      setPriceInputError(true);
    } else {
      setPriceInputError(false);
    }

    setMoveRangeTextFrom(!!searchByPriceFrom);
    setMoveRangeTextUpTo(!!searchByPriceUpTo);
  }, [searchByPriceFrom, searchByPriceUpTo]);

  const handleClear = () => {
    setSearchByCity("");
    setSearchByDistrict("");
    setSearchByProfession("");
    setSearchByVerification("");
    setSearchByExperience([]);
    setSearchByPriceFrom("");
    setSearchByPriceUpTo("");
  };

  useEffect(() => {
    if (searchByCity !== "თბილისი") {
      setSearchByDistrict("");
    }
  }, [searchByCity]);

  return (
    <div className={styles.parentContainer}>
     
        <div className={styles.searchContainer}>
          <div className={styles.selectContainer}>
            <select
              name="selectedCity"
              id="selectCity"
              className={styles.select}
              value={searchByCity}
              onChange={(e) => setSearchByCity(e.target.value)}
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
              id="selectDistrict"
              className={styles.select}
              value={searchByDistrict}
              onChange={(e) => setSearchByDistrict(e.target.value)}
              disabled={searchByCity !== "თბილისი"}
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
              id="selectProfession"
              className={styles.select}
              value={searchByProfession}
              onChange={(e) => setSearchByProfession(e.target.value)}
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

          <div className={styles.selectContainer}>
            <select
              name="selectedVerificationStatus"
              id="selectStatus"
              className={styles.select}
              value={searchByVerification}
              onChange={(e) => {
                setSearchByVerification(e.target.value);
              }}
            >
              <option value="">ვერიფიცირებული</option>
              <option value="true">კი</option>
              <option value="false">არა</option>
            </select>
          </div>

          <div className={styles.selectContainer}>
            <select
              name="selectedExperience"
              id="selectExperience"
              className={styles.select}
              value={searchByExperience.join(",")}
              onChange={handleExperienceChange}
            >
              <option value="">გამოცდილება</option>
              <option value="1,2">1-2წ</option>
              <option value="3,4,5">2-5წ</option>
              <option value="6,7,8,9,10">5-10წ</option>
              <option value="11, 50">10წ+</option>
            </select>
          </div>

          <div className={styles.inputContainer}>
            <label htmlFor="priceFrom" className={styles.label}>
              1 წერტილის - კვ.მ ღირებულება
            </label>
            <span
              className={
                moveRangeTextFrom
                  ? styles.moveRangeTextFrom
                  : styles.rangeTextFrom
              }
            >
              დან
            </span>
            <input
              type="number"
              id="priceFrom"
              onFocus={() => setMoveRangeTextFrom(true)}
              className={styles.input}
              value={searchByPriceFrom}
              onChange={handlePriceChange(setSearchByPriceFrom)}
              onKeyDown={preventInvalidInput}
            />
            <span
              className={
                moveRangeTextUpTo
                  ? styles.moveRangeTextUpTo
                  : styles.rangeTextUpTo
              }
            >
              მდე
            </span>
            <input
              type="number"
              id="priceUpTo"
              onFocus={() => setMoveRangeTextUpTo(true)}
              className={`${styles.input} ${
                priceInputError ? styles.inputError : ""
              }`}
              value={searchByPriceUpTo}
              onChange={handlePriceChange(setSearchByPriceUpTo)}
              onKeyDown={preventInvalidInput}
            />
          </div>
        </div>
        <div className={styles.buttonContainer}>
          <button className={styles.buttonContainer__btn} onClick={handleClear}>
            გასუფთავება
          </button>
        </div>
      </div>
  );
}

export default DetailedSearch;

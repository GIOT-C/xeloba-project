import styles from "../Styles/Categories.module.scss";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CategoriesData from "../Datas/CategoriesData.json";

interface DataTypes {
  id: number;
  title: string;
  clicks: number;
}

function Categories() {
  const navigate = useNavigate();
  const [categories, setCategories] = useState<DataTypes[]>(() =>
    CategoriesData.map((category) => ({ ...category, clicks: 0 }))
  );

  const handleCategoryClick = (id: number) => {
    const category = categories.find((category) => category.id === id);
    if (category) {
      setCategories((prevCategories) =>
        prevCategories.map((category) =>
          category.id === id
            ? { ...category, clicks: category.clicks + 1 }
            : category
        )
      );
      navigate(`/category/${category.title}`);
    }
  };

  useEffect(() => {
    const interval = setInterval(() => {
      const sortedCategories = [...categories].sort(
        (a, b) => b.clicks - a.clicks
      );
      setCategories(sortedCategories);
    }, 3000);

    return () => clearInterval(interval);
  }, [categories]);

  return (
    <div>
      <div className={styles.categories}>
        {categories.map((category) => (
          <div
            className={styles.categories__card}
            key={category.id}
            onClick={() => handleCategoryClick(category.id)}
          >
            <p>{category.title}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Categories;

import styles from "../Styles/CraftsmanPersonalPage.module.scss";
import GetData from "../Datas/GetData";
import { CraftsmanDataInterface } from "../Interfaces/CraftsmanDataInterface";
import { useParams } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCamera,
  faCircleXmark,
  faCircleCheck,
  faPen,
  faEye,
  faEyeSlash,
} from "@fortawesome/free-solid-svg-icons";

type FormData = {
    setDate: string,
    userId: string;
    verificationStatus: string;
    name: string;
    lastName: string;
    personalIdNumber: string;
    phoneNumber: string;
    email: string;
    password: string;
    city: string;
    district: string;
    profession: string;
    experience: string;
    price: string;
    minCallFee: string;
    moreInformation: string;
    profileImgs: FileList;
};

const emailValidationRegex =
  /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

function CraftsmanPersonalPage() {
  const getData = GetData();
  const { userId } = useParams<{ userId: string }>();
  const [userData, setUserData] = useState<CraftsmanDataInterface| null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);
  const [editData, setEditData] = useState<string>("");
  const [seePassword, setSeePassword] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<FormData>();
  const user = getData.find((craftsman) => craftsman.userID === userId);

  useEffect(() => {
    if (user) {
      setUserData(user);

      for (const [key, value] of Object.entries(user)) {
        setValue(key as keyof FormData, value as any);
      }
      setPreviewImage(user.profileImgs);
    }
  }, [userId, setValue]);

  const validateImage = (files: FileList | null) => {
    if (!files || files.length === 0) return true; // No file selected, validation passes
    const file = files[0];
    const allowedExtensions = ["image/jpeg", "image/png", "image/jpg"];
    if (!allowedExtensions.includes(file.type) && !file) {
      return "დასაშვებია მხოლოდ JPEG და PNG ფორმატები";
    }
    if (file.size > 5 * 1024 * 1024) {
      // 5MB size limit
      return "სურათი არ უნდა აღემატებოდეს 5MB-ს";
    }
    return true;
  };

  const handleUploadImage = () => {
    fileInputRef.current?.click();
  };

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
      setValue("profileImgs", event.target.files as FileList); // Update the form value
    }
  };

  const handleEditData = (edit: string) => {
    setEditData(edit);
  };

  const handleSeePassword = () => setSeePassword(!seePassword);

  const onSubmit: SubmitHandler<FormData> = (data) => {
    const formData = new FormData();

    for (const key in data) {
      if (key !== "profilePicture") {
        formData.append(key, (data as any)[key]);
      }
    }

    if (data.profileImgs && data.profileImgs.length > 0) {
      formData.append("profilePicture", data.profileImgs[0]);
    }

    // Logic to send formData to the backend
    console.log("Saved data: ", data);
  };

  // if (!userData) {
  //   return <div>Loading...</div>;
  // }
  const serverBaseUrl = "https://xeloba.ge/";
  return (
    <div className={styles.parentContainer}>
      <div className={styles.mainContainer}>
        <h2 className={styles.header}>ჩემი პირადი სივრცე</h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.personalSpace}>
            <div className={styles.imgContainer}>
              <img
                // src={previewImage || user?.profileImgs}
                src={`${serverBaseUrl}${previewImage || user?.profileImgs}`}
                alt="userImg"
                className={styles.imgContainer__userImg}
              />
              <div
                className={styles.imgContainer__changeImg}
                onClick={handleUploadImage}
              >
                <FontAwesomeIcon icon={faCamera} className={styles.faCamera} />
                <input
                  type="file"
                  id="profilePicture"
                  accept=".jpg,.jpeg,.png"
                  className={styles.imgInput}
                  {...register("profileImgs", {
                    validate: validateImage,
                    onChange: handleImageChange,
                  })}
                  ref={fileInputRef}
                />
              </div>
              {errors.profileImgs && (
                <p className={styles.imgContainer__errorMessage}>
                  {errors.profileImgs.message}
                </p>
              )}
            </div>

            <div className={styles.personalInfo}>
              <div className={styles.userInfo}>
                <div className={styles.userInfo__keyBox}>
                  <p>ვერიფიკაციის სტატუსი</p>
                </div>

                <div className={styles.userInfo__valueBox}>
                  <FontAwesomeIcon
                    icon={
                      user?.status === "true"
                        ? faCircleCheck
                        : faCircleXmark
                    }
                    className={
                      user?.status === "true"
                        ? styles.faCircleCheck
                        : styles.faCircleXmark
                    }
                  />
                  <span>
                    {user?.status === "true"
                      ? "ვერიფიცირებული"
                      : "არავერიფიცირებული"}
                  </span>
                </div>
              </div>

              <div className={styles.userInfo}>
                <div className={styles.userInfo__keyBox}>
                  <p>რეგისტრაციის თარიღი</p>
                </div>

                <div className={styles.userInfo__valueBox}>
                  <input
                    {...register("setDate")}
                    readOnly
                    className={styles.userInfo__valueBox__readOnlyInput}
                  />
                </div>
              </div>

              <div className={styles.userInfo}>
                <div className={styles.userInfo__keyBox}>
                  <p>სახელი</p>
                </div>

                <div className={styles.userInfo__valueBox}>
                  <input
                    {...register("name")}
                    readOnly
                    className={styles.userInfo__valueBox__readOnlyInput}
                  />
                </div>
              </div>

              <div className={styles.userInfo}>
                <div className={styles.userInfo__keyBox}>
                  <p>გვარი</p>
                </div>

                <div className={styles.userInfo__valueBox}>
                  <input
                    {...register("lastName")}
                    readOnly
                    className={styles.userInfo__valueBox__readOnlyInput}
                  />
                </div>
              </div>

              <div className={styles.userInfo}>
                <div className={styles.userInfo__keyBox}>
                  <p>პირადი ნომერი</p>
                </div>

                <div className={styles.userInfo__valueBox}>
                  <input
                    {...register("personalIdNumber")}
                    readOnly
                    className={styles.userInfo__valueBox__readOnlyInput}
                  />
                </div>
              </div>

              <div className={styles.userInfo}>
                <div className={styles.userInfo__keyBox}>
                  <p>ტელეფონის ნომერი</p>
                </div>

                <div className={styles.userInfo__valueBox}>
                  <input
                    className={
                      editData === "phoneNumber"
                        ? styles.userInfo__valueBox__editInput
                        : styles.userInfo__valueBox__readOnlyInput
                    }
                    type="number"
                    readOnly={editData !== "phoneNumber"}
                    {...register("phoneNumber", {
                      required: "აუცილებელი ველი",
                      minLength: { value: 9, message: "ფორმატი არავალიდურია" },
                      maxLength: { value: 9, message: "ფორმატი არავალიდურია" },
                    })}
                    onKeyDown={(e) => {
                      if (
                        e.key === "-" ||
                        e.key === "E" ||
                        e.key === "e" ||
                        e.key === "."
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />

                  <FontAwesomeIcon
                    icon={faPen}
                    onClick={() => {
                      handleEditData("phoneNumber");
                    }}
                    className={styles.faPen}
                  />
                  {errors.phoneNumber && (
                    <p className={styles.userInfo__valueBox__errorMessage}>
                      {errors.phoneNumber.message}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.userInfo}>
                <div className={styles.userInfo__keyBox}>
                  <p>ელ-ფოსტა</p>
                </div>

                <div className={styles.userInfo__valueBox}>
                  <input
                    className={
                      editData === "email"
                        ? styles.userInfo__valueBox__editInput
                        : styles.userInfo__valueBox__readOnlyInput
                    }
                    type="email"
                    readOnly={editData !== "email"}
                    {...register("email", {
                      required: "აუცილებელი ველი",
                      pattern: {
                        value: emailValidationRegex,
                        message: "ფორმატი არავალიდურია",
                      },
                    })}
                  />

                  <FontAwesomeIcon
                    icon={faPen}
                    onClick={() => {
                      handleEditData("email");
                    }}
                    className={styles.faPen}
                  />
                  {errors.email && (
                    <p className={styles.userInfo__valueBox__errorMessage}>
                      {errors.email.message}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.userInfo}>
                <div className={styles.userInfo__keyBox}>
                  <p>პაროლი</p>
                </div>

                <div className={styles.userInfo__valueBox}>
                  <div className={styles.userInfo__valueBox__relative}>
                    <input
                      className={
                        editData === "password"
                          ? styles.userInfo__valueBox__editInput
                          : styles.userInfo__valueBox__readOnlyInput
                      }
                      type={seePassword ? "text" : "password"}
                      readOnly={editData !== "password"}
                      {...register("password", {
                        required: "აუცილებელი ველი",
                        minLength: { value: 8, message: "მინიმუმ 8 სიმბოლო" },
                        pattern: {
                          value: /[A-Za-z].*/,
                          message: "საჭიროა ლათინური ასოები",
                        },
                      })}
                    />
                    <FontAwesomeIcon
                      onClick={handleSeePassword}
                      icon={seePassword ? faEye : faEyeSlash}
                      className={
                        editData === "password"
                          ? styles.faEyeSlash
                          : styles.faEye
                      }
                    />

                    <FontAwesomeIcon
                      icon={faPen}
                      onClick={() => {
                        handleEditData("password");
                      }}
                      className={styles.faPen}
                    />
                  </div>

                  {errors.password && (
                    <p className={styles.userInfo__valueBox__errorMessage}>
                      {errors.password.message}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.userInfo}>
                <div className={styles.userInfo__keyBox}>
                  <p>ქალაქი</p>
                </div>

                <div className={styles.userInfo__valueBox}>
                  <input
                    {...register("city")}
                    readOnly
                    className={styles.userInfo__valueBox__readOnlyInput}
                  />
                </div>
              </div>

              <div className={styles.userInfo}>
                <div className={styles.userInfo__keyBox}>
                  <p>რაიონი</p>
                </div>

                <div className={styles.userInfo__valueBox}>
                  {editData === "district" ? (
                    <select
                      id="district"
                      className={styles.userInfo__valueBox__editInput}
                      {...register("district")}
                    >
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
                  ) : (
                    <input
                      {...register("district")}
                      readOnly
                      className={styles.userInfo__valueBox__readOnlyInput}
                    />
                  )}

                  <FontAwesomeIcon
                    icon={faPen}
                    onClick={() => {
                      handleEditData("district");
                    }}
                    className={styles.faPen}
                  />
                </div>
              </div>

              <div className={styles.userInfo}>
                <div className={styles.userInfo__keyBox}>
                  <p>პროფსია</p>
                </div>

                <div className={styles.userInfo__valueBox}>
                  {editData === "profession" ? (
                    <select
                      id="profession"
                      className={styles.userInfo__valueBox__editInput}
                      {...register("profession")}
                    >
                      <option value="მალიარი">მალიარი</option>
                      <option value="კაფელ-მეტლახის ხელოსანი">
                        კაფელ-მეტლახის ხელოსანი
                      </option>
                      <option value="ელექტრიკოსი">ელექტრიკოსი</option>
                      <option value="სანტექნიკი">სანტექნიკი</option>
                      <option value="თაბაშირ-მუყაოს ხელოსანი">
                        თაბაშირ-მუყაოს ხელოსანი
                      </option>
                      <option value="გათბობა-გაგრილების სისტემის ხელოსანი">
                        გათბობა-გაგრილების სისტემა
                      </option>
                      <option value="მეტალო პლასტმასის კარ-ფანჯარა">
                        მეტალო პლასტმასის კარ-ფანჯარა
                      </option>
                      <option value="სახლის დალაგება">სახლის დალაგება</option>
                      <option value="იატაკის სამუშაოები">
                        იატაკის სამუშაოები
                      </option>
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
                      <option value="ხის კარის ხელოსანი">
                        ხის კარის ხელოსანი
                      </option>
                    </select>
                  ) : (
                    <input
                      {...register("profession")}
                      readOnly
                      className={styles.userInfo__valueBox__readOnlyInput}
                    />
                  )}

                  <FontAwesomeIcon
                    icon={faPen}
                    onClick={() => {
                      handleEditData("profession");
                    }}
                    className={styles.faPen}
                  />
                </div>
              </div>

              <div className={styles.userInfo}>
                <div className={styles.userInfo__keyBox}>
                  <p>გამოცდილება (წელი)</p>
                </div>

                <div className={styles.userInfo__valueBox}>
                  <input
                    className={
                      editData === "experience"
                        ? styles.userInfo__valueBox__editInput
                        : styles.userInfo__valueBox__readOnlyInput
                    }
                    type="number"
                    readOnly={editData !== "experience"}
                    {...register("experience", {
                      required: "აუცილებელი ველი",
                      min: {
                        value: 1,
                        message: "მინიმუმ 1 წელი",
                      },
                      max: {
                        value: 50,
                        message: "მაქსიმუმ 50 წელი",
                      },
                      pattern: {
                        value: /^[1-9]\d*$/,
                        message: "ფორმატი არავალიდურია",
                      },
                    })}
                    onKeyDown={(e) => {
                      if (
                        e.key === "-" ||
                        e.key === "E" ||
                        e.key === "e" ||
                        e.key === "."
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />

                  <FontAwesomeIcon
                    icon={faPen}
                    onClick={() => {
                      handleEditData("experience");
                    }}
                    className={styles.faPen}
                  />
                  {errors.experience && (
                    <p className={styles.userInfo__valueBox__errorMessage}>
                      {errors.experience.message}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.userInfo}>
                <div className={styles.userInfo__keyBox}>
                  <p>ერთი წერტილის - კვ.მ ღირებულება(ლ)</p>
                </div>

                <div className={styles.userInfo__valueBox}>
                  <input
                    className={
                      editData === "price"
                        ? styles.userInfo__valueBox__editInput
                        : styles.userInfo__valueBox__readOnlyInput
                    }
                    type="number"
                    readOnly={editData !== "price"}
                    {...register("price", {
                      required: "აუცილებელი ველი",
                      pattern: {
                        value: /^[1-9]\d*$/,
                        message: "ფორმატი არავალიდურია",
                      },
                    })}
                    onKeyDown={(e) => {
                      if (
                        e.key === "-" ||
                        e.key === "E" ||
                        e.key === "e" ||
                        e.key === "."
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />

                  <FontAwesomeIcon
                    icon={faPen}
                    onClick={() => {
                      handleEditData("price");
                    }}
                    className={styles.faPen}
                  />
                  {errors.price && (
                    <p className={styles.userInfo__valueBox__errorMessage}>
                      {errors.price.message}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.userInfo}>
                <div className={styles.userInfo__keyBox}>
                  <p>მინიმალური გამოძახების საფასური</p>
                </div>

                <div className={styles.userInfo__valueBox}>
                  <input
                    className={
                      editData === "minCallFee"
                        ? styles.userInfo__valueBox__editInput
                        : styles.userInfo__valueBox__readOnlyInput
                    }
                    type="number"
                    readOnly={editData !== "minCallFee"}
                    {...register("minCallFee", {
                      required: "აუცილებელი ველი",
                      pattern: {
                        value: /^[1-9]\d*$/,
                        message: "ფორმატი არავალიდურია",
                      },
                    })}
                    onKeyDown={(e) => {
                      if (
                        e.key === "-" ||
                        e.key === "E" ||
                        e.key === "e" ||
                        e.key === "."
                      ) {
                        e.preventDefault();
                      }
                    }}
                  />

                  <FontAwesomeIcon
                    icon={faPen}
                    onClick={() => {
                      handleEditData("minCallFee");
                    }}
                    className={styles.faPen}
                  />
                  {errors.minCallFee && (
                    <p className={styles.userInfo__valueBox__errorMessage}>
                      {errors.minCallFee.message}
                    </p>
                  )}
                </div>
              </div>

              <div className={styles.userInfo}>
                <div className={styles.userInfo__keyBox}>
                  <p>დამატებითი ინფორმაცია</p>
                </div>

                <div className={styles.userInfo__valueBox}>
                  {editData === "moreInformation" ? (
                    <div>
                      <textarea
                        id=""
                        rows={4}
                        {...register("moreInformation", {
                          maxLength: {
                            value: 300,
                            message: "მაქსიმუმ 300 სიმბოლო",
                          },
                        })}
                        className={styles.userInfo__valueBox__editTextarea}
                      ></textarea>
                      {errors.moreInformation && (
                        <p className={styles.userInfo__valueBox__errorMessage}>
                          {errors.moreInformation.message}
                        </p>
                      )}
                    </div>
                  ) : (
                    <div
                      className={styles.userInfo__valueBox__moreInfoContainer}
                    >
                      <p className={styles.userInfo__valueBox__moreInfoText}>
                        {user?.moreInfo === ""
                          ? "ველი ცარიელია"
                          : user?.moreInfo}
                      </p>
                      <FontAwesomeIcon
                        icon={faPen}
                        onClick={() => {
                          handleEditData("moreInformation");
                        }}
                        className={styles.faPen}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          <div className={styles.buttonContainer}>
            <button
              type="submit"
              className={styles.buttonContainer__saveButton}
            >
              შენახვა
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CraftsmanPersonalPage;





















// import styles from "../Styles/CraftsmanPersonalPage.module.scss";
// import GetData from "../Datas/GetData";
// import { CraftsmanDataInterface } from "../Interfaces/CraftsmanDataInterface";
// import { useParams } from "react-router-dom";
// import { useState, useEffect, useRef } from "react";
// import { useForm, SubmitHandler } from "react-hook-form";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import {
//   faCamera,
//   faCircleXmark,
//   faCircleCheck,
//   faPen,
//   faEye,
//   faEyeSlash,
// } from "@fortawesome/free-solid-svg-icons";

// type FormData = {
//     setDate: string,
//     userId: string;
//     verificationStatus: string;
//     firstName: string;
//     lastName: string;
//     personalIdNumber: string;
//     phoneNumber: string;
//     email: string;
//     password: string;
//     city: string;
//     district: string;
//     profession: string;
//     experience: string;
//     price: string;
//     minCallFee: string;
//     moreInformation: string;
//     profilePicture: FileList;
// };

// const emailValidationRegex =
//   /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

// function CraftsmanPersonalPage() {
//   const getData = GetData();
//   const { userId } = useParams<{ userId: string }>();
//   const [userData, setUserData] = useState<CraftsmanDataInterface| null>(null);
//   const [previewImage, setPreviewImage] = useState<string | null>(null);
//   const [editData, setEditData] = useState<string>("");
//   const [seePassword, setSeePassword] = useState<boolean>(false);
//   const fileInputRef = useRef<HTMLInputElement | null>(null);

//   const {
//     register,
//     handleSubmit,
//     setValue,
//     formState: { errors },
//   } = useForm<FormData>();
//   const user = getData.find((craftsman) => craftsman.userID === userId);

//   useEffect(() => {
//     if (user) {
//       setUserData(user);

//       for (const [key, value] of Object.entries(user)) {
//         setValue(key as keyof FormData, value as any);
//       }
//       setPreviewImage(user.profileImgs);
//     }
//   }, [userId, setValue]);

//   const validateImage = (files: FileList | null) => {
//     if (!files || files.length === 0) return true; // No file selected, validation passes
//     const file = files[0];
//     const allowedExtensions = ["image/jpeg", "image/png", "image/jpg"];
//     if (!allowedExtensions.includes(file.type) && !file) {
//       return "დასაშვებია მხოლოდ JPEG და PNG ფორმატები";
//     }
//     if (file.size > 5 * 1024 * 1024) {
//       // 5MB size limit
//       return "სურათი არ უნდა აღემატებოდეს 5MB-ს";
//     }
//     return true;
//   };

//   const handleUploadImage = () => {
//     fileInputRef.current?.click();
//   };

//   const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
//     const file = event.target.files?.[0];
//     if (file) {
//       const reader = new FileReader();
//       reader.onloadend = () => {
//         setPreviewImage(reader.result as string);
//       };
//       reader.readAsDataURL(file);
//       setValue("profilePicture", event.target.files as FileList); // Update the form value
//     }
//   };

//   const handleEditData = (edit: string) => {
//     setEditData(edit);
//   };

//   const handleSeePassword = () => setSeePassword(!seePassword);

//   const onSubmit: SubmitHandler<FormData> = (data) => {
//     const formData = new FormData();

//     for (const key in data) {
//       if (key !== "profilePicture") {
//         formData.append(key, (data as any)[key]);
//       }
//     }

//     if (data.profilePicture && data.profilePicture.length > 0) {
//       formData.append("profilePicture", data.profilePicture[0]);
//     }

//     // Logic to send formData to the backend
//     console.log("Saved data: ", data);
//   };

//   // if (!userData) {
//   //   return <div>Loading...</div>;
//   // }
//   console.log(getData)

//   return (
//     <div className={styles.parentContainer}>
//       <div className={styles.mainContainer}>
//         <h2 className={styles.header}>ჩემი პირადი სივრცე</h2>
//         <form onSubmit={handleSubmit(onSubmit)}>
//           <div className={styles.personalSpace}>
      

//             <div className={styles.personalInfo}>
//               <div className={styles.userInfo}>
//                 <div className={styles.userInfo__keyBox}>
//                   <p>ვერიფიკაციის სტატუსი</p>
//                 </div>

//                 <div className={styles.userInfo__valueBox}>
//                   <FontAwesomeIcon
//                     icon={
//                       user?.status === "true"
//                         ? faCircleCheck
//                         : faCircleXmark
//                     }
//                     className={
//                       user?.status === "true"
//                         ? styles.faCircleCheck
//                         : styles.faCircleXmark
//                     }
//                   />
//                   <span>
//                     {user?.status === "true"
//                       ? "ვერიფიცირებული"
//                       : "არავერიფიცირებული"}
//                   </span>
//                 </div>
//               </div>

//               <div className={styles.userInfo}>
//                 <div className={styles.userInfo__keyBox}>
//                   <p>რეგისტრაციის თარიღი</p>
//                 </div>

//                 <div className={styles.userInfo__valueBox}>
//                   <input
//                     {...register("setDate")}
//                     readOnly
//                     className={styles.userInfo__valueBox__readOnlyInput}
//                   />
//                 </div>
//               </div>

//               <div className={styles.userInfo}>
//                 <div className={styles.userInfo__keyBox}>
//                   <p>სახელი</p>
//                 </div>

//                 <div className={styles.userInfo__valueBox}>
//                   <input
//                     {...register("firstName")}
//                     readOnly
//                     className={styles.userInfo__valueBox__readOnlyInput}
//                   />
//                 </div>
//               </div>

//               <div className={styles.userInfo}>
//                 <div className={styles.userInfo__keyBox}>
//                   <p>გვარი</p>
//                 </div>

//                 <div className={styles.userInfo__valueBox}>
//                   <input
//                     {...register("lastName")}
//                     readOnly
//                     className={styles.userInfo__valueBox__readOnlyInput}
//                   />
//                 </div>
//               </div>


//               <div className={styles.userInfo}>
//                 <div className={styles.userInfo__keyBox}>
//                   <p>პაროლი</p>
//                 </div>

//                 <div className={styles.userInfo__valueBox}>
//                   <div className={styles.userInfo__valueBox__relative}>
//                     <input
//                       className={
//                         editData === "password"
//                           ? styles.userInfo__valueBox__editInput
//                           : styles.userInfo__valueBox__readOnlyInput
//                       }
//                       type={seePassword ? "text" : "password"}
//                       readOnly={editData !== "password"}
//                       {...register("password", {
//                         required: "აუცილებელი ველი",
//                         minLength: { value: 8, message: "მინიმუმ 8 სიმბოლო" },
//                         pattern: {
//                           value: /[A-Za-z].*/,
//                           message: "საჭიროა ლათინური ასოები",
//                         },
//                       })}
//                     />
//                     <FontAwesomeIcon
//                       onClick={handleSeePassword}
//                       icon={seePassword ? faEye : faEyeSlash}
//                       className={
//                         editData === "password"
//                           ? styles.faEyeSlash
//                           : styles.faEye
//                       }
//                     />

//                     <FontAwesomeIcon
//                       icon={faPen}
//                       onClick={() => {
//                         handleEditData("password");
//                       }}
//                       className={styles.faPen}
//                     />
//                   </div>

//                   {errors.password && (
//                     <p className={styles.userInfo__valueBox__errorMessage}>
//                       {errors.password.message}
//                     </p>
//                   )}
//                 </div>
//               </div>

  
//             </div>
//           </div>

//           <div className={styles.buttonContainer}>
//             <button
//               type="submit"
//               className={styles.buttonContainer__saveButton}
//             >
//               შენახვა
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// }

// export default CraftsmanPersonalPage;
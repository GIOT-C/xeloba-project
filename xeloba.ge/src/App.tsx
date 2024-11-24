import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import { Suspense, lazy, createContext, useState } from 'react';
import Root from "./Components/Root";
import { MainContextInteface } from "./Components/Interfaces/MainContextInterface";
import LoadingBar from "./Components/LoadingBar";

const HomePage = lazy(() => import('./Components/Pages/HomePage'));
const CalculatorPage = lazy(()=> import('./Components/Pages/CalculatorPage'))
const MyPage = lazy(()=> import('./Components/Pages/MyPage'));
const SearchPage = lazy(() => import('./Components/Pages/SearchPage'));
const RegistrationPage = lazy(() => import('./Components/Pages/RegistrationPage'));
const CategoryPage = lazy(()=> import('./Components/Categories/CategoryPage'));
const CraftsmanProfile = lazy(()=> import('./Components/UserCards/CraftsmanProfile'))
const FilteredCraftsmen = lazy(()=> import('./Components/Finding/FilteredCraftsmen'));
const CraftsmanRegistration = lazy(()=> import('./Components/Registration/CraftsmanRegistration'));
const ClientRegistration = lazy(()=> import('./Components/Registration/ClientRegistration'));
const CraftsmanAuthorization = lazy(()=> import('./Components/Authorization/CraftsmanAuthorization'));
const ClientAuthorization = lazy(()=> import('./Components/Authorization/ClientAuthorization'));
const CraftsmanPersonalPage = lazy(()=> import('./Components/PersonalPages/CraftsmanPersonalPage'));

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<Root />}>
      <Route index element={<HomePage />} />
      <Route path="Calculator" element={<CalculatorPage/>}/>
      <Route path="authorization" element={<MyPage />} />
      <Route path="search" element={<SearchPage />} />
      <Route path="registration" element={<RegistrationPage />} />
      <Route path="Category/:title" element={<CategoryPage/>}/>
      <Route path="Craftsman/:userID" element={<CraftsmanProfile/>}/>
      <Route path="filter" element={<FilteredCraftsmen/>}/>
      <Route path="registration/craftsman-registration" element={<CraftsmanRegistration/>}/>
      <Route path="registration/client-registration" element={<ClientRegistration/>}/>
      <Route path="authorization/craftsman-authorization" element={<CraftsmanAuthorization/>}/>
      <Route path="authorization/client-authorization" element={<ClientAuthorization/>}/>
      <Route path="personal-page/:userId" element={<CraftsmanPersonalPage/>}/>
    </Route>
  )
);

export const MainContext = createContext<MainContextInteface>({
  menuBar: false,
  setMenuBar: () => {},
  selectedNavigation: "home",
  setSelectedNavigation: () => {},
  filterByCity: "",
  setFilterByCity: () => {},
  filterByDistrict: "",
  setFilterByDistrict: () => {},
  filterByProfession: "",
  setFilterByProfession: () => {},
  searchByCity: "",
  setSearchByCity: () => {},
  searchByDistrict: "",
  setSearchByDistrict: () => {},
  searchByProfession: "",
  setSearchByProfession: () => {},
  searchByVerification: "",
  setSearchByVerification: () => {},
  searchByExperience: [],
  setSearchByExperience: () => {},
  searchByPriceFrom: "",
  setSearchByPriceFrom: () => {},
  searchByPriceUpTo: "",
  setSearchByPriceUpTo: () => {},
});

function App() {
  const [menuBar, setMenuBar] = useState<boolean>(false);
  const [selectedNavigation, setSelectedNavigation] = useState<string>("home");
  const [filterByCity, setFilterByCity] = useState<string>("");
  const [filterByDistrict, setFilterByDistrict] = useState<string>("");
  const [filterByProfession, setFilterByProfession] = useState<string>("");
  const [searchByCity, setSearchByCity] = useState<string>("");
  const [searchByDistrict, setSearchByDistrict] = useState<string>("");
  const [searchByProfession, setSearchByProfession] = useState<string>("");
  const [searchByVerification, setSearchByVerification] = useState<string>("");
  const [searchByExperience, setSearchByExperience] = useState<string[]>([]);
  const [searchByPriceFrom, setSearchByPriceFrom] = useState<string>("");
  const [searchByPriceUpTo, setSearchByPriceUpTo] = useState<string>("");
  return (
    <div className="App">
       <Suspense fallback={<LoadingBar />}>
        <MainContext.Provider
          value={{
            menuBar,
            setMenuBar,
            selectedNavigation,
            setSelectedNavigation,
            filterByCity,
            setFilterByCity,
            filterByDistrict,
            setFilterByDistrict,
            filterByProfession,
            setFilterByProfession,
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
            setSearchByPriceUpTo
          }}
        >
          <RouterProvider router={router} />
        </MainContext.Provider>
      </Suspense>
    </div>
  );
}

export default App;

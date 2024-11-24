export interface MainContextInteface{
    menuBar: boolean;
    setMenuBar: React.Dispatch<React.SetStateAction<boolean>>;
    selectedNavigation: string;
    setSelectedNavigation: React.Dispatch<React.SetStateAction<string>>;
    filterByCity: string;
    setFilterByCity: React.Dispatch<React.SetStateAction<string>>;
    filterByDistrict: string;
    setFilterByDistrict: React.Dispatch<React.SetStateAction<string>>;
    filterByProfession: string;
    setFilterByProfession: React.Dispatch<React.SetStateAction<string>>;
    searchByCity: string;
    setSearchByCity: React.Dispatch<React.SetStateAction<string>>;
    searchByDistrict: string;
    setSearchByDistrict: React.Dispatch<React.SetStateAction<string>>;
    searchByProfession: string;
    setSearchByProfession: React.Dispatch<React.SetStateAction<string>>;
    searchByVerification: string;
    setSearchByVerification: React.Dispatch<React.SetStateAction<string>>;
    searchByExperience: string[];
    setSearchByExperience:   React.Dispatch<React.SetStateAction<string[]>>;
    searchByPriceFrom: string;
    setSearchByPriceFrom:  React.Dispatch<React.SetStateAction<string>>;
    searchByPriceUpTo: string;
    setSearchByPriceUpTo:  React.Dispatch<React.SetStateAction<string>>;

}
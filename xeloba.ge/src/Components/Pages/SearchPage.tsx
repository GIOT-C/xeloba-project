import DetailedSearch from "../Finding/DetailedSearch"
import SearchResults from "../Finding/SearchResults"

function SearchPage(){
    return(
        <>
        <div>
            <DetailedSearch/>
            <SearchResults/>
        </div>
        </>
    )
}

export default SearchPage
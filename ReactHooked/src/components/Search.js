import React, { useState } from 'react';

const Search = (props) => {
    const [SearchValue, setSearchValue] = useState("");
    const handleSearchInputChanges = (e) => {
        setSearchValue(e.target.value);
    }
    const resetInputField = () => {
        setSearchValue("")
    }
    const callSearchFunction = (e) => {
        e.preventDefault();
        props.search(SearchValue);
        resetInputField();
    }

    return (
        <form className="search">
            <input
                value={SearchValue}
                onChange={handleSearchInputChanges}
                type="text"
            >
            </input>
            <input onClick={callSearchFunction} type="submit" value="搜索"></input>
        </form>
    )
};
export default Search;
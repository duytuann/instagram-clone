import React from 'react';

import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SearchBarContainer, SearchBar, Input } from './styles';

const Search: React.FC = () => {
    const handleInputChange = () => {};

    return (
        <SearchBarContainer>
            <SearchBar>
                <FontAwesomeIcon icon={faMagnifyingGlass} style={{ color: 'rgb(142,142,142)' }} />
                <Input onChange={handleInputChange} type="text" placeholder="Search" />
            </SearchBar>
        </SearchBarContainer>
    );
};

export default Search;

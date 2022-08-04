import styled from 'styled-components';

export const SearchBarContainer = styled.div`
    margin-left: 50px;
    display: none;
    height: 36px;
    width: 268px;
    position: relative;

    @media (min-width: 768px) {
        display: block;
    }
`;

export const SearchBar = styled.div`
    display: flex;
    padding: 3px 16px;
    align-items: center;
    height: 100%;
    border-radius: 8px;
    background-color: rgb(239, 239, 239);
`;

export const Input = styled.input`
    font-size: 16px;
    font-weight: 500;
    padding: 3px 16px;
    width: 100%;
    height: 100%;
    background-color: rgb(239, 239, 239);
    border: none;
    outline: none;
`;

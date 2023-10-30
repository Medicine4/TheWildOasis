import { useState } from "react";
import { useSearchParams } from "react-router-dom";
import styled, { css } from "styled-components";

const StyledSearch = styled.div`
  border: 1px solid var(--color-grey-100);
  background-color: var(--color-grey-0);
  box-shadow: var(--shadow-sm);
  border-radius: var(--border-radius-sm);
  padding: 0.4rem;
  display: flex;
  gap: 1rem;
`;

const StyledButton = styled.button`
  background-color: var(--color-grey-0);
  border: none;

  border-radius: var(--border-radius-sm);
  font-weight: 500;
  font-size: 1.4rem;

  padding: 0.44rem 0.8rem;

  background-color: var(--color-grey-200);
  color: var(--color-grey-700);

  ${(props) =>
    props.type === "search" &&
    css`
      background-color: var(--color-brand-600);
      color: var(--color-brand-50);
    `}
`;

const SearchInput = styled.input`
  height: auto;
  border-radius: var(--border-radius-sm);
  box-shadow: var(--shadow-sm);
  border: 1px solid var(--color-grey-300);
  background-color: var(--color-grey-100);
`;

function Search() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [searchFullName, setSearchFullName] = useState("");
  const [searchTel, setSearchTel] = useState("");

  function handleClick() {
    if (searchFullName) {
      searchParams.set("fullName", searchFullName);
      if (searchParams.get("page")) searchParams.set("page", 1);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("fullName");
      setSearchParams(searchParams);
    }

    if (searchTel) {
      searchParams.set("tel", searchTel);
      if (searchParams.get("page")) searchParams.set("page", 1);
      setSearchParams(searchParams);
    } else {
      searchParams.delete("tel");
      setSearchParams(searchParams);
    }
  }

  function handleReset() {
    setSearchFullName("");
    setSearchTel("");
    searchParams.delete("fullName");
    searchParams.delete("tel");
    setSearchParams(searchParams);
  }

  return (
    <StyledSearch>
      <SearchInput
        type="text"
        name="fullName"
        placeholder="按照姓名搜索..."
        id="fullNameInput"
        value={searchFullName}
        onChange={(e) => setSearchFullName(e.target.value)}
      />
      <SearchInput
        type="text"
        name="tel"
        placeholder="按照电话搜索..."
        id="telInput"
        value={searchTel}
        onChange={(e) => setSearchTel(e.target.value)}
      />
      <StyledButton type="reset" onClick={handleReset}>
        重置
      </StyledButton>
      <StyledButton type="search" onClick={handleClick}>
        搜索
      </StyledButton>
    </StyledSearch>
  );
}

export default Search;

import styled from "styled-components";

const StyledHeader = styled.header`
  background-color: var(--color-grey-0);
  border-bottom: 1px solid var(--color-grey-100);
  padding: 30px 40px;
`;

function Header() {
  return <StyledHeader>HEADER</StyledHeader>;
}

export default Header;

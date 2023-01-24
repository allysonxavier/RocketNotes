import styled from "styled-components";
export const Container = styled.div`
  display: grid;
  width: 100%;
  display: grid;
  display: grid;
  grid-template-rows: 105px auto;
  grid-template-areas:
    "header"
    "content";
`;
export const Links = styled.ul`
  list-style: none;
  > li {
    margin-top: 12px;
    a {
      color: ${({ theme }) => theme.COLORS.WHITE};
    }
  }
`;

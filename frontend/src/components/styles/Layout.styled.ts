import styled from "styled-components";

export const LayoutWrapper = styled.div`
  min-height: 100vh;
  display: flex;
  flex-direction: column;
`;

export const HeaderWrapper = styled.div`
  text-align: center;
  margin-top: 30px;

  h1 {
    font-size: 3rem;
  }
`;

export const OutletWrapper = styled.div`
  flex: 1 1 0%;
`;

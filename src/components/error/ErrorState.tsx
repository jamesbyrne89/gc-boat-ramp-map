import styled from "@emotion/styled";

const ErrorStyles = styled.div`
  background: var(--lighter-black);
  padding: 1.25rem;
  border-radius: var(--card-border-radius);
  max-width: 500px;
  width: 80vw;
`;

const ErrorState = () => {
  return <ErrorStyles>Error loading data</ErrorStyles>;
};

export default ErrorState;

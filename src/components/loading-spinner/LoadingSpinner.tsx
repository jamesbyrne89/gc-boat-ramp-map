import styled from "@emotion/styled";

const LoadingSpinnerStyles = styled.div`
  .spinner {
    width: 10em;
    height: 10em;
    border-top: 1em solid #d5fff7;
    border-right: 1em solid transparent;
    animation: spinner 0.4s linear infinite;
    border-radius: 50%;
    margin: auto;
  }
  .head {
    width: 1em;
    height: 1em;
    border-radius: 50%;
    margin-left: 8.5em;
    margin-top: 0.5em;
    background-color: #d5fff7;
  }
  @keyframes spinner {
    to {
      transform: rotate(360deg);
    }
  }
`;

const LoadingSpinner = () => {
  return (
    <LoadingSpinnerStyles>
      <div className="spinner">
        <div className="head"></div>
      </div>
    </LoadingSpinnerStyles>
  );
};

export default LoadingSpinner;

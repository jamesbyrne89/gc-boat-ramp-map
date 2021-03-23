import styled from "@emotion/styled";

const SidePanelStyles = styled.section`
  position: fixed;
  top: 2rem;
  bottom: 2rem;
  right: 1.25rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 4rem;

  background: var(--lighter-black);
  padding: 1.25rem;
  border-radius: var(--card-border-radius);
`;

export default SidePanelStyles;

import styled from '@emotion/styled';

const boxShadowTransition = `
    transition-duration: .3s;
    &:hover {
    box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.3);
    }
`;

export const PrimaryButton = styled.button`
  color: rgba(255, 255, 255, 1);
  background-color: rgba(0, 184, 158, 1);
  
  padding: 1rem 1.5rem;
  margin: 2rem 0.5rem;
  margin-left: 0rem;
  min-width: 6rem;
  border-radius: .75rem;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;
  ${boxShadowTransition}
`;

export const SecondaryButton = styled.button`
  background-color: rgba(255, 255, 255, 1);
  color: rgba(0, 184, 158, 1);
  padding: 1rem 1.5rem;
  margin: 0.5rem;
  min-width: 6rem;
  border: none;
  font-size: 1.5rem;
  border-radius: .75rem;
  font-weight: bold;

  ${boxShadowTransition}
`;

export const TertiaryButton = styled.button`
  background-color: rgba(255, 255, 255, 1);
  color: rgba(0, 0, 0, .4);
  padding: 1rem 1.5rem;
  margin: 0.5rem;
  min-width: 6rem;
  border: none;
  font-size: 1.5rem;
  border-radius: 0.75rem;
  font-weight: normal;

  &:hover {
    color: white;
    background-color: red;
    font-weight: bold;
  }
  ${boxShadowTransition}
`;
import styled from '@emotion/styled';

export const PrimaryButton = styled.button`
  color: rgba(255, 255, 255, 1);
  background-color: rgba(0, 184, 158, 1);
  box-shadow: 0px 3px 1px rgba(0, 184, 158, 0.7);
  padding: 1rem 1.5rem;
  margin: 0.5rem;
  min-width: 6rem;
  border-radius: 1.25rem;
  border: none;
  font-size: 1.5rem;
  font-weight: bold;

  transition-duration: .3s;
  &:hover {
    color: rgba(255, 255, 255, .5);
  }
`;

export const SecondaryButton = styled.button`
  background-color: rgba(255, 255, 255, 1);
  color: rgba(0, 184, 158, 1);
  padding: 1rem 1.5rem;
  margin: 0.5rem;
  min-width: 6rem;
  border: none;
  font-size: 1.5rem;
  border-radius: 1.25rem;
  font-weight: bold;

  transition-duration: .3s;
  &:hover {
    box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.3);
  }
`;

export const TertiaryButton = styled.button`
  background-color: rgba(255, 255, 255, 1);
  color: rgba(0, 0, 0, .4);
  padding: 0.5rem;
  margin: 0.5rem;
  min-width: 6rem;
  border: none;
  font-size: 1.05rem;
  border-radius: 0.75rem;
  box-shadow: 0px 2px 14px rgba(0, 0, 0, 0.3);
  font-weight: bold;
`;
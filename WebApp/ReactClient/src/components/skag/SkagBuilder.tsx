import { useState } from 'react';
import styled from 'styled-components';

export const SkagBuilder = () => {
  const [value, setValue] = useState('');
  const handleChange = (event) => {
    setValue(event.target.value);
  };

  return (
    <Container>
      <Title>
        Build <Bold>SKAG</Bold>
      </Title>
      <KeywordsContainer>
        Keywords
        <KeywordsInput value={value} onChange={handleChange} />
      </KeywordsContainer>
    </Container>
  );
};

const Container = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 0 35rem;
`;

const Title = styled.div`
  margin-bottom: 2.4rem;
  ${(props) => props.theme.text.fontType.h1};
`;

const Bold = styled.span`
  font-weight: bold;
`;

const KeywordsContainer = styled.div`
  display: flex;
  flex-direction: column;
  ${(props) => props.theme.text.fontType.h7};
`;

const KeywordsInput = styled.textarea`
  width: 70rem;
  height: 36rem;
  margin: 2rem 0;
  padding: 1rem;
  box-shadow: inset 0px -2px 0px rgba(192, 198, 218, 0.6),
    inset 0px -3px 0px #ffffff;
  resize: none;
  border-radius: 15px;
  color: ${(props) => props.theme.colors.black1};
  border: 0.1rem solid ${(props) => props.theme.colors.stroke};
  ${(props) => props.theme.text.fontType.body3};

  &:focus {
    outline: none;
  }

  &::-webkit-scrollbar {
    width: 0.6rem;
    height: 10rem;
  }

  &::-webkit-scrollbar-track {
    border-radius: 0.5rem;
    margin-top: 1.5rem;
    margin-bottom: 1.5rem;
  }

  &::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.blue2};
    opacity: 0.4;
    border-radius: 0.5rem;
  }
`;

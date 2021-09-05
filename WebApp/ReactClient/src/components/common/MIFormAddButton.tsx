import styled from 'styled-components';
import AdIcon from 'src/images/general/gray-plus-icon.svg';

type Props = {
  title: string;
  onClick: () => void;
};

export const MIFormAddButton = ({ title, onClick }: Props) => {
  return (
    <Container onClick={onClick}>
      <PlusIcon src={AdIcon} fill='green' stroke='red' />
      <Title>{title}</Title>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  align-items: center;
`;

const Title = styled.div`
  font-size: 14px;
  margin-left: 0.5rem;
  color: ${(props) => props.theme.colors.grey2};
`;

const PlusIcon = styled.img``;

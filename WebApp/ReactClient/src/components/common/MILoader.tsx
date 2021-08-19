import styled from 'styled-components';

export type LoaderColorType = 'white' | 'primary' | 'dark';

type Props = {
  color?: LoaderColorType;
  context?: 'button' | 'page';
};

export const MILoader = ({ color = 'white', context = 'button' }: Props) => (
  <Processing context={context}>
    <Container>
      <CircularElement color={color} />
      <CircularElement color={color} />
      <CircularElement color={color} />
      <CircularElement color={color} />
    </Container>
  </Processing>
);

const Processing = styled.div<{ context: string }>`
  position: ${(props) => (props.context === 'button' ? 'absolute' : 'relative')};
  top: 0;
  left: 0;
  height: inherit;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Container = styled.div`
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  min-height: 1rem;
  width: 6rem;

  > div:nth-child(1) {
    left: 0.6rem;
    animation: lds-ellipsis1 0.6s infinite;
  }

  > div:nth-child(2) {
    left: 0.6rem;
    animation: lds-ellipsis2 0.6s infinite;
  }

  > div:nth-child(3) {
    left: 2.6rem;
    animation: lds-ellipsis2 0.6s infinite;
  }

  > div:nth-child(4) {
    left: 4.5rem;
    animation: lds-ellipsis3 0.6s infinite;
  }

  @keyframes lds-ellipsis1 {
    0% {
      transform: scale(0);
    }
    100% {
      transform: scale(1);
    }
  }
  @keyframes lds-ellipsis3 {
    0% {
      transform: scale(1);
    }
    100% {
      transform: scale(0);
    }
  }
  @keyframes lds-ellipsis2 {
    0% {
      transform: translate(0, 0);
    }
    100% {
      transform: translate(1.9rem, 0);
    }
  }
`;

const CircularElement = styled.div<{ color: string }>`
  position: absolute;
  width: 1rem;
  height: 1rem;
  border-radius: 50%;
  background: ${(props) => props.theme.colors.loader[props.color]};
  animation-timing-function: cubic-bezier(0, 1, 1, 0);
`;

import * as React from 'react';
import { devices } from 'src/theme/appDevices';
import styled from 'styled-components';

type SizeType = 'inline' | 'wizard' | 'none';
type Props = {
  size?: SizeType;
  errorMessage?: string | null;
  errorMessageIcon?: React.ReactNode;
  notices?: Array<any>;
  align?: string;
};

export const MINotices = ({
  size = 'wizard',
  errorMessage,
  notices = [],
  align = 'left',
  errorMessageIcon = null,
}: Props) => (
  <Notices size={size}>
    {errorMessage && (
      <ErrorNotice size={size}>
        {errorMessageIcon}
        {errorMessage}
      </ErrorNotice>
    )}
    {!errorMessage &&
      notices &&
      notices.map((notice, index) => (
        <Notice key={index} size={size} align={align}>
          {typeof notice === 'string' && notice }
          {typeof notice !== 'string' && { notice }}
        </Notice>
      ))}
  </Notices>
);

const Notices = styled.div<{ size?: SizeType }>`
  margin-top: ${(props) => (props.size === 'inline' ? '0' : '1rem')};
`;

const Notice = styled.label<{ size?: SizeType; align?: string }>`
  display: block;
  color: ${(props) => props.theme.colors.black1};
  font-size: ${(props) => (props.size === 'inline' ? '1rem' : '1.4rem')};
  line-height: 1.6rem;
  text-align: ${(props) => props.align};

  @media ${devices.mobile}, ${devices.phablet} {
    line-height: 1.4rem;
  }
`;

const ErrorNotice = styled(Notice)`
  color: ${(props) => props.theme.colors.red};
  display: flex;
  flex-direction: row;
  align-items: center;
`;

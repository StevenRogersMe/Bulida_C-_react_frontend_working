import { useState } from 'react';
import styled, { css } from 'styled-components';
import { Expandable } from 'src/utils/types';
import DropDownIcon from 'src/images/general/dropdown-arrow.svg';
import { withOutsideClickHandler } from 'src/hok/withOutsideClickHandler';
import { MINotices } from './MINotices';

export type OptionType = {
  label: string;
  value: any;
  isDisabled?: boolean;
};

export type MIDropDownProps = {
  options: OptionType[];
  label?: string;
  value?: any;
  onChange: (change: Expandable<{ value: string }>) => void;
  simpleStyles?: boolean;
  errorMessage?: string;
};

export const MIDropDown = ({
  options,
  label,
  value,
  onChange,
  simpleStyles,
  errorMessage,
}: MIDropDownProps) => {
  const [open, setOpen] = useState<boolean>(false);

  const onSelected = (option) => () => {
    setOpen(false);
    if (value !== option.value) {
      onChange({ value: option.value });
    }
  };

  return (
    <SingleSelectContainer handleClickOutside={() => setOpen(false)}>
      <SingleSelect
        simpleStyles={simpleStyles}
        error={errorMessage}
        onClick={() => setOpen(!open)}
      >
        <SingleSelectLabel simpleStyles={simpleStyles}>
          {label}
        </SingleSelectLabel>
        <DropDownIndicator src={DropDownIcon} isOpen={open} />
      </SingleSelect>
      <MINotices errorMessage={errorMessage} />
      <DropDownContainer hidden={!open}>
        <List>
          {options.map((option, index) => {
            const isSelected =
              (typeof value === 'string' &&
                typeof option.value === 'string' &&
                option.value.toLowerCase() === value?.toLowerCase()) ||
              option.value === value;
            return (
              <DropDownOption
                key={index}
                onClick={onSelected(option)}
                isSelected={isSelected}
                simpleStyles={simpleStyles}
              >
                {option.label}
              </DropDownOption>
            );
          })}
        </List>
      </DropDownContainer>
    </SingleSelectContainer>
  );
};

const SingleSelectContainer = withOutsideClickHandler(styled.div`
  position: relative;
  box-sizing: border-box;
  cursor: pointer;
  width: 100%;
`);

const SingleSelect = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 1rem 1.5rem;
  min-width: 30rem;
  background: ${(props) =>
    props.simpleStyles ? 'transparent' : 'rgba(96, 100, 115, 0.05)'};
  border-radius: 1.2rem;
  border: 0.1rem solid ${(props) => props.theme.colors.grey5};
  ${(props) =>
    props.simpleStyles &&
    css`
      height: 3.8rem;
      padding: 0.5rem 0.5rem 0.5rem 1rem;
      border: 0.1rem solid;
      border-color: ${(props) =>
        props.error ? props.theme.colors.red : props.theme.colors.stroke};
      line-height: 3.8rem;
      color: ${(props) => props.theme.colors.black1};
      border-radius: 1rem;
    `}
`;

const SingleSelectLabel = styled.span`
  display: flex;
  ${(props) =>
    props.simpleStyles &&
    css`
      font-size: 1.6rem;
      font-weight: 450;
    `}
`;

const DropDownIndicator = styled.img<{ isOpen: boolean }>`
  width: 0.9rem;
  height: 0.5rem;
  transform: ${(props) => (props.isOpen ? 'rotateZ(-180deg)' : 'none')};
`;

const DropDownContainer = styled.div<{ hidden?: boolean }>`
  top: 100%;
  border-radius: 1.5rem;
  box-shadow: 0 0 0 1px hsla(0, 0%, 0%, 0.1), 0 4px 11px hsla(0, 0%, 0%, 0.1);
  position: absolute;
  width: 100%;
  z-index: 1;
  box-sizing: border-box;
  background-color: ${(props) => props.theme.colors.pureWhite};
`;

const listHeight = 27.6;
const List = styled.div`
  padding: 1rem 0;
  max-height: ${listHeight}rem;
  overflow: auto;

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

const DropDownOption = styled.div<{ isSelected: boolean }>`
  box-sizing: border-box;
  padding: 1rem 2rem;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  color: ${(props) => props.isSelected && props.theme.colors.blue2};
  ${(props) =>
    props.simpleStyles &&
    css`
      font-size: 1.5rem;
      font-weight: 400;
    `}
`;

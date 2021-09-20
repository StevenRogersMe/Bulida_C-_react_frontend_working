import styled from 'styled-components';
import {MITextInput} from 'src/components/common/MITextInput';
import {Checkbox} from 'src/components/common/MICheckBox';
import {CampaignType} from 'src/utils/types';
import {useState} from 'react';
import {useDispatch} from 'react-redux';
import {setSettingProperties} from 'src/redux/skagCompaign/actions';


type Props = {
    campaign: CampaignType;
};

const firstRow = [
    {
        label: 'Campaign name',
        key: 'name',
        required: true,
        outlined: true,
        placeholder: 'Type here...',
        type: "text"
    }, {
        label: 'Campaign budget',
        key: 'budget',
        required: true,
        outlined: true,
        placeholder: 'Type here...',
        type: "number"
    },
];

const SecondRow = [
    {
        label: "Exact",
        key: "exact"
    }, {
        label: "Phrase",
        key: "phrase"
    }, {
        label: "Modifier",
        key: "modifier"
    }, {
        label: "Broad",
        key: "broad"
    }
];

const thirdRow = [
    {
        label: "Create different ad groups for each match type",
        key: "negativePhrase",
        scrip: "We don't usually recommend to have different ad groups for each match type"
    }, {
        label: "Generate negative keywords",
        key: 'differentGroup',
        scrip: "Avoid that your ad groups compete with each other"
    }
];

export const SkagSettings = ({campaign} : Props) => {

    const [setting, setSetting] = useState(campaign);
    const dispatch = useDispatch();
    const handleChange = (e) => {
        const {id, value} = e;
        let temp = setting;
        temp[id] = value;
        setSetting(temp);
        dispatch(setSettingProperties(setting));
    }

    const handleCheckboxChange = (e) => {
        let temp = setting;
        temp[e.target.name] = ! temp[e.target.name];
        setSetting(temp);
        dispatch(setSettingProperties(setting));
    }

    const renderInputs = (values) => {
        return values.map((item) => (
            <StyledMITextInput key={
                    item.key
                }
                id={
                    item.key
                }
                type={
                    item.type
                }
                value={
                    setting ? setting[item.key] : ''
                }
                onChange={handleChange}
                {...item}/>
        ));
    };

    const renderCheckBox = (values) => {
        return values.map((item) => (
            <Checkbox key={
                    item.key
                }
                label={
                    item.label
                }
                description={
                    item.key
                }
                checked={
                    setting[item.key]
                }
                onChange={handleCheckboxChange}
                scrip=""/>
        ));
    }

    const renderCheckBoxRow = (values) => {
        return values.map((item) => (
            <Checkbox key={
                    item.key
                }
                label={
                    item.label
                }
                description={
                    item.key
                }
                checked={
                    setting[item.key]
                }
                onChange={handleCheckboxChange}
                scrip={
                    item.scrip
                }/>
        ));
    }

    return (
        <Container>
            <Title>Settings</Title>
            <Setting>
                <CampaginInput>
                    <CampaginInf>{
                        renderInputs(firstRow)
                    }</CampaginInf>
                </CampaginInput>
                <CampaginInput> {
                    renderCheckBox(SecondRow)
                } </CampaginInput>
                {
                renderCheckBoxRow(thirdRow)
            } </Setting>
        </Container>
    );
};

const Container = styled.div `
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
`;

const Title = styled.div `
  margin-bottom: 2.4rem;
  ${
    (props) => props.theme.text.fontType.h1
};
`;

const Setting = styled.div `
  padding:3.125rem 10rem;
  background-color: #E7F0F6;
  border-radius:1rem;
  border: 0.063rem solid #CFD9E1;
  box-sizing: border-box;
`;

const CampaginInput = styled.div `
  display:flex;
`;

const TMITextInput = ({ className, children, ...other }) => 
  <div className={className}>
    <MITextInput {...other}>{children}</MITextInput>
  </div>

const StyledMITextInput = styled(TMITextInput)`
  div>div>input {
    background-color:white;
    width:30rem;
    max-height:3rem  
  }
  div>div>input::placeholder{
    font-size:1.5rem;
  }
`

const CampaginInf = styled.div `
  display: flex;
  justify-content: space-between;
  > div:nth-child(2) {
    margin: 0 0 0 2rem ;
  }
`;

function closeModal() {
    throw new Error('Function not implemented.');
}

import {MdArrowDropDown} from 'react-icons/md';
import {Text} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';

const SelectOptions = ({options, bottomText, handleSelectChange}) => {
  return (
    <>
      <SelectDropdown
        placeholder=""
        id="stock"
        size={'lg'}
        fontWeight={'bold'}
        minWidth={'250px'}
        fontSize={'2xl'}
        textTransform={'capitalize'}
        onChange={event => {
          console.log('event', event.target.value);
          handleSelectChange(event.target.value);
        }}>
        {options.map((item, index) => (
          <option key={item} value={item} selected={index === 0}>
            {item}
          </option>
        ))}
      </SelectDropdown>
      <Text fontSize={'md'} fontWeight={'500'} color="#0000008a">
        {bottomText}
      </Text>
    </>
  );
};

export default SelectOptions;

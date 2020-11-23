import React from 'react';
import { Select } from 'antd';
import './Dropdown.css';
const { Option } = Select;

const MenuOptions = (districts) => {
  console.log(districts);
  return districts
    ? districts.map((district) => {
        return <Option value={district.district}>{district.district}</Option>;
      })
    : null;
};

const DropdownMenu = (props) => {
  const menu = MenuOptions(props.districts);

  return (
    <Select
      showSearch
      style={{ width: 300, border: 'red', marginBottom: '30px' }}
      placeholder="Select District"
      optionFilterProp="children"
      onChange={props.handleDistrictChange}
      // onFocus={onFocus}
      // onBlur={onBlur}
      // onSearch={onSearch}
      filterOption={(input, option) =>
        option.children.toLowerCase().indexOf(input.toLowerCase()) >= 0
      }>
      {menu}
    </Select>
  );
};

export default DropdownMenu;

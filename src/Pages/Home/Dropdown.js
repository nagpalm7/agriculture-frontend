import React from 'react';
import { Select } from 'antd';
import './Dropdown.css';

import { IntlProvider, FormattedMessage, FormattedDate } from 'react-intl';
import Languages from '../../languages.json';
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
    <IntlProvider
      locale={props.lang}
      messages={Languages[props.lang]}>
      <Select
        showSearch
        style={{ width: 300, border: 'red', marginBottom: '30px' }}
        placeholder={
          <FormattedMessage
            id="select_district"
            defaultMessage="Select District"
          />
        }
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
    </IntlProvider>
  );
};

export default DropdownMenu;

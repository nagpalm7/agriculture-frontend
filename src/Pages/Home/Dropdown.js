import React from "react";
import { Menu, Dropdown, Button, message } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

const renderMenu = (menu, handleDistrictChange) => {
    return (
        <Menu onClick={handleDistrictChange}>
            {
                menu.map((item, index) => {
                    return (
                        <Menu.Item key={item.id} icon={<UserOutlined />}>
                            {item.district}
                        </Menu.Item>
                    );
                })
            }
        </Menu>
    );
}

const DropdownMenu = (props) => {
    const menuItems = renderMenu(props.districts, props.handleDistrictChange);

    return (
        <Dropdown overlay={menuItems} overlayStyle={{ float: "revert" }}>
            <Button style={{ borderRadius: 14, backgroundColor: "#cccccc", padding: "3px 26px" }}>
                {props.selectedDist} <DownOutlined />
            </Button>
        </Dropdown>
    );
}

export default DropdownMenu;
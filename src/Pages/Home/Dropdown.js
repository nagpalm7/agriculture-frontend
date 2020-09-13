import React from "react";
import { Menu, Dropdown, Button, message } from 'antd';
import { DownOutlined, UserOutlined } from '@ant-design/icons';

function handleButtonClick(e) {
    message.info('Click on left button.');
    console.log('click left button', e);
}

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
            <Button style={{ borderRadius: 14, backgroundColor: "#cccccc", padding: "6px 26px" }}>
                All District <DownOutlined />
            </Button>
        </Dropdown>
    );
}

export default DropdownMenu;
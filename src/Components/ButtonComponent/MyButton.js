import React from 'react';
import { Button } from 'antd';
import './MyButton.css';

const MyButton = (props) => {
  return (
    <>
      <Button
        htmlType={props.htmlType}
        className={props.type}
        onClick={props.handleClick}
        style={props.extraStyle}>
        {props.text}
      </Button>
    </>
  );
};

export default MyButton;

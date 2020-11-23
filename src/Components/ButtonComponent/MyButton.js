import React from 'react';
import { Button } from 'antd';
import './MyButton.css';

const MyButton = (props) => {
  return (
    <>
      <Button {...props}>{props.text}</Button>
    </>
  );
};

export default MyButton;

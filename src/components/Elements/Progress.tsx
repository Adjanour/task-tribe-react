import React, {useEffect, useState} from 'react';
import { MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Button, Progress } from 'antd';

const ProgressComponents = (percentValue:number|null) => {
  const [percent, setPercent] = useState<number|null>(0);


  const increase = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent? prevPercent + 1 :1;
      if (newPercent > 100) {
        return 100;
      }
      return newPercent;
    });
  };

  const decline = () => {
    setPercent((prevPercent) => {
      const newPercent = prevPercent ?prevPercent - 1 : 1;
      if (newPercent < 0) {
        return 0;
      }
      return newPercent;
    });
  };

  return (
    <>
      <div className='flex flex-row'>
        <Progress percent={percent? percent : 1} />
        <Button.Group>
        <Button onClick={decline} icon={<MinusOutlined />} />
        <Button onClick={increase} icon={<PlusOutlined />} />
      </Button.Group>
      </div>
      
    </>
  );
};

export default ProgressComponents;

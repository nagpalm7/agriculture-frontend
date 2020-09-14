import React from 'react';
import { Chart } from 'react-charts';

const ChartComponent = (props) => {
    let data = [];
    props.count.forEach((ele) => {
        data.push([ele.start, ele.data]);
    });

    return (
        <Chart
            data={[
                {
                    label: 'Series 1',
                    data: data
                }
            ]}
            axes={[
                { primary: true, type: 'ordinal', position: 'bottom' },
                { type: 'linear', position: 'left' }
            ]}
        />
    )
}

export default ChartComponent;
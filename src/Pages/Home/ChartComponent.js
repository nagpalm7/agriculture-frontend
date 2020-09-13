import React from 'react';
import { Chart } from 'react-charts';

const ChartComponent = (props) => {
    return (
            <Chart            
                data={[
                    {
                        label: 'Series 1',
                        data: [[0, 1], [1, 2], [2, 4], [3, 2]]
                    }
                ]}
                axes={[
                    { primary: true, type: 'linear', position: 'bottom' },
                    { type: 'linear', position: 'left' }
                ]}
            />
    )
}

export default ChartComponent;
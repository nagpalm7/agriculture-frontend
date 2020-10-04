import React from 'react';
import { Chart } from 'react-charts';

const ChartComponent = (props) => {
    let completedCount = [];
    let pendingCount = [];
    let ongoingCount = [];

    props.data.completed_count.forEach((ele) => {
        completedCount.push([ele.start, ele.data]);
    });

    props.data.pending_count.forEach((ele) => {
        pendingCount.push([ele.start, ele.data]);
    });

    props.data.ongoing_count.forEach((ele) => {
        ongoingCount.push([ele.start, ele.data]);
    });

    return (
        <Chart
            data={[
                {
                    label: 'completedCount',
                    data: completedCount
                },
                {
                    label: 'pendingCount',
                    data: pendingCount
                },
                {
                    label: 'ongoingCount',
                    data: ongoingCount
                }
            ]}
            axes={[
                { primary: true, type: 'ordinal', position: 'bottom' },
                { type: 'linear', position: 'left' }
            ]}
        />
    );
}

export default ChartComponent;
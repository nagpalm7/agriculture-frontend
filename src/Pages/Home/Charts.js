import React from 'react';
import ChartComponent from "./ChartComponent";

const style = {
    ChartComponent: {
        height: 220,
        width: 180,
        backgroundColor: "white",
        margin: "10px 10px 30px 30px",
        borderRadius: 30,
        padding: "15px"
    }
};

const Charts = (props) => {
    return (
        <div>
            <div style={style.ChartComponent}>
                <div className="chart-text-heading">
                    Total Pending
                </div>
                <div className="chart-text-count">
                    {props.pending_count[2].data}
                </div>
                <div style={{ flex: 1, width: "90%", height: 130 }}>
                    <ChartComponent count={props.pending_count} />
                </div>
            </div>
            <div style={style.ChartComponent}>
                <div className="chart-text-heading">
                    Total Ongoing
                </div>
                <div className="chart-text-count">
                    {props.ongoing_count[2].data}
                </div>
                <div style={{ flex: 1, width: "90%", height: 130 }}>
                    <ChartComponent count={props.ongoing_count} />
                </div>
            </div>
            <div style={style.ChartComponent}>
                <div className="chart-text-heading">
                    Total Completed
                </div>
                <div className="chart-text-count">
                    {props.completed_count[2].data}
                </div>
                <div style={{ flex: 1, width: "90%", height: 130 }}>
                    <ChartComponent count={props.completed_count} />
                </div>
            </div>
        </div>
    )
}

export default Charts;
import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2' 

export default function LineChart(){
    const [chartData, setChartData] = useState({})

    function chart(){
        setChartData({
            labels: ["May 1", "May 2", "May 3", "May 4", "May 5", "May 6", "May 7"],
            datasets: [
                {
                    label: 'stocks price ($)',
                    data: ["183.6", "190.5", "193.66", "185.26", "190.29", "200.45", "210.65"],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6)'
                    ],
                    borderWidth: 4
                }
            ]
        })
    }

    useEffect(() => {
        chart()
    },[])

    return (
        <div>
            <Line data={chartData}/>
        </div>
    )
}
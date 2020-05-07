import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2' 

export default function Chartjs(){
    const [chartData, setChartData] = useState({})

    function chart(){
        setChartData({
            labels: ['monday', 'tuesday','wednesday','thursday','friday'],
            datasets: [
                {
                    label: 'thickness',
                    data: [32, 45, 12, 76, 69],
                    backgroundColor: [
                        'rgba(75, 192, 192, 0.6)'
                    ],
                    borderWidth: 4
                },
                {
                    label: 'thinness',
                    data: [45, 50, 32, 12, 33],
                    backgroundColor: [
                        'rgba(75, 75, 75, 0.6)'
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
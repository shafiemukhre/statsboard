import React, { useState, useEffect } from 'react';

export default function useDashboardData(){

    const [dashboardData, setDashboardData] = useState([])

    useEffect(() => {
        const localhost = 'http://3.17.63.183'
        const endpoint = '/rutuja/dashboard'
        const url = `${localhost}:5000${endpoint}`
        fetch(url)
        .then(response => response.json())
        .then(data => setDashboardData(data))
    },[])

    return dashboardData
}
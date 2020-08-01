import React, { useState, useEffect } from 'react';

export default function useDashboardData(){

    const [dashboardData, setDashboardData] = useState([])

    useEffect(() => {
        const localhost = 'http://127.0.0.1:5000'
        const endpoint = '/rutuja/dashboard'
        const url = `${localhost}${endpoint}`
        fetch(url)
        .then(response => response.json())
        .then(data => setDashboardData(data))
    },[])

    return dashboardData
}
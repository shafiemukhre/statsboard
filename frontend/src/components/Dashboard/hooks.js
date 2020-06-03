import React, { useState, useEffect } from 'react';

export default function useDashboardData(){

    const [dashboardData, setDashboardData] = useState([])

    useEffect(() => {
        const localhost = 'https://dashbook.herokuapp.com'
        const endpoint = '/rutuja/dashboard'
        const url = `${localhost}${endpoint}`
        fetch(url)
        .then(response => response.json())
        .then(data => setDashboardData(data))
    },[])

    return dashboardData
}
import React from "react";
import {Line} from 'react-chartjs-2'

function LineChart(){

    const data = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May'],
        datasets: [
            {
                label: 'Sales 2020',
                data: [3,2,2,1,5],
                borderColor: ['rgba(255,206,86,0.2)'],
                backgroundColor: ['rgba(255,206,86,0.2)'],
                pointBackgroundColor: 'rgba(255,206,86,0.2)',
                pointBorderColor: 'rgba(255,206,86,0.2)'

            },
            {
                label: 'Sales 2021',
                data: [4,1,6,8,11],
                borderColor: ['rgba(54,206,86,0.2)'],
                backgroundColor: ['rgba(54,206,86,0.2)'],
                pointBackgroundColor: 'rgba(54,206,86,0.2)',
                pointBorderColor: 'rgba(54,206,86,0.2)'
            }
        ]
    }
    const options = {
        title:{
            display: true,
            text: 'Line Chart'
        },
        scales: {
            yAxes: [
                {
                    ticks: {
                        min: 0,
                        max: 15,
                        stepSize: 1
                    }
                }
            ]

        }
    }
    return (<Line data={data} options={options}/> )

}

export default LineChart
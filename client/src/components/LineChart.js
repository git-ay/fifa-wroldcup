import React from "react";
import {Line} from 'react-chartjs-2'

function LineChart({home_team, away_team, home_goals, away_goals, years}){
    const data = {
        labels: years,
        datasets: [
            {
                label: home_team,
                data: home_goals,
                borderColor: ['rgba(255,206,86,0.2)'],
                backgroundColor: ['rgba(255,206,86,0.2)'],
                pointBackgroundColor: 'rgba(255,206,86,0.2)',
                pointBorderColor: 'rgba(255,206,86,0.2)'

            },
            {
                label: away_team,
                data: away_goals,
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
    return (<div>  <Line data={data} options={options}/> </div>)

}

export default LineChart
import React from "react";
import {Card,} from "react-bootstrap";
import LineChart from "../components/LineChart";
import CardPic from "../CardPic";
import {Button} from "../components/Button";
import { Chart as ChartJS } from 'chart.js/auto' // Alex: This line is required to avoid an error (Error: "category" is not a registered scale).
import regression from 'regression'; // Alex: npm install --save regression required.
import { Chart } from "react-google-charts"; // Alex: yarn add react-google-charts OR npm i react-google-charts (https://react-google-charts.com/)
// npm install @mui/material @emotion/react @emotion/styled, npm install --save react-chartjs-2 chart.js

import {
    Form,
    FormGroup,
    CardBody,
    CardTitle,
    Dropdown,
    DropdownToggle,
    DropdownMenu,
    DropdownItem
} from "shards-react";


import { Table, Row, Col, Divider, Select } from "antd";
import { getMatchSearch, getMatch, getMatchStats, getAllStats, getAllMatchesStats, getWageSomeVar } from "../fetcher";

import MenuBar from "../components/MenuBar";
const { Option } = Select;

const statsMatchesColumns = [
    {
        title: 'Year',
        dataIndex: 'year',
        key: 'year',
    },
    {
        title: 'Stage',
        dataIndex: 'stage',
        key: 'stage',

    },
    {
        title: 'Stadium',
        dataIndex: 'stadium',
        key: 'stadium',

    },
    {
        title: 'Home Team',
        dataIndex: 'Home_Team_Name',
        key: 'Home_Team_Name',

    },
    {
        title: 'Away Team',
        dataIndex: 'Away_Team_Name',
        key: 'Away_Team_Name',

    },
    {
        title: 'Home Team Goals',
        dataIndex: 'home_team_goals',
        key: 'home_team_goals',

    },
    {
        title: 'Away Team Goals',
        dataIndex: 'away_team_goals',
        key: 'away_team_goals',

    },
    {
        title: 'Attendance',
        dataIndex: 'Attendance',
        key: 'Attendance',

    },
];


// function get_years(statMatchesResults) {
//     let i = 0;
//     let list_of_years = [];
//     while (i<statMatchesResults.length){
//         let year = statMatchesResults[i]['year'];
//         i++;
//         list_of_years.push(year)
//     }
//     return list_of_years;
// }

// function get_goals(statMatchesResults, team) {
//     let i = 0;
//     let goals = [];
//     while (i<statMatchesResults.length){
//         let goal = statMatchesResults[i][team+'_team_goals'];
//         i++;
//         goals.push(goal)
//     }
//     return goals;
// }

function makeRegInput(input, someVar) {
    let i = 0;
    let regInput = [];
    console.log("res3", input);
    console.log("res4", someVar);
    console.log("res5", input[i]['Wage'], input[i][someVar]);
    console.log("res6", typeof(input[i]['Wage']), typeof(input[i][someVar]));
    while (i<input.length) { 
        let s = input[i][someVar];        
        let w = input[i]['Wage'];
        if (typeof(s)==String) { s = s.replace('[^0-9.]+','') }
        if (typeof(w)==String) { w = w.replace('[^0-9.]+','') }
        s = parseFloat(s);
        w = parseFloat(w);
        if ( w < 500 ) { regInput.push([s, w]); } // There are some outliers...
        i++; 
    }
    console.log("regInput", regInput)
    return regInput;
}


function makeRegPlotInput(pointEstimates, wageAndSomeVar) {
    let i = 0;
    let plotInput = [];
    console.log("pointEstimates", pointEstimates);
    console.log("wageAndSomeVar", wageAndSomeVar);
    while (i<pointEstimates.length) { 
        let w = wageAndSomeVar[i]['Wage'];
        if (typeof(w)==String) { w = w.replace('[^0-9.]+','') }
        w = parseFloat(w);
        if ( w < 500 ) { plotInput.push(pointEstimates[i].concat([ w ])); } // There are some outliers...
        i++; 
    }
    console.log("plotInput", plotInput)
    return plotInput;
}

class WagePage extends React.Component {

    constructor(props) {
        super(props);
        
        this.toggle = this.toggle.bind(this)
        this.state = {
            someVar: "OverallRating",
            wageAndSomeVar: [],
            results: [],
            pointEstimates: [],
            beta: "",
            intercept: "",
            mdlStr: "",
            open: false,
            r_square: ""
            // homeTeam: "Brazil",
            // awayTeam: "England",
            // homeTeamGoals: [0,3,1,1],
            // awayTeamGoals: [0,1,0,2],
            // matchesResults: [],
            // selectedMatchId: window.location.search
            //     ? window.location.search.substring(1).split("=")[1]
            //     : 0,
            // matchId: window.location.search
            //     ? window.location.search.substring(1).split("=")[1]
            //     : 0,
            // selectedMatchDetails: null,
            // matchDetails: null,
            // statResults: [],
            // statMatchesResults: [],
            // list_of_years: []
                   
        };
        // this.handleHomeQueryChange = this.handleHomeQueryChange.bind(this);
        // this.updateSearchResults = this.updateSearchResults.bind(this);
        // this.goToMatch = this.goToMatch.bind(this);
        // this.matchOnChangeTeams = this.matchOnChangeTeams.bind(this)
        
    }
    toggle() { this.setState(prevState => {return {open: !prevState.open };}); }
    setAndGetSomeVar(some_var) { 
        this.state.someVar = some_var;
        console.log("res1", this.state.someVar);
        getWageSomeVar(some_var).then((res) => {
            this.setState({ wageAndSomeVar: res.results });
            console.log("res2", makeRegInput(res.results, some_var));
            const regRes = regression.linear(makeRegInput(res.results, some_var));
            this.state.pointEstimates = regRes.points;
            this.state.beta = regRes.equation[0];
            this.state.intercept = regRes.equation[1];
            this.state.mdlStr = regRes.string;
            this.state.r_square = regRes.r2    
            console.log("regRes", regRes)
            console.log("this.state.pointEstimates", this.state.pointEstimates)
            console.log("this.state.wageAndSomeVar", this.state.wageAndSomeVar)
        })
    }


    // handleAwayQueryChange(event) { this.setState({ awayQuery: event.target.value }); }
    // handleHomeQueryChange(event) { this.setState({ homeQuery: event.target.value }); }
    // updateSearchResults() {
    //     getMatchSearch(this.state.homeQuery, this.state.awayQuery, null, null).then(
    //         (res) => {
    //             this.setState({ matchesResults: res.results });
    //         }
    //     );
    // }
    // setHomeTeam(team_home){ this.state.homeTeam = team_home }
    // setAwayTeam(team_away){ this.state.awayTeam = team_away }
    // matchOnChangeTeams() {
    //     getAllMatchesStats(null, null,  this.state.homeTeam, this.state.awayTeam).then((res) => {
    //         this.setState({ statMatchesResults: res.results });
    //         this.state.homeTeamGoals = get_goals(this.state.statMatchesResults, "home");
    //         this.state.awayTeamGoals = get_goals(this.state.statMatchesResults, "away");
    //         this.state.list_of_years = get_years(this.state.statMatchesResults)
    //     });
    // }
    // componentDidMount() {
    //     getAllStats(null, null, 'cristiano ronaldo').then(res => {
    //         this.setState({ statResults: res.results })
    //     })
    //     getAllMatchesStats(null, null, 'Brazil', 'England').then(res => {
    //         this.setState({ statMatchesResults: res.results })
    //     })
    //     getMatchStats().then(res => {
    //         this.setState({ matchDetails: res.results[0] })
    //     })
    // }
    // goToMatch(matchId) { window.location = `/matches?id=${matchId}` }
    render() {
        {
        // this.state.list_of_years = get_years(this.state.statMatchesResults);
        //  this.state.homeTeamGoals = get_goals(this.state.statMatchesResults, "home");
        //  this.state.awayTeamGoals = get_goals(this.state.statMatchesResults, "away");
        //  console.log(this.state.list_of_years)
        }
        return (

            <div>
                <MenuBar />
                <Form style={{ width: "50vw", margin: "3vh", marginTop: "3vh" }} >
                <Dropdown open={this.state.open} toggle={this.toggle}>
                    <DropdownToggle outline theme="info">Select some feature x to estimate the expected wage ŷ of football players</DropdownToggle>
                    <DropdownMenu> {/*primary, secondary, success, danger, warning, info, light and dark*/}
                        <DropdownItem value="OverallRating" onClick={() => { this.setAndGetSomeVar("OverallRating"); }}>OverallRating</DropdownItem>
                        <DropdownItem value="Potential" onClick={() => { this.setAndGetSomeVar("Potential"); }}>Potential</DropdownItem>
                        <DropdownItem value="InternationalReputation" onClick={() => { this.setAndGetSomeVar("InternationalReputation"); }}>InternationalReputation</DropdownItem>
                        <DropdownItem value="Skill" onClick={() => { this.setAndGetSomeVar("Skill"); }}>Skill</DropdownItem>
                        <DropdownItem value="JerseyNumber" onClick={() => { this.setAndGetSomeVar("JerseyNumber"); }}>JerseyNumber</DropdownItem>
                        <DropdownItem value="Weight" onClick={() => { this.setAndGetSomeVar("Weight"); }}>Weight</DropdownItem>
                        <DropdownItem value="NPassing" onClick={() => { this.setAndGetSomeVar("NPassing"); }}>NPassing</DropdownItem>
                        <DropdownItem value="NBallControl" onClick={() => { this.setAndGetSomeVar("NBallControl"); }}>NBallControl</DropdownItem>
                        <DropdownItem value="NStamina" onClick={() => { this.setAndGetSomeVar("NStamina"); }}>NStamina</DropdownItem>
                        <DropdownItem value="NStrength" onClick={() => { this.setAndGetSomeVar("NStrength"); }}>NStrength</DropdownItem>
                        <DropdownItem value="NPositioning" onClick={() => { this.setAndGetSomeVar("NPositioning"); }}>NPositioning</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                </Form>
                <Form style={{ width: "20vw", margin: "8vh", marginTop: "4vh" }}>
                    <Row>   
                        <Chart
                            width={'900px'}
                            height={'400px'}
                            chartType="Scatter"
                            loader={<div>Loading Chart</div>}
                            data={[['x = '.concat(this.state.someVar), 'ŷ = Predicted Wage (in $1000)', 'y = Wage (in $1000)']].concat(makeRegPlotInput(this.state.pointEstimates, this.state.wageAndSomeVar))}
                            options={{
                                chart: {
                                title: "Regression analysis",
                                subtitle: 'Model: '.concat(this.state.mdlStr, '\, R^2: ', this.state.r_square),
                                },
                                width: 1000,
                                height: 400,
                                series: {
                                    0: { axis: 'ŷ = Predicted Wage (in $1000)' },
                                    1: { axis: 'y = Wage (in $1000)', targetAxisIndex:1 }
                                },
                                axes: {
                                y: {
                                    'ŷ = Predicted Wage (in $1000)': { label: 'ŷ = Predicted Wage (in $1000)' },
                                    'y = Wage (in $1000)': { label: 'y = Wage (in $1000)' },
                                },            
                                },
                            }}
                            rootProps={{ 'data-testid': '4' }}
                            legendToggle
                        />                
                    </Row>
                </Form>

                <Divider />
                <Divider />
                <Divider />
            </div>
        );
    }
}

export default WagePage;

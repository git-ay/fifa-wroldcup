import React from "react";
import {Card,} from "react-bootstrap";
import LineChart from "../components/LineChart";
import CardPic from "../CardPic";
import {Button} from "../components/Button";
import { Chart as ChartJS } from 'chart.js/auto' // Alex: This line is required to avoid an error (Error: "category" is not a registered scale).
import regression from 'regression'; // Alex: npm install --save regression required.
import { Chart } from "react-google-charts"; // Alex: yarn add react-google-charts OR npm i react-google-charts

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
        regInput.push([parseFloat(s), parseFloat(w)]); 
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
        plotInput.push(pointEstimates[i].concat([ parseFloat(w) ])); 
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
                <Form style={{ width: "20vw", margin: "3vh", marginTop: "3vh" }} >
                <Dropdown open={this.state.open} toggle={this.toggle}>
                    <DropdownToggle outline theme="info">Select some variable</DropdownToggle>
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
                <Form style={{ width: "20vw", margin: "10vh", marginTop: "6vh" }}>
                    <Row>   
                        <Chart
                            width={'600px'}
                            height={'400px'}
                            chartType="Scatter"
                            loader={<div>Loading Chart</div>}
                            data={[[this.state.someVar, 'Wage_pred', 'Wage']].concat(makeRegPlotInput(this.state.pointEstimates, this.state.wageAndSomeVar))}
                            options={{
                                // Material design options
                                chart: {
                                title: "Wage scatter plot",
                                subtitle: this.state.mdlStr,
                                },
                                width: 800,
                                height: 500,
                                series: {
                                0: { axis: 'WagePred' },
                                1: { axis: 'Wage' },
                                },
                                axes: {
                                y: {
                                    'WagePred': { label: 'WagePred'  },
                                    'Wage': { label: 'Wage'  },
                                },
                                },
                            }}
                            rootProps={{ 'data-testid': '4' }}
                            legendToggle
                        />                
                        {/* <Col flex={2}>
                            <FormGroup style={{ width: "20vw", margin: "0 auto" }}>
                                <label>Select some variable  </label>
                                <Select defaultValue="Brazil" style={{ width: 100 }} onChange={(e) => {
                                   this.setHomeTeam(e)
                                }}>
                                    <Option value="England">England</Option>
                                    <Option value="Argentina">Argentina</Option>
                                    <Option value="Spain">Spain</Option>
                                    <Option value="Germany">Germany</Option>
                                    <Option value="Italy">Italy</Option>
                                    <Option value="Uruguay">Uruguay</Option>
                                </Select>
                            </FormGroup>
                        </Col> */}
                        {/* <Col flex={2}>
                            <FormGroup style={{ width: "20vw", margin: "0 auto"}}>
                                <label>Away Team   :</label>
                                <Select defaultValue="England" style={{ width: 150 }}  onChange={(e) => {
                                    this.setAwayTeam(e)}}>
                                    <Option value="Brazil">Brazil</Option>
                                    <Option value="England">England</Option>
                                    <Option value="Spain">Spain</Option>
                                    <Option value="Uruguay">Uruguay</Option>
                                    <Option value="Germany">Germany</Option>
                                    <Option value="Netherlands">Netherlands</Option>
                                    <Option value="Argentina">Argentina</Option>
                                    <Option value="Italy">Italy</Option>
                                </Select>

                            </FormGroup>
                        </Col> */}
                        {/* <Col flex={2}>
                            <div className="App" align="center" style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                                <Button onClick={this.matchOnChangeTeams}
                                type="button"
                                buttonStyle="btn--primary-outline"
                                buttonSize= "btn-medium"
                                >Select Teams</Button>
                            </div>
                        </Col> */}
                    </Row>
                </Form>

                <Divider />
                {/* <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <center>
                    <h2>Matches History </h2>
                    </center>
                    <Table dataSource={this.state.statMatchesResults} columns={statsMatchesColumns}  variant="dark" pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 8}}/>
                </div> */}
                <Divider />
                {/* <center>
                <h2>Last Game Played</h2>
                </center>
                {this.state.matchDetails ? (
                    <div style={{ width: "70vw", margin: "0 auto", marginTop: "2vh" }}>
                        <Card>
                            <CardBody>
                                <Row gutter="30" align="middle" justify="center">
                                    <Col flex={2} style={{ textAlign: "left" }}>
                                        <CardTitle>
                                            <div align="center">
                                                <CardPic
                                                    title='Team'
                                                    imageUrl='https://www.sciencekids.co.nz/images/pictures/flags680/'
                                                    team = {this.state.homeTeam}
                                                />
                                            </div>
                                        </CardTitle>
                                    </Col>
                                    <Col flex={2} style={{ textAlign: "center" }}>
                                        <h4>Year: {this.state.matchDetails.Year}</h4>
                                    </Col>
                                    <Col flex={2} style={{ textAlign: "right" }}>

                                        <CardTitle>
                                            <div align="center"><CardPic
                                                title='Team'
                                                imageUrl='https://www.sciencekids.co.nz/images/pictures/flags680/'
                                                team = {this.state.awayTeam}/>
                                            </div>
                                        </CardTitle>

                                    </Col>

                                </Row>
                                <Row gutter="30" align="middle" justify="center">
                                    <Col span={9} style={{ textAlign: "center" }}>
                                        <h3>{this.state.matchDetails.Home_Team_Goals}</h3>

                                    </Col>
                                    <Col span={6} style={{ textAlign: "center" }}>
                                        Goals
                                    </Col>

                                    <Col span={9} style={{ textAlign: "center" }}>
                                        <h3>{this.state.matchDetails.Away_Team_Goals}</h3>
                                    </Col>
                                </Row>
                                 <Row gutter="30" align="middle" justify="center">
                                    <Col span={9} style={{ textAlign: "center" }}>
                                        <h5>{this.state.matchDetails.Half_time_Home_Goals}</h5>
                                    </Col>
                                    <Col span={6} style={{ textAlign: "center" }}>
                                        Half Time
                                    </Col>
                                    <Col span={9} style={{ textAlign: "center" }}>
                                        <h5>{this.state.matchDetails.Half_time_Away_Goals}</h5>
                                    </Col>
                                     <Col flex={2} style={{ textAlign: "center" }}>
                                         <div><span> &nbsp; </span></div>
                                         <h6>Stadium: {this.state.matchDetails.Stadium}</h6>
                                         <h6>Stage: {this.state.matchDetails.Stage}</h6>
                                         <h6>Referee: {this.state.matchDetails.Referee}</h6>
                                     </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </div>
                ) : null} */}
                <Divider />
                {/* <center>
                    <h2>Number of Goals throughout Matches History </h2>
                </center>
                    <div className='chart'  style={{ width: "70vw", margin: "0 auto", marginTop: "2vh" }}>
                        <LineChart
                            home_team={this.state.homeTeam}
                            away_team={this.state.awayTeam}
                            home_goals={this.state.homeTeamGoals}
                            away_goals={this.state.awayTeamGoals}
                            years={this.state.list_of_years}
                        />
                    </div> */}
            </div>
        );
    }
}

export default WagePage;

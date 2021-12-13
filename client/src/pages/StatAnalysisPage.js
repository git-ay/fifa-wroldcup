import React from "react";
import regression from 'regression'; // Alex: npm install --save regression required.
import { Chart } from "react-google-charts"; // Alex: yarn add react-google-charts OR npm i react-google-charts (https://react-google-charts.com/)
import { Form, Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from "shards-react"; // npm install @mui/material @emotion/react @emotion/styled, npm install --save react-chartjs-2 chart.js
import { Row } from "antd"; // removed "webpack": "^5.65.0" from the package
import { getWageSomeVar, getRankAndPlayer, getAvgGoalPerMatch } from "../fetcher";
import MenuBar from "../components/MenuBar"; // npm install --legacy-peer-deps 

function makeRegInput(input, someVar) {
    let i = 0;
    let regInput = [];
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
    return regInput;
}

function makeRegPlotInput(pointEstimates, wageAndSomeVar) {
    let i = 0;
    let plotInput = [];
    while (i<pointEstimates.length) { 
        let w = wageAndSomeVar[i]['Wage'];
        if (typeof(w)==String) { w = w.replace('[^0-9.]+','') }
        w = parseFloat(w);
        if ( w < 500 ) { plotInput.push(pointEstimates[i].concat([ w ])); } // There are some outliers...
        i++; 
    }
    return plotInput;
}

function makeRankPlotInput(rankPlyr, ranking) {
    let i = 0;
    let plotInput = [];
    while (i<rankPlyr.length) { 
        plotInput.push([
            ranking.concat(': ', rankPlyr[i][ranking]), 
            rankPlyr[i]['playerWithMaxEvents'].concat(' was representing ', rankPlyr[i][ranking], ' with ',rankPlyr[i]['numEvents'], ' events'), 
            new Date(rankPlyr[i]['year'], 1, 1),
            new Date(rankPlyr[i]['year']+1, 1, 1)])
        i++;
    }
    return plotInput;
}

function makeAvgGoalPlotInput(avg) {
    let i = 0;
    let plotInput = [];
    while (i<avg.length) { 
        plotInput.push([avg[i]['Ctry'], avg[i]['AvgGoalPerMatch']])
        i++;
    }
    return plotInput;
}

class statAnalysis extends React.Component {

    constructor(props) {
        super(props);
        
        this.toggle = this.toggle.bind(this)
        this.secToggle = this.secToggle.bind(this)
        this.thrToggle = this.thrToggle.bind(this)
        this.state = {
            someVar: "OverallRating",
            wageAndSomeVar: [],
            results: [],
            pointEstimates: [],
            beta: "",
            intercept: "",
            mdlStr: "",
            open: false,
            r_square: "",
            //
            rank: "Winner",
            rankPlayer: [],
            //
            avgGoals: []
        };
        
    }
    toggle() { this.setState(prevState => {return {open: !prevState.open };}); }
    secToggle() { this.setState(prevState => {return {secOpen: !prevState.secOpen };}); }
    thrToggle() { this.setState(prevState => {return {thrOpen: !prevState.thrOpen };}); }
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
    setAndGetRankAndPlayer(ranking) {
        this.state.rank = ranking;
        console.log("r1", this.state.rank);
        getRankAndPlayer(ranking).then((res) => {
            this.setState({ rankPlayer: res.results });
            console.log("r2", this.state.rankPlayer)
        })        
    }
    generatePlot() {
        getAvgGoalPerMatch().then((res) => {
            this.setState({ avgGoals: res.results });
        })        
    }    

    render() {
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
                            data={[['x = '.concat(this.state.someVar), 'ŷ = Estimated wage (in $1000)', 'y = Wage (in $1000)']].concat(makeRegPlotInput(this.state.pointEstimates, this.state.wageAndSomeVar))}
                            options={{
                                chart: {
                                title: 'Wage estimate'.concat(' from ', this.state.someVar),
                                subtitle: 'Linear regression model: '.concat(this.state.mdlStr, '   (R^2: ', this.state.r_square, ')'),
                                },
                                width: 1000,
                                height: 400,
                                series: {
                                    0: { axis: 'ŷ = Estimated wage (in $1000)' },
                                    1: { axis: 'y = Wage (in $1000)', targetAxisIndex:1 }
                                },
                                axes: {
                                y: {
                                    'ŷ = Estimated wage (in $1000)': { label: 'ŷ = Estimated wage (in $1000)' },
                                    'y = Wage (in $1000)': { label: 'y = Wage (in $1000)' },
                                },            
                                },
                            }}
                            legendToggle
                        />                
                    </Row>
                </Form>
                
                <Form style={{ width: "50vw", margin: "3vh", marginTop: "3vh" }} >
                <Dropdown open={this.state.secOpen} toggle={this.secToggle}>
                    <DropdownToggle outline theme="info">Select the ranking</DropdownToggle>
                    <DropdownMenu> {/*primary, secondary, success, danger, warning, info, light and dark*/}
                        <DropdownItem value="Winner" onClick={() => { this.setAndGetRankAndPlayer("Winner"); }}>Winner</DropdownItem>
                        <DropdownItem value="Runners_Up" onClick={() => { this.setAndGetRankAndPlayer("Runners_Up"); }}>Runners_Up</DropdownItem>
                        <DropdownItem value="Third" onClick={() => { this.setAndGetRankAndPlayer("Third"); }}>Third</DropdownItem>
                        <DropdownItem value="Fourth" onClick={() => { this.setAndGetRankAndPlayer("Fourth"); }}>Fourth</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                </Form>

                <Form style={{ width: "20vw", margin: "8vh", marginTop: "4vh" }}>
                    <Row>   
                <Chart
                    width={'400%'}
                    height={'400px'}
                    chartType="Timeline"
                    loader={<div>Loading Chart</div>}
                    data={[
                        [
                        { type: 'string', id: 'Position' },
                        { type: 'string', id: 'Name' },
                        { type: 'date', id: 'Start' },
                        { type: 'date', id: 'End' },
                        ]
                    ].concat(makeRankPlotInput(this.state.rankPlayer, this.state.rank))}
                    options={{
                        timeline: { colorByRowLabel: false },
                    }}
                />
                    </Row>
                </Form>                                
                
                <Form style={{ width: "50vw", margin: "3vh", marginTop: "1vh" }} >
                <Dropdown open={this.state.thrOpen} toggle={this.thrToggle} >
                    <DropdownToggle outline theme="info" >Generate Average goal per match for each country</DropdownToggle>
                    <DropdownMenu> {/*primary, secondary, success, danger, warning, info, light and dark*/}
                    <DropdownItem value="Generate" onClick={() => { this.generatePlot(); }}>Generate</DropdownItem>
                    </DropdownMenu>
                </Dropdown>
                </Form>                

                <Form style={{ width: "20vw", margin: "8vh", marginTop: "4vh" }}>
                <Row>   
                <Chart
                    width={'600px'}
                    height={'400px'}
                    chartType="Histogram"
                    loader={<div>Loading Chart</div>}
                    data={[
                        ['Country','Average goal per match']
                    ].concat(makeAvgGoalPlotInput(this.state.avgGoals))}
                    options={{
                        title: 'Distribution of the average goals per match',
                        legend: { position: 'none' },
                    }}
                    rootProps={{ 'data-testid': '1' }}
                />

            </Row>      
            </Form>                                                

            </div>
        );
    }
}

export default statAnalysis;

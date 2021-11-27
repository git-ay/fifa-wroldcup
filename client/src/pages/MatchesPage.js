import React from "react";
import {Card,} from "react-bootstrap";
import ChartistGraph from "react-chartist";
import LineChart from "../components/LineChart";

import {
    Form,
    FormInput,
    FormGroup,
    Button,
    CardBody,
    CardTitle,
    Progress,
} from "shards-react";


import { Table, Pagination, Row, Col, Divider, Select } from "antd";
import {getMatchSearch, getMatch, getAllStats,getAllMatchesStats} from "../fetcher";

import MenuBar from "../components/MenuBar";
const { Option } = Select;

const { Column, ColumnGroup } = Table;
const statsMatchesColumns = [
    {
        title: 'Year',
        dataIndex: 'year',
        key: 'year',
    },
    // {
    //     title: 'Datetime',
    //     dataIndex: 'Datetime',
    //     key: 'Datetime',
    // },
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


class MatchesPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            awayQuery: "",
            homeQuery: "",
            matchesResults: [],
            selectedMatchId: window.location.search
                ? window.location.search.substring(1).split("=")[1]
                : 0,
            selectedMatchDetails: null,
            statResults: [],
            statMatchesResults: [],

        };

        this.handleAwayQueryChange = this.handleAwayQueryChange.bind(this);
        this.handleHomeQueryChange = this.handleHomeQueryChange.bind(this);
        this.updateSearchResults = this.updateSearchResults.bind(this);
        this.goToMatch = this.goToMatch.bind(this);
        this.matchOnChange = this.matchOnChange.bind(this)
    }

    handleAwayQueryChange(event) {
        this.setState({ awayQuery: event.target.value });
    }

    handleHomeQueryChange(event) {
        // TASK 10: update state variables appropriately. See handleAwayQueryChange(event) for reference
        this.setState({ homeQuery: event.target.value });
    }
    goToMatch(matchId) {
        window.location = `/matches?id=${matchId}`
    }

    updateSearchResults() {
        //TASK 11: call getMatchSearch and update matchesResults in state. See componentDidMount() for a hint
        getMatchSearch(this.state.homeQuery, this.state.awayQuery, null, null).then(
            (res) => {
                this.setState({ matchesResults: res.results });
            }
        );
    }


    matchOnChange(value) {
        getAllMatchesStats(null, null, value).then((res) => {
            this.setState({ statMatchesResults: res.results });
        });
    }


    componentDidMount() {
        getMatchSearch(this.state.homeQuery, this.state.awayQuery, null, null).then(res => {
            this.setState({ matchesResults: res.results })
        })
        getAllStats(null, null, 'cristiano ronaldo').then(res => {
            console.log(res.results)
            // TASK 1: set the correct state attribute to res.results
            this.setState({ statResults: res.results })
        })

        getAllMatchesStats(null, null, 'Brazil').then(res => {
            console.log(res.results)
            // TASK 1: set the correct state attribute to res.results
            this.setState({ statMatchesResults: res.results })
        })

        getMatch(this.state.selectedMatchId).then(res => {
            this.setState({ selectedMatchDetails: res.results[0] })
        })



    }

    goToMatch(matchId) {
        window.location = `/matches?id=${matchId}`
    }


    render() {
        return (
            <div>
                <MenuBar />

                <Form style={{ width: "80vw", margin: "0 auto", marginTop: "5vh" }}>
                    <Row>
                        <Col flex={2}>
                            <FormGroup style={{ width: "20vw", margin: "0 auto" }}>
                                <label>Home Team   :</label>
                                <Select defaultValue="Brazil" style={{ width: 150 }} onChange={this.matchOnChange}>
                                    <Option value="England">England</Option>
                                    <Option value="Argentina">Argentina</Option>
                                    <Option value="Spain">Spain</Option>
                                    <Option value="Germany">Germany</Option>
                                    <Option value="Italy">Italy</Option>
                                    <Option value="Uruguay">Uruguay</Option>
                                </Select>
                            </FormGroup>
                        </Col>
                        <Col flex={2}>
                            <FormGroup style={{ width: "20vw", margin: "0 auto" }}>
                                <label>Away Team   :</label>
                                <Select defaultValue="England" style={{ width: 150 }} onChange={this.matchOnChange}>
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
                        </Col>
                        <Col flex={2}>
                        </Col>
                    </Row>
                </Form>
                <Divider />
                <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                    <center>
                    <h2>Matches History </h2>
                    </center>
                    <Table dataSource={this.state.statMatchesResults} columns={statsMatchesColumns}  variant="dark" pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 8}}/>
                </div>
                <Divider />
                {this.state.selectedMatchDetails ? (
                    <div style={{ width: "70vw", margin: "0 auto", marginTop: "2vh" }}>
                        <Card>
                            <CardBody>
                                <Row gutter="30" align="middle" justify="center">
                                    <Col flex={2} style={{ textAlign: "left" }}>
                                        <CardTitle>
                                            {this.state.selectedMatchDetails.Home}
                                        </CardTitle>
                                    </Col>
                                    <Col flex={2} style={{ textAlign: "center" }}>
                                        {this.state.selectedMatchDetails.Date} at{" "}
                                        {this.state.selectedMatchDetails.Time}
                                    </Col>
                                    {/* TASK 13: Add a column with flex = 2, and text alignment = right to display the name of the away team - similar to column 1 in this row */}

                                    <Col flex={2} style={{ textAlign: "right" }}>
                                        <CardTitle>
                                            {this.state.selectedMatchDetails.Away}
                                        </CardTitle>
                                    </Col>
                                </Row>
                                <Row gutter="30" align="middle" justify="center">
                                    <Col span={9} style={{ textAlign: "left" }}>
                                        <h3>{this.state.selectedMatchDetails.HomeGoals}</h3>
                                    </Col>
                                    <Col span={6} style={{ textAlign: "center" }}>
                                        Goals
                                    </Col>
                                    {/* TASK 14: Add a column with span = 9, and text alignment = right to display the # of goals the away team scored - similar 1 in this row */}

                                    <Col span={9} style={{ textAlign: "right" }}>
                                        <h3>{this.state.selectedMatchDetails.AwayGoals}</h3>
                                    </Col>
                                </Row>
                                 <Row gutter="30" align="middle" justify="center">
                                    <Col span={9} style={{ textAlign: "left" }}>
                                        <h5>{this.state.selectedMatchDetails.HTHomeGoals}</h5>
                                    </Col>
                                    <Col span={6} style={{ textAlign: "center" }}>
                                        Half Time
                                    </Col>
                                    <Col span={9} style={{ textAlign: "right" }}>
                                        <h5>{this.state.selectedMatchDetails.HTAwayGoals}</h5>
                                    </Col>
                                </Row>
                                <Row gutter="30" align="middle" justify="center">
                                    <Col span={9} style={{ textAlign: "left" }}>
                                        <Progress
                                            value={
                                                (this.state.selectedMatchDetails.ShotsOnTargetHome *
                                                    100) /
                                                this.state.selectedMatchDetails.ShotsHome
                                            }
                                        >
                                            {this.state.selectedMatchDetails.ShotsOnTargetHome} /{" "}
                                            {this.state.selectedMatchDetails.ShotsHome}
                                        </Progress>
                                    </Col>
                                    <Col span={6} style={{ textAlign: "center" }}>
                                        Shot Accuracy
                                    </Col>
                                    <Col span={9} style={{ textAlign: "right" }}>
                                        {/* TASK 18: add a progress bar to display the shot accuracy for the away team -  look at the progress bar in column 1 of this row for reference*/}
                                        <Progress
                                            value={
                                                (this.state.selectedMatchDetails.ShotsOnTargetAway *
                                                    100) /
                                                this.state.selectedMatchDetails.ShotsAway
                                            }
                                        >
                                            {this.state.selectedMatchDetails.ShotsOnTargetAway} /{" "}
                                            {this.state.selectedMatchDetails.ShotsAway}
                                        </Progress>
                                    </Col>
                                </Row>
                                <Row gutter="30" align="middle" justify="center">
                                    <Col span={9} style={{ textAlign: "left" }}>
                                        <h5>{this.state.selectedMatchDetails.CornersHome}</h5>
                                    </Col>
                                    <Col span={6} style={{ textAlign: "center" }}>
                                        Corners
                                    </Col>
                                    <Col span={9} style={{ textAlign: "right" }}>
                                        <h5>{this.state.selectedMatchDetails.CornersAway}</h5>
                                    </Col>
                                </Row>
                                {/* TASK 16: add a row for fouls cards - check out the above lines for how we did it for corners */}
                                <Row gutter="30" align="middle" justify="center">
                                    <Col span={9} style={{ textAlign: "left" }}>
                                        <h5>{this.state.selectedMatchDetails.FoulsHome}</h5>
                                    </Col>
                                    <Col span={6} style={{ textAlign: "center" }}>
                                        Fouls
                                    </Col>
                                    <Col span={9} style={{ textAlign: "right" }}>
                                        <h5>{this.state.selectedMatchDetails.FoulsAway}</h5>
                                    </Col>
                                </Row>
                                <Row gutter="30" align="middle" justify="center">
                                    <Col span={9} style={{ textAlign: "left" }}>
                                        <h5>{this.state.selectedMatchDetails.RCHome}</h5>
                                    </Col>
                                    <Col span={6} style={{ textAlign: "center" }}>
                                        Red Cards
                                    </Col>
                                    <Col span={9} style={{ textAlign: "right" }}>
                                        <h5>{this.state.selectedMatchDetails.RCAway}</h5>
                                    </Col>
                                </Row>
                                {/* TASK 17: add a row for yellow cards - check out the above lines for how we did it for red cards */}
                                <Row gutter="30" align="middle" justify="center">
                                    <Col span={9} style={{ textAlign: "left" }}>
                                        <h5>{this.state.selectedMatchDetails.YCHome}</h5>
                                    </Col>
                                    <Col span={6} style={{ textAlign: "center" }}>
                                        Yellow Cards
                                    </Col>
                                    <Col span={9} style={{ textAlign: "right" }}>
                                        <h5>{this.state.selectedMatchDetails.YCAway}</h5>
                                    </Col>
                                </Row>
                            </CardBody>
                        </Card>
                    </div>
                ) : null}
                <Divider />
                <div className='chart'  style={{ width: "70vw", margin: "0 auto", marginTop: "2vh" }}>
                        <LineChart />
                </div>
                <div style={{ width: "70vw", margin: "0 auto", marginTop: "2vh" }}>

                    <Card>
                        <Card.Header>
                            <Card.Title as="h4">Email Statistics</Card.Title>
                            <p className="card-category">Last Campaign Performance</p>
                        </Card.Header>
                        <Card.Body>
                            <div
                                className="ct-chart ct-perfect-fourth"
                                id="chartPreferences"
                            >
                                <ChartistGraph
                                    data={{
                                        labels: ["40%", "20%", "40%"],
                                        series: [40, 20, 40],
                                    }}
                                    type="Pie"
                                />
                            </div>
                            <div className="legend">
                                <i className="fas fa-circle text-info"></i>
                                Open <i className="fas fa-circle text-danger"></i>
                                Bounce <i className="fas fa-circle text-warning"></i>
                                Unsubscribe
                            </div>
                            <hr></hr>
                            <div className="stats">
                                <i className="far fa-clock"></i>
                                Campaign sent 2 days ago
                            </div>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        );
    }
}

export default MatchesPage;

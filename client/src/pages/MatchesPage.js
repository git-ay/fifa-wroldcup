import React from "react";
import {Card,} from "react-bootstrap";
import LineChart from "../components/LineChart";
import CardPic from "../CardPic";
import {Button} from "../components/Button";

import {
    Form,
    FormGroup,
    CardBody,
    CardTitle,
} from "shards-react";


import { Table, Row, Col, Divider, Select } from "antd";
import {getMatchSearch, getMatch, getMatchStats, getAllStats,getAllMatchesStats} from "../fetcher";

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
            matchId: window.location.search
                ? window.location.search.substring(1).split("=")[1]
                : 0,
            selectedMatchDetails: null,
            matchDetails: null,
            statResults: [],
            statMatchesResults: [],

        };

        this.handleHomeQueryChange = this.handleHomeQueryChange.bind(this);
        this.updateSearchResults = this.updateSearchResults.bind(this);
        this.goToMatch = this.goToMatch.bind(this);
        this.matchOnChange = this.matchOnChange.bind(this)
    }

    handleAwayQueryChange(event) {
        this.setState({ awayQuery: event.target.value });
    }

    handleHomeQueryChange(event) {
        this.setState({ homeQuery: event.target.value });
    }
    goToMatch(matchId) {
        window.location = `/matches?id=${matchId}`
    }

    updateSearchResults() {
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

        getMatchStats().then(res => {
            this.setState({ matchDetails: res.results[0] })
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
                            <div className="App" align="center" style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
                                <Button onClick={(console.log("You clicked on me"))}
                                type="button"
                                buttonStyle="btn--primary-outline"
                                buttonSize= "btn-medium"
                                >Select Teams</Button>
                            </div>
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
                <center>
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
                                                    team = {this.state.matchDetails.Home_Team_Name}
                                                />
                                            </div>
                                            {/*{this.state.matchDetails.Home_Team_Name}*/}
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
                                                team = {this.state.matchDetails.Away_Team_Name}/>
                                            </div>
                                            {/*{this.state.matchDetails.Away_Team_Name}*/}
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
                ) : null}
                <Divider />
                <center>
                    <h2>Number of Goals throughout Matches History </h2>
                </center>
                {this.state.matchDetails ? (
                    <div className='chart'  style={{ width: "70vw", margin: "0 auto", marginTop: "2vh" }}>
                            <LineChart
                                team = {this.state.matchDetails.Away_Team_Name} />
                    </div>
                ) : null}
            </div>
        );
    }
}

export default MatchesPage;

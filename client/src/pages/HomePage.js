import React, {useState} from 'react';

import {
  Table,
  Pagination,
  Select, Row, Col, Divider
} from 'antd'

import MenuBar from '../components/MenuBar';
import {playerNames, getAllStats, getAllMatches, getAllPlayers, getPlayerNames} from '../fetcher'
import {Button, Form, FormGroup, FormInput} from "shards-react";
const { Column, ColumnGroup } = Table;
const { Option } = Select;



const playerColumns = [
  {
    title: 'Name',
    dataIndex: 'Name',
    key: 'Name',
    sorter: (a, b) => a.Name.localeCompare(b.Name),
    render: (text, row) => <a href={`/players?id=${row.PlayerId}`}>{text}</a>
  },
  {
    title: 'Nationality',
    dataIndex: 'Nationality',
    key: 'Nationality',
    sorter: (a, b) => a.Nationality.localeCompare(b.Nationality)
  },
  {
    title: 'Rating',
    dataIndex: 'Rating',
    key: 'Rating',
    sorter: (a, b) => a.Rating - b.Rating

  },
  // TASK 7: add a column for Potential, with the ability to (numerically) sort ,
  {
    title: 'Potential',
    dataIndex: 'Potential',
    key: 'Potential',
    sorter: (a, b) => a.Potential - b.Potential

  },
  // TASK 8: add a column for Club, with the ability to (alphabetically) sort
  {
    title: "Club",
    dataIndex: "Club",
    key: "Club",
    sort: (a, b) => a.Club.localeCompare(b.Club),
  },
  // TASK 9: add a column for Value - no sorting required
  {
    title: "Value",
    dataIndex: "Value",
    key: "Value",
  },
];


const statsColumns = [
  {
    title: 'Round',
    dataIndex: 'RoundID',
    key: 'RoundID',
    sorter: (a, b) => a.RoundID.localeCompare(b.RoundID),
    render: (text, row) => <a href={`/stats=${row.stats}`}>{text}</a>
  },
  {
    title: 'Match',
    dataIndex: 'MatchID',
    key: 'MatchID',
    sorter: (a, b) => a.MatchID.localeCompare(b.MatchID)
  },
  {
    title: 'Team_Initials',
    dataIndex: 'Team_Initials',
    key: 'Team_Initials',
    sorter: (a, b) => a.Rating - b.Rating

  },
  // TASK 7: add a column for Potential, with the ability to (numerically) sort ,
  {
    title: 'Coach_Name',
    dataIndex: 'Coach_Name',
    key: 'Coach_Name',
    sorter: (a, b) => a.Potential - b.Potential

  },
];


class HomePage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      matchesResults: [],
      playerName: "",
      player_stat: [],
      matchesPageNumber: 1,
      matchesPageSize: 10,
      playersResults: [],
      statResults: [],
      playerNames: [],
      valueTest: null,
      pagination: null
    }

    this.leagueOnChange = this.leagueOnChange.bind(this)
    this.goToMatch = this.goToMatch.bind(this)
    this.goToStat = this.goToStat.bind(this)


  }

  goToMatch(matchId) {
    window.location = `/matches?id=${matchId}`
  }

  goToStat() {
    window.location = `/stat`
  }

  leagueOnChange(value) {
    // TASK 2: this value should be used as a parameter to call getAllMatches in fetcher.js with the parameters page and pageSize set to null
    // then, matchesResults in state should be set to the results returned - see a similar function call in componentDidMount()
    getAllMatches(null, null, value).then((res) => {
      this.setState({ matchesResults: res.results });
      this.state.valueTest = value

    });
  }

  componentDidMount()  {
    getAllMatches(null, null, 'D1').then(res => {
      this.setState({ matchesResults: res.results })
      console.log(res)
    })


    getAllStats().then(res => {
      console.log(res.results)
      // TASK 1: set the correct state attribute to res.results
      this.setState({ statResults: res.results })
    })

    getPlayerNames().then(res => {
      console.log(res.results)
      // TASK 1: set the correct state attribute to res.results
      this.setState({ playerNames: res.results })
    })

    getAllPlayers().then(res => {
      console.log(res.results)
      // TASK 1: set the correct state attribute to res.results
      this.setState({ playersResults: res.results })
    })


  }


  render() {


    return (

        <div>
          <MenuBar />

          <Form style={{ width: "80vw", margin: "0 auto", marginTop: "5vh" }}>
            <Row>
              <Col flex={2}>
                <FormGroup style={{ width: "20vw", margin: "0 auto" }}>
                  <label>Player Name</label>
                  <FormInput
                      placeholder="cristiano ronaldo..."
                      value={this.state.playerName}
                      onChange={this.handleHomeQueryChange}
                  />
                </FormGroup>

              </Col>
              <Col flex={2}>
                <FormGroup style={{ width: "20vw", margin: "0 auto" }}>
                  <label>Year</label>
                  <FormInput
                      placeholder="2014..."
                      value={this.state.awayQuery}
                      onChange={this.handleAwayQueryChange}
                  />
                </FormGroup>
              </Col>
              <Col flex={2}>
                <FormGroup style={{ width: "10vw" }}>
                  <Button
                      style={{ marginTop: "2.5vh" }}
                      onClick={this.updateSearchResults}
                  >
                    Search
                  </Button>
                </FormGroup>
                <Select defaultValue="cristiano ronaldo" style={{ width: 150 }} onChange={this.leagueOnChange}>
                  <Option player="cristiano ronaldo">Ronaldo</Option>
                  {/* TASK 3: Take a look at Dataset Information.md from MS1 and add other options to the selector here  */}
                  <Option player="SP1">Messi</Option>
                  <Option player="F1">Neymar</Option>
                  <Option player="I1">aaa</Option>
                  <Option player="E0">bbb</Option>
                </Select>
              </Col>
            </Row>
          </Form>

          <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
            <h3>Player Statistics </h3>
            <Table dataSource={this.state.statResults} columns={statsColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 3}}/>
          </div>
          <Divider />
          <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh' }}>
            <h3>Players</h3>
            <Table dataSource={this.state.playersResults} columns={playerColumns} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 5, showQuickJumper:true }}/>
          </div>
          <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
            <h3>Matches</h3>
            <Select defaultValue="D1" style={{ width: 150 }} onChange={this.leagueOnChange}>
              <Option value="D1">Bundesliga</Option>
              {/* TASK 3: Take a look at Dataset Information.md from MS1 and add other options to the selector here  */}
              <Option value="SP1">La Liga</Option>
              <Option value="F1">Ligue 1</Option>
              <Option value="I1">Serie A</Option>
              <Option value="E0">Premier League</Option>
            </Select>

            <Table onRow={(record, rowIndex) => {
              return {
                onClick: event => {this.goToMatch(record.MatchId)}, // clicking a row takes the user to a detailed view of the match in the /matches page using the MatchId parameter
              };
            }} dataSource={this.state.matchesResults} pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 3, showQuickJumper:true }}>
              <ColumnGroup title="Teams">
                {/* TASK 4: correct the title for the 'Home' column and add a similar column for 'Away' team in this ColumnGroup */}
                <Column title="Home" dataIndex="Home" key="Home" sorter= {(a, b) => a.Home.localeCompare(b.Home)}/>
                <Column title="Away" dataIndex="Away" key="Away" sorter= {(a, b) => a.Away.localeCompare(b.Away)}/>
              </ColumnGroup>
              <ColumnGroup title="Goals">
                {/* TASK 5: add columns for home and away goals in this ColumnGroup, with the ability to sort values in these columns numerically */}
                <Column title="Home" dataIndex="HomeGoals" key="HomeGoals" sorter= {(a, c) => a.Home.localeCompare(c.Goals)}/>
                <Column title="Away" dataIndex="AwayGoals" key="GoalsAway" sorter= {(a, c) => a.Away.localeCompare(c.Goals)}/>

              </ColumnGroup>
              {/* TASK 6: create two columns (independent - not in a column group) for the date and time. Do not add a sorting functionality */}
              <Column title="Date" dataIndex="Date" key="Date" />
              <Column title="Time" dataIndex="Time" key="Time" />
            </Table>

          </div>

        </div>
    )
  }

}

export default HomePage


import React from 'react';

import {
  Table,
  Select, Row, Col, Divider
} from 'antd'



import MenuBar from '../components/MenuBar';
import {getAllStats, getAllMatches, getAllPlayers, getPlayerNames} from '../fetcher'
import {Button, Form, FormGroup, FormInput} from "shards-react";
const { Column, ColumnGroup } = Table;
const { Option } = Select;





const statsColumns = [
  {
    title: 'player',
    dataIndex: 'player',
    key: 'player',
  },
  {
    title: 'Goals',
    dataIndex: 'Goals',
    key: 'Goals',
  },
  {
    title: 'Yellow_Cards',
    dataIndex: 'Yellow_Cards',
    key: 'Yellow_Cards',

  },
  {
    title: 'Red_Cards',
    dataIndex: 'Red_Cards',
    key: 'Red_Cards',

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
      pagination: null
    }

    this.leagueOnChange = this.leagueOnChange.bind(this)
    this.playerOnChange = this.playerOnChange.bind(this)
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
    getAllMatches(null, null, value).then((res) => {
      this.setState({ matchesResults: res.results });
    });
  }

  playerOnChange(value) {
    getAllStats(null, null, value).then((res) => {
      this.setState({ statResults: res.results });

    });
  }


  componentDidMount()  {
    getAllMatches(null, null, 'D1').then(res => {
      this.setState({ matchesResults: res.results })
      console.log(res)
    })


    getAllStats(null, null, 'cristiano ronaldo').then(res => {
      console.log(res.results)
      this.setState({ statResults: res.results })
    })

  }


  render() {


    return (

        <div>
          <MenuBar />

          <Form style={{ width: "80vw", margin: "0 auto", marginTop: "5vh" }}>
            <Row>
              <Col flex={2}>
                <FormGroup style={{ width: "10vw" }}>
                </FormGroup>
                <Select defaultValue="Ronaldo" style={{ width: 150 }} onChange={this.playerOnChange}>
                  <Option value="cristiano ronaldo">Ronaldo</Option>
                  <Option value="lionel messi">Messi</Option>
                  <Option value="neymar">Neymar</Option>
                  <Option value="robert lewandowski">Lewandowski</Option>
                  <Option value="sergio ramos">Sergio Ramos</Option>
                  <Option value="karim benzema">Karim Benzema</Option>
                </Select>
              </Col>
            </Row>
          </Form>
          <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
            <h3>Player Statistics </h3>
            <Table dataSource={this.state.statResults} columns={statsColumns}  variant="dark" pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 3}}/>
          </div>

        </div>
    )
  }

}

export default HomePage


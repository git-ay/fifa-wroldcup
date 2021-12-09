import React from 'react';
import {Divider, Table} from 'antd'
import MenuBar from '../components/MenuBar';
import CardTeam from "../components/CardTeam";
import Item from "antd/es/list/Item";
import {getAllMatchesStats} from "../fetcher";

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


class HomePage extends React.Component {

  componentDidMount() {
    getAllMatchesStats(null, null, 'Spain', 'England').then(res => {
      this.setState({ statMatchesResults: res.results })
    })


  }

  constructor(props) {
    super(props)

    this.state = {
      matchesResults: [],
      playerName: "",

    }


  }






  render() {


    return (

        <div>
          <MenuBar />

          <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} align="center">
            <h2>Choose Team </h2>

          </div>
          <Divider />
          <div className="row" align="center" style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
            <div className="column">
              <Item><CardTeam team={'Afghanistan'}/></Item>
            </div>
            <div className="column">
              <Item><CardTeam team={'Brazil'}/></Item>
            </div>
            <div className="column">
              <Item><CardTeam team={'England'}/></Item>
            </div>
            <div className="column">
              <Item><CardTeam team={'Spain'}/></Item>
            </div>
            <div className="column">
              <Item><CardTeam team={'Italy'}/></Item>
            </div>
            <div className="column">
              <Item><CardTeam team={'Angola'}/></Item>
            </div>
            <div className="column">
              <Item><CardTeam team={'Chile'}/></Item>
            </div>
            <div className="column">
              <Item><CardTeam team={'Finland'}/></Item>
            </div>
            <div className="column">
              <Item><CardTeam team={'Japan'}/></Item>
            </div>
            <div className="column">
              <Item><CardTeam team={'Mexico'}/></Item>
            </div>
            <div className="column">
              <Item><CardTeam team={'Peru'}/></Item>
            </div>
            <div className="column">
              <Item><CardTeam team={'Morocco'}/></Item>
            </div>
            {/*<div className="column">
              <Item><CardTeam team={'Slovenia'}/></Item>
            </div>*
            <div className="column">
              <Item><CardTeam team={'Netherlands'}/></Item>
            </div>*
            <div className="column">
              <Item><CardTeam team={'Nigeria'}/></Item>
            </div>*
            <div className="column">
              <Item><CardTeam team={'Paraguay'}/></Item>
            </div>
            <div className="column">
              <Item><CardTeam team={'Austria'}/></Item>
            </div>*/}
            <Divider />
            <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
              <center>
                <h2>Top Scorers </h2>
                <h4>selected team</h4>
              </center>
              <Divider />
              <Table dataSource={this.state.statMatchesResults} columns={statsMatchesColumns}  variant="dark" pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 8}}/>
            </div>
          </div>

        </div>
    )
  }

}

export default HomePage


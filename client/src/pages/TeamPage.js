import React from 'react';
import {Divider, Table} from 'antd'
import MenuBar from '../components/MenuBar';
import CardTeam from "../components/CardTeam";
import Item from "antd/es/list/Item";
import {getWorldCupGoals, getBestScorers} from "../fetcher";
const scorerColumns = [
  {
    title: 'Player_Name',
    dataIndex: 'Player_Name',
    key: 'Player_Name',
  },
  {
    title: 'Goals',
    dataIndex: 'Goals',
    key: 'Goals',

  },
];

const worldCupGoalsColumns = [
  {
    title: 'Team',
    dataIndex: 'Team',
    key: 'Team',
  },
  {
    title: 'Goals',
    dataIndex: 'Goals',
    key: 'Goals',

  },
  {
    title: 'Year',
    dataIndex: 'Year',
    key: 'Year',

  },
];

class HomePage extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      matchesResults: [],
      scorersResults: [],
      worldCupGoals: [],
      playerName: "",
      team: "Spain",

    }
    this.scorersOnChange = this.scorersOnChange.bind(this)
    this.goalsOnChange = this.goalsOnChange.bind(this)

  }

  componentDidMount() {
    getBestScorers(null, null, 'Spain').then(res => {
      this.setState({ scorersResults: res.results })
    })

    getWorldCupGoals(null, null, 'Spain').then(res => {
      this.setState({ worldCupGoals: res.results })
    })
  }


  scorersOnChange() {
    getBestScorers(null, null,  this.state.team).then((res) => {
      this.setState({ statMatchesResults: res.results });
    });
  }

  goalsOnChange() {
    getWorldCupGoals(null, null,  this.state.team).then((res) => {
      this.setState({ statMatchesResults: res.results });
    });
  }


  teamOnChange(team){

    this.setState({ team: team })

    getBestScorers(null, null, team).then(res => {
      this.setState({ scorersResults: res.results })
    })

    getWorldCupGoals(null, null, team).then(res => {
      this.setState({ worldCupGoals: res.results })
    })

    const div=document.getElementById("my_location");
    div.scrollIntoView();

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
              <Item><CardTeam team={'Afghanistan'} onclick={()=> {this.teamOnChange('Afghanistan')}}/></Item>
            </div>
            <div className="column">
              <Item><CardTeam team={'Brazil'} onclick={()=> {this.teamOnChange('Brazil')}} /></Item>
            </div>
            <div className="column">
              <Item><CardTeam team={'England'} onclick={()=> {this.teamOnChange('England')}}/></Item>
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
            <div className="column">
              <Item><CardTeam team={'Slovenia'}/></Item>
            </div>
            <div className="column">
              <Item><CardTeam team={'Netherlands'}/></Item>
            </div>
            <div className="column">
              <Item><CardTeam team={'Nigeria'}/></Item>
            </div>
            <div className="column">
              <Item><CardTeam team={'Paraguay'}/></Item>
            </div>
            <div className="column">
              <Item><CardTeam team={'Austria'}/></Item>
            </div>
            <Divider />
            <div id={"my_location"} style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }}>
              <center>
                <h2>Top Scorers </h2>
                <h4>{this.state.team}</h4>
              </center>
              <Divider />
              <Table  dataSource={this.state.scorersResults} columns={scorerColumns}  variant="dark" pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 8}}/>
              <Divider />
              <center>
                <h2>Number of Goals per WorldCup Tournament </h2>
                <h4>{this.state.team}</h4>
              </center>
              <Table dataSource={this.state.worldCupGoals} columns={worldCupGoalsColumns}  variant="dark" pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 8}}/>

            </div>

          </div>

        </div>
    )
  }

}

export default HomePage


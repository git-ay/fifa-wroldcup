import React from 'react';
import {Divider, Table} from 'antd'
import MenuBar from '../components/MenuBar';
import CardTeam from "../components/CardTeam";
import Item from "antd/es/list/Item";
import {getAllMatchesStats, getBestScorers} from "../fetcher";
const statsMatchesColumns = [
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


class HomePage extends React.Component {

  componentDidMount() {
    getBestScorers(null, null, 'Spain').then(res => {
      this.setState({ scorersResults: res.results })
      console.log("aaa")
      console.log(this.state.scorersResults)
      console.log("bbb")

    })
  }
  constructor(props) {
    super(props)

    this.state = {
      matchesResults: [],
      scorersResults: [],
      playerName: "",
      team: "Brazil",

    }

  }

  scorersOnChange() {
    getBestScorers(null, null,  this.state.team).then((res) => {
      this.setState({ statMatchesResults: res.results });
    });
  }

  render() {
    return (
        <div>
          {console.log("A")}
          {console.log(this.scorersOnChange())}
          {console.log(this.statMatchesResults)}
          {console.log("b")}

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
              {console.log(this.state.team)}
              <Table dataSource={this.state.scorersResults} columns={statsMatchesColumns}  variant="dark" pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 8}}/>
            </div>
          </div>

        </div>
    )
  }

}

export default HomePage


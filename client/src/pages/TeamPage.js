import React from 'react';
import {Divider} from 'antd'
import MenuBar from '../components/MenuBar';
import {getAllStats, getAllMatches, getAllPlayers, getPlayerNames} from '../fetcher'
import CardTeam from "../components/CardTeam";
import Item from "antd/es/list/Item";


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
    // TASK 2: this value should be used as a parameter to call getAllMatches in fetcher.js with the parameters page and pageSize set to null
    // then, matchesResults in state should be set to the results returned - see a similar function call in componentDidMount()
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
      this.setState({ statResults: res.results })
    })

    getPlayerNames().then(res => {
      this.setState({ playerNames: res.results })
    })

    getAllPlayers().then(res => {
      this.setState({ playersResults: res.results })
    })


  }


  render() {


    return (

        <div>
          <MenuBar />

          <div style={{ width: '70vw', margin: '0 auto', marginTop: '2vh' }} align="center">
            <h3>Choose Team </h3>
          </div>
          <Divider />
          <div className="row" align="center">
            <div className="column" >
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
            <div className="column">
              <Item><CardTeam team={'Slovenia'}/></Item>
            </div>
            <div className="column">
              <Item><CardTeam team={'Spain'}/></Item>
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



          </div>

        </div>
    )
  }

}

export default HomePage


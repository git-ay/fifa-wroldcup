import React from 'react';
import MenuBar from '../components/MenuBar';
import img1 from '../images/logo4.png'
import {Button, Card, Col, Divider, Row, Select, Table} from "antd";
import "bootstrap/dist/css/bootstrap.min.css";
import MoreDeets from "../MoreDeets";
import MoreDeetsSlider from "../MoreDeetsSlider";
import {Form, FormGroup} from "shards-react";
import {getAllStats} from '../fetcher'
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


class IntroPage extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      selectedMatchDetails: null,
    }
    this.goToMatch = this.goToMatch.bind(this)
  }

  playerOnChange(value) {
    getAllStats(null, null, value).then((res) => {
      this.setState({ statResults: res.results });

    });
  }

  goToMatch(matchId) {
    window.location = `/matches?id=${matchId}`
  }


  render() {

    return (
        <div>
          <MenuBar />
          <div style={{ width: '70vw', margin: '0 auto', marginTop: '5vh', alignItems:'center'}}>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '35vh'}}>
              <img src={img1}  width={750} height={400} mode='fit'   />
            </div>
            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '25vh'}}>
              <h1> Choose Statistics to Present </h1>
            </div>
            <Divider />

          </div>

            <div>
              <MoreDeets />
            </div>
            <div>
                <MoreDeetsSlider />
            </div>
        </div>
    )
  }

}

export default IntroPage


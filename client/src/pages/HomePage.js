import React from 'react';

import {
  Table,
  Select, Row, Col, Divider
} from 'antd'

import MenuBar from '../components/MenuBar';
import {getAllStats} from '../fetcher'
import {Form, FormGroup,NavLink} from "shards-react";
import img1 from "../images/logo4.png";
import MoreDeets from "../MoreDeets";
import MoreDeetsSlider from "../MoreDeetsSlider";
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
      statResults: [],
      pagination: null
    }

    this.playerOnChange = this.playerOnChange.bind(this)


  }



  playerOnChange(value) {
    getAllStats(null, null, value).then((res) => {
      this.setState({ statResults: res.results });

    });
  }


  componentDidMount()  {

    getAllStats(null, null, 'cristiano ronaldo').then(res => {
      console.log(res.results)
      this.setState({ statResults: res.results })
    })

  }


  render() {


    return (

        <div>
          <MenuBar />

          <div style={{ width: '70vw', margin: '0 auto', marginTop: '3vh', alignItems:'center'}}>
            <h3 >Choose Player (Quick Start):  </h3>

          <Form style={{ width: "80vw", margin: "0 auto", marginTop: "2vh" }}>
            <Row>
              <Col flex={2}>
                <FormGroup style={{ width: "20vw" }}>
                </FormGroup>
                <Select defaultValue="Ronaldo" style={{ width: 250 }} onChange={this.playerOnChange}>
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
            <Table dataSource={this.state.statResults} columns={statsColumns}  variant="dark" pagination={{ pageSizeOptions:[5, 10], defaultPageSize: 3}}/>
          </div>
          <Divider />

            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '30vh'}}>
              <img src={img1}  width={750} height={400} mode='fit'   />
            </div>
            <Divider />

            <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '15vh'}}>
              <h1> Choose Statistics: </h1>
            </div>

            <div>
              <MoreDeets />
            </div>
            <div>
              <MoreDeetsSlider />
            </div>
          </div>



        </div>
    )
  }

}

export default HomePage


import React, { Component } from 'react';
import { Link } from 'react-router-dom'

import {Col, Row, Card} from 'react-bootstrap';
import { getNews, nameConvert } from "../../actions/news";

class Main extends Component {
    state = {
        humor: []
    }

    componentDidMount() {
        this.handleNews()
    }
    handleNews = () => {
        getNews(6, (news)=>{
            this.setState({humor: news})
        })
    }

    render() {
        const { player } = this.props;
        const history = JSON.parse(localStorage.getItem('_h')) || []

        return (
            <React.Fragment>
                <h1 className="mb-0 text-gray-800 text-center">Welcome back!</h1>

                <div className="d-sm-flex align-items-center justify-content-between mb-3">
                </div>

                <Card className='mb-3'>
                    <Card.Header>
                        <h3 className="mb-0 text-gray-800">
                            <i className="fas fa-music text-gray-300"/> Recent
                        </h3>
                    </Card.Header>
                    <Card.Body className='recent-list'>
                        <Row>
                            { history.map(id => {
                                const song = player.getSongById(id);
                                return (<Col key={id} xs={12}  sm={6} lg={4} xl={3} className="mb-4">
                                    <Card className={"shadow h-100 py-2 border-left-danger"} >
                                        <Card.Body className='p-0'>
                                            <i className="fas fa-times icon-trash-hover text-gray-200 float-right mr-3" onClick={(e) => {
                                                player.deleteFromHistory(id);
                                                player.refreshComponent();
                                            }}/>
                                            <Row className="no-gutters align-items-center pl-3 pb-3 pt-3" style={{cursor:'pointer'}} onClick={() => { //colors[Math.floor(Math.random() * colors.length)]
                                                player.setSongAll(song.id);
                                            }}>
                                                <Col className="mr-2">
                                                    <div className="text-xs font-weight-bold text-primary text-uppercase mb-1">
                                                        {song ? song.artist : id}
                                                    </div>
                                                    <div className="h5 mb-0 font-weight-bold text-gray-800">
                                                        {song ? song.title : ''}
                                                    </div>
                                                </Col>
                                                <div className="col-auto">
                                                    <i className="fas fa-play fa-2x text-gray-300"/>
                                                </div>
                                            </Row>
                                        </Card.Body>
                                    </Card>
                                </Col>)
                            })}
                            {history.length === 0 && <h4><Link to='/play'>--> Check out all songs now! {'<'}-- </Link></h4>}
                        </Row>
                    </Card.Body>
                </Card>

                <Card>
                    <Card.Header>
                        <h3 className="mb-0 text-gray-800">
                            <i className="fas fa-laugh text-gray-300"/> Humor news
                            <i className="fas fa-forward text-success icon-hover icon-shadow" style={{float:'right', cursor:'pointer'}} onClick={this.handleNews}/>
                        </h3>
                    </Card.Header>
                    <Card.Body>
                        <Row>
                            {this.state.humor.map((data, index) => <Joke key={index} data={data} />)}
                        </Row>
                    </Card.Body>
                </Card>
            </React.Fragment>
        )
    }
}

const Joke = ({data}) => {
    return (<Col md={6} xl={4} className="mb-4">
        <Card className={"shadow h-100 border-left-primary"}>
            <Card.Header className='pt-1 pb-1'>
                <h4 className='m-0'>{nameConvert(data.n)}</h4>
            </Card.Header>
            <Card.Body className='pt-2 pb-2'>
                <Row className="no-gutters align-items-center">
                    <Col className="mr-2 ">
                        <div className="font-weight-bold text-primary text-uppercase mb-1">
                            {data.q}
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {data.a}
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    </Col>)
}

export default Main;


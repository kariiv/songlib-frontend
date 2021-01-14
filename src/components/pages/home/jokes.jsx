import React, { Component } from 'react';

import {Col, Row, Card} from 'react-bootstrap';
import JokeProvider from "../../../assets/app/provider/JokesProvider";

class Jokes extends Component {
    state = {
        jokes: []
    }

    componentDidMount() {
        this.handleNews()
    }

    handleNews = async () => {
        this.setState({ jokes: await JokeProvider.getSome(6)})
    }

    render() {
        return (
            <Card>
                <Card.Header>
                    <h3 className="mb-0 text-gray-800">
                        <i className="fas fa-laugh text-gray-300"/> Humor
                        <i className="fas fa-forward text-success icon-hover icon-shadow" style={{float:'right', cursor:'pointer'}} onClick={this.handleNews}/>
                    </h3>
                </Card.Header>
                <Card.Body>
                    <Row>
                        {this.state.jokes.map((joke, index) => <Joke key={index} joke={joke} />)}
                    </Row>
                </Card.Body>
            </Card>
        )
    }
}

const Joke = ({joke}) => {
    return (<Col md={6} xl={4} className="mb-4">
        <Card className={"shadow h-100 border-left-primary"}>
            <Card.Header className='pt-2 pb-1'>
                <h4 className='m-0'>{joke.getType()}</h4>
            </Card.Header>
            <Card.Body className='pt-2 pb-2'>
                <Row className="no-gutters align-items-center">
                    <Col className="mr-2 ">
                        <div className="font-weight-bold text-primary text-uppercase mb-1">
                            {joke.getQuestion()}
                        </div>
                        <div className="h5 mb-0 font-weight-bold text-gray-800">
                            {joke.getAnswer()}
                        </div>
                    </Col>
                </Row>
            </Card.Body>
        </Card>
    </Col>)
}

export default Jokes;


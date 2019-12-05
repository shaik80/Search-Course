import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card,ListGroup,ListGroupItem,Row,Col } from 'react-bootstrap';

export default class Display extends Component {
    constructor( props ){
        super(props);
        this.state = {}
    }
    
    render() {
        return (
            <div className="mt-5">
                    <div className="mt-3 text-right"><b>Total: </b>{this.props.data.length}</div>

                    <Row>
                {this.props.data.map((v) => {
                 return <Col lg="6" >
                            <Card className="mt-3 shadow p-3 mb-5 bg-white rounded" key={v["Course Id"]}>
                                <Card.Body>
                                    <Card.Title>{v["Course Id"]} | {v["Course Name"]}</Card.Title>
                                        <Card.Text>
                                            Provider: {v["Provider"]},
                                            <br></br>
                                            Universities/Institutions: {v["Universities/Institutions"]}
                                        </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Parent Subject: {v["Parent Subject"]}</ListGroupItem>
                                    <ListGroupItem>Child Subject: {v["Child Subject"]}</ListGroupItem>
                                    <ListGroupItem>Next Session Date: {v["Next Session Date"]}</ListGroupItem>
                                </ListGroup>
                                <Card.Body>
                                    <Card.Link href={v["Video(Url)"]}>Video Link</Card.Link>
                                    <Card.Link href={v["Url"]}>Apply</Card.Link>
                                </Card.Body>
                                </Card>
                            </Col>
                    })
                }
                </Row>
            </div>

        )
    }
}

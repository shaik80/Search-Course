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
                {this.props.data.map((value) => {
                 return <Col lg="6" >
                            <Card className="mt-3 shadow p-3 mb-5 bg-white rounded" key={value["Course Id"]}>
                                <Card.Body>
                                    <Card.Title>{value["Course Id"]} | {value["Course Name"]}</Card.Title>
                                        <Card.Text>
                                            Provider: {value["Provider"]},
                                            <br></br>
                                            Universities/Institutions: {value["Universities/Institutions"]}
                                        </Card.Text>
                                </Card.Body>
                                <ListGroup className="list-group-flush">
                                    <ListGroupItem>Parent Subject: {value["Parent Subject"]}</ListGroupItem>
                                    <ListGroupItem>Child Subject: {value["Child Subject"]}</ListGroupItem>
                                    <ListGroupItem>Next Session Date: {value["Next Session Date"]}</ListGroupItem>
                                    <ListGroupItem>Length: {value["Length"]}</ListGroupItem>
                                </ListGroup>
                                <Card.Body>
                                    <Card.Link href={value["Video(Url)"]}>Video Link</Card.Link>
                                    <Card.Link href={value["Url"]}>Apply</Card.Link>
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

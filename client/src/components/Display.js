import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Card,ListGroup,ListGroupItem } from 'react-bootstrap';

export default class Display extends Component {
    constructor( props ){
        super(props);
        this.state = {}
    }
    
    render() {
        return (
            <div className="mt-5">
                    <div className="mt-3">{this.props.data.length}</div>
                {this.props.data.map((v) => {
                 return <Card style={{ width: '100%' }} key={v["Course Id"]}>
                    <Card.Img variant="top" src="" />
                    <Card.Body>
                        <Card.Title>{v["Course Name"]}</Card.Title>
                        <Card.Text>
                        {v["Provider"]},
                            <br></br>
                            {v["Universities/Institutions"]}
                        </Card.Text>
                    </Card.Body>
                    <ListGroup className="list-group-flush">
                        <ListGroupItem>{v["Parent Subject"]}</ListGroupItem>
                        <ListGroupItem>{v["Child Subject"]}</ListGroupItem>
                        <ListGroupItem>{v["Next Session Date"]}</ListGroupItem>
                    </ListGroup>
                    <Card.Body>
                        <Card.Link href={v["Video(Url)"]}>Video Link</Card.Link>
                        <Card.Link href={v["Url"]}>Apply</Card.Link>
                    </Card.Body>
                    </Card>
                })
                }
            </div>

        )
    }
}

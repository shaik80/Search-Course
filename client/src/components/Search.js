import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,Form,Row,Col,Button } from 'react-bootstrap';
import Display from './Display'
import axios from "axios";

export default class Search extends Component {
    constructor( props ){
        super(props);
        this.state = {
            query:[],
            results:{},
            loading:false,
            message:'',
            data:[],
        }
    }

    componentDidMount = () => {
        const searchResult = 'https://cors-anywhere.herokuapp.com/https://nut-case.s3.amazonaws.com/coursessc.json'
        axios.get( searchResult,{
            headers:{
                "Access-Control-Allow-Origin":"*",
            }
        } )
        .then(res =>{
            const data = res.data;
            this.setState({data});
        })
    }
    handleOnInputChange = (e) =>{
        const query = ({...this.state.query,[e.target.name]: e.target.value});
        this.setState({query});
        console.log(query)
    }

    handleSubmit = (e) =>{
        const getData = this.state.data
        if(this.query === [] 
            && this.state.query.date === '' 
            && this.state.query.chilsub === '' 
            && this.state.query.parentsub === ''
            && this.state.query.provider === ''
        )
        {
            this.componentDidMount()
            console.log("error")
        }
        else{
            let getRes = getData.filter((v) =>{
                return String(v["Next Session Date"]).includes(this.state.query.date)
                        || String(v["Child Subject"]).includes(this.state.query.chilsub)
                        || String(v["Parent Subject"]).includes(this.state.query.parentsub)
                        || String(v["Provider"]).includes(this.state.query.provider)
            })
            console.log(getRes)
            this.setState({data:getRes});
        }
    }

    render() {

        return (
            <Container>
                <Form>
                    <Row>
                        <Col>
                            <Form.Control type="text" name="date" placeholder="Next Date" onChange={this.handleOnInputChange}/>
                        </Col>
                        <Col>
                            <Form.Control type="text" name="chilsub" placeholder="Child Subject" onChange={this.handleOnInputChange}/>
                        </Col>
                        <Col>
                            <Form.Control type="text" name="parentsub" placeholder="Parent Subject" onChange={this.handleOnInputChange} />
                        </Col>
                        <Col>
                            <Form.Control type="text" name="provider" placeholder="Provider" onChange={this.handleOnInputChange} />
                        </Col>
                        <Col>
                        <Button variant="primary" onClick={this.handleSubmit} >
                        Submit
                        </Button>
                        </Col>
                    </Row>
                </Form>
                {/* {
                    this.state.data.map((v) =>{
                        return <div key={v["Course Id"]}>
                            <div>{v["Course Name"]}</div>
                        </div>
                    })
                } */}
                < Display data={this.state.data}/>
            </Container>
        )
    }
}

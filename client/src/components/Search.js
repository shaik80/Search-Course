import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,Form,Row,Col,Button } from 'react-bootstrap';
import Display from './Display'
import axios from "axios";
import Loader from "./img/loader.gif"

export default class Search extends Component {
    constructor( props ){
        super(props);
        this.state = {
            query:[],
            results:{},
            loading:true,
            message:'',
            data:[],
            getRes:[],
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
            this.setState({data,loading:false});
            this.storeDataTntoGetRes()
        })
    }
    
    storeDataTntoGetRes = () =>{
        const getData = this.state.data
        this.setState({getRes:getData,loading:true});
    }

    handleOnInputChange = (e) =>{
        const query = ({...this.state.query,[e.target.name]: e.target.value});
        this.setState({query,loading:true});
        console.log(query)
    }


    handleSubmit = (e) =>{
        const getData = this.state.data
        if(this.state.query === []
            || this.state.query.date === '' 
            && this.state.query.childsub === '' 
            && this.state.query.parentsub === ''
            && this.state.query.provider === ''
        )
        {
            this.storeDataTntoGetRes()
            console.log("error")
        }
        else{
            let getRes = getData.filter((v) =>{
                return String(v["Next Session Date"]).includes(this.state.query.date)
                        || String(v["Child Subject"]).includes(this.state.query.childsub)
                        || String(v["Parent Subject"]).includes(this.state.query.parentsub)
                        || String(v["Provider"]).includes(this.state.query.provider)
            })
            console.log(getRes)
            this.setState({getRes,loading:true});
        }
    }

    render() {

        return (
            <Container>
                <h1 className="text-center mt-5">SEARCH COURSE</h1>
                <hr></hr>
                <Form className="mt-5">
                    <Row>
                        {/* <Col>
                            <Form.Label>Next Session</Form.Label>
                            <Form.Control type="text" name="date" className="d-flex align-items-end" placeholder="Next Date" onChange={this.handleOnInputChange}/>
                        </Col >
                        <Col>
                            <Form.Label>Child Subject</Form.Label>
                            <Form.Control type="text" name="childsub" className="d-flex align-items-end" placeholder="Child Subject" onChange={this.handleOnInputChange}/>
                        </Col>
                        <Col>
                            <Form.Label>Parent Subject</Form.Label>
                            <Form.Control type="text" name="parentsub" className="d-flex align-items-end" placeholder="Parent Subject" onChange={this.handleOnInputChange} />
                        </Col> */}
                        <Col>
                            <Form.Label>Provider Name</Form.Label>
                            <Form.Control type="text" name="provider" className="d-flex align-items-end" placeholder="Provider" onChange={this.handleOnInputChange} />
                        </Col>
                        <Col className="d-flex align-items-end">
                        <Button variant="primary" className="d-flex align-items-end" onClick={this.handleSubmit} >
                        Submit
                        </Button>
                        </Col>
                    </Row>
                </Form>
                < Display data={this.state.getRes}/>
                <div class="text-center">
                    <img src={Loader} className={`img-fluid mx-auto ${this.state.loading ? 'show' : 'hide'}`} alt="Loader"/>
                </div>
            </Container>
        )
    }
}

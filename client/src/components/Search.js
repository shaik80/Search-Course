import React, { Component } from 'react'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container,Form,Row,Col } from 'react-bootstrap';
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
            filterData:[],
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
            this.storeDataIntoGetRes()
        })
    }
    
    storeDataIntoGetRes = () =>{
        const getData = this.state.data
        let filterData = getData.filter((value,key) =>{
            return (
                value["Next Session Date"] !== '' 
                && value["Length"] !== '' 
                && value["Child Subject"] !== ''
                && value["Universities/Institutions"] !== ''
                && value["Parent Subject"] !== ''
                && value["Provider"] !== ''
                && value["Course Name"] !== ''
                && value["Course Id"] !== ''
            ) ? ({...this.state.getRes,value}):null
        })
        this.setState({filterData,loading:false})
        this.setState({getRes:filterData,loading:false});
    }

    handleOnInputChange = (e) =>{
    
        const query = ({...this.state.query,[e.target.name]: e.target.value});
        this.setState({query,loading:false});
        const getData = this.state.data
        if(query.provider === '')
        {
            this.storeDataIntoGetRes()
        }
        else{
            let getRes = getData.filter((value,key) =>{
                return String(value["Provider"]).includes(query.provider)
            })
            this.setState({getRes,loading:false});
        }
    }

    render() {

        return (
            <Container>
                <h1 className="text-center mt-5">SEARCH COURSE</h1>
                <hr></hr>
                <Form className="text-center mt-5">
                    <Row>
                        <Col lg="12">
                            <Form.Label>Provider Name</Form.Label>
                            <Form.Control type="text" name="provider" className="d-flex align-items-end" placeholder="Provider" onChange={this.handleOnInputChange} />
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

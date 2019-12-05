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
            query:[], // to store search data
            loading:true, // to display loader
            data:[],  // to store data from json file
            filterData:[], // to store filterdata from state.data
            getRes:[], //to store the final result
        }
    }

    componentDidMount = () => {
        // https://cors-anywhere.herokuapp.com/ is used to solve cors error
        const searchResult = 'https://cors-anywhere.herokuapp.com/https://nut-case.s3.amazonaws.com/coursessc.json'
        axios.get( searchResult,{
            headers:{
                "Access-Control-Allow-Origin":"*",
            }
        } )
        .then(res =>{
            const data = res.data; // get data from from json filr and store in data variable
            this.setState({data,loading:false}); // store data in state and loading is false 
            this.storeDataIntoGetRes() // go to function storeDataIntoGetRes
        })
    }
    
    // this is used to store filtered data
    storeDataIntoGetRes = () =>{ 
        const getData = this.state.data // get data from data and store in getdata variable  
        let filterData = getData.filter((value,key) =>{ // to eliminate unwanted data
            return (
                value["Next Session Date"] !== '' // to eliminate empty Next Session Date
                && value["Next Session Date"] !== 'Self paced' // to eliminate Self paced Next Session Date
                && value["Length"] !== ''  // to eliminate empty Length
                && value["Child Subject"] !== '' // to eliminate empty Child Subject
                && value["Universities/Institutions"] !== '' // to eliminate empty Universities/Institutions
                && value["Parent Subject"] !== '' // to eliminate empty Parent Subject
                && value["Provider"] !== '' // to eliminate empty Provider
                && value["Course Name"] !== '' // to eliminate empty Course Name
                && value["Course Id"] !== '' // to eliminate empty Course Id
            ) ? ({...this.state.getRes,value}):null // store in to getResult array
        })
        this.setState({filterData,loading:false}) // to store into filteredData state
        this.setState({getRes:filterData,loading:false}); // to store into getres strate to display on form load
    }

    handleOnInputChange = (e) =>{
        const getData = this.state.filterData // get data from filter data state
        const query = ({...this.state.query,[e.target.name]: e.target.value}); // input data from user
        this.setState({query,loading:false}); // set state in query state
        if(query.provider === '') 
        {
            this.storeDataIntoGetRes() // load full data
        }
        else{
            let getRes = getData.filter((value,key) =>{
                return String(value["Provider"]).includes(query.provider) // to search if data is include into the provider
            })
            this.setState({getRes,loading:false}); // set state in get result
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

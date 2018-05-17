import React from 'react'
import {
    FormGroup,
    ControlLabel,
    FormControl,
    Button
} from 'react-bootstrap'
import{
    Row,
    Col
} from 'react-flexbox-grid'
import Similarity from 'calculate-cosine-similarity';


class Home extends React.Component{
    constructor(){
        super();
        this.state={
            firstSentence:'',
            secondSentence:'',
            isCalculate: false,
            resVal: null
        }
    }

    handleChange(properties, event){
        this.setState({
            [properties]: event.target.value
        });
        console.log(this.state.firstSentence);
    }

    handleSubmit(event){
        event.preventDefault();
        this.setState({
          isCalculate: false
        });
        var resToken1 = this.tokenizing(this.state.firstSentence);
        var resToken2 = this.tokenizing(this.state.secondSentence)
        var result = Similarity(resToken1, resToken2);
        result = result*100;
        this.setState({
          isCalculate: true,
          resVal: result
        });
      }

    tokenizing(content){
        content = content.replace(/\r?\n|\r/g, '');
        var lowerCaseContent = content.toLowerCase();
        var removeSpecMark = lowerCaseContent.replace(/[^A-Za-z\s]/g, '');
        var stemContent = removeSpecMark.split(" ");
        return stemContent;      
    }
    render(){
        const resultView = (this.state.isCalculate === false ?(
            <div></div>
          ):(
            <div>
                <h3 style={{paddingTop: 20, fontSize: 25}}>
                    Similarity value : {this.state.resVal} %
                </h3>
            </div>
          ))            
        return(
            <div style={{marginTop: '70px'}}>
                <Row>
                    <Col xsOffset={3} xs={6}>
                        <h3 style={{textAlign: 'center'}}>Calculate Similarity Sentence</h3>
                        <form onSubmit={this.handleSubmit.bind(this)}>
                            <FormGroup controlId="formControlsTextarea">
                                <ControlLabel>Kalimat Pertama</ControlLabel>
                                <FormControl onChange={this.handleChange.bind(this, 'firstSentence')} componentClass="textarea" placeholder="Masukkan kalimat pertama yang dibandingkan" rows="5" />
                            </FormGroup>                
                            <FormGroup controlId="formControlsTextarea">
                                <ControlLabel>Kalimat Kedua</ControlLabel>
                                <FormControl onChange={this.handleChange.bind(this, 'secondSentence')} componentClass="textarea" placeholder="Masukkan kalimat kedua yang dibandingkan" rows="5" />
                            </FormGroup>                
                            <Button style={{float:'right'}} bsStyle="primary" bsSize="large" type="submit">Submit</Button>
                        </form>
                    </Col>
                </Row>
                <Row>
                    <Col xsOffset={3} xs={6}>
                        {resultView}
                    </Col>
                </Row>
            </div>
        )
    }
}

export default Home;
import React, { Component } from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle, Breadcrumb, BreadcrumbItem, Button, 
    Label, Col, Row, Modal, ModalHeader, ModalBody } from 'reactstrap';
import {Link } from 'react-router-dom';
import {Control, LocalForm, Errors} from 'react-redux-form';
import {Loading} from './LoadingComponent';

const required = (val) => val && val.length;
const maxLength = (len) => (val) => !(val) || (val.length <= len);
const minLength = (len) => (val) => val && (val.length >= len);
   
class CommentForm extends Component{
    constructor(props){
        super(props);
        this.state={
            isModalOn: false
        };
        this.toggleModal= this.toggleModal.bind(this);
    }

    toggleModal(){
        this.setState({
            isModalOn: !this.state.isModalOn
        });
    }

    handleSubmit(values){
        this.toggleModal();
        this.props.addComment(this.props.dishId,values.rating, values.author,values.comment);
    }

    render(){
        return(
            <div>
                <Button outline onClick={this.toggleModal}>
                    <span className="fa fa-pencil fa-lg"></span> Submit Comment
                </Button>
                <Modal isOpen = {this.state.isModalOn} toggle={this.toggleModal}>
                    <ModalHeader toggle={this.toggleModal}>Submit Comment</ModalHeader>
                    <ModalBody>
                        <LocalForm onSubmit={(values) => this.handleSubmit(values)}>
                            <Row className="form-group" >
                                <Col>
                                    <Label htmlFor="rating" >Rating</Label>                                
                                    <Control.select model=".rating" name="ratingType"
                                        className= "form-control"> 
                                        <option>1</option> 
                                        <option>2</option> 
                                        <option>3</option> 
                                        <option>4</option>
                                        <option>5</option>  
                                    </Control.select> 
                                </Col>
                            </Row> 
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="author">Your Name</Label>                               
                                    <Control.text model=".author" id="author" name="author" 
                                    placeholder="Your Name"
                                    className="form-control"
                                    validators={{
                                        required, minLength: minLength(2), maxLength:maxLength(15)
                                    }}/>
                                    <Errors  className="text-danger" 
                                        model=".author"
                                        show="touched"
                                        messages={{
                                            required: 'Required',
                                            minLength: 'Must be greater than 2 characters',
                                            maxLength: 'Must be 15 characters or less'
                                    }}/>
                                </Col>                                
                            </Row>                                                     
                            <Row className="form-group">
                                <Col>
                                    <Label htmlFor="comment">Comment</Label>                               
                                    <Control.textarea model=".comment" id="comment" name="comment" 
                                    rows="6"
                                    className="form-control"/>
                                </Col>                                
                            </Row>                           
                            <Button type="submit" color="primary">
                                Submit
                            </Button>                               
                        </LocalForm>
                    </ModalBody>
                </Modal>
             </div>

        );
    }
}

function RenderDish({dish}){
        if(dish!=null)
            return(
                <div  className="col-12 col-md-5 m-1">    
                    <Card>
                        <CardImg width="100%" src={dish.image} alt={dish.name}/>
                        <CardBody>
                            <CardTitle>{dish.name}</CardTitle>  
                            <CardText>{dish.description}</CardText>
                        </CardBody>
                    </Card>
                </div>
            );        
        else
            return(<div></div>);
        
    }

    function RenderComments({comments, addComment, dishId}){
        if(comments!=null){
            const commentSection = comments.map((com) => {
                return ( 
                    <div  key={com.id}>
                        <ul className = "list-unstyled">
                            <li className="mb-3">{com.comment}</li>
                            <li>--{com.author} , {new Intl.DateTimeFormat('en-US', {year: 'numeric', month:'short', day:'2-digit'}).format(new Date(Date.parse(com.date)))}</li>
                        </ul>
                    </div>
                    );
            });
            return(
                <div className="col-12 col-md-5 m-1">
                    <h4>Comments</h4>
                    <div>{commentSection}</div>
                    <CommentForm dishId={dishId} addComment={addComment}/>
                </div>
            );
        }
        else
            return(<div></div>);

    }

    const DishDetail = (props) => { 
            if(props.isLoading)  {
                return(
                    <div className="container">
                        <div className="row">
                            <Loading />
                        </div>
                    </div>
                );
            } 
            else if (props.errMess){
                return(
                    <div className="container">
                        <div className="row">
                            <h4>{props.errMess}</h4>
                        </div>
                    </div>
                );
            }
            else if(props.dish!=null){
                return(
                    <div className="container">
                        <div className="row">
                            <Breadcrumb>
                                <BreadcrumbItem><Link to= '/menu'>Menu</Link ></BreadcrumbItem>
                                <BreadcrumbItem active>{props.dish.name}</BreadcrumbItem>
                            </Breadcrumb>
                            <div className="col-12">
                                <h3>{props.dish.name}</h3>
                                <hr/>
                            </div>
                        </div>
                            <div className="row">                           
                                <RenderDish dish = {props.dish} />        
                                <RenderComments comments= {props.comments}
                                    addComment = {props.addComment}
                                    dishId={props.dish.id}/>                      
                            </div>
                    </div>
                );
            }
            else{
                return(
                    <div></div>
                );
            }        
        }


export default DishDetail;
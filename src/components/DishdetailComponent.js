import React from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';


    function RenderDish({dish}){
        if(dish!=null)
            return(
                <Card>
                    <CardImg width="100%" src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>  
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );        
        else
            return(<div></div>);
        
    }

    function RenderComments({comments}){
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
                <div>
                    <h4>Comments</h4>
                    <div>{commentSection}</div>
                </div>
            );
        }
        else
            return(<div></div>);

    }

    const DishDetail = (props) => {    
            if(props.selected!=null){
                return(
                    <div className="container">
                        <div className="row">
                            <div  className="col-12 col-md-5 m-1">    
                                <RenderDish dish = {props.selected} />
                            </div>  
                            <div  className="col-12 col-md-5 m-1">
                                <RenderComments comments= {props.selected.comments}/>
                            </div>             
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
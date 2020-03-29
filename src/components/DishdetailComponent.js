import React, {Component} from 'react';
import { Card, CardImg, CardText, CardBody, CardTitle } from 'reactstrap';

class DishDetail extends Component{


    componentDidMount(){
        console.log('Dishdetail Components componentDidMount is invoked');
    }

    componentDidUpdate(){
        console.log('Dishdetail Components componentDidUpdate is invoked');
    }


    renderDish(dish){
        if(dish!=null)
            return(
                <Card>
                    <CardImg width="100%" object src={dish.image} alt={dish.name}/>
                    <CardBody>
                        <CardTitle>{dish.name}</CardTitle>  
                        <CardText>{dish.description}</CardText>
                    </CardBody>
                </Card>
            );        
        else
            return(<div></div>);
        
    }

    renderComments(comments){
        if(comments!=null){
            const commentSection = comments.map((com) => {
                return ( 
                    <div  key={com.id}>
                        <ul class = "list-unstyled">
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

    render(){

        console.log('Dishdetail Components render is invoked');
        
            if(this.props.selected!=null){
                return(
                    <div className="container">
                        <div className="row">
                            <div  className="col-12 col-md-5 m-1">
                                {this.renderDish(this.props.selected)}
                            </div>  
                            <div  className="col-12 col-md-5 m-1">
                                {this.renderComments(this.props.selected.comments)}
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
}

export default DishDetail;
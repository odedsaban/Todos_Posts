import React,{Component} from 'react'
import '../Css/background.css'

class Post extends Component{

    constructor(props){
        super(props);

    }

    render(){
        return(
            <div className={"Todos_black_back_visible"}>
                <h5>Title : </h5>{this.props.data.title}<br/>
                <h5>Body : </h5>{this.props.data.body}
            </div>

        )
    }

}
export default Post
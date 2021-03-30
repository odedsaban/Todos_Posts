import React,{Component} from 'react'
import '../Css/background.css'
import Utils1 from '../Utils/Utils1';

class Todo extends Component{

    constructor(props){
        super(props);
        this.state = {complete:"", markvisible:""}
    }

    componentDidMount(){
        if(this.props.data.completed == false){
            this.setState({complete:"false",markvisible:"button_visible"})
        }else{
            this.setState({complete:"true", markvisible:"button_hidden"})
        }
    }

    completetask = () =>{
        this.setState({complete:"true", markvisible:"button_hidden"})
        let obj = this.props.data;
        obj = {
            userId: this.props.data.userId,
            id: this.props.data.id,
            title:this.props.data.title,
            completed: true
        }
        Utils1.updateUser(`https://jsonplaceholder.typicode.com/todos/${this.props.data.id}`,obj);
    }




    render(){
        return(
            <div className={"Todos_black_back_visible"}>
                <h5>Title : </h5>{this.props.data.title} <br/>
                <h5>Completed : </h5>{this.state.complete}<br/>
                <input type="button" value="Mark Completed" onClick={this.completetask} className={this.state.markvisible}/>
                
            </div>
        )
    }


}
export default Todo
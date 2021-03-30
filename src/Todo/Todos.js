import React,{Component} from 'react'
import '../Css/background.css'
import Utils1 from '../Utils/Utils1';
import Todo from './Todo'

class Todos extends Component{


    constructor(props){
        super(props);
        this.state=({todos:[], addtask:false, newtasktitle:""})
    }


    async componentDidMount(){
        let resp = await Utils1.getdata('https://jsonplaceholder.typicode.com/todos/');
        let data = resp.data;
        this.setState({todos:data});
    }


    newtasktitle = (e) =>{
        let data = e.target.value;
        this.setState({newtasktitle:data});

    }
    divaddtask = () =>{
        this.setState({addtask:true});
    }
    canceladdtask = () =>{
        this.setState({addtask:false});
    }
    addtask = async () =>{

        let resp = await Utils1.getdata('https://jsonplaceholder.typicode.com/todos');
        let data =  resp.data;        

        let task = {
            userId: this.props.data.id,
            id : data.length +1,
            title: this.state.newtasktitle,
            completed: false
        }
        Utils1.addUser('https://jsonplaceholder.typicode.com/todos',task);
        this.setState({addtask:false});
    }


    render(){

        let items = this.state.todos.filter(task => task.userId == this.props.data.id);
        let tasks ;
        if(this.state.addtask== false){
            tasks = items.map((task,index) =>{
                return <Todo key={index} data={task}  />
        })}else{
            return(
                <div>
                    New Todo - User {this.props.data.id}
                    <div className="Todos_black_back_visible">
                        Title : <input type="text" onChange={this.newtasktitle}/><br/>
                        <input type="button" value="Cancel" onClick={this.canceladdtask}/>
                        <input type="button" value="Add task" onClick={this.addtask} />

                    </div>
                </div>
            )

        }




        return(

            <div className={this.props.visible}>

                Todos - User {this.props.data.id} <input type="button" value="Add Todo" onClick={this.divaddtask} />
                {tasks}
            </div>

        )

    }


}
export default Todos
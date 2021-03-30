import React,{Component} from 'react'
import utils1 from '../Utils/Utils1'
import '../Css/background.css'
import Utils1 from '../Utils/Utils1';
import Moredata from './MoreData'
import Todos from '../Todo/Todos'
import Posts from '../Post/Posts'
import Todo from '../Todo/Todo'
    


class Usercomp extends Component{


    constructor(props){
        super(props);
        this.state = {todos:"Todos_black_back_hidden",tosee:"Moredata_black_back_hidden",name:this.props.data.name,email:this.props.data.email,street:"",city:"",zipcode:0}
    }

    moredata = (e) =>{
        this.setState({tosee:"Moredata_black_back_visible"});
    }
    hiddedata = () =>{
        this.setState({tosee:"Moredata_black_back_hidden"});
    }

    componentDidMount(){
        this.setState({name:this.props.data.name});
        this.setState({email:this.props.data.email});
        this.setState({street:this.props.data.address.street});
        this.setState({city:this.props.data.address.city});
        this.setState({zipcode:this.props.data.address.zipcode});

    }
    
    
    updatedata = () =>{
        let obj = this.props.data;
        obj.name = this.props.updatedname;
        obj.email = this.props.updatedemail;
        let updatedaddress = {
            street: this.state.street,
            suite: this.props.data.address.suite,
            city: this.state.city,
            zipcode: this.state.zipcode,
            geo: {
            lat: this.props.data.address.geo.lat,
            lng: this.props.data.address.geo.lng
}
        }
        obj.address = updatedaddress;

        console.log(obj);
        Utils1.updateUser(`https://jsonplaceholder.typicode.com/users/${this.props.data.id}`,obj);
    }


    deletedate = () =>{
        Utils1.deleteUser(`https://jsonplaceholder.typicode.com/users/${this.props.data.id}`)
    }
    todosvisible = () =>{
        if(this.state.todos=="Todos_black_back_visible"){
        this.setState({todos:"Todos_black_back_hidden"});
        }else{
            this.setState({todos:"Todos_black_back_visible"});
        }

    }



    render(){
        return(

            
            
            <div className={this.props.tasks}>
                
                <input type="button" value={"ID :"+this.props.data.id} onClick={this.todosvisible}/><br/>
                Name : {this.props.data.name}<br/>
                Email : {this.props.data.email}<br/>
                <div className={this.state.tosee}>
                    Street : {this.state.street}<br/>
                    City   : {this.state.city}<br/>
                    Zip Code:{this.state.zipcode}
                </div>
                <Todos data={this.props.data} visible={this.state.todos}/><br/>
                <Posts data={this.props.data} visible={this.state.todos}/>
                <input type="button" value="Other Data" onMouseOver={this.moredata} onClick={this.hiddedata}/>
                <input type="button" value="Delete" onClick={this.deletedate}/>
            </div>
        )

    }


}
export default Usercomp;

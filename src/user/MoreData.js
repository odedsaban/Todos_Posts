import React,{Component} from 'react'
import '../Css/background.css'
import Utils1 from '../Utils/Utils1';

class Moredata extends Component{

    constructor(props){
        super(props);
        this.state = {street:"",city:"",zipcode:0};

    }

    componentDidMount(){
        this.setState({street:this.props.data.address.street});
        this.setState({city:this.props.data.address.city});
        this.setState({zipcode:this.props.data.address.zipcode});
    
    }
    changestreet = (e) =>{
        this.setState({street: e.target.value});
    }
    changecity =(e) =>{
        this.setState({city: e.target.value});
    }    
    changezip =(e) =>{
        this.setState({zipcode: e.target.value});
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


    render(){


        return(
            
            <div className={this.props.visible}>

            Street : <input type="text" value={this.state.street} onChange={this.changestreet}/><br/>
            City   : <input type="text" value={this.state.city} onChange={this.changecity}/><br/>
            Zip Code:<input type="text" value={this.state.zipcode} onChange={this.changezip}/>
            <input type="button" value="Update Data" onClick={this.updatedata}/> 



            </div>
        )



    }
}
export default Moredata;
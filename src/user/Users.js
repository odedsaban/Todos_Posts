import React,{Component} from 'react'
import Usercomp from './User'
import '../Css/background.css'
import Utils1 from '../Utils/Utils1';

class Userscomp extends Component{

    constructor(props){
        super(props);
        this.state = {users:[],search:"",adduser:false, nametext:"",emailtext:"",streettext:"",citytext:"",zipcodetext:""};
    }
    searchChange = (e) =>{
        let data = e.target.value;
        this.setState({search:data});
    }

    async componentDidMount(){

        let resp = await Utils1.getdata('https://jsonplaceholder.typicode.com/users');
        let data = resp.data;
        this.setState({users:data});
        }

    haveTasks = async (user) =>{
        let resp = await Utils1.getdata('https://jsonplaceholder.typicode.com/todos');
        let Data = resp.data;
        let tasks = Data.filter(task => task.userId == user.id);
        tasks.forEach(task => {
            if(task.completed ==false){
                return false;
            }     
        });
        return true;
    }
    searchChange = async (e) =>{
        let data = e.target.value;
        this.setState({search:data});
        if(data !=""){
            let Data = await Utils1.getdata('https://jsonplaceholder.typicode.com/users');
            Data = Data.data;
            let resp = Data.filter((user => (user.name.toLowerCase().includes(this.state.search)||user.email.toLowerCase().includes(this.state.search))));
            console.log(resp)
            this.setState({users:resp})
        }
        else{
            let resp = await Utils1.getdata('https://jsonplaceholder.typicode.com/users');
            let values = resp.data;
            this.setState({users:values});
        }
    }
    divadduser = () =>{
        this.setState({adduser:true});
    }
    canceladd = () =>{
        this.setState({adduser:false});
    }
    newname = (e) =>{
        let data = e.target.value;
        this.setState({nametext:data});
    }
    newemail = (e) =>{
        let data = e.target.value;
        this.setState({emailtext:data});
    }
    newstreet = (e) =>{
        let data = e.target.value;
        this.setState({emailtext:data});
    }
    newecity = (e) =>{
        let data = e.target.value;
        this.setState({emailtext:data});
    }
    newzipcode = (e) =>{
        let data = e.target.value;
        this.setState({emailtext:data});
    }

    useradd = async () =>{

        let resp = await Utils1.getdata('https://jsonplaceholder.typicode.com/users');
        let data = resp.data;
        let user ={
            id: data.length +1,
            name: this.state.nametext,
            username:"",
            email: this.state.emailtext,
            address:{
                street:this.state.streettext,
                suite:"",
                city:this.state.citytext,
                zipcode:this.state.zipcodetext,
                geo:{
                    lat:"",
                    lng:""
                }
            },
            phone:"",
            website:"",
            company:{
                name:"",
                catchPhrase:"",
                bs:""
            }
        };
        Utils1.addUser('https://jsonplaceholder.typicode.com/users',user);
        this.setState({adduser:false});
    }
    
    
    render(){

            let items;
            if(this.state.adduser == false){
                items = this.state.users.map((user,index)=>{
                    let task = this.haveTasks(user);
                    let havetasks = true;
                    if(task==true){
                        havetasks = "Usergreen_back";
                    }else{
                        havetasks = "Userred_back";
               }
               return <Usercomp key={index} data={user} tasks={havetasks} />
                })}
            else{
                 return(
                     <div>
                         Add New User
                         <div className="black_back">
                             Name: <input type="text" onChange={this.newname}/><br/>
                             Email: <input type="text" onChange={this.newemail}/><br/>
                             Street:<input type="text" onChange={this.newstreet}/><br/>
                             City:<input type="text" onChange={this.newecity}/><br/>
                             Zip code:<input type="text" onChange={this.newzipcode}/><br/>
                             <input type="button" value="Cancel" onClick={this.canceladd}/>
                             <input type="button" value="Add User" onClick={this.useradd}/>

                         </div>
                     </div>
                 )
             }

        return(
            <div className="black_back" >

                Search : <input type="text" onChange={this.searchChange} />
                <input type="button" value="Add User" className="button_style" onClick={this.divadduser}/><br/><br/>
                {items}



            </div>
        )

    }

}

export default Userscomp
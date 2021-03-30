import React,{Component} from 'react'
import '../Css/background.css'
import Utils1 from '../Utils/Utils1';
import Post from './Post'
class Posts extends Component{


    constructor(props){
        super(props);
        this.state=({posts:[], addpost:false, newposttitlevalue:"", newpostbodyvalue:""})

    }
    async componentDidMount(){
        let resp = await Utils1.getdata('https://jsonplaceholder.typicode.com/posts');
        let data = resp.data;
        this.setState({posts:data})
    }
    newposttitle = (e) =>{
        let data = e.target.value;
        this.setState({newposttitlevalue:data});
    }
    newpostbody = (e) =>{
        let data = e.target.value;
        this.setState({newpostbodyvalue:data});
    }
    canceladdtask = () =>{
        this.setState({addpost:false});
    }
    divaddpost = () =>{
        this.setState({addpost:true});
    }
    addtask = async () =>{
        let resp= await Utils1.getdata('https://jsonplaceholder.typicode.com/posts');
        let data = resp.data;

        let post = {
            userId: this.props.data.id,
            id : data.length +1,
            title: this.state.newposttitlevalue,
            body: this.state.newpostbodyvalue
        }
        Utils1.addUser('https://jsonplaceholder.typicode.com/posts',post);
        this.setState({addpost:false});
    }

    render(){
        let items = this.state.posts.filter(post=>post.userId == this.props.data.id);
        let posts;
        if(this.state.addpost==false){
            posts = items.map((post,index)=>{
                return <Post key={index} data={post} />
        })}else{
            return(
                <div>
                    New Post - User {this.props.data.id}
                    <div className="Todos_black_back_visible">
                        Title : <input type="text" onChange={this.newposttitle}/><br/>
                        Body : <input type="text" onChange={this.newpostbody}/><br/>
                        <input type="button" value="Cancel" onClick={this.canceladdtask}/>
                        <input type="button" value="Add Post" onClick={this.addtask} />

                    </div>
                </div>
            )

        }


        

        return(
            <div className={this.props.visible}>
                Posts - User {this.props.data.id}  <input type="button" value="Add Post" onClick={this.divaddpost} />
                {posts}
            </div>
        )
    }

}

export default Posts
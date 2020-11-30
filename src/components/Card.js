import React, {useState, useEffect} from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import axios from 'axios'
import EditModal from "./EditModal";
import {get} from 'lodash'
import { deleteUser } from "../redux/user/userActions";

function Card (props) {
    const {match, usersData, deleteUser} = props;
     const [postData, setPostData] = useState({name: '', email: '', password: '', _id: ''})
    // const id = match.params.itemId; // alternative use 'via lodash'
    const id = get(props, 'match.params.itemId')
     const currentUser = id ? usersData.find(user => user._id === id) : null;

      
     useEffect(() => {
       userHandler();
     },[currentUser])



    const userHandler = async () => {
       await axios.get(`http://localhost:5000/user/${id}`)
       .then(res =>{
           const result = res.data;
           setPostData(result)
       })
       .catch(err => { console.log(err)})
    }

    console.log('user data: ', postData)

    const deleteUserHandler = () => {
         deleteUser(id)
    }
  

    return (
        <div className="card border-success mb-3 mt-3 m-auto"  style={{maxWidth: "18rem"}}>
            <div className="card-header bg-transparent border-success">{postData.name}</div>
            <div className="card-body text-success">
                <h5 className="card-title">{postData.email}</h5>

            </div>
            <div className="card-footer bg-transparent border-success">
                <Link to="/user">back</Link>
                {/*<button className="btn btn-info ml-4">edit</button>*/}
                <EditModal  buttonLabel="edit"  
                            userId={id} user={postData} updateUser={props.updateUser}/>
                <Link to="/user" type="button" className=" btn btn-danger ml-1" onClick={deleteUserHandler}>delete</Link>
            </div>


        </div>
        
    )
}

const mapStateToProps = state => {
    return {
        usersData: state.users,
        stateError: state.error
    }
}

const mapDispatchToProps = (dispatch) => {
    return {
        deleteUser: (userId) => dispatch(deleteUser(userId))
    }
}


export default connect(mapStateToProps, mapDispatchToProps) (Card);



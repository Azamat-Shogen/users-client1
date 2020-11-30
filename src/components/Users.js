import React, {useState, useEffect} from 'react';
import {addNewUser, fetchUsers} from "../redux/user/userActions";
import {connect} from "react-redux";
import { Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

function Users({ usersData, stateError, fetchUsers, addNewUser}){

    const [name, setFullname] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")

    useEffect(() => {
        fetchUsers();
    }, [])


   const onSubmitHandler = (event) => {
        event.preventDefault();
        const newUser= {
            name,
            email,
            password
        }
        addNewUser(newUser);
        setFullname("")
        setEmail("");
        setPassword("")
   }


   return (<>
           <div className="container float-left mt-lg-5">
               <div className="row ">
               <div className=" col-sm">
               <div className="form-div">
                   <form onSubmit={onSubmitHandler}>
                       <h4>Add new user</h4>
                       <input type="text"
                              placeholder="fullname"
                              onChange={(e) => setFullname(e.target.value)}
                              value={name}
                              className="form-control form-group"
                       />

                       <input type="email"
                              placeholder="email"
                              onChange={(e) => setEmail(e.target.value)}
                              value={email}
                              className="form-control form-group"
                       />

                       <input type="password"
                              placeholder="password"
                              onChange={(e) => setPassword(e.target.value)}
                              value={password}
                              className="form-control form-group"
                       />

                       <input type="submit" className="btn btn-primary"
                              value="Submit" />

                   </form>
               </div>
               </div>

                   <div className="col-sm">
           {stateError ? <h4>{stateError}</h4> :
        <ul className="list-group list-group-flush">

            { usersData.map(user => <Link className="list-group-item m-auto"
                                          key={user._id} to={`/user/${user._id}`}>
                {user.name}

            </Link>)}
        </ul> }
               </div>
           </div>
           </div>
  </>
   )
}

const mapStateToProps = state => {
    return {
        usersData: state.users,
        stateError: state.error
    }
}

const mapDispatchToProps = dispatch => {
    return {
        fetchUsers: () => dispatch(fetchUsers()),
        addNewUser: (user) => dispatch(addNewUser(user))
    }
}

export  default connect(mapStateToProps, mapDispatchToProps) (Users);
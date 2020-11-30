import React, {useState, useEffect} from 'react';
import { Button, Modal, ModalHeader, ModalBody, ModalFooter,
       Col, Form, FormGroup, Label, Input} from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import {fetchUsers, updateUser} from "../redux/user/userActions";
import {connect} from "react-redux";
//import { useDispatch, useSelector } from 'react-redux'; can also use react hooks to work with redux dispatch functions


function EditModal (props) {
    
    const [modal, setModal] = useState(false)
    const { buttonLabel, className, user, userId, updateUser } = props;
    const [userData, setUserData] = useState({});
    

   
    const toggle = () => setModal(!modal); // toggle modal

    
    useEffect( () => {
        if(user) setUserData(user);   
    },[user])

    
    //TODO: update click handler
    const updateButtonHandler = async (e) => {
        e.preventDefault();
          updateUser(userId, userData);
          toggle();         
    }

    
    
    return (
        <>
            <Button color="info" onClick={toggle} className="ml-4">{buttonLabel}</Button>
            <Modal isOpen={modal} toggle={toggle} className={className}>
                <ModalHeader toggle={toggle}>Modal title</ModalHeader>
                <ModalBody>

                    <Form>
                        <FormGroup row>
                            <Label for="exampleName" sm={2} size="md">Fullname</Label>
                            <Col sm={10}>
                                <Input type="text" name="name" id="exampleName" placeholder="fullname"
                                value={userData.name} onChange={(e) => setUserData({...userData, name: e.target.value})}/>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="exampleEmail" sm={2} size="md">Email</Label>
                            <Col sm={10}>
                                <Input type="email" name="email" id="exampleEmail" placeholder="email"
                                value={userData.email} onChange={(e) => setUserData({...userData, email: e.target.value})}/>
                            </Col>
                        </FormGroup>

                        <FormGroup row>
                            <Label for="examplePassword" sm={2} size="md">Password</Label>
                            <Col sm={10}>
                                <Input type="text" name="password" id="examplePassword" placeholder="password"
                                       value={userData.password} onChange={(e) => setUserData({...userData, password: e.target.value})}
                                />
                            </Col>
                        </FormGroup>

                    </Form>

                </ModalBody>
                <ModalFooter>
                    <Button color="primary" onClick={updateButtonHandler} >Update</Button>{' '}
                    <Button color="secondary" onClick={toggle}>Cancel</Button>
                </ModalFooter>
            </Modal>
        </>
    )
}

// const mapStateToProps = state => {
//     return {
//         users: state.users,
//         stateError: state.error
//     }
// }

const mapDispatchToProps = dispatch => {
    return {
        updateUser: (userId, obj) => dispatch(updateUser(userId, obj))
    }
}

export default connect(null, mapDispatchToProps) (EditModal);


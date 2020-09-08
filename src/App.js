import React, { useState, useEffect } from 'react';
import Nav from './components/Nav';
import logo from "./img/app-logo.png"
import {BrowserRouter as Router, Route, Redirect ,Switch} from "react-router-dom";
import { db, auth } from "./firebase"
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './components/ImageUpload';
import Stories from './components/Stories';


//modal functions

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));

/////////////////////////////////////////////

function App() {
  
  const classes = useStyles();
  
  const [post, setPost] = useState([]);
  const [open, setOpen] = useState(false)
  const [openSignIn, setOpenSignIn ] = useState(false);
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [modalStyle] = useState(getModalStyle);
  const [user, setUser] = useState(null)

  useEffect(()=>{
    const unsubscribe = auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        // user logged in
        console.log(authUser)
        setUser(authUser);
        if(authUser.displayName){
          // don't update username
        } else {
          //if an user in been already created
          return authUser.updateProfile({
            displayName: username,
          })
        }
      } else{
        // user logged out
        setUser(null)
      } 
    })

    // perform some cleanup actions
    return ()=>unsubscribe();

  },[user, username])
  //useEffect -> Runs a code on a specific condition
  
  useEffect(()=>{
    db.collection("posts")
    .onSnapshot(snapshot=>{
      // every time a post is added, fire this code
      setPost(snapshot.docs.map(doc=>({
        id: doc.id,
        post: doc.data()})))
      })
    },[])
    /*if i let it empty, run just once
    [post] like this runs every time the variable content changes*/
    

    //signup handler

    const signUp =(e)=>{
      e.preventDefault();
      auth.createUserWithEmailAndPassword(email, password)
      .then((authUser)=>{
        return authUser.user.updateProfile({displayName: username})
      })
      .catch((error)=>alert(error.message))
      setOpen(false)
    }

    //login handler
    const logIn=(e)=>{
      e.preventDefault();
      auth.signInWithEmailAndPassword(email, password)
      .catch((error)=>alert(error.message))
      
      setOpenSignIn(false);
    }

  return (
    <div className="App">
      <Router>
        <Nav setOpen={setOpen}/>
        <div className="app__header">
          <img className="logo" src={logo} alt="logo"></img>
        </div>
        <div className="buttons-container">
        {
          user ? (
            <button className="login-out-buttons" onClick={()=>auth.signOut()}>Logout</button> 
            ) : (
              <>
           <button className="login-out-buttons" onClick={()=>setOpenSignIn(true)}>Login</button>
           <button className="login-out-buttons" onClick={()=>setOpen(true)}>SignUp</button>
           </>
           )
          }
      </div>
        
        {
          user?.displayName ? (
            <Route path="/share"  render={()=><ImageUpload username={username}/>}></Route>
            ) : (
              <h3 style={{textAlign:"center"}}>Login to upload your photo's</h3>
              )}
          <Redirect path="/" exact to="/stories" />
      <Route path="/stories" render={()=><Stories post={post}/>}></Route>

     

     {/* sign up modal */}

     <Modal className="modal"
        open={open}
        onClose={()=>setOpen(false)}
        >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup" style={{display:"flex", flexDirection:"column"}}>
            <center style={{position: "relative"}}>
              <img alt="logo" src={logo} style={{position: "absolute", top:"-40px", left:"-50px", width:"100px"}}></img>
            </center>
            <Input style={{marginTop: "50px"}} placeholder="Username" type="text" onChange={e=>setUsername(e.target.value)}></Input>
            <Input placeholder="Email" type="text" value={email} onChange={e=>setEmail(e.target.value)}></Input>
            <Input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}></Input>
            <Button className="modalButton" type="submit" onClick={signUp}>Sign Up</Button>
          </form>
        </div>
      </Modal>

    {/* login modal */}

      <Modal className="modal"
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
        >
        <div style={modalStyle} className={classes.paper}>
          <form className="app__signup" style={{display:"flex", flexDirection:"column"}}>
            <center style={{position: "relative"}}>
              <img alt="logo" src={logo} style={{position: "absolute", top:"-40px", left:"-50px", width:"100px"}}></img>
            </center>
            
            <Input style={{marginTop: "50px"}} placeholder="Email" type="text" value={email} onChange={e=>setEmail(e.target.value)}></Input>
            <Input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)}></Input>
            <Button className="modalButton" type="submit" onClick={logIn}>Login</Button>
          </form>
        </div>
      </Modal>
      </Router>
    </div>
  );
}

export default App;

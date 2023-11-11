import './App.css'
import { useEffect, useState } from 'react'


  

function App() {

  const API_URL = 'https://654fe5f0358230d8f0cdca09.mockapi.io/api1/users'

 const [users, setUsers]= useState([{}]) 
const [newUserName, setNewUserName]=useState('')
const [newUserJobTitle, setNewUserJobTitle]=useState('')
const [newUserCompanyName,setNewUserCompanyName]=useState('')

const [updatedName, setUpdatedName]=useState('')
const [updatedJobTitle, setUpdatedJobTitle]=useState('')
const[updatedCompanyName,setUpdatedCompanyName]=useState('')

 function getUser(){
    fetch(API_URL)
    .then(data => data.json())
    .then(data=>setUsers(data))
  }
  useEffect(()=>{
    getUser()
    console.log(users)
  },[])
  
  function deleteUser(id){
    fetch(`${API_URL}/${id}`,{
      method: "DELETE"
    }).then(() => getUser()).then(alert("User Deleted"))

  }
  
  function postNewUser(e){
      e.preventDefault()

     console.log(newUserCompanyName, newUserJobTitle, newUserName)


    fetch(API_URL, {
      method: 'POST',
      headers:{ "Content-Type": "application/json"},
      body: JSON.stringify({
        name: newUserName,
        jobTitle: newUserJobTitle,
        companyName: newUserCompanyName,
    }) 
    }).then(()=>getUser()).then(alert("New User Added"))
  }
  
  
  function updateUser(e,userObject){
    e.preventDefault()
    let updatedUserObject = {
      ...userObject, 
      name: updatedName,
      jobTitle: updatedJobTitle,
      companyName: updatedCompanyName,
    }

    fetch(`${API_URL}/${userObject.id}`,{
      method: 'PUT',
      body: JSON.stringify(updatedUserObject),
      headers:{
        "Content-Type": "application/json"
      }
    }).then(console.log(updatedUserObject)).then(() => getUser()).then(alert("User Updated"))

  }
  
  return (
    <div className="App">
    
      <form>
        <h3>Post new user form</h3>
        <label>Name</label>
        <input onChange={(e)=>setNewUserName(e.target.value)}></input><br></br>
        <label>Job Title</label>
        <input onChange={(e)=>setNewUserJobTitle(e.target.value)}></input><br></br>
        <label>Company Name</label>
        <input onChange={(e)=>setNewUserCompanyName(e.target.value)}></input><br></br>
        <button onClick={(e)=>postNewUser(e)}>Add User</button>
      </form>


      {users.map((user,index)=>(

     
      <div className='userContainer' key={index}>
        <div id='userDisplay'>
        Name : { user.name } <br></br>
        Job Title : { user.jobTitle }<br></br>
        Company Name : { user.companyName }<br></br>  
        <button onClick={()=>deleteUser(user.id)}>Delete</button>
        </div> 
        <form>
          <h3>Update This User</h3>
          <label>Update Name</label>
          <input onChange={(e)=>setUpdatedName(e.target.value)}></input><br></br>

          <label>Update Job Title</label>
          <input onChange={(e)=>setUpdatedJobTitle(e.target.value)}></input><br></br>

          <label> Update Company Name</label>
          <input onChange={(e)=> setUpdatedCompanyName(e.target.value)}></input><br></br>

          <button onClick={(e)=>updateUser(e, user)}>Update</button>
        </form>
      </div>))}
    </div>
  )
}

export default App

import './App.css';
import { useState,useEffect } from 'react';
import axios from 'axios';

function App() {
  const [data,setData]=useState([])
  const [route,setRoute]=useState('home')
  const [islogin,setLogin]=useState(false)
  
  const [user,setUser]=useState('')
  
  const shareData = {
    title: '',
    text: 'Check out this link:',
    url: '',
  };
  const share = async () => {
    try {
      await navigator.share(shareData);
     
    } catch (error) {
     console.log(error)
    }
  };
  useEffect(() => {
    axios.get('https://sharenote-api.onrender.com/allFiles')
      .then((response) => {
        setData(response.data);
      })
      .catch((error) => console.log(error));
    
  }, []);

  return (
    <div className="App">
      <h1>NoteShare</h1>
      {islogin? route==='home'?
      (<div>
        <h3>Welcome {user.name}</h3>
        <h3>CheatSheets and notes available currently<br/>
        Please Fill This Form <a href='https://docs.google.com/forms/d/e/1FAIpQLSeCsgCXWN4r_c4lrdlAv1suFWBeKw_krgNu5WaUFJ0l0Fvc7Q/viewform?usp=sf_link'>Link</a>
       </h3>
       <button onClick={()=>{setRoute('dasboard')}} style={{ backgroundColor: '#4285f4', color: '#fff', fontSize: '1.1rem', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer' }} >Go to DashBoard</button>
       <p  id="blink" style={{animation:'blink 2s linear infinite'}}>After Clicking Download Link Please Request Access Permission .You may have to wait to get permission as its a manual process</p>
       <div className='cheatsheet-container'>
        {data.map((item)=>{
          return(<div className='cheat-sheet'>
           <h3>{item.name}</h3>
           {shareData.text=item.name}
           <a href={item.link} >Download</a>
           <button id='share' onClick={share}>Share</button>
          <h4>Price:{item.price}</h4>
           <p>{item.category}</p>
           <p>Created By {item.author}</p>
      
           {item.verified==="yes"?<p style={{color:'green'}}>verified</p>:<p style={{color:'red'}}>Not verified</p>}
          </div>)
        })}
       </div>
       </div>):(<DashBoard user={user} route={route} setroute={setRoute}/>):(<LoginForm login={islogin} setlogin={setLogin} user={user} setuser={setUser}/>)
}
    </div>
    
  );
}
function DashBoard({user,route,setroute}){
  return(<div>
    <h1>Welcome {user.name} </h1>
    <div className='dashboard-container'>
      <h3>Upload Files</h3>
      <button onClick={()=>{setroute('home')} }  style={{ backgroundColor: '#4285f4', color: '#fff', fontSize: '1.1rem', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer' }}>Go to Home</button>
      <UploadForm userId={user._id} route={route} setroute={setroute}/>
      <h3>Your Uploaded Files</h3>
      <div className='dashboard-items' style={{display:'flex',flexWrap:'wrap'}}>
      {user.uploadedFiles.map((item)=>{
          return(<div className='cheat-sheet'>
           <h3>{item.name}</h3>
           <a href={item.link} >Download</a>
          <h4>Price:{item.price}</h4>
           <p>{item.category}</p>
           <p>Created By {item.author}</p>
      
           {item.verified==="yes"?<p style={{color:'green'}}>verified</p>:<p style={{color:'red'}}>Not verified</p>}
          </div>)
        })}
        </div>

    </div>
  </div>)
}

function LoginForm({login,setlogin,user,setuser}) {
  const [email, setEmail] = useState('');
  const [route,setRoute]=useState('login')
  const [password, setPassword] = useState('');
  
  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can make an Axios POST request to submit the form data
    axios.post('https://sharenote-api.onrender.com/loginUser', {
      email,
      password,
    })
      .then((response) => {
       
        // Handle successful response here
        if(response.data.message==="User logged in successfully"){
          setlogin(true)
          setuser(response.data.user)
          
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error response here
      });
  };

  return (
    <div className="LoginForm">
     { route==='login'?(<div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="name">Name:</label>

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Submit</button>
      </form>
      <button onClick={()=>{setRoute('reg')} }  style={{ backgroundColor: '#4285f4', color: '#fff', fontSize: '1.1rem', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer' }}          >Register Here</button>
      </div>):(<RegisterForm  setuser={setuser} user={user} route={route} setroute={setRoute} login={login} setlogin={setlogin}/>)
}
    </div>
  );
}
function RegisterForm({user,setuser,route,setroute,login,setlogin}) {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Here you can make an Axios POST request to submit the form data
    axios.post('https://sharenote-api.onrender.com/registerUser', {
      email,
      name,
      password,
    })
      .then((response) => {
       // console.log(response);
        // Handle successful response here
        if(response.data.msg==="Inserted"){
          setlogin(true)
          setuser(response.data.user)
        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error response here
      });
  };

  return (
    <div className="LoginForm">
      <form onSubmit={handleSubmit}>
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />

        <label htmlFor="name">Name:</label>
        <input
          type="text"
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />

        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />

        <button type="submit">Submit</button>

      </form>
      <button onClick={()=>{setroute('login')}}    style={{ backgroundColor: '#4285f4', color: '#fff', fontSize: '1.1rem', padding: '0.5rem 1rem', borderRadius: '5px', border: 'none', cursor: 'pointer', margin:'20px' }}>LogIn Here</button>
    </div>
  );
}
function UploadForm({ userId,route,setroute }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('');
  const [link, setLink] = useState('');
  const [price, setPrice] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    axios.post(`https://sharenote-api.onrender.com/uploadFiles/${userId}`, {
      name,
      category,
      link,
      price,
    })
      .then((response) => {
      //  console.log(response);
        // Handle successful response here
        if(response.data.message==='File uploaded successfully'){
          alert("File Uploadeed Succesfully")
          setroute('home')

        }
      })
      .catch((error) => {
        console.error(error);
        // Handle error response here
      });
  };

  return (
    <form onSubmit={handleSubmit} className="upload-form">
      <label htmlFor="name">Name:</label>
      <input
        type="text"
        id="name"
        value={name}
        onChange={(event) => setName(event.target.value)}
        className="form-input"
      />

      <label htmlFor="category">Category:</label>
      <input
        type="text"
        id="category"
        value={category}
        onChange={(event) => setCategory(event.target.value)}
        className="form-input"
      />

      <label htmlFor="link">Link:</label>
      <input
        type="text"
        id="link"
        value={link}
        onChange={(event) => setLink(event.target.value)}
        className="form-input"
      />

      <label htmlFor="price">Price:</label>
      <input
        type="text"
        id="price"
        value={price}
        onChange={(event) => setPrice(event.target.value)}
        className="form-input"
      />

      <button type="submit" className="form-submit-button">Upload File</button>
    </form>
  );
}

export default App;

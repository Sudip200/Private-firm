
import './App.css';
const data=[{
  name:"Sorting & Searching Cheatsheet",
  category:"Computer Science",
  link:"https://drive.google.com/file/d/1vsYE6GK7Qg6yomc-TtECSoiIr4D48siE/view?usp=sharing",
  price:"Free",
  verified:"no"
},{
  name:"LinkedList Algorithms cheatsheet",
  category:"Computer Science",
  link:"https://drive.google.com/file/d/15PuktHXd4pAkaaENe07Rug4sPqjeXqJk/view?usp=sharing",
  price:"Free",
  verified:"no"
},
{name:"Stack & Queue Algorithms",
  category:"Computer Science",
  link:"https://drive.google.com/file/d/1KXly6pEwRDB6yb_r6uvia6rA2eEU5Dae/view?usp=sharing",
  price:"Free",
  verified:"no"}]
function App() {
  return (
    <div className="App">
      <h1>CheatSheet Baba</h1>
       <h3>CheatSheets and notes available currently</h3>
       <div className='cheatsheet-container'>
        {data.map((item)=>{
          return(<div className='cheat-sheet'>
           <h3>{item.name}</h3>
           <a href={item.link} >Download</a>
          <h4>Price:{item.price}</h4>
           <p>{item.category}</p>
           {item.verified==="yes"?<p style={{color:'green'}}>verified</p>:<p style={{color:'red'}}>Not verified</p>}
          </div>)
        })}
       </div>
    </div>
    
  );
}

export default App;

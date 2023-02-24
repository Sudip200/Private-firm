
import './App.css';
const data=[{
  name:"Sorting & Searching Cheatsheet",
  category:"Computer Science",
  link:"https://drive.google.com/file/d/1vsYE6GK7Qg6yomc-TtECSoiIr4D48siE/view?usp=sharing"
},{
  name:"LinkedList Algorithms cheatsheet",
  category:"Computer Science",
  link:"https://drive.google.com/file/d/15PuktHXd4pAkaaENe07Rug4sPqjeXqJk/view?usp=sharing"
}]
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
           <p>{item.category}</p>
          </div>)
        })}
       </div>
    </div>
    
  );
}

export default App;

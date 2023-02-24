
import './App.css';
const data=[{
  name:"Sorting & Searching Cheatsheet",
  category:"Computer Science",
  link:"https://drive.google.com/file/d/1vsYE6GK7Qg6yomc-TtECSoiIr4D48siE/view?usp=sharing",
  price:"Free",
  verified:"no",
  author:"Sudipto Das"
},{
  name:"LinkedList Algorithms cheatsheet",
  category:"Computer Science",
  link:"https://drive.google.com/file/d/15PuktHXd4pAkaaENe07Rug4sPqjeXqJk/view?usp=sharing",
  price:"Free",
  verified:"no",
  author:"Sudipto Das"
},
{name:"Stack & Queue Algorithms",
  category:"Computer Science",
  link:"https://drive.google.com/file/d/1KXly6pEwRDB6yb_r6uvia6rA2eEU5Dae/view?usp=sharing",
  price:"Free",
  verified:"no",
  author:"Sudipto Das"},
  {name:"Differntial Calculas",
  category:"Mathematics",
  link:"https://drive.google.com/file/d/1wphT86fpJgFlCoT12nbHYE1q98-fIJRh/view?usp=sharing",
  price:"Free",
  verified:"no",
  author:"Sudipto Das"
}]
function App() {
  const shareData = {
    title: '',
    text: 'Check out this link:',
    url: '',
  };
  const share = async () => {
    try {
      await navigator.share(shareData);
     // console.log('Shared successfully');
    } catch (error) {
     // console.error('Error sharing:', error);
    }
  };
  
  return (
    <div className="App">
      <h1>CheatSheet Baba</h1>
       <h3>CheatSheets and notes available currently</h3>
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
    </div>
    
  );
}

export default App;

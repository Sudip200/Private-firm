import logo from './logo.svg';
import './App.css';

function App() {
  const date=new Date()
  return (
    <div className="App">
      <h1>Welcome to Das Solutions</h1>
       <h2>{String(date)}</h2>
    </div>
  );
}

export default App;

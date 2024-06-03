import './App.css'
import HomePage from './pages/Home/HomePage'

function App() {

  // The HomePage component is unique and is the only one that is rendered
  return(
    <div className="container-pages">
      <HomePage />
    </div>
  ); 
}

export default App

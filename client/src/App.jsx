import Home from "./component/Home"
import Login from "./component/Login"
import {BrowserRouter,Routes,Route} from "react-router-dom"
import OtpRequest from "./component/OtpRequest"
import Users from "./component/Users"
import VerifyOtp from "./component/VerifyOtp"

function App() {


  return (
    <BrowserRouter>
    <Routes>
      <Route path="/" element={<Home/>} />
        <Route path="/Login" element={<Login/>} />
         <Route path="/OtpRequest" element={<OtpRequest/>} />
           <Route path="/Users" element={<Users/>} />
            <Route path="/VerifyOtp" element={<VerifyOtp/>} />
    
    </Routes>
    </BrowserRouter>
  )
}

export default App

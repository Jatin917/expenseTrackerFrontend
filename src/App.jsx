import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './Pages/Home'
import { Signin } from './Pages/SignIn'
import { Signup } from './Pages/SignUp'
import PrivateRoute from './Pages/PrivateRoute'
import { RecoilRoot } from 'recoil';
import { Buffer } from 'buffer';
import { ToastContainer } from 'react-toastify'
import AddItem from './Pages/AddItem'
import EditItem from './Pages/EditItem'


function App() {
  window.Buffer = Buffer;
  return (
    <>
      <ToastContainer />
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<PrivateRoute Component={Home} />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/add" element={<AddItem />} />
            <Route path="/edit/:id/:eName/:eAmt" element={<EditItem />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
    </>
  )
}

export default App

import axios from "axios"
import { BottomWarning } from "../Components/BottomWarning"
import { Button } from "../Components/Button"
import { Heading } from "../Components/Heading"
import { InputBox } from "../Components/InputBox"
import { SubHeading } from "../Components/SubHeading"
import { useEffect, useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS file
import { authentication, authenticToken, Loading } from "../store/Atom/authentication"
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil"


export const Signin = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useRecoilState(Loading);
  const authenticValue = useRecoilValue(authentication);
  const {isAuthenticated} = authenticValue;
  // const setAuthToken = useSetRecoilState(authToken);
  const [authToken, setAuthToken ] = useRecoilState(authenticToken);
  // const token = localStorage.getItem("token");
  // const [token, setToken] = useState(localStorage.getItem("token"));
  const setAuthenticDetails = useSetRecoilState(authentication);

  useEffect(()=>{
    const AuthenticDetails = async() =>{
      try {
        const response = await axios.get("http://localhost:8000/app/v1/user/verify", {
          headers:{
              Authorization:"Bearer "+ authToken
          }
        });
        if(response.status===200)  
          setAuthenticDetails({isAuthenticated:true,firstName:response.data.firstName});
        else setAuthenticDetails({isAuthenticated:false,firstName:""});
      } catch (error) {
        console.log('token verification failed ', error.message);
      }
      navigate('/');
    }
    AuthenticDetails();
  },[authToken, navigate, setAuthenticDetails]);


  const handleSignIn = async() =>{
    try {
      setLoading(true);
      const response = await axios.post("http://localhost:8000/app/v1/user/signin", {
        email,
        password
      });
      toast.success('Logged in successfully! 👋');
      setLoading(false);
      localStorage.setItem("token", response.data.token)
      setAuthToken(localStorage.getItem("token"));
    } catch (error) {
      setLoading(false);
      toast.error(error.message);
    }
  }

    return <>
      { isAuthenticated ? <Navigate to='/' /> :
      <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading label={"Sign in"} />
          <SubHeading label={"Enter your credentials to access your account"} />
          <InputBox onChange={(e)=> setemail(e.target.value)} placeholder="mantavya2@gmail.com" label={"Email"} />
          <InputBox onChange={(e)=> setPassword(e.target.value)} placeholder="Mantavya@123" label={"Password"} />
          <div className="pt-4">
            <Button disabled={loading} onClick={handleSignIn} label={"Sign in"} />
          </div>
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>}
    </>
}
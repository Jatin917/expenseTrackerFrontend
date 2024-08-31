import axios from "axios"
import { BottomWarning } from "../Components/BottomWarning"
import { Button } from "../Components/Button"
import { Heading } from "../Components/Heading"
import { InputBox } from "../Components/InputBox"
import { SubHeading } from "../Components/SubHeading"
import { useState } from "react"
import { Navigate, useNavigate } from "react-router-dom"
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css'; // Import the CSS file
import { authentication, Loading } from "../store/Atom/authentication"
import { useRecoilState, useRecoilValue } from "recoil"


export const Signin = () => {
  const [email, setemail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const [loading, setLoading] = useRecoilState(Loading);
  const isAuthenticated = useRecoilValue(authentication);

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
            <Button disabled={loading} onClick={async () => {
              setLoading(true);
              const response = await axios.post("http://localhost:8000/app/v1/user/signin", {
                email,
                password
              });
              toast.success('Logged in successfully! 👋');
              setLoading(false);
              localStorage.setItem("token", response.data.token)
              navigate("/dashboard")
            }} label={"Sign in"} />
          </div>
          <BottomWarning label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"} />
        </div>
      </div>
    </div>}
    </>
}
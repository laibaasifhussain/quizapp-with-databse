import { useState } from "react";
import BAbutton from '../components/BAbutton';
import BAinput from "../components/BAinput";
import { fbLogin } from "../config/firebasemethods";
import './Signup.css';

export default function Login() {
  const [model, setModel] = useState({});

  const fillModel = (key, val) => {
    model[key] = val;
    setModel({ ...model });
  };

  let LoginUser = () => {
    console.log(model);
    fbLogin(model)
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <>
      <div className="background">
        <div className="innerdiv">
          <div className="py-2">
            <h1 className="headingclass">Login</h1>
          </div>
          <center>
          <div className="py-1">
            <BAinput
              value={model.email}
              onChange={(e) => fillModel("email", e.target.value)}
              label="Email"
            />
          </div>
          <div className="py-1">
            <BAinput
              value={model.password}
              onChange={(e) => fillModel("password", e.target.value)}
              label="Password"
            />
          </div>
          <div className="py-1">
           <center><BAbutton onClick={LoginUser} label="Login" /></center> 
          </div>
          </center>
        </div>
      </div>
    </>
  );
}

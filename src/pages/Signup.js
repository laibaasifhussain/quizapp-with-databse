import { useState } from "react";
import BAbutton from "../components/BAbutton";
import BAinput from "../components/BAinput";
import { fbSignUp } from "../config/firebasemethods";
import { useNavigate } from "react-router-dom";
import './Signup.css';
import {Link} from "react-router-dom";

export default function Signup() {
  const [model, setModel] = useState({});

  const fillModel = (key, val) => {
    model[key] = val;
    setModel({ ...model });
  };

  const navigate = useNavigate();

  let signUpUser = () => {
    console.log(model);
    fbSignUp(model)
      .then((res) => {
        navigate("/login");
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
            <h1 className="headingclass">Sign Up</h1>
          </div>
          <center>
          <div className="py-1">
            <BAinput
              value={model.userName}
              onChange={(e) => fillModel("userName", e.target.value)}
              label="User Name"
            />
          </div>
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
            <BAbutton className="Signupbutton" onClick={signUpUser} label="Sign Up" />
          </div>
          </center>
          <div>
            <p className="textblack">Already have account? Click here to <Link to="/Login">
                <a href="/Login">Login</a>
            </Link></p> 
          </div>
        </div>
      </div>
    </>
  );
}

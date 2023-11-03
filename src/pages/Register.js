import React, { useState } from "react";
import "../styles/mix.css";
import { ToastContainer, toast } from "react-toastify";
import { registerfunction } from "../services/Api";
import {useNavigate} from "react-router-dom";
const Register = () => {
  const [PassShow, setPassShow] = useState(false);

  const [inputdata, setInputdata] = useState({
    fname: "",
    email: "",
    password: "",
  });
  const navigate = useNavigate()
  //setinputdata
  const handleChange = (e) => {
    const { name, value } = e.target;
    setInputdata({ ...inputdata, [name]: value });
  };

  //register data
  const handleSubmit = async(e) => {
    e.preventDefault();
    const { fname, email, password } = inputdata;

    if (fname === "") {
      toast.error("Enter Your Name");
    } else if (email === "") {
      toast.error("Enter Your Email");
    } else if (!email.includes("@")) {
      toast.error("Enter Valid Email");
    } else if (password === "") {
      toast.error("Enter Your Password");
    } else if (password.length < 6) {
      toast.error("Password length is minimum 6 characters");
    } else {
      const response = await registerfunction(inputdata);
      if(response.status === 200){
        setInputdata({...inputdata,fname:"",email:"",password:""});
        navigate("/")
      }else{
        toast.error(response.response.data.error);
      }
    }
  };
  return (
    <>
      <section>
        <div className="form_data">
          <div className="form_heading">
            <h1>Sign up</h1>
            <p style={{ textAlign: "center" }}>
              We are glad that you will be using project cloud to manage your
              tasks! We hope that you will like it.
            </p>
          </div>
          <form>
            <div className="form_input">
              <label htmlFor="fname">Name</label>
              <input
                type="text"
                name="fname"
                id=""
                onChange={handleChange}
                placeholder="Enter Your Name"
              />
            </div>
            <div className="form_input">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id=""
                onChange={handleChange}
                placeholder="Enter Your Email Address"
              />
            </div>
            <div className="form_input">
              <label htmlFor="password">Password</label>
              <div className="two">
                <input
                  type={!PassShow ? "password" : "Text"}
                  name="password"
                  id=""
                  onChange={handleChange}
                  placeholder="Enter Your password"
                />
                <div
                  className="showpass"
                  onClick={() => setPassShow(!PassShow)}
                >
                  {!PassShow ? "Show" : "Hide"}
                </div>
              </div>
            </div>
            <button className="btn" onClick={handleSubmit}>
              Sign Up
            </button>
            <p>Don't have an account</p>
          </form>
        </div>
        <ToastContainer />
      </section>
    </>
  );
};

export default Register;

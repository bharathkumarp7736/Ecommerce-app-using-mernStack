import React, { useEffect, useState } from "react";import { Link,useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import {useSelector,useDispatch} from "react-redux";
import { register } from "../features/products/user/userSlice";
import { removeErrors, removeSuccess } from "../features/products/user/userSlice";

const Register = () => {
  const dispatch = useDispatch();
const { error, success,loading } = useSelector((state) => state.user);
const navigate=useNavigate();
  const [preview,setPreview]=useState("https://ui-avatars.com/api/?name=User&background=random");
  const [user,setUser]=useState({
    name:"",
    email:"",
    password:"",
  });
  const[avatar,setAvatar]=useState("");
  const{name,email,password}=user;
  const handleChange=(e)=>{
    if(e.target.name==="avatar"){
      const reader=new FileReader();
      reader.onload=()=>{
        if(reader.readyState===2){
          setPreview(reader.result);
          setAvatar(reader.result);
        }
      }
      reader.readAsDataURL(e.target.files[0]);
    }
    else{
      setUser({...user,[e.target.name]:e.target.value})
    }
  }
  const registerNow=(e)=>{
    e.preventDefault();
    if(!name || !email || !password ){
      toast.error("Please fill all the fields",{position:"top-center",autoClose:3000
    });
    return;
  }
  const myForm=new FormData();
  myForm.set("name",name);
  myForm.set("email",email);
  myForm.set("password",password);
  myForm.set("avatar",avatar);
  // console.log(myForm.entries());

dispatch(register(myForm));
};
  useEffect(()=>{
    if(error){
      toast.error(error,{position:"top-center",autoClose:3000});
      dispatch(removeErrors());
    }
  },[error, dispatch]);

  useEffect(()=>{
    if(success){
      toast.success("Registration successfully! You can now log in.",{position:"top-center",autoClose:3000});
      dispatch(removeSuccess());
      navigate("/login");
    }
  },[success, dispatch]);


  return (
    <div className="bg-blue-200 flex items-center justify-center min-h-screen">
      <div className="w-full max-w-md p-8 bg-blue-300 rounded-2xl shadow-xl">
        <form onSubmit={registerNow} className="space-y-6" encType="multipart/form-data">
          <div className="text-center">
            <h2 className="font-bold text-gray-800 text-3xl">Create Account</h2>
            <p className="text-sm text-gray-600 mt-2">
              Join us and start your journey
            </p>
          </div>
          <div className="space-y-2">
            <label 
              htmlFor=""
              className="text-sm font-medium text-gray-700 ml-1 block"
            >
              Username
            </label>
            <input
            placeholder="yourname"
              type="text"
              value={name}
              name="name"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor=""
              className="text-sm font-medium text-gray-700 ml-1 block"
            >
              Email
            </label>
            <input
              placeholder="example@gmail.com"
              type="email"
              value={email}
              name="email"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="space-y-2">
            <label
              htmlFor=""
              className="text-sm font-medium text-gray-700 ml-1 block"
            >
              Password
            </label>
            <input
              placeholder="••••••••"
              type="password"
              value={password}
              name="password"
              onChange={handleChange}
              className="w-full px-4 py-3 rounded-xl border border-blue-200 focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all"
            />
          </div>
          <div className="flex items-center space-x-4">
            <div className="shrink-0">
              <img
                id="preview"
                src={preview}
                alt=""
                className="h-12 w-12 object-cover rounded-sm bg-blue-200"
              />
            </div>
            <label className="block">
              <span className="sr-only">Choose Profile Image</span>
              <input
                type="file"
                name="avatar"
                accept="image/*"
                onChange={handleChange}
                className="block w-full text-sm text-gray-200 file:mr-4 file:py-2  file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-500 hover:file:bg-blue-400 cursor-pointer "
              />
            </label>
          </div>
          <button className="w-full bg-blue-600 hover:bg-blue-500 text-gray-100  font-semibold py-3 rounded-xl shadow-lg shadow-blue-500 transition-all active:scale-[0.98] cursor-pointer">
            {loading?"Registering...":"Register"}
          </button>
          <p className="text-center text-sm text-gray-600">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-blue-600 font-semibold hover:underline"
            >
              Log in
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Register;

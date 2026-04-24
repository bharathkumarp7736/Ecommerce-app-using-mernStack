import React, { useEffect, useState } from "react";
import Navbar from "../Components/Navbar";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loadUser, removeErrors, removeSuccess, updateProfile } from "../features/products/user/userSlice";
import toast from 'react-hot-toast'
const UpdateProfile = () => {
  const { user, error, success, loading,isAuthenticated } = useSelector((state) => state.user);
  const dispatch=useDispatch();
  const navigate=useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [avatar, setAvatar] = useState("");
  const [preview, setPreview] = useState("../src/assets/profile.png");

  useEffect(() => {
    if (user) {
      setName(user.name || "");
      setEmail(user.email || "");

      if (user.avatar?.url) {
        setPreview(user.avatar.url);
      }
    }
    if(error){
      toast.error(error || 'Profile update failed!')
      dispatch(removeErrors())
    }
    if(success){
      toast.success('Profile updated successfully')
      dispatch(loadUser())
      navigate('/profile')
      dispatch(removeSuccess())
    }
  }, [user,dispatch,error,success]);

  const handleChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = () => {
      if (reader.readyState === 2) {
        setPreview(reader.result);
        setAvatar(reader.result);
      }
    };

    reader.readAsDataURL(file);
  };

  const updateProfileSubmit = (e) => {
    e.preventDefault();

    const myform = new FormData();
    myform.set("name", name);
    myform.set("email", email);

    if (avatar) {
      myform.set("avatar", avatar);
    }

    // for verify on console 
    // for(const[key,value] of myform.entries()){
    //     console.log(key,value);
    // }    

dispatch(updateProfile(myform))

  };

   
    useEffect(()=>{
        if(!isAuthenticated){
            navigate('/');
        }
    },[isAuthenticated])

  return (
    <>
      <Navbar />

      <div className="min-h-screen bg-blue-100 flex flex-col items-center py-12 sm:px-6 lg:px-8 pt-24">
        <div className="sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-700">
            Edit Profile
          </h2>
        </div>

        <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
          <div className="bg-blue-200 py-10 px-6 shadow-xl rounded-2xl sm:px-10 border border-blue-500">
            
            <form
              encType="multipart/form-data"
              className="space-y-6"
              onSubmit={updateProfileSubmit}
            >
              {/* Avatar */}
              <div className="flex flex-col mb-6 items-center">
                <div className="w-28 h-28 mb-4">
                  <img
                    src={preview}
                    alt={user?.name}
                    className="rounded-full w-full h-full object-cover border-4 border-blue-500 shadow-lg"
                  />
                </div>

                <label className="block bg-blue-300 text-gray-700 px-4 py-2 rounded-lg font-semibold text-sm cursor-pointer hover:bg-blue-100 transition">
                  Change Photo
                  <input
                    type="file"
                    name="avatar"
                    accept="image/*"
                    className="hidden"
                    onChange={handleChange}
                  />
                </label>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 ml-1">
                  Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-blue-400 rounded-xl shadow-lg focus:outline-none"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="mt-1 block w-full px-4 py-3 border border-blue-400 rounded-xl shadow-lg focus:outline-none"
                />
              </div>

              {/* Submit Button */}
              <div className="w-full mt-8">
                <button
                  type="submit"
                  className="w-full flex justify-center py-3 px-4 font-bold text-gray-100 rounded-xl shadow-lg shadow-blue-300 text-sm bg-blue-400 hover:bg-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all active:scale-[0.98] cursor-pointer"
                >
                  Save Profile
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </>
  );
};

export default UpdateProfile;
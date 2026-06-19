import { useState } from "react";
import api from "../api.js";
import { useNavigate, Link } from "react-router-dom";
import { Salad,User, Mail, Lock, Eye, EyeOff, Loader2 } from "lucide-react";
import toast from "react-hot-toast";
const Register=()=>{
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstname: "",
    lastname: "",
    email: "",
    password: "",
  });
  const [loading, setloading] = useState(false)
  const [errors, seterrors] = useState({})
  const [showPassword, setshowPassword] = useState(false)
  const handleChange=(e)=>{
    setFormData({...formData,[e.target.name]: e.target.value});
    if(errors[e.target.name]){
      seterrors({...errors,[e.target.name]:""})
    }
  };
  const validate=()=>{
    const newErrors={};
    if(!formData.firstname.trim()){
      newErrors.firstname="first name input field is required"
    }
    if(!formData.lastname.trim()){
      newErrors.lastname="last name input field is required"
    }
    if(!formData.email.trim()){
      newErrors.email="email input field is required"
    }
    else if(!/\S+@\S+\.\S+/.test(formData.email)){ 
      newErrors.email="enter a valid email"
    }
    if(!formData.password){
      newErrors.password="password input field is required"
    }
    else if(formData.password.length<6){
      newErrors.password="password must be at least 6 characters"
    }
    seterrors(newErrors);
    return Object.keys(newErrors).length===0;
}
  const handleSubmit=async(e)=>{
    e.preventDefault();
    if(!validate()){
      return
    }
    setloading(true)
    try{
      const response = await api.post("/api/users/register",formData);
      localStorage.setItem("token", response.data.token);
      toast.success("registration successful");
      navigate("/dashboard");
    } catch(error){
      console.log(error.response.data)
      toast.error(error.response?.data?.message || "registration failed,please try again")
    }finally{
      setloading(false)
    }
  };
  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-50 px-4">
      <div className="bg-white p-8 rounded-2xl shadow-sm w-full max-w-md">
        <div className="text-center mb-6">
          <Salad size={40} className="text-green-600 mx-auto"/>
          <h1 className="text-2xl font-bold text-green-600 mt-2">SmartBite</h1>
          <p className="text-gray-400 text-sm mt-1">Create an account to get started</p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="grid grid-cols-2 gap-3 mb-4">
            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">First Name</label>
              <div className="relative">
                <User size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                <input
                  type="text"
                  name="firstname"
                  placeholder="John"
                  value={formData.firstname}
                  onChange={handleChange}
                  className={`w-full pl-10 pr-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.firstname ? 'border-red-400' : 'border-gray-200'}`}
                />
              </div>
              {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>}
            </div>

            <div>
              <label className="text-sm font-medium text-gray-700 mb-1 block">Last Name</label>
              <input
                type="text"
                name="lastname"
                placeholder="Doe"
                value={formData.lastname}
                onChange={handleChange}
                className={`w-full px-3 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.lastname ? 'border-red-400' : 'border-gray-200'}`}
              />
              {errors.lastname && <p className="text-red-500 text-xs mt-1">{errors.lastname}</p>}
            </div>
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Email</label>
            <div className="relative">
              <Mail size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="email"
                name="email"
                placeholder="you@example.com"
                value={formData.email}
                onChange={handleChange}
                className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.email ? 'border-red-400' : 'border-gray-200'}`}
              />
            </div>
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>

          <div className="mb-4">
            <label className="text-sm font-medium text-gray-700 mb-1 block">Password</label>
            <div className="relative">
              <Lock size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                placeholder="At least 6 characters"
                value={formData.password}
                onChange={handleChange}
                className={`w-full pl-10 pr-10 py-2.5 border rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400 ${errors.password ? 'border-red-400' : 'border-gray-200'}`}
              />
              <button
                type="button"
                onClick={() => setshowPassword(!showPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white font-semibold py-2.5 rounded-lg transition duration-200"
          >
            {loading && <Loader2 size={18} className="animate-spin" />}
            {loading ? "Creating account..." : "Register"}
          </button>
        </form>

        <p className="mt-5 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link to="/login" className="text-green-600 font-semibold">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
}
export default Register;
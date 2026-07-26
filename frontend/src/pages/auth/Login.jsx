import { useState } from "react";

import { Link,useNavigate } from "react-router-dom";

import { ToastContainer,toast } from "react-toastify";

import API from "../../services/api";

function Login(){

const navigate=useNavigate();

const[email,setEmail]=useState("");

const[password,setPassword]=useState("");

const[loading,setLoading]=useState(false);

const handleLogin = async (e) => {

    e.preventDefault();
    setLoading(true);

    try {
        const res = await API.post("/auth/login", {
            email,
            password
        });

        const user = {
            id: res.data.id,
            name: res.data.name,
            role: res.data.role
        };

        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("token", res.data.token);

        toast.success("Login Successful");

        setTimeout(() => {
            if (user.role === "ADMIN") {
                navigate("/admin/dashboard");
            } else if (user.role === "USER") {
                navigate("/user/dashboard");
            } else {
                navigate("/owner/dashboard");
            }
        }, 1200);

    } catch (err) {
        toast.error(
            err.response?.data?.message || "Login Failed"
        );
    } finally {
        setLoading(false);
    }
};

return(

<div className="container auth-container d-flex align-items-center">

<ToastContainer/>

<div className="row justify-content-center w-100">

<div className="col-lg-10">

<div className="card auth-card">

<div className="row">

<div className="col-lg-6 left-panel">

<div className="logo-circle">

<i className="bi bi-shop"></i>

</div>

<h1>

Store Rating System

</h1>

<p>

Manage Stores and Ratings professionally.

</p>

</div>

<div className="col-lg-6 right-panel">

<h2>

Welcome Back 👋

</h2>

<p className="text-secondary mb-4">

Login to continue.

</p>

<form onSubmit={handleLogin}>

<div className="mb-3">

<label>Email</label>

<input

type="email"

className="form-control"

value={email}

onChange={(e)=>setEmail(e.target.value)}

required

/>

</div>

<div className="mb-4">

<label>Password</label>

<input

type="password"

className="form-control"

value={password}

onChange={(e)=>setPassword(e.target.value)}

required

/>

</div>

<button

className="btn btn-login w-100"

disabled={loading}

>

{

loading?

"Logging in..."

:

"Login"

}

</button>

</form>

<div className="text-center mt-4">

New User?

<Link to="/register">

 Register

</Link>

</div>

</div>

</div>

</div>

</div>

</div>

</div>

);

}

export default Login;
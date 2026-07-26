import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../../services/api";

function Register() {

    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        address: "",
        password: "",
        confirmPassword: ""
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
        alert("Passwords do not match");
        return;
    }

    setLoading(true);

    try {

        const res = await API.post("/auth/register", {
            name: formData.name,
            email: formData.email,
            address: formData.address,
            password: formData.password
        });

        alert(res.data.message);

        navigate("/");

    } catch (err) {

        console.log(err);

        if (err.response?.data?.length > 0) {
            alert(err.response.data[0].msg);
        } else {
            alert(err.response?.data?.message || "Registration Failed");
        }

    } finally {
        setLoading(false);
    }
};

    return (

        <div className="container auth-container d-flex align-items-center">

            <div className="row justify-content-center w-100">

                <div className="col-lg-8">

                    <div className="card p-5 shadow-lg border-0 rounded-4">

                        <h2 className="fw-bold mb-4">
                            Create Account
                        </h2>

                        <form onSubmit={handleSubmit}>

                            <div className="row">

                                <div className="col-md-6 mb-3">
                                    <input
                                        name="name"
                                        className="form-control"
                                        placeholder="Full Name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input
                                        name="email"
                                        type="email"
                                        className="form-control"
                                        placeholder="Email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-12 mb-3">
                                    <textarea
                                        name="address"
                                        className="form-control"
                                        placeholder="Address"
                                        rows="3"
                                        value={formData.address}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input
                                        name="password"
                                        type="password"
                                        className="form-control"
                                        placeholder="Password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                                <div className="col-md-6 mb-3">
                                    <input
                                        name="confirmPassword"
                                        type="password"
                                        className="form-control"
                                        placeholder="Confirm Password"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                    />
                                </div>

                            </div>

                            <button
                                className="btn btn-login w-100"
                                disabled={loading}
                            >
                                {loading ? "Creating..." : "Create Account"}
                            </button>

                        </form>

                        <div className="text-center mt-4">
                            Already have an account?
                            <Link to="/"> Login</Link>
                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}

export default Register;
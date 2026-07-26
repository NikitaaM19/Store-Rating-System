import { useEffect, useState } from "react";
import axios from "axios";

function OwnerDashboard() {

    const [data, setData] = useState({
        storeName: "",
        averageRating: "0.0",
        users: []
    });

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        const user = JSON.parse(localStorage.getItem("user"));

        if (!user?.id) {
            alert("Please login again.");
            return;
        }

        loadDashboard(user.id);

    }, []);

    const loadDashboard = async (ownerId) => {

        try {

            const token = localStorage.getItem("token");

            const res = await axios.get(

                `http://localhost:5000/api/owner/dashboard/${ownerId}`,

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );

            setData(res.data);

        }

        catch (err) {

            console.log(err);

            alert(
                err.response?.data?.message ||
                "Unable to load dashboard"
            );

        }

        finally {

            setLoading(false);

        }

    };

    if (loading) {
        return <h3 className="text-center mt-5">Loading...</h3>;
    }

    return (

        <div className="container mt-4">

            <div className="d-flex justify-content-between align-items-center">

                <h2>Store Owner Dashboard</h2>

                <div>

                    <button
                        className="btn btn-warning me-2"
                        onClick={() => window.location.href = "/change-password"}
                    >
                        Change Password
                    </button>

                    <button
                        className="btn btn-danger"
                        onClick={() => {
                            localStorage.clear();
                            window.location.href = "/";
                        }}
                    >
                        Logout
                    </button>

                </div>

            </div>

            <div className="card mt-4">

                <div className="card-body">

                    <h4>{data.storeName}</h4>

                    <h5 className="text-success">

                        Average Rating ⭐ {data.averageRating}

                    </h5>

                </div>

            </div>

            <div className="card mt-4">

                <div className="card-header">

                    Users Who Rated Your Store

                </div>

                <div className="card-body p-0">

                    <table className="table table-bordered mb-0">

                        <thead>

                            <tr>

                                <th>Name</th>

                                <th>Email</th>

                                <th>Rating</th>

                            </tr>

                        </thead>

                        <tbody>

                            {

                                data.users.length > 0 ?

                                data.users.map(user => (

                                    <tr key={user.id}>

                                        <td>{user.name}</td>

                                        <td>{user.email}</td>

                                        <td>⭐ {user.rating}</td>

                                    </tr>

                                ))

                                :

                                <tr>

                                    <td
                                        colSpan="3"
                                        className="text-center"
                                    >

                                        No ratings yet

                                    </td>

                                </tr>

                            }

                        </tbody>

                    </table>

                </div>

            </div>

        </div>

    );

}

export default OwnerDashboard;
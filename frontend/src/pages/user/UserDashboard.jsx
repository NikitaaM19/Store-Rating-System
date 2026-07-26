import { useEffect, useState } from "react";
import axios from "axios";
import StoreCard from "./StoreCard";
import { useNavigate } from "react-router-dom";


function UserDashboard() {


    const navigate = useNavigate();


    const [stores, setStores] = useState([]);

    const [search, setSearch] = useState("");



    useEffect(() => {

        loadStores();

    }, []);




  

    const loadStores = async () => {


        try {


            const token = localStorage.getItem("token");


            const res = await axios.get(

                "http://localhost:5000/api/user/stores",

                {
                    headers: {

                        Authorization: `Bearer ${token}`

                    }
                }

            );


            setStores(res.data);


        }
        catch(error){


            console.log(
                "Store Fetch Error:",
                error.response?.data
            );


        }


    };





    const filtered = stores.filter(store =>


        store.name
        ?.toLowerCase()
        .includes(search.toLowerCase())


        ||

        store.address
        ?.toLowerCase()
        .includes(search.toLowerCase())


    );





    const logout = ()=>{


        localStorage.removeItem("token");

        localStorage.removeItem("user");


        navigate("/");


    };




    return (

        <div 
        style={{
            background:"#f5f7fb",
            minHeight:"100vh"
        }}
        >




            <div className="bg-white shadow-sm py-3 px-4 mb-4">


                <div className="container d-flex justify-content-between align-items-center">


                    <h3 className="fw-bold mb-0">

                        User Dashboard

                    </h3>




                    <div>


                        <button

                        className="btn btn-outline-warning me-2"

                        onClick={()=>navigate("/change-password")}

                        >

                            Change Password

                        </button>




                        <button

                        className="btn btn-outline-danger"

                        onClick={logout}

                        >

                            Logout

                        </button>



                    </div>


                </div>


            </div>






            <div className="container">



            

                <div className="card shadow-sm border-0 mb-4">


                    <div className="card-body">


                        <input

                        className="form-control form-control-lg"

                        placeholder="🔍 Search by store name or address..."

                        value={search}

                        onChange={(e)=>setSearch(e.target.value)}

                        style={{
                            borderRadius:"10px"
                        }}

                        />


                    </div>


                </div>



                <div className="row">


                {

                filtered.length > 0 ?


                filtered.map(store=>(


                    <div

                    className="col-md-4 col-lg-3 mb-4"

                    key={store.id}

                    >


                        <StoreCard store={store}/>


                    </div>


                ))



                :


                (

                <p className="text-center text-muted">

                    No stores found

                </p>

                )


                }



                </div>



            </div>


        </div>

    );


}



export default UserDashboard;
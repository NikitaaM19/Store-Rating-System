import { useState } from "react";
import axios from "axios";

function StoreCard({ store }) {

    const [rating, setRating] = useState("");


    const submitRating = async () => {


        if (!rating) {
            alert("Please enter rating");
            return;
        }


        try {


            const token = localStorage.getItem("token");


            const res = await axios.post(

                "http://localhost:5000/api/user/rate",

                {
                    storeId: store.id,
                    rating: Number(rating)
                },

                {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                }

            );


            alert("Rating submitted successfully");

            window.location.reload();


        }
        catch(error) {

            console.log(
                "Rating Error:",
                error.response?.data
            );


            alert(
                error.response?.data?.message ||
                "Failed to submit rating"
            );

        }


    };



    return (
        <div 
            className="card shadow-sm border-0 h-100 w-400" 
            style={{ borderRadius: "15px" }}
        >

            <div className="card-body d-flex flex-column">


                <h5 className="fw-bold">
                    {store.name}
                </h5>


                <p className="text-muted small mb-2">
                    {store.address}
                </p>


                <p className="mb-3">

                    {
                    store.averageRating

                    ?

                    `⭐ ${store.averageRating}`

                    :

                    "No ratings yet"

                    }

                </p>



                <input

                    type="number"

                    min="1"

                    max="5"

                    placeholder="Rate (1-5)"

                    value={rating}

                    onChange={(e)=>setRating(e.target.value)}

                    className="form-control mb-3"

                />



                <button

                    onClick={submitRating}

                    className="btn btn-primary mt-auto"

                    style={{ borderRadius:"10px" }}

                >

                    Submit Rating

                </button>



            </div>

        </div>
    );
}


export default StoreCard;
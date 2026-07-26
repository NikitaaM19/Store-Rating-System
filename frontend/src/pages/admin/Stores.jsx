import React, { useEffect, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./store.css";

const API = "http://localhost:5000/api/admin";

const Store = () => {

  const [stores, setStores] = useState([]);
  const [owners, setOwners] = useState([]);
  const [loading, setLoading] = useState(false);

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("name");
  const [sortOrder, setSortOrder] = useState("ASC");

  const [showModal, setShowModal] = useState(false);
  const [viewModal, setViewModal] = useState(false);

  const [editId, setEditId] = useState(null);
  const [selectedStore, setSelectedStore] = useState(null);

  const [form, setForm] = useState({
    name: "",
    email: "",
    address: "",
    ownerId: ""
  });

  // ✅ PAGINATION
  const [currentPage, setCurrentPage] = useState(1);
  const storesPerPage = 5;

  const fetchStores = async () => {
    try {
      setLoading(true);

      const res = await axios.get(`${API}/stores`, {
        params: { search, sortBy, sortOrder }
      });

      setStores(res.data);

    } catch (err) {
      console.log(err);
      toast.error("Unable to load stores");
    } finally {
      setLoading(false);
    }
  };

  const fetchOwners = async () => {
    try {
      const res = await axios.get(`${API}/store-owners`);
      setOwners(res.data);
    } catch (err) {
      console.log(err);
      toast.error("Unable to load owners");
    }
  };

  useEffect(() => {
    fetchStores();
    fetchOwners();
  }, [search, sortBy, sortOrder]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const resetForm = () => {
    setForm({
      name: "",
      email: "",
      address: "",
      ownerId: ""
    });
    setEditId(null);
    setShowModal(false);
  };

  const validateForm = () => {
    if (form.name.trim().length < 3) {
      toast.error("Store name must be at least 3 characters");
      return false;
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(form.email)) {
      toast.error("Enter valid email");
      return false;
    }

    if (!form.address.trim()) {
      toast.error("Address is required");
      return false;
    }

    if (!form.ownerId) {
      toast.error("Select store owner");
      return false;
    }

    return true;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    try {
      if (editId) {
        await axios.put(`${API}/stores/${editId}`, form);
        toast.success("Store updated successfully");
      } else {
        await axios.post(`${API}/stores`, form);
        toast.success("Store added successfully");
      }

      resetForm();
      fetchStores();

    } catch (err) {
      console.log(err);
      toast.error(err.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = (store) => {
    setEditId(store.id);

    setForm({
      name: store.name,
      email: store.email,
      address: store.address,
      ownerId: store.owner_id
    });

    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (!window.confirm("Delete this store?")) return;

    try {
      await axios.delete(`${API}/stores/${id}`);
      toast.success("Store deleted");
      fetchStores();
    } catch {
      toast.error("Unable to delete store");
    }
  };

  const handleView = (store) => {
    setSelectedStore(store);
    setViewModal(true);
  };

  const filteredStores = stores.filter((store) =>
    store.name.toLowerCase().includes(search.toLowerCase()) ||
    store.address.toLowerCase().includes(search.toLowerCase())
  );

  useEffect(() => {
    const totalPages = Math.ceil(filteredStores.length / storesPerPage);
    if (currentPage > totalPages) {
      setCurrentPage(totalPages || 1);
    }
  }, [filteredStores]);

  const indexOfLastStore = currentPage * storesPerPage;
  const indexOfFirstStore = indexOfLastStore - storesPerPage;

  const currentStores = filteredStores.slice(
    indexOfFirstStore,
    indexOfLastStore
  );

  const totalPages = Math.ceil(filteredStores.length / storesPerPage);

  return (
    <div className="container mt-4">

      
      <div className="d-flex justify-content-between mb-4">
        <h3>Store Management</h3>
        <button className="btn btn-primary" onClick={() => setShowModal(true)}>
          + Add Store
        </button>
      </div>

  
      <div className="row mb-3">
        <div className="col-md-5">
          <input
            className="form-control"
            placeholder="Search by name or address"
            value={search}
            onChange={(e) => {
              setSearch(e.target.value);
              setCurrentPage(1);
            }}
          />
        </div>

        <div className="col-md-3">
          <select
            className="form-select"
            value={sortBy}
            onChange={(e) => {
              setSortBy(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="name">Name</option>
            <option value="email">Email</option>
            <option value="address">Address</option>
          </select>
        </div>

        <div className="col-md-2">
          <select
            className="form-select"
            value={sortOrder}
            onChange={(e) => {
              setSortOrder(e.target.value);
              setCurrentPage(1);
            }}
          >
            <option value="ASC">Ascending</option>
            <option value="DESC">Descending</option>
          </select>
        </div>
      </div>

  
      <div className="card">
        <div className="card-body p-0">

          <table className="table table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th>Name</th>
                <th>Email</th>
                <th>Address</th>
                <th>Owner</th>
                <th>Rating</th>
                <th className="text-center">Actions</th>
              </tr>
            </thead>

            <tbody>
              {loading ? (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    Loading...
                  </td>
                </tr>
              ) : currentStores.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center p-4">
                    No Stores Found
                  </td>
                </tr>
              ) : (
                currentStores.map((store) => (
                  <tr key={store.id}>
                    <td>{store.name}</td>
                    <td>{store.email}</td>
                    <td>{store.address}</td>

                    <td>
                      {store.ownerName ||
                        owners.find(o => o.id === store.owner_id)?.name ||
                        "N/A"}
                    </td>

                    <td>
                      {store.averageRating
                        ? `⭐ ${store.averageRating}`
                        : "No Ratings"}
                    </td>

                    <td className="text-center">
                      <button className="btn btn-info btn-sm me-2" onClick={() => handleView(store)}>
                        View
                      </button>

                      <button className="btn btn-warning btn-sm me-2" onClick={() => handleEdit(store)}>
                        Edit
                      </button>

                      <button className="btn btn-danger btn-sm" onClick={() => handleDelete(store.id)}>
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              )}
            </tbody>

          </table>
        </div>
      </div>

      <div className="d-flex justify-content-center mt-4">

        <button
          className="btn btn-outline-primary me-2"
          disabled={currentPage === 1}
          onClick={() => setCurrentPage(currentPage - 1)}
        >
          Previous
        </button>

        <span className="align-self-center fw-bold">
          Page {currentPage} of {totalPages || 1}
        </span>

        <button
          className="btn btn-outline-primary ms-2"
          disabled={currentPage === totalPages || totalPages === 0}
          onClick={() => setCurrentPage(currentPage + 1)}
        >
          Next
        </button>

      </div>

     </div>
  );
};

export default Store;
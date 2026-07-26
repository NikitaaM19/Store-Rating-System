import { useEffect, useState } from "react";
import API from "../../services/api";
import { toast } from "react-toastify";

function Users() {

    const [users, setUsers] = useState([]);

    const [searchInput, setSearchInput] = useState("");
    const [search, setSearch] = useState("");

    const [sortBy, setSortBy] = useState("name");
    const [sortOrder, setSortOrder] = useState("ASC");

    const [showModal, setShowModal] = useState(false);
    const [editModal, setEditModal] = useState(false);
    const [viewModal, setViewModal] = useState(false);

    const [newUser, setNewUser] = useState({
        name: "",
        email: "",
        address: "",
        password: "",
        role: "USER"
    });

    const [selectedUser, setSelectedUser] = useState(null);

   
    const [currentPage, setCurrentPage] = useState(1);
    const usersPerPage = 5;

    // LOAD USERS
    const loadUsers = async () => {
        const res = await API.get(
            `/admin/users?search=${search}&sortBy=${sortBy}&sortOrder=${sortOrder}`
        );
        setUsers(res.data.users);
    };

    useEffect(() => {
        loadUsers();
    }, [search, sortBy, sortOrder]);

    
    useEffect(() => {
        const totalPages = Math.ceil(users.length / usersPerPage);
        if (currentPage > totalPages) {
            setCurrentPage(totalPages || 1);
        }
    }, [users]);

    // SEARCH
    const handleSearch = () => {
        setSearch(searchInput);
        setCurrentPage(1);
    };

    // ADD
    const handleChange = (e) => {
        setNewUser({ ...newUser, [e.target.name]: e.target.value });
    };

    const addUser = async () => {
        await API.post("/admin/users", newUser);
        toast.success("User Added");
        setShowModal(false);
        loadUsers();
    };

    // EDIT
    const handleEdit = (e) => {
        setSelectedUser({ ...selectedUser, [e.target.name]: e.target.value });
    };

    const updateUser = async () => {
        await API.put(`/admin/users/${selectedUser.id}`, selectedUser);
        toast.success("User Updated");
        setEditModal(false);
        loadUsers();
    };

    // DELETE
    const deleteUser = async (id) => {
        if (!window.confirm("Delete this user?")) return;

        await API.delete(`/admin/users/${id}`);
        toast.success("User Deleted");
        loadUsers();
    };

    
    const indexOfLastUser = currentPage * usersPerPage;
    const indexOfFirstUser = indexOfLastUser - usersPerPage;

    const currentUsers = users.slice(
        indexOfFirstUser,
        indexOfLastUser
    );

    const totalPages = Math.ceil(users.length / usersPerPage);

    return (
        <div className="container mt-4">

            {/* HEADER */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <h4 className="fw-bold m-0">Users</h4>

                <button
                    className="btn btn-primary"
                    onClick={() => setShowModal(true)}
                >
                    + Add User
                </button>
            </div>

            {/* FILTER BAR */}
            <div className="d-flex flex-wrap gap-2 mb-3">

                <input
                    type="text"
                    className="form-control"
                    style={{ maxWidth: "250px" }}
                    placeholder="Search..."
                    value={searchInput}
                    onChange={(e) => setSearchInput(e.target.value)}
                />

                <select
                    className="form-select"
                    style={{ maxWidth: "180px" }}
                    value={sortBy}
                    onChange={(e) => {
                        setSortBy(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="name">Name</option>
                    <option value="email">Email</option>
                    <option value="role">Role</option>
                </select>

                <select
                    className="form-select"
                    style={{ maxWidth: "140px" }}
                    value={sortOrder}
                    onChange={(e) => {
                        setSortOrder(e.target.value);
                        setCurrentPage(1);
                    }}
                >
                    <option value="ASC">ASC</option>
                    <option value="DESC">DESC</option>
                </select>

                <button className="btn btn-dark" onClick={handleSearch}>
                    Search
                </button>

            </div>

           
            <div className="table-responsive bg-white rounded shadow-sm">

                <table className="table align-middle mb-0">

                    <thead className="table-light">
                        <tr>
                            <th>#</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Address</th>
                            <th>Role</th>
                            <th className="text-end">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {currentUsers.length === 0 ? (
                            <tr>
                                <td colSpan="6" className="text-center p-4">
                                    No users found
                                </td>
                            </tr>
                        ) : (
                            currentUsers.map((u, i) => (
                                <tr key={u.id}>

                                    <td>{indexOfFirstUser + i + 1}</td>
                                    <td className="fw-semibold">{u.name}</td>
                                    <td className="text-muted">{u.email}</td>
                                    <td>{u.address}</td>

                                    <td>
                                        <span className={`badge ${
                                            u.role === "ADMIN" ? "bg-danger" :
                                            u.role === "OWNER" ? "bg-warning text-dark" :
                                            "bg-secondary"
                                        }`}>
                                            {u.role}
                                        </span>
                                    </td>

                                    <td className="text-end">

                                        <button
                                            className="btn btn-sm btn-outline-info me-2"
                                            onClick={() => {
                                                setSelectedUser(u);
                                                setViewModal(true);
                                            }}
                                        >
                                            View
                                        </button>

                                        <button
                                            className="btn btn-sm btn-outline-warning me-2"
                                            onClick={() => {
                                                setSelectedUser(u);
                                                setEditModal(true);
                                            }}
                                        >
                                            Edit
                                        </button>

                                        <button
                                            className="btn btn-sm btn-outline-danger"
                                            onClick={() => deleteUser(u.id)}
                                        >
                                            Delete
                                        </button>

                                    </td>

                                </tr>
                            ))
                        )}
                    </tbody>

                </table>

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

           
            {showModal && (
                <div className="modal d-block bg-dark bg-opacity-50">
                    <div className="modal-dialog">
                        <div className="modal-content p-3">

                            <h5>Add User</h5>

                            <input className="form-control mb-2" name="name" placeholder="Name" onChange={handleChange} />
                            <input className="form-control mb-2" name="email" placeholder="Email" onChange={handleChange} />
                            <input type="password" className="form-control mb-2" name="password" placeholder="Password" onChange={handleChange} />
                            <textarea className="form-control mb-2" name="address" placeholder="Address" onChange={handleChange} />

                            <select className="form-select mb-2" name="role" onChange={handleChange}>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                                <option value="OWNER">Owner</option>
                            </select>

                            <button className="btn btn-success me-2" onClick={addUser}>Save</button>
                            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>

                        </div>
                    </div>
                </div>
            )}

           
            {editModal && selectedUser && (
                <div className="modal d-block bg-dark bg-opacity-50">
                    <div className="modal-dialog">
                        <div className="modal-content p-3">

                            <h5>Edit User</h5>

                            <input className="form-control mb-2" name="name" value={selectedUser.name} onChange={handleEdit} />
                            <input className="form-control mb-2" name="email" value={selectedUser.email} onChange={handleEdit} />
                            <textarea className="form-control mb-2" name="address" value={selectedUser.address} onChange={handleEdit} />

                            <select className="form-select mb-2" name="role" value={selectedUser.role} onChange={handleEdit}>
                                <option value="USER">User</option>
                                <option value="ADMIN">Admin</option>
                                <option value="OWNER">Owner</option>
                            </select>

                            <button className="btn btn-primary me-2" onClick={updateUser}>Update</button>
                            <button className="btn btn-secondary" onClick={() => setEditModal(false)}>Cancel</button>

                        </div>
                    </div>
                </div>
            )}

            {viewModal && selectedUser && (
                <div className="modal d-block bg-dark bg-opacity-50">
                    <div className="modal-dialog">
                        <div className="modal-content p-3">

                            <h5>User Details</h5>

                            <p><b>Name:</b> {selectedUser.name}</p>
                            <p><b>Email:</b> {selectedUser.email}</p>
                            <p><b>Address:</b> {selectedUser.address}</p>
                            <p><b>Role:</b> {selectedUser.role}</p>

                            <button className="btn btn-secondary" onClick={() => setViewModal(false)}>
                                Close
                            </button>

                        </div>
                    </div>
                </div>
            )}

        </div>
    );
}

export default Users;
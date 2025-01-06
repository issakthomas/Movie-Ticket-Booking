import "./Admin.css";
import { NavLink, Routes, Route } from "react-router-dom";
import Add from "../components/Add";
import Find from "../components/Find";

const Admin = () => {
    return (
        <div className="admin">
            <div className="buttons">
                <NavLink
                    to="/admin/add"
                    className={({ isActive }) =>
                        (isActive ? "active" : "inactive") + " button"
                    }
                >
                    Add
                </NavLink>
                <NavLink
                    to="/admin/find"
                    className={({ isActive }) =>
                        (isActive ? "active" : "inactive") + " button"
                    }
                >
                    Find
                </NavLink>
            </div>
            <Routes>
                <Route path="add" element={<Add />} />
                <Route path="find" element={<Find />} />
            </Routes>
        </div>
    );
};

export default Admin;

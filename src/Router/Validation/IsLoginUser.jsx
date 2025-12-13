import { useContext } from "react";
import PropTypes from "prop-types";
import { Navigate } from "react-router";
import WebContext from "../../Context/WebContext";
import DataLoader from "../../Components/DataLoader";

const IsLoginUser = ({ children }) => {
  const { user, loading } = useContext(WebContext);
  if (loading) {
    return (
      <div className="flex items-center justify-center py-20">
        <DataLoader></DataLoader>
      </div>
    );
  }
  if (user) {
    return children;
  }

  return <Navigate to="/login"></Navigate>;
};

IsLoginUser.propTypes = {
  children: PropTypes.node.isRequired,
};

export default IsLoginUser;

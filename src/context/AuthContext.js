import PropTypes from "prop-types";
import React, {
  createContext,
  useEffect,
  useLayoutEffect,
  useState,
} from "react";
import axios from "../utils/axiosInstance";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext({
  user: null,
  login: () => Promise.resolve(),
  register: () => Promise.resolve(),
  logout: () => {},
  loading: false,
});

AuthProvider.propTypes = {
  children: PropTypes.node,
};

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const getUser = ({ navigateToHome }={}) =>
    axios
      .get("/api/v1/users/user")
      .then(async (res) => {
        setUser(res.data);
        if (navigateToHome) {
          navigate("/");
        }
        if (!res.data) {
          await getDriver();
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setLoading(false));
  const getDriver = async ({ navigateToProfile }={}) =>
    await axios
      .get("/api/v1/driver/details")
      .then((res) => {
        setUser(res.data);
        if (navigateToProfile) {
          navigate(`/driver/profile/${res.data._id}`);
        }
      })
      .catch((e) => {
        console.log(e);
      })
      .finally(() => setLoading(false));

  useLayoutEffect(() => {
    setLoading(true);
    getUser();
  }, []);

  const register = (values) =>
    axios
      .post("/api/v1/auth/register", values)
      .then(async (res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);

        await getUser();
        return res.data;
      })
      .catch((e) => {
        throw new Error(e.response.data.message);
      });

  const login = async (values) =>
    axios
      .post("/api/v1/auth/login", values)
      .then(async (res) => {
        localStorage.setItem("accessToken", res.data.accessToken);
        localStorage.setItem("refreshToken", res.data.refreshToken);
        if (res.data.role === "driver") {
          await getDriver({ navigateToProfile: true });
          return res;
        }
        await getUser({ navigateToHome: true });
        return res;
      })
      .catch((e) => {
        throw new Error(e.response.data.message);
      });

  const logout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
    setUser(null);
  };
  return (
    <AuthContext.Provider value={{ user, register, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;

import { useNavigate } from "react-router-dom";
const navigate = useNavigate();

const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:3000/login", {
        email,
        password,
      });
      localStorage.setItem("token", response.data.token);
      navigate("/");

    } catch (error) {
      setError("Invalid credentials");
    }
  }

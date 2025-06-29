import { useParams, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";
import SingleProject from "./SingleProject";

function SingleProjectWrapper() {
  const { id } = useParams();
  const { token, logout } = useContext(AuthContext);
  const [projectData, setProjectData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    if (!token) {
      navigate('/login');
      return;
    }

    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/project/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { status, data, message } = response.data;
        if (status === "success") {
          setProjectData(data);
        } else {
          throw new Error(message || "Failed to load project");
        }
      } catch (err) {
        console.error("Ошибка загрузки проекта:", err);
        setError(err.message || "Failed to load project");
        navigate('*');
      }
    };

    fetchProject();
  }, [id, token, logout, navigate]);

  return projectData ? (
    <SingleProject projectData={projectData} />
  ) : error ? (
    <div className="text-mocha-red bg-mocha-red/10 p-3 rounded-lg text-center">
      {error}
    </div>
  ) : (
    <div className="text-mocha-text text-center">Загрузка...</div>
  );
}

export default SingleProjectWrapper;
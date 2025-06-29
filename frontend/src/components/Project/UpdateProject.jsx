import { useState, useContext, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import axios from "axios";

function ProjectUpdate() {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { id } = useParams();
  const [formData, setFormData] = useState({
    title: "",
    summary: "",
    usersId: "",
  });
  const [error, setError] = useState("");
  const [showForm, setShowForm] = useState(true);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteInput, setDeleteInput] = useState("");
  const [deleteError, setDeleteError] = useState("");

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    const fetchProject = async () => {
      try {
        const response = await axios.get(`/api/project/${id}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { status, data, message } = response.data;

        if (status === "success") {
          setFormData({
            title: data.title || "",
            summary: data.summary || "",
            usersId: data.usersID ? data.usersID.join(", ") : "",
          });
        } else {
          throw new Error(message || "Failed to load project");
        }
      } catch (err) {
        console.error("Ошибка загрузки проекта:", err);
        setError(err.message || "Failed to load project");
      }
    };

    fetchProject();
  }, [token, id, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => {
      const newData = { ...prev, [name]: value };
      console.log("FormData:", newData); // Для дебага
      return newData;
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const payload = {
        ...formData,
        usersId: formData.usersId
          ? formData.usersId
              .split(",")
              .map((id) => parseInt(id.trim()))
              .filter((id) => !isNaN(id))
          : [],
      };
      const response = await axios.put(`/api/project/${id}`, payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { status, data, message } = response.data;

      if (status === "success") {
        setShowForm(false);
        navigate(`/project/${data.id}`);
      } else {
        throw new Error(message || "Failed to update project");
      }
    } catch (err) {
      console.error("Ошибка обновления проекта:", err);
      setError(err.message || "Failed to update project");
    }
  };

  const handleDelete = async () => {
    if (deleteInput !== formData.title) {
      setDeleteError("Название проекта введено неверно");
      return;
    }

    try {
      const response = await axios.delete(`/api/project/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      const { status, message } = response.data;

      if (status === "success") {
        setShowDeleteConfirm(false);
        setShowForm(false);
        navigate("/project");
      } else {
        throw new Error(message || "Failed to delete project");
      }
    } catch (err) {
      console.error("Ошибка удаления проекта:", err);
      setDeleteError(err.message || "Failed to delete project");
    }
  };

  const handleCancel = () => {
    setShowForm(false);
    navigate("/project");
  };

  const handleDeleteCancel = () => {
    setShowDeleteConfirm(false);
    setDeleteInput("");
    setDeleteError("");
  };

  return (
    <div className="relative flex flex-col items-center justify-start bg-mocha-base p-4 min-h-screen">
      {showForm && (
        <div
          className={`fixed inset-0 bg-mocha-base/80 flex items-center justify-center z-50 transition-all duration-500 ease-out ${
            showForm ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`max-w-2xl w-full p-10 bg-mocha-surface0 rounded-2xl shadow-xl shadow-mocha-overlay0/50 transform transition-transform duration-500 ease-out ${
              showForm ? "scale-100 animate-rubberPop" : "scale-50"
            }`}
          >
            <h2 className="text-3xl font-extrabold text-mocha-text mb-8 text-center tracking-tight">
              Редактировать проект
            </h2>
            <form onSubmit={handleSubmit} className="mt-6 space-y-6">
              {error && (
                <p className="text-mocha-red bg-mocha-red/10 p-3 rounded-lg text-center animate-pulse">
                  {error}
                </p>
              )}
              <div className="flex items-center gap-3 p-4 bg-mocha-surface1 rounded-lg focus-within:ring-2 focus-within:ring-mocha-blue transition-colors">
                <svg
                  className="w-6 h-6 text-mocha-blue"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 8l9 6 9-6M3 8v11a2 2 0 002 2h14a2 2 0 002-2V8"
                  />
                </svg>
                <div className="flex-1">
                  <label htmlFor="title" className="block text-mocha-subtext0 text-sm">
                    Название *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    className="w-full bg-transparent text-mocha-text focus:outline-none placeholder-mocha-subtext0 text-lg"
                    placeholder="Введите название проекта"
                    value={formData.title}
                    onChange={handleChange}
                    required
                  />
                </div>
              </div>
              <div className="flex items-start gap-3 p-4 bg-mocha-surface1 rounded-lg focus-within:ring-2 focus-within:ring-mocha-blue transition-colors">
                <svg
                  className="w-6 h-6 text-mocha-blue mt-1"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16m-7 6h7"
                  />
                </svg>
                <div className="flex-1">
                  <label htmlFor="summary" className="block text-mocha-subtext0 text-sm">
                    Описание
                  </label>
                  <textarea
                    id="summary"
                    name="summary"
                    className="w-full bg-transparent text-mocha-text focus:outline-none placeholder-mocha-subtext0 resize-none text-base"
                    placeholder="Введите описание проекта (необязательно)"
                    value={formData.summary}
                    onChange={handleChange}
                    rows="6"
                  />
                </div>
              </div>
              <div className="flex items-center gap-3 p-4 bg-mocha-surface1 rounded-lg focus-within:ring-2 focus-within:ring-mocha-blue transition-colors">
                <svg
                  className="w-6 h-6 text-mocha-blue"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M12 4.5v15m7.5-7.5h-15"
                  />
                </svg>
                <div className="flex-1">
                  <label htmlFor="usersId" className="block text-mocha-subtext0 text-sm">
                    ID участников
                  </label>
                  <input
                    type="text"
                    id="usersId"
                    name="usersId"
                    className="w-full bg-transparent text-mocha-text focus:outline-none placeholder-mocha-subtext0 text-lg"
                    placeholder="Введите ID участников через запятую (необязательно)"
                    value={formData.usersId}
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  type="submit"
                  className="w-full p-3 bg-mocha-green text-mocha-base rounded-lg font-semibold hover:bg-mocha-green/80 hover:scale-105 transition-all duration-200 shadow-md"
                >
                  Сохранить
                </button>
                <button
                  type="button"
                  onClick={handleCancel}
                  className="w-full p-3 bg-mocha-red text-mocha-base rounded-lg font-semibold hover:bg-mocha-red/80 hover:scale-105 transition-all duration-200 shadow-md"
                >
                  Отмена
                </button>
                <button
                  type="button"
                  onClick={() => setShowDeleteConfirm(true)}
                  className="w-full p-3 bg-mocha-red/90 text-mocha-base rounded-lg font-semibold hover:bg-mocha-red hover:scale-105 transition-all duration-200 shadow-md"
                >
                  Удалить
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
      {showDeleteConfirm && (
        <div
          className={`fixed inset-0 bg-mocha-base/90 flex items-center justify-center z-[1000] transition-all duration-500 ease-out ${
            showDeleteConfirm ? "opacity-100" : "opacity-0 pointer-events-none"
          }`}
        >
          <div
            className={`max-w-md w-full p-6 bg-mocha-surface0 rounded-2xl shadow-xl shadow-mocha-overlay0/50 transform transition-transform duration-500 ease-out ${
              showDeleteConfirm ? "scale-100 animate-rubberPop" : "scale-50"
            }`}
          >
            <h3 className="text-xl font-bold text-mocha-text mb-4 text-center">
              Подтверждение удаления
            </h3>
            <p className="text-mocha-subtext0 mb-4 text-center">
              Введите название проекта <strong>{formData.title}</strong> для подтверждения удаления.
            </p>
            {deleteError && (
              <p className="text-mocha-red bg-mocha-red/10 p-2 rounded-lg text-center animate-pulse mb-4">
                {deleteError}
              </p>
            )}
            <div className="flex items-center gap-3 p-3 bg-mocha-surface1 rounded-lg focus-within:ring-2 focus-within:ring-mocha-blue transition-colors">
              <svg
                className="w-6 h-6 text-mocha-blue"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
                />
              </svg>
              <input
                type="text"
                className="w-full bg-transparent text-mocha-text focus:outline-none placeholder-mocha-subtext0"
                placeholder="Введите название проекта"
                value={deleteInput}
                onChange={(e) => setDeleteInput(e.target.value)}
              />
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={handleDelete}
                className="w-full p-3 bg-mocha-red text-mocha-base rounded-lg font-semibold hover:bg-mocha-red/80 hover:scale-105 transition-all duration-200 shadow-md"
              >
                Подтвердить
              </button>
              <button
                onClick={handleDeleteCancel}
                className="w-full p-3 bg-mocha-blue text-mocha-base rounded-lg font-semibold hover:bg-mocha-blue/80 hover:scale-105 transition-all duration-200 shadow-md"
              >
                Отмена
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default ProjectUpdate;
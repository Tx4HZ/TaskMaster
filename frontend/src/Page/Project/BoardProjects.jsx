import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { AuthContext } from "../../context/AuthContext"
import { useNavigate, useSearchParams } from "react-router-dom"
import ProjectCard from "../../components/Project/ProjectCard"

function BoardProjects() {
    const { token, logout } = useContext(AuthContext)
    const [projects, setProjects] = useState([])
    const [error, setError] = useState('')
    const [searchParams] = useSearchParams();
    const navigate = useNavigate()
    const filter = searchParams.get("filter") || "all";

    useEffect(() => {
        if (!token) {
            navigate('/login')
            return
        }

        const fetchProject = async () => {
            try {
                const endpoint = `/api/project/${filter}`
                const response = await axios.get(endpoint, {
                    headers: { Authorization: `Bearer ${token}` }
                })
                const { status, data, message } = response.data

                if (status === "success") {
                    setProjects(data)
                } else {
                    throw new Error(message || "Failed to load projects");
                }
            } catch (err) {
                console.error(err);

                setError(err.message || 'Failed to load profile')
                logout()
                navigate('/login')
            }
        }

        fetchProject()
    }, [filter ,token, navigate, logout])

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {error && (
                <p className="text-mocha-red bg-mocha-red/10 p-3 rounded-lg text-center col-span-full">
                    {error}
                </p>
            )}
            {!projects ? (
                <div className="text-mocha-text text-center col-span-full">Загрузка...</div>
            ) : projects.length === 0 ? (
                <div className="text-mocha-text text-center col-span-full">Нет проектов</div>
            ) : (
                projects.map((project) => (
                    <ProjectCard key={project.id} projectData={project} />
                ))
            )}
        </div>
    )
}

export default BoardProjects
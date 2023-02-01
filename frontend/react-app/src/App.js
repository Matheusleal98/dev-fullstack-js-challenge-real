import Navbar from "./components/shared/Navbar";
import StudentListPage from "./components/pages/StudentListPage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="main-container">
                <Navbar/>
                <section className="container">
                    <header className="main-header">
                        Consulta de Alunos
                    </header>
                    <div className="content-page">
                        <Routes>
                            <Route path="/" element={<StudentListPage />} />
                            <Route path="/student-manager" element={<h1>Student manager page</h1>} />
                        </Routes>
                    </div>
                </section>
            </div>
        </BrowserRouter>

    );
}

export default App;

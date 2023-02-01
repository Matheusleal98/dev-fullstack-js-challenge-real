import Navbar from "./components/shared/Navbar";
import StudentListPage from "./components/pages/StudentListPage";
import StudentManagerPage from "./components/pages/StudentManagerPage";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import './App.css';

function App() {
    return (
        <BrowserRouter>
            <div className="main-container">
                <Navbar/>
                <section className="container">
                    <div className="content-page">
                        <Routes>
                            <Route path="/" element={<StudentListPage/>}/>
                            <Route path="/student/add" element={<StudentManagerPage/>}/>
                            <Route path="/student/edit/:ra" element={<StudentManagerPage/>}/>
                        </Routes>
                    </div>
                </section>
            </div>
        </BrowserRouter>

    );
}

export default App;

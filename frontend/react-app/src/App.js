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
                            <Route path="/student/edit/:id" element={<StudentManagerPage/>}/>
                            <Route path="*" element={
                                <div className="content-page padding-left-right-20">
                                    <h1>Error 404</h1>
                                    <p>Desculpe, mas não conseguimos à página que você solicitou!</p>
                                </div>
                            } />
                        </Routes>
                    </div>
                </section>
            </div>
        </BrowserRouter>

    );
}

export default App;

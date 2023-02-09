import React from "react";
import "./style.css";
import Loader from "../../shared/Loader";
import {Link} from "react-router-dom";
import Swal from "sweetalert2";

class StudentListPage extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            studentsList: [],
            isLoading: true,
            formSearch: {
                searchInput: "",
            }
        };
    }

    componentDidMount() {
        this.fetchStudentList();
    }

    onClickRemoveStudent = (ra) => {

        Swal.fire({
            title: 'Você realmente deseja excluir este estudante?',
            showDenyButton: true,
            showCancelButton: false,
            confirmButtonText: 'Salvar',
            denyButtonText: `Cancelar`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
                this.deleteStudent(ra);
            } else if (result.isDenied) {
                Swal.fire('\n' +
                    'As alterações não são salvas', '', 'info')
            }
        })
    };

    deleteStudent = (ra) => {
        this.setState({isLoading: true});
        fetch(`http://localhost:3006/students/delete/${ra}`, {
            method: "DELETE",
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                Swal.fire({
                    icon: 'success',
                    title: 'Excluído com sucesso!',
                    text: data.message,
                    showConfirmButton: false,
                })

                this.fetchStudentList();
            });
    }

    onSubmitFormSearch = (event) => {
        event.preventDefault();
        this.fetchStudentList(event.target.searchInput.value);
    };

    fetchStudentList = (searchQuery = "") => {
        this.setState({isLoading: true});

        fetch(`http://localhost:3006/students/list/${searchQuery}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({
                    studentsList: data,
                    isLoading: false,
                });
            })
            .catch((errror) => {
                alert("Desculpe, mas não conseguimos estabelecer conexão com nosso servidor.")
            });
    }

    render() {
        if (this.state.isLoading) {
            return <Loader/>;
        }

        return (
            <>
                <header className="main-header"> Consulta de ALunos</header>
                <div className="padding-left-right-20">
                    <div className="card">
                        <form onSubmit={this.onSubmitFormSearch} id="formSearchStudent" className="form-search">
                            <input type="text" name="searchInput" id="searchInput"
                                   value={this.state.formSearch.searchInput}
                                   onChange={(event) => {
                                       this.setState({
                                           formSearch: {
                                               searchInput: event.target.value
                                           },
                                       });
                                   }
                                   }/>
                            <button>Pesquisar</button>
                        </form>
                        <Link to="/student/add" className="btn btn-dark">
                            Cadastrar Aluno
                        </Link>
                    </div>
                    <div className="card">
                        <table id="studentsList" className="table-list">
                            <thead>
                            <tr>
                                <th>Registro Acadêmico</th>
                                <th>Nome</th>
                                <th>CPF</th>
                                <th>AÇÕES</th>
                            </tr>
                            </thead>
                            <tbody>
                            {
                                this.state.studentsList.map((students) => {
                                    return (
                                        <tr key={students.ra}>
                                            <td>{students.ra}</td>
                                            <td>{students.nome}</td>
                                            <td>{students.cpf}</td>
                                            <td>
                                                <Link className="action-link " to={`student/edit/${students.ra}`} >Editar</Link>
                                                <a className="removeStudent action-link"
                                                   onClick={() => {
                                                       this.onClickRemoveStudent(students.ra);
                                                   }} href="#">Excluir</a>
                                            </td>
                                        </tr>
                                    );

                                })
                            }
                            </tbody>
                        </table>
                    </div>
                </div>
            </>
        );
    };
}

export default StudentListPage;
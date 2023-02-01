import React from "react";
import "./style.css";

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
        const confirmation = window.confirm("Você realmente deseja excluir esse estudante?");

        if (confirmation) {
            this.deleteStudent(ra);
        }
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
                alert(data.message);
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
            return <div className="loader"></div>;
        }

        return (
            <>
                <header className="main-header"> Consulta de ALunos </header>
                <div className="padding-left-right-20">
                    <div className="top-actions">
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
                        <a className="btn btn-dark" href="/student/add">Cadastrar Aluno</a>
                    </div>
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
                                            <a href={`student/edit/${students.ra}`}>Editar</a>
                                            <a className="removeStudent"
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
            </>
        );
    };
}

export default StudentListPage;
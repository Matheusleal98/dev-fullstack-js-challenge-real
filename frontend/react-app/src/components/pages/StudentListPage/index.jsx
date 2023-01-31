import React from "react";
import "./style.css";

class StudentListPage extends React.Component {
    constructor(props) {
        console.log("construtor was called", props);
        super(props);
        this.state = {
            studentsList: [],
        };
    }

    componentDidMount() {
        this.fetchStudentList();
    }

    fetchStudentList = (searchQuery = "") => {
        // $(".loader").show("fast")
        // $(".content-page").hide();

        fetch(`http://localhost:3006/students/list/${searchQuery}`)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                this.setState({studentsList: data});
                console.log(data);
                // $(".loader").hide("fast")
                // $(".content-page").show("slow");
            })
            .catch((errror) => {
                alert("Desculpe, mas não conseguimos estabelecer conexão com nosso servidor.")
            });
    }

    render() {
        return (
            <div className="padding-left-right-20">
                <div className="top-actions">
                    <form id="formSearchStudent" className="form-search">
                        <input type="text" name="searchInput" id="searchInput"/>
                        <button>Pesquisar</button>
                    </form>
                    <a className="btn btn-dark" href="studentManager.html">Cadastrar Aluno</a>
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
                                <tr>
                                    <td>{students.ra}</td>
                                    <td>{students.nome}</td>
                                    <td>{students.cpf}</td>
                                    <td>
                                        <a href={`studentManager.html?ra=${students.ra}`}>Editar</a>
                                        <a className="removeStudent" data-ra={students.ra} href="#">Excluir</a>
                                    </td>
                                </tr>
                            );

                        })
                    }
                    </tbody>
                </table>
            </div>
        );
    };
}

export default StudentListPage;
import "./style.css";
import {useState} from "react";
import "../../shared/Loader";

const StudentManagerPage = () => {

    const [isLoading, updateIsLoading] = useState(false);

    const [name, updateName] = useState("");
    const [email, updateEmail] = useState("");
    const [cpf, updateCpf] = useState("");
    const [ra, updateRa] = useState("");

    const isEditingMode = () => {
        return false;
    }
    const getRAFormUrl = () => {
        return 0;
    }

    const onSubmitForm = (event) => {
        event.preventDefault();
        const body = {
            name,
            ra,
            cpf,
            email,
        };

        console.log(body);

        /* PARAMÊTROS */
        let methodEndpoint;
        let urlEndpoint;

        if (isEditingMode()) {
            methodEndpoint = "PUT";
            urlEndpoint = `http://localhost:3006/students/edit/${getRAForm()}`;
        } else {
            methodEndpoint = "POST";
            urlEndpoint = "http://localhost:3006/students/save";
        }

        fetch(urlEndpoint, {
            method: methodEndpoint,
            body: JSON.stringify(body),
            headers: {
                Accept: "apllication/json",
                "Content-type": "application/json",
            },
        })
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                alert(data.message);
                if (data.result == true) {
                    document.location.href = "/";
                }
            });
    };

    if(isLoading) {
        return <div className="loader"></div>;
    }

    return (
        <>
            <header className="main-header">
                Consulta de Alunos
            </header>
            <div className="content-page padding-left-right-20">
                <form id="studentForm" className="form" action="" method="post"
                      onSubmit={onSubmitForm}
                >
                    <div className="form-group">
                        <label htmlFor="name">Nome</label>
                        <input required type="text" name="name" id="name"
                               value={name}
                               placeholder="Digite seu nome"
                               onChange={(event) => {
                                   updateName(event.target.value);
                               }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input required type="email" name="email" id="email"
                               value={email}
                               placeholder="Digite seu E-mail"
                               onChange={(event) => {
                                   updateEmail(event.target.value);
                               }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ra">RA</label>
                        <input required type="number" name="ra" id="ra"
                               value={ra}
                               placeholder="Digite o seu RA"
                               onChange={(event) => {
                                   updateRa(event.target.value);
                               }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        <input required type="number" name="cpf" id="cpf"
                               value={cpf}
                               placeholder="Digite o seu CPF"
                               onChange={(event) => {
                                   updateCpf(event.target.value);
                               }}
                        />
                    </div>
                    <div className="actions">
                        <a href="studentsList.html" className="btn btn-warning margin-right-10">Cancelar</a>
                        <button className="btn">Salvar</button>
                    </div>
                </form>
            </div>
        </>
    )

}

export default StudentManagerPage;
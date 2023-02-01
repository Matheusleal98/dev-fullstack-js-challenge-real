import "./style.css";
import {useState, useEffect} from "react";
import "../../shared/Loader";
import {Navigate, Link, useParams} from "react-router-dom";
import Swal from "sweetalert2";

const StudentManagerPage = () => {

    const {id} = useParams();

    const [isRedirect, setIsRedirect] = useState(false);
    const [isLoading, updateIsLoading] = useState(false);

    const [fieldRa, updateFieldRa] = useState({
        value:"",
        isReadOnly: false,
    });
    const [fieldCpf, updateFieldCpf] = useState({
        value:"",
        isReadOnly: false,
    });

    const [name, updateName] = useState("");
    const [email, updateEmail] = useState("");

    const fetchStudent = () => {
        updateIsLoading(true);
        fetch(`http://localhost:3006/students/find/${id}`)
            .then(function (response) {
                return response.json();
            })
            .then(function (data) {
                updateName(data.nome);
                updateEmail(data.email);
                updateFieldCpf({
                    isReadOnly: true,
                    value: data.cpf,
                });
                updateFieldRa({
                    isReadOnly: true,
                    value: data.ra
                });
                updateIsLoading(false);
            });
    };

    useEffect(() => {
        if(id){
            fetchStudent();
            updateFieldRa()
        }
    }, []);

    const onSubmitForm = (event) => {
        event.preventDefault();
        const body = {
            name,
            ra: fieldRa.value,
            cpf: fieldCpf.value,
            email,
        };

        /* PARAMÊTROS */
        let methodEndpoint;
        let urlEndpoint;

        if (id) {
            methodEndpoint = "PUT";
            urlEndpoint = `http://localhost:3006/students/edit/${id}`;
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

                if (data.result) {
                    Swal.fire({
                        icon: 'success',
                        title: 'Parabéns!',
                        text: data.message,
                        showConfirmButton: false,
                    });
                    setIsRedirect(true);
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Desculpe...',
                        text: data.message,
                        showConfirmButton: false,
                    });
                }
            });
    };

    if(isRedirect) {
        return <Navigate to="/" />;
    }

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
                               value={fieldRa.value}
                               readOnly={fieldRa.isReadOnly}
                               placeholder="Digite o seu RA"
                               onChange={(event) => {
                                   updateFieldRa({
                                       ...fieldRa,
                                       value: event.target.value
                                   });
                               }}
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        <input required type="number" name="cpf" id="cpf"
                               value={fieldCpf.value}
                               readOnly={fieldCpf.isReadOnly}
                               placeholder="Digite o seu CPF"
                               onChange={(event) => {
                                   updateFieldCpf({
                                       ...fieldCpf,
                                       value: event.target.value
                                   });
                               }}
                        />
                    </div>
                    <div className="actions">

                        <Link to="/" className="btn btn-warning margin-right-10">Cancelar</Link>
                        <button className="btn">Salvar</button>
                    </div>
                </form>
            </div>
        </>
    )

}

export default StudentManagerPage;
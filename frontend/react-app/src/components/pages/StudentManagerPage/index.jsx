import "./style.css";
const StudentManagerPage = () => {
    return (
        <>
            <header className="main-header">
                Consulta de Alunos
            </header>
            <div className="content-page padding-left-right-20">
                <form id="studentForm" className="form" action="" method="post">
                    <div className="form-group">
                        <label htmlFor="name">Nome</label>
                        <input required type="text" name="name" id="name" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Email</label>
                        <input required type="email" name="email" id="email" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="ra">RA</label>
                        <input required type="number" name="ra" id="ra" />
                    </div>
                    <div className="form-group">
                        <label htmlFor="cpf">CPF</label>
                        <input required type="number" name="cpf" id="cpf" />
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
$(document).ready(function() {
    fetchStudentList();
    console.log(1);
    console.log(2);
    console.log(3);
});

function fetchStudentList() {
    fetch("http://localhost:3000/students/list")
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {
            const table = $("#studentsList tbody");
            data.map(function(students) {
                table.append(`
                    <tr>
                        <td>${students.ra}</td>
                        <td>${students.nome}</td>
                        <td>${students.cpf}</td>
                        <td>
                            <a href="#">Editar</a>
                            <a href="#">Excluir</a>
                        </td>
                    </tr>
                `)
            })
        });
}
$(document).ready(function() {
    fetchStudentList();
    $("body").on("click", ".removeStudent", function() {
        const ra = $(this).data('ra');
        const confirmation = confirm("Você realmente deseja excluir esse estudante");

        if (confirmation) {
            deleteStudent(ra);
        }
    });
});

const deleteStudent = (ra) => {
    fetch(`http://localhost:3000/students/delete/${ra}`, {
            method: "DELETE",
        })
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            alert(data.message);
            fetchStudentList();
        });
}

function fetchStudentList() {
    $(".loader").show("fast")
    $(".content-page").hide("slow");

    fetch("http://localhost:3000/students/list")
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            const table = $("#studentsList tbody");
            table.html("");
            data.map((students) => {
                table.append(`
                    <tr>
                        <td>${students.ra}</td>
                        <td>${students.nome}</td>
                        <td>${students.cpf}</td>
                        <td>
                            <a href="studentManager.html?ra=${students.ra}">Editar</a>
                            <a class="removeStudent" data-ra="${students.ra}" href="#"  >Excluir</a>
                        </td>
                    </tr>
                `);
            });
            $(".loader").hide("fast")
            $(".content-page").show("slow");
        });
}
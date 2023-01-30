$(document).ready(function () {
    if (isEditingMode()) {
        setReadOnlyFields();
        fetchStudent();
    } else {
        $(".loader").hide();
        $(".content-page").show();
    }
    $("#studentForm").submit((event) => {
        event.preventDefault();
        const body = {
            name: $(this).find("#name").val(),
            ra: $(this).find("#ra").val(),
            cpf: $(this).find("#cpf").val(),
            email: event.target.email.value
        };

        /* PARAMÊTROS */
        let methodEndpoint;
        let urlEndpoint;

        if (isEditingMode()) {
            methodEndpoint = "PUT";
            urlEndpoint = `http://localhost:3000/students/edit/${getRAForm()}`;
        } else {
            methodEndpoint = "POST";
            urlEndpoint = "http://localhost:3000/students/save";
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
                document.location.href = "studentsList.html";
            });
    });

});

function setReadOnlyFields() {
    const studentForm = $("#studentForm");
    studentForm.find("#ra").attr('readonly', true);
    studentForm.find("#cpf").attr('readonly', true);
}

function fetchStudent() {
    fetch(`http://localhost:3000/students/find/${getRAForm()}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            const studentForm = $("#studentForm");
            studentForm.find("#name").val(data.nome);
            studentForm.find("#email").val(data.email);
            studentForm.find("#cpf").val(data.cpf);
            studentForm.find("#ra").val(data.ra);
            $(".loader").hide("fast");
            $(".content-page").show("slow");
        });
}

function isEditingMode() {
    const urlSearch = new URLSearchParams(window.location.search);
    return urlSearch.has('ra');
}

function getRAForm() {
    const urlSearch = new URLSearchParams(window.location.search);
    return urlSearch.get("ra");
}
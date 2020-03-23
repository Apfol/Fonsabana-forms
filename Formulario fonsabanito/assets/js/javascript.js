var signatureImg, footprintImg, identificationCardDoc;

document.getElementById('print').onclick = function () {
    try {
        var doc = demoFromHTML(signatureImg, footprintImg);
        doc.save('Formulario Fonsabanito.pdf');
    } catch (err) {
        alert("Error al generar el documento, verifica que subiste toda la información requerida");
    }
};

const signatureFile = $("#signatureFile");
const signatureButton = $("#signatureButton");
const signatureText = $("#signatureText");

signatureButton.click(function () {
    signatureFile.click();
});

signatureFile.change(function () {
    if (signatureFile.val()) {
        signatureText.html(signatureFile.val().match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]);
        if (this.files && this.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                signatureImg = e.target.result;
            }

            reader.readAsDataURL(this.files[0]);
        }
    } else {
        signatureText.html("Sin archivo");
    }
});

const footprintFile = $("#footprintFile");
const footprintButton = $("#footprintButton");
const footprintText = $("#footprintText");

footprintButton.click(function () {
    footprintFile.click();
});

footprintFile.change(function () {
    if (footprintFile.val()) {
        footprintText.html(footprintFile.val().match(/[\/\\]([\w\d\s\.\-\(\)]+)$/)[1]);
        if (this.files && this.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                footprintImg = e.target.result;
            }

            reader.readAsDataURL(this.files[0]);
        }
    } else {
        footprintText.html("Sin archivo");
    }
});

function demoFromHTML(signatureImg, footprintImg) {
    var doc = new jsPDF();

    var logoImg = new Image();
    logoImg.src = 'assets/img/logo-fonsabana.png';
    doc.addImage(logoImg, 'png', 16, 16, 50, 16);

    var fonsabanitoImg = new Image();
    fonsabanitoImg = 'assets/img/fonsabanito.jpg';
    doc.addImage(fonsabanitoImg, 'jpg', 167, 15.5, 30, 18);

    doc.autoTable({
        theme: 'plain',
        styles: { lineColor: [142, 142, 142], lineWidth: 0.1, fontSize: 8 },
        head: [[{ content: '', colSpan: 4, styles: { minCellHeight: 20 } }, { content: 'FONDO DE EMPLEADOS DE LA SABANA "FONSABANA" \n\n FORMULARIO DE AFILIACIÓN FONSABANITO', colSpan: 3, styles: { valign: 'middle', halign: 'center' } }, { content: 'VERSIÓN 4.\n\n ABRIL 09 DE 2018', colSpan: 2, styles: { valign: 'middle', halign: 'center' } }, { content: '', colSpan: 3, styles: { minCellHeight: 15 } }]],
        body: [
            [{ content: 'Fecha de solicitud: ' + $("#formDate").val(), colSpan: 3 }, { content: 'Mi nombre completo y apellidos de Fonsabanito son:\n' + $("#namesAndSurnames").val(), colSpan: 9 }],
            [{ content: 'Tipo de documento: ' + getSelected("documentType"), colSpan: 3 }, { content: 'Mi número es: ' + $("#documentNumber").val(), colSpan: 9 }],
            [{ content: 'Sexo: ' + getSelected("sex"), colSpan: 4 }, { content: 'Fecha de nacimiento: ' + $("#bornDate").val(), colSpan: 4 }, { content: 'Lugar de nacimiento: ' + $("#bornTown").val(), colSpan: 4 }],
            [{ content: 'Mi dirección es: ' + $("#home").val(), colSpan: 6 }, { content: 'Barrio: ' + $("#homeTown").val(), colSpan: 6 }],
            [{ content: 'Ciudad: ' + $("#city").val(), colSpan: 6 }, { content: 'Departamento: ' + $("#department").val(), colSpan: 6 }],
            [{ content: 'Mi teléfono es: ' + $("#phone").val(), colSpan: 6 }, { content: 'Mi correo electrónico es: ' + $("#email").val(), colSpan: 6 }],
            [{ content: '', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: 'El nombre de mi papá es: ' + $("#fatherName").val(), colSpan: 6 }, { content: 'Su cédula es: ' + $("#fatherDocumentNumber").val(), colSpan: 6 }],
            [{ content: 'Empresa donde trabaja mi papá: ' + $("#fatherBusiness").val(), colSpan: 6 }, { content: 'Su teléfono de oficina es: ' + $("#fatherPhone").val(), colSpan: 6 }],
            [{ content: 'El nombre de mi mamá es: ' + $("#motherName").val(), colSpan: 6 }, { content: 'Su cédula es: ' + $("#motherDocumentNumber").val(), colSpan: 6 }],
            [{ content: 'Empresa donde trabaja mi mamá: ' + $("#motherBusiness").val(), colSpan: 6 }, { content: 'Su teléfono de oficina es: ' + $("#motherPhone").val(), colSpan: 6 }],
            [{ content: '', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: 'Mi colegio es: ' + $("#school").val(), colSpan: 6 }, { content: 'Mi curso es: ' + $("#course").val(), colSpan: 6 }],
            [{ content: 'Los deportes que más me gustan son: ' + $("#sport1").val() + ", " + $("#sport2").val() + ", " + $("#sport3").val() + ".", colSpan: 12 }],
            [{ content: 'Mis pasatiempos favoritos son: ' + $("#hobby1").val() + ", " + $("#hobby2").val() + ", " + $("#hobby3").val() + ".", colSpan: 12 }],
            [{ content: 'Asociado a Fonsabana: ' + $("#fonsabanaAssociate").val(), colSpan: 6 }, { content: 'Cédula: ' + $("#fonsabanaDocumentNumber").val(), colSpan: 6 }],
            [{ content: 'Empresa donde trabaja: ' + $("#fonsabanaBusiness").val(), colSpan: 6 }, { content: 'Parentesco: ' + $("#fonsabanaRelationship").val(), colSpan: 6 }],
            [{ content: '\n\n\n\n\n\n\n\n\n\n\n\n\t\t\t\t\t\tFirma\t\t\t\t\t\t\t\t\t\t\t\t\tHuella', colSpan: 12 }],
        ],
    });

    var firmaImg = new Image();
    firmaImg.src = signatureImg;
    doc.addImage(firmaImg, 'png', 36, 178, 50, 15);

    var firmaImg = new Image();
    firmaImg.src = footprintImg;
    doc.addImage(firmaImg, 'png', 133, 163, 30, 30);

    doc.setPage(2);
    //doc.addImage(logoImg, 'png', 20, 14.2, 50, 14);

    doc.setPage(3);
    //doc.addImage(logoImg, 'png', 20, 14.2, 50, 14);

    function getSelected(name) {
        var radios = $('input[name=' + name + ']');
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                return radios[i].value;
            }
        }
    }

    function getChecked(id) {
        if ($('#' + id).is(":checked")) {
            return " X. ";
        }
        return " . ";
    }
    return doc;
}

$("#sendEmailButton").click(function () {
    try {
        var doc = demoFromHTML(signatureImg, footprintImg);
        $("#sendEmailButton").text("Enviando...");
        Email.send({
            SecureToken: "785ccc29-2210-4806-bc5e-3576e0d769e9",
            To: ['chang.andres@hotmail.com'],
            From: "andresfabi90@gmail.com",
            Subject: "Nuevo Formulario Asociado - " + $("#names").val() + " " + $("#firstSurname").val(),
            Body: $("#names").val() + " " + $("#firstSurname").val() + " te acaba de enviar su Formulario Asociado Digilenciado.",
            Attachments: [
                {
                    name: "Formulario Fonsabanito.pdf",
                    data: doc.output('datauri')
                }]
        }).then(
            message => {
                $("#sendEmailButton").text("Enviar por correo electrónico");
                alert(message)
            }

        );
    } catch (err) {
        alert("Error al generar el documento, verifica que subiste toda la información requerida");
    }
});

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
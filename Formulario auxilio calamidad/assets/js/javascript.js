var signatureImg, footprintImg, identificationCardDoc;

document.getElementById('print').onclick = function () {
    if ($('#policyCheckbox').is(":checked")) {
        try {
            var doc = demoFromHTML(signatureImg, footprintImg);
            doc.save('Formulario Auxilio Calamidad.pdf');
        } catch (err) {
            alert("Error al generar el documento, verifica que subiste toda la información requerida.");
        }
    } else {
        alert("Debes aceptar la política de protección de datos.");
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
        signatureText.html("Firma." + signatureFile.val().split('.').pop());
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
        footprintText.html("Huella." + footprintFile.val().split('.').pop());
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
    doc.addImage(logoImg, 'png', 20, 14, 50, 15);
    var entryDate = $("#formDate").val().split('-');

    doc.autoTable({
        theme: 'plain',
        styles: { lineColor: [142, 142, 142], lineWidth: 0.1, fontSize: 8 },
        head: [[{ content: '', colSpan: 6, styles: { minCellHeight: 15 } }, { content: 'SOLICITUD AUXILIO CALAMIDAD', colSpan: 6, styles: { valign: 'middle', halign: 'center' } }, { content: 'Fecha de elaboración: Octubre 5 de 2010. Versión 1', colSpan: 4, styles: { valign: 'middle', halign: 'center' } }]],
    });

    doc.autoTable({
        theme: 'plain',
        tableWidth: 45,
        fontSize: 14,
        styles: { lineColor: [142, 142, 142], lineWidth: 0.1, fontSize: 8 },
        head: [[{ content: 'DIA', styles: { halign: 'center', minCellWidth: 15, fillColor: [242, 242, 242] } }, { content: 'MES', styles: { valign: 'middle', halign: 'center', minCellWidth: 15, fillColor: [242, 242, 242] } }, { content: 'AÑO', styles: { valign: 'middle', halign: 'center', minCellWidth: 15, fillColor: [242, 242, 242] } }]],
        body: [[{ content: entryDate[2], styles: { halign: 'center' } }, { content: entryDate[1], styles: { halign: 'center' } }, { content: entryDate[0], styles: { halign: 'center' } }]]
    });

    doc.autoTable({
        theme: 'plain',
        styles: { lineColor: [142, 142, 142], lineWidth: 0.1, fontSize: 8 },
        head: [[{ content: 'INFORMACIÓN ASOCIADO', colSpan: 4, styles: { halign: 'center', minCellWidth: 15, fillColor: [242, 242, 242] } }]],
        body: [[{ content: "Nombres y Apellidos: " + $("#names").val(), colSpan: 3 }, { content: "No. Identificación: " + $("#documentNumber").val(), colSpan: 1 }],
        [{ content: "Empresa: " + $("#business").val(), colSpan: 2 }, { content: "Dependencia: " + $("#dependence").val(), colSpan: 1 }, { content: "Teléfono: " + $("#phone").val(), colSpan: 1 }],
        [{ content: "E- Mail: " + $("#mail").val(), colSpan: 4 }],
        [{ content: "Entidad bancaria: " + $("#bank").val(), colSpan: 2 }, { content: "No Cuenta: " + $("#accountNumber").val(), colSpan: 1 }, { content: "Tipo de cuenta: " + getSelected("accountType"), colSpan: 1 }]]
    });

    doc.autoTable({
        theme: 'plain',
        styles: { lineColor: [142, 142, 142], lineWidth: 0.1, fontSize: 8 },
        head: [[{ content: 'TIPO DE AUXILIO', colSpan: 4, styles: { halign: 'center', minCellWidth: 15, fillColor: [242, 242, 242] } }]],
        body: [[{ content: "Tipo de auxilio: " + getSelected("helpType"), colSpan: 4 }],
        [{ content: "Observaciones: " + $("#observations").val(), colSpan: 4 }],]
    });

    doc.autoTable({
        theme: 'plain',
        styles: { lineColor: [142, 142, 142], lineWidth: 0.1, fontSize: 8 },
        head: [[{ content: 'ESPACIO EXCLUSIVO PARA FONSABANA', colSpan: 2, styles: { halign: 'center', minCellWidth: 15, fillColor: [242, 242, 242] } }]],
        body: [[{ content: "Fecha de ingreso al fondo:", colSpan: 1, styles: { minCellHeight: 15 } }, { content: "Salario: $", colSpan: 1, styles: { minCellHeight: 15 } }],
        [{ content: "Valor total del auxilio: " + $("#observations").val(), colSpan: 2, styles: { minCellHeight: 15 } }],
        [{ content: "Aprobado por:", colSpan: 1, styles: { minCellHeight: 15 } }, { content: "Negado por:", colSpan: 1, styles: { minCellHeight: 15 } }],
        [{ content: "Observaciones: ______________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________.", colSpan: 2 }],
        [{ content: "Firma:", colSpan: 1, styles: { minCellHeight: 15 } }, { content: "Firma:", colSpan: 1, styles: { minCellHeight: 15 } }],
        [{ content: "Fecha de aprobación:", colSpan: 2, styles: { minCellHeight: 15 } }],]
    });

    doc.setFontType("normal");
    doc.setFontSize(9);
    doc.text(14, 235, "Protección de Datos: En Cumplimiento del artículo 10 del Decreto 1377 de 2013, reglamentario de la Ley Estatutaria 1581 de 2012, FONSABANA, informa que previamente a la expedición del Decreto, ha recolectado información personal de nuestros asociados, la cual reposa en las bases de datos del Fondo, y es utilizada para los fines propios de nuestra institución, específicamente para mantener los lazos con todos los asociados y en general, para el ejercicio del objeto social. Los titulares de los datos podrán ejercer los derechos de acceso, corrección, supresión, revocación o reclamo, mediante escrito dirigido al FONDO DE EMPLEADOS DE LA SABANA - FONSABANA a la dirección de correo electrónico protecciondedatos@fonsabana.com.co, atendiendo los requisitos para el trámite de consultas y reclamos establecidos en la política de protección de datos del Fondo.",
        { maxWidth: 180, align: "justify" });

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
    if ($('#policyCheckbox').is(":checked")) {
        try {
            var doc = demoFromHTML(signatureImg, footprintImg);
            $("#sendEmailButton").text("Enviando...");
            Email.send({
                SecureToken: "496b6536-febe-4b21-a895-813a97633794",
                To: getEmailsTo(),
                From: "fonsabana@fonsabana.com.co",
                Subject: "Formulario solicitud auxilio de calamidad",
                Body: "Apreciado(a) asociado(a): Reciba un cordial saludo. Queremos informarle que su solicitud de auxilio de calamidad al Fondo de Empleados de La Sabana pasará a comité de mercadeo. Así mismo, en los próximos días le notificaremos por correo electrónico la respuesta respectiva.",
                Attachments: [
                    {
                        name: "Formulario.pdf",
                        data: doc.output('datauri')
                    }]
            }).then(
                message => {
                    $("#sendEmailButton").text("Enviar por correo electrónico");
                    alert("¡Correo enviado! Comprueba en tu bandeja de entrada");
                }

            );
        } catch (err) {
            alert("Error al generar el documento, verifica que subiste toda la información requerida.");
        }
    } else {
        alert("Debes aceptar la política de protección de datos.");
    }
});

function getEmailsTo() {
    var emails = [];
    if ($("#personalEmailToSend").val())
        emails.push($("#personalEmailToSend").val());
    if ($("#laboralEmailToSend").val())
        emails.push($("#laboralEmailToSend").val());
    emails.push("comunicacion@fonsabana.com.co");
    return emails;
}

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
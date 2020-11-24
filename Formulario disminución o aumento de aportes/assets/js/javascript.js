var signatureImg, footprintImg, identificationCardDoc;

document.getElementById('print').onclick = function () {
    try {
        var doc = demoFromHTML(signatureImg, footprintImg, true);
        doc.save('Disminución o aumento de aportes.pdf');
    } catch (err) {
        alert("Error al generar el documento, verifica que subiste toda la información requerida.");
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

function demoFromHTML(signatureImg, footprintImg, isFromDownloadButton) {
    var doc = new jsPDF({
        format: 'a4',
    });

    var logoImg = new Image();
    logoImg.src = 'assets/img/logo-fonsabana.png';
    doc.addImage(logoImg, 'png', 20, 14, 50, 20);
    var formDate = $("#formDate").val().split('-');

    doc.autoTable({
        theme: 'plain',
        styles: { lineColor: [142, 142, 142], lineWidth: 0.1, fontSize: 8 },
        head: [[{ content: '', colSpan: 6, styles: { minCellHeight: 20 } }, { content: 'DISMINUCIÓN - AUMENTO DE APORTES', colSpan: 6, styles: { valign: 'middle', halign: 'center' } }, { content: 'Versión 1 \n Julio 14 de 2015', colSpan: 4, styles: { valign: 'middle', halign: 'center' } }]],
    });

    doc.setFont("arial");
    doc.setFontType("normal");
    doc.text(20, 50, "Chía, " + formDate[2] + " de " + formDate[1] + " del " + formDate[0] + ".");
    doc.text(20, 70, "Señores");
    doc.setFontType("bold");
    doc.text(20, 76, "FONDO DE EMPLEADOS DE LA SABANA");
    doc.setFontType("normal");
    doc.text(20, 96, "Apreciados señores:");
    doc.text(20, 116, "Me permito autorizar a ustedes efectuar los siguientes descuentos de mi \nsueldo con destino al FONDO DE EMPLEADOS DE LA SABANA,\nFONSABANA.");
    doc.text(20, 146, "Descontar mensualmente el " + $("#discount").val() + "% de mi sueldo básico a partir de la fecha,\ncon ajuste por exceso o defecto a la cantidad del ciento próximo como aporte\na capital y ahorro permanente de acuerdo a lo estipulado en el numeral 28 de\nlos estatutos. ");
    if (getSelected("inputType") == "Aumentar") {
        doc.text(20, 176, "Aumentar X Disminuir _____");
    } else {
        doc.text(20, 176, "Aumentar _____ Disminuir X");
    }
    doc.text(20, 186, "Acepto de acuerdo con la ley, los descuentos por nómina que determine la\nAsamblea de la Entidad y los ajustes que correspondan a mis obligaciones\nadquiridas con el Fondo de empleados según las normas legales vigentes. ");
    doc.text(20, 216, "Atentamente,");
    doc.text(20, 230, "NOMBRE: " + $("#name").val());
    doc.text(20, 240, "FIRMA Y CÉDULA: ");
    doc.setFontSize(7);
    doc.text(20, 273, "Protección de Datos: En Cumplimiento del artículo 10 del Decreto 1377 de 2013, reglamentario de la Ley Estatutaria 1581 de 2012, FONSABANA, informa que previamente a la expedición del Decreto, ha recolectado información personal de nuestros asociados, la cual reposa en las bases de datos del Fondo, y es utilizada para los fines propios de nuestra institución, específicamente para mantener los lazos con todos los asociados y en general, para el ejercicio del objeto social. Los titulares de los datos podrán ejercer los derechos de acceso, corrección, supresión, revocación o reclamo, mediante escrito dirigido al FONDO DE EMPLEADOS DE LA SABANA - FONSABANA a la dirección de correo electrónico protecciondedatos@fonsabana.com.co, atendiendo los requisitos para el trámite de consultas y reclamos establecidos en la política de protección de datos del Fondo.",
        { maxWidth: 170, align: "justify" });

    if (signatureImg !== undefined || !isFromDownloadButton) {
        var firmaImg = new Image();
        firmaImg.src = signatureImg;
        doc.addImage(firmaImg, 'png', 20, 247, 50, 15);
    }

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
            var doc = demoFromHTML(signatureImg, footprintImg, false);
            $("#sendEmailButton").text("Enviando...");
            Email.send({
                SecureToken: "496b6536-febe-4b21-a895-813a97633794",
                To: getEmailsTo(),
                From: "fonsabana@fonsabana.com.co",
                Subject: "Formulario de disminución o aumento de aporte",
                Body: "Apreciado(a) asociado(a): Reciba un cordial saludo. Queremos informarle que su solicitud de disminución o aumento de aporte al Fondo de Empleados de La Sabana pasará a aprobación de descuento. Así mismo, en los próximos días le notificaremos por correo electrónico la respuesta respectiva.",
                Attachments: [
                    {
                        name: "Formulario.pdf",
                        data: doc.output('datauri')
                    }]
            }).then(
                message => {
                    $("#sendEmailButton").text("Enviar formulario");
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
var signatureImg, footprintImg, identificationCardDoc;

document.getElementById('print').onclick = function () {
    try {
        var doc = demoFromHTML(signatureImg, footprintImg, true);
        doc.save('Solicitud de retiro parcial o total de ahorro programado.pdf');
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

function demoFromHTML(signatureImg, footprintImg, isFromDownloadButton) {
    var doc = new jsPDF();

    var logoImg = new Image();
    logoImg.src = 'assets/img/logo-fonsabana.png';
    doc.addImage(logoImg, 'png', 20, 14, 50, 20);
    var formDate = $("#formDateSaving").val().split('-');

    doc.autoTable({
        theme: 'plain',
        styles: { lineColor: [142, 142, 142], lineWidth: 0.1, fontSize: 8 },
        head: [[{ content: '', colSpan: 6, styles: { minCellHeight: 20 } }, { content: 'SOLICITUD DE RETIRO PARCIAL O TOTAL DE AHORRO PROGRAMADO, FONSABANITO O CUPOCRECE', colSpan: 6, styles: { valign: 'middle', halign: 'center' } }, { content: 'Versión 1 \n Enero 16 de 2017', colSpan: 4, styles: { valign: 'middle', halign: 'center' } }]],
    });

    doc.setFont("arial");
    doc.setFontSize(14);
    doc.setFontType("normal");
    doc.text(20, 55, "Fecha: " + formDate[2] + " de " + formDate[1] + " del " + formDate[0] + "\n"
        + "Nombre Asociado: " + $("#associateName").val() + ".\t\t\t Teléfono: " + $("#phone").val() + "\n"
        + "No Identificación" + $("#identificationNumber").val() + "\n"
        + "Correo electrónico: " + $("#email").val() + "\n"
        + "Entidad: " + $("#entity").val());

    doc.setFontType("normal");
    doc.text(20, 90, "Me permito solicitar un retiro de mi ahorro constituido como:"
        + "\n" + getSelected("savingType"));
    doc.setFontType("bold");
    doc.text(20, 110, "RETIRO PARCIAL O TOTAL DE AHORRO:");
    doc.setFontType("normal");
    doc.text(20, 120, getSelected("withdrawalType"),
        { maxWidth: 170, align: "justify" });
    doc.text(20, 130, "Valor $ " + $("#withdrawalCount").val());
    doc.text(20, 140, "Cuenta No. " + $("#accountNumber").val() + "\t Banco " + $("#bank").val(),
        { maxWidth: 170, align: "justify" });
    doc.text(20, 150, "Tipo de Cuenta: " + getSelected("accountType"),
        { maxWidth: 170, align: "justify" });
    doc.text(20, 160, "Titular " + $("#accountName").val() + "\t Cédula " + $("#documentNumber").val(),
        { maxWidth: 170, align: "justify" });
    doc.setFontType("bold");
    doc.text(20, 190, "OBSERVACIONES: ",
        { maxWidth: 170, align: "justify" });
    doc.setFontType("normal");
    doc.text(20, 200, "_________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________________",
        { maxWidth: 170, align: "justify" });
    doc.text(20, 200, $("#observations").val(),
        { maxWidth: 170, align: "justify" });
    doc.text(20, 265, "Firma");

    if (signatureImg !== undefined || !isFromDownloadButton) {
        var firmaImg = new Image();
        firmaImg.src = signatureImg;
        doc.addImage(firmaImg, 'png', 20, 245, 50, 15);
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
                    Subject: "Formulario solicitud de retiro parcial o total de ahorro programado, Fonsabanito o Cupocrece",
                Body: "Apreciado(a) asociado(a): Reciba un cordial saludo. Queremos informarle que su solicitud de retiro parcial o total de ahorro programado, Fonsabanito o Cupocrece al Fondo de Empleados de La Sabana pasará a aprobación de comité de crédito y cartera. Así mismo, en los próximos días le notificaremos por correo electrónico la respuesta respectiva. ",
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
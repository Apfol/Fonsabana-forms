var signatureImg, footprintImg, identificationCardDoc;

document.getElementById('print').onclick = function () {
    try {
        var doc = demoFromHTML(signatureImg, footprintImg, true);
        doc.save('Formulario caminata.pdf');
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
    var doc = new jsPDF();

    var logoImg = new Image();
    logoImg.src = 'assets/img/logo-fonsabana.png';
    doc.addImage(logoImg, 'png', 20, 14, 50, 20);

    doc.autoTable({
        theme: 'plain',
        styles: { lineColor: [142, 142, 142], lineWidth: 0.1, fontSize: 8 },
        head: [[{ content: '', colSpan: 6, styles: { minCellHeight: 20 } }, { content: 'ORDEN DE RETENCIÓN CONVENIOS', colSpan: 6, styles: { valign: 'middle', halign: 'center' } }, { content: 'Versión 1 \n Julio 14 de 2015', colSpan: 4, styles: { valign: 'middle', halign: 'center' } }]],
    });

    doc.setFont("arial");
    doc.setFontSize(14);
    doc.setFontType("normal");
    doc.text(20, 60, "Yo " + $("#name").val() + " Identificado(a) con " + $("#identification").val() + " autorizo al señor pagador de " + $("#payer").val() + " para que descuente de mi sueldo con destino al FONDO DE EMPLEADOS DE LA SABANA, la suma total de $" + $("#discount").val() + " correspondiente a " + $("#correspondense").val() + ", descontando dicho valor en " + $("#dues").val() + " cuotas por valor de $" + $("#dueValue").val() + ", a partir del mes de " + $("#startMonth").val() + ".", { maxWidth: 170, align: "justify" });
    doc.text(20, 90, "Como garantía adicional a esta orden de retención reservo cualquier derecho sobre sueldos, prestaciones sociales a que se diera lugar al momento de mi retiro de la Universidad, por la suma de todas las obligaciones existentes con el Fondo de Empleados de La Sabana.", { maxWidth: 170, align: "justify" });
    doc.text(20, 120, "La reserva del cupo puede ser cancelada máximo con dos días hábiles antes de realizarse la actividad, de no ser así y no asistir, asumiré el valor total que implique la reserva.", { maxWidth: 170, align: "justify" });
    doc.text(20, 145, "Dadas las características del recorrido, no se recomienda llevar niños acompañantes menores de 8 años, en caso que decida llevarlos, el Fondo de Empleados de La Sabana y la empresa gestora del evento, no asumen responsabilidad alguna por eventualidades sucedidas a estos menores.", { maxWidth: 170, align: "justify" });
    doc.text(20, 180, "A continuación enuncio mis acompañantes:", { maxWidth: 170, align: "justify" });
    doc.text(20, 190, "1. " + $("#companion1").val()
        + "\n2. " + $("#companion2").val()
        + "\n3. " + $("#companion3").val()
        + "\n4. " + $("#companion4").val()
        + "\n5. " + $("#companion5").val());
    doc.text(20, 230, "Para constancia, se firma en Chía a los " + $("#signDay").val() + " del mes de " + $("#signMonth").val() + " de " + $("#signYear").val() + ".");
    doc.text(20, 265, "Firma y No Identificación");

    if (signatureImg !== undefined || !isFromDownloadButton) {
        var firmaImg = new Image();
        firmaImg.src = signatureImg;
        doc.addImage(firmaImg, 'png', 20, 245, 50, 15);
    }

    doc.setFontSize(7);
    doc.text(20, 273, "Protección de Datos: En Cumplimiento del artículo 10 del Decreto 1377 de 2013, reglamentario de la Ley Estatutaria 1581 de 2012, FONSABANA, informa que previamente a la expedición del Decreto, ha recolectado información personal de nuestros asociados, la cual reposa en las bases de datos del Fondo, y es utilizada para los fines propios de nuestra institución, específicamente para mantener los lazos con todos los asociados y en general, para el ejercicio del objeto social. Los titulares de los datos podrán ejercer los derechos de acceso, corrección, supresión, revocación o reclamo, mediante escrito dirigido al FONDO DE EMPLEADOS DE LA SABANA - FONSABANA a la dirección de correo electrónico protecciondedatos@fonsabana.com.co, atendiendo los requisitos para el trámite de consultas y reclamos establecidos en la política de protección de datos del Fondo.",
        { maxWidth: 170, align: "justify" });

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
                Subject: "Formulario solicitud caminatas",
                Body: "Reciba un cordial saludo. Queremos informarle que su solicitud de caminata al Fondo de Empleados de La Sabana pasará a aprobación de descuento. Así mismo, en los próximos días le notificaremos por correo electrónico la respuesta respectiva.",
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
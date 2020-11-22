var signatureImg, footprintImg, identificationCardDoc;

document.getElementById('print').onclick = function () {
    if ($('#policyCheckbox').is(":checked")) {
        try {
            var doc = demoFromHTML(signatureImg, footprintImg);
            doc.save('Formulario Ahorro Programado.pdf');
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
    doc.addImage(logoImg, 'png', 20, 14, 50, 20);
    var formDate = $("#formDateSaving").val().split('-');

    doc.autoTable({
        theme: 'plain',
        styles: { lineColor: [142, 142, 142], lineWidth: 0.1, fontSize: 8 },
        head: [[{ content: '', colSpan: 6, styles: { minCellHeight: 20 } }, { content: 'SOLICITUD APERTURA AHORRO PROGRAMADO', colSpan: 6, styles: { valign: 'middle', halign: 'center' } }, { content: 'Versión 1 \n Julio 14 de 2015', colSpan: 4, styles: { valign: 'middle', halign: 'center' } }]],
    });

    doc.setFont("arial");
    doc.setFontSize(11);
    doc.setFontType("normal");
    doc.text(20, 45, "Fecha: " + formDate[2] + " de " + formDate[1] + " del " + formDate[0] + ". \t No. Solicitud: " + $("#requestNumber").val() + "\n"
        + "Nombre Asociado: " + $("#associateName").val() + "\n"
        + "No Identificación: " + $("#identificationNumber").val() + "\n"
        + "Entidad: " + $("#entity").val() + ".\t\t\t Dependencia: " + $("#dependence").val() + "\n"
        + "Dirección: " + $("#direction").val() + ".\t\t\t Teléfono: " + $("#phone").val());

    doc.setFontType("bold");
    doc.text(20, 75, "CONSTITUCIÓN AHORRO");
    doc.setFontType("normal");
    doc.text(20, 80, "Valor cuota ahorro mensual: $" + $("#mensualSaving").val() + " a partir de: " + $("#savingDate").val() + ".\n" + "Plazo meses: " + $("#savingMonths").val() + "."
        + "\nPago Por: Nómina: " + $("#payroll").val() + " Por Caja: " + $("#payPerBox").val()
        + "\nMotivo constitución: " + $("#motiveConstitution").val());
    doc.setFontType("bold");
    doc.text(20, 102, "AUTORIZACIÓN DESCUENTO POR NÓMINA");
    doc.setFontType("normal");
    doc.text(20, 107, "Autorizo al señor pagador de " + $("#payerQuantity").val() + " para que descuente mensualmente de mi sueldo con destino al Fondo de Empleados de la Sabana - Fonsabana, de la cual soy asociado (a) la suma mensual de $" + $("#sumMonth").val() + " por " + $("#monthQuantity").val() + " meses, con destino a la constitución de ahorro programado. Declaro que he leído y acepto el contrato para la constitución de ahorro programado en el Fondo de Empleados de la Sabana",
        { maxWidth: 170, align: "justify" });
    doc.setFontType("bold");
    doc.text(20, 130, "DECLARACIÓN VOLUNTARIA DE ORIGEN DE FONDOS");
    doc.setFontType("normal");
    doc.text(20, 135, "Declaro que: el origen de los fondos que manejaré en la cuenta solicitada provienen del giro ordinario de actividades lícitas, y mi ocupación económica no es ni se relaciona con la actividad profesional de compra o venta de divisas. Igualmente declaro que el origen de mis recursos proceden del desarrollo de la(s) siguiente (s) actividad (es), " + $("#activities").val() + ".",
        { maxWidth: 170, align: "justify" });
    doc.text(20, 155, "Me obligo a no prestar mi cuenta y a no permitir que terceros efectúen depósitos o transferencias a mi cuenta y a no hacer pagos o transferencias desde mi cuenta a desconocidos. También declaro que la información que suministro es veraz, completa, la he proporcionado sin reticencia y si el Fondo lo solicita me obligo a entregar la información, documentos y explicaciones pertinentes. Cualquier inexactitud al respecto o al verme sindicado o involucrado por cualquier autoridad, en investigaciones relacionadas con el lavado de activos o enriquecimiento ilícito, faculta al Fondo para dar por terminado sin explicaciones el presente contrato.",
        { maxWidth: 170, align: "justify" });
    doc.text(20, 190, "Protección de Datos: En Cumplimiento del artículo 10 del Decreto 1377 de 2013, reglamentario de la Ley Estatutaria 1581 de 2012, FONSABANA, informa que previamente a la expedición del Decreto, ha recolectado información personal de nuestros asociados, la cual reposa en las bases de datos del Fondo, y es utilizada para los fines propios de nuestra institución, específicamente para mantener los lazos con todos los asociados y en general, para el ejercicio del objeto social. Los titulares de los datos podrán ejercer los derechos de acceso, corrección, supresión, revocación o reclamo, mediante escrito dirigido al FONDO DE EMPLEADOS DE LA SABANA - FONSABANA a la dirección de correo electrónico protecciondedatos@fonsabana.com.co, atendiendo los requisitos para el trámite de consultas y reclamos establecidos en la política de protección de datos del Fondo.",
        { maxWidth: 170, align: "justify" });
    doc.text(20, 265, "Firma y No Identificación")
    var firmaImg = new Image();
    firmaImg.src = signatureImg;
    doc.addImage(firmaImg, 'png', 20, 245, 50, 15);

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
                SecureToken: "afb39c97-1898-4662-b31b-f1cadfb25c93",
                To: getEmailsTo(),
                From: "fonsabana@fonsabana.com.co",
                Subject: "Formulario ahorro programado",
                Body: "Apreciado(a) asociado(a): Reciba un cordial saludo. Queremos informarle que su solicitud de ahorro programado al Fondo de Empleados de La Sabana pasará a aprobación de descuento. Así mismo, en los próximos días le notificaremos por correo electrónico la respuesta respectiva. ",
                Attachments: [
                    {
                        name: "Formulario.pdf",
                        data: doc.output('datauri')
                    }]
            }).then(
                message => {
                    $("#sendEmailButton").text("Enviar por correo electrónico");
                    alert("¡Correo enviado! Comprueba en tu bandeja de entrada")
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
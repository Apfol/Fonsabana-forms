var signatureImg, footprintImg, identificationCardDoc;

document.getElementById('print').onclick = function () {
    try {
        var doc = demoFromHTML(signatureImg, footprintImg, true);
        doc.save('Formulario Fonsabanito.pdf');
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

function demoFromHTML(signatureImg, footprintImg, isFromDownloadButton) {
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
            [{ content: 'Protección de Datos: En Cumplimiento del artículo 10 del Decreto 1377 de 2013, reglamentario de la Ley Estatutaria 1581 de 2012, FONSABANA, informa que previamente a la expedición del Decreto, ha recolectado información personal de nuestros asociados, la cual reposa en las bases de datos del Fondo, y es utilizada para los fines propios de nuestra institución, específicamente para mantener los lazos con todos los asociados y en general, para el ejercicio del objeto social. Los titulares de los datos podrán ejercer los derechos de acceso, corrección, supresión, revocación o reclamo, mediante escrito dirigido al FONDO DE EMPLEADOS DE LA SABANA - FONSABANA a la dirección de correo electrónico protecciondedatos@fonsabana.com.co, atendiendo los requisitos para el trámite de consultas y reclamos establecidos en la política de protección de datos del Fondo.', colSpan: 16 }],
            [{ content: '\n\n\n\n\n\n\n\n\n\n\n\n\t\t\t\t\t\tFirma\t\t\t\t\t\t\t\t\t\t\t\t\tHuella', colSpan: 12 }],
        ],
    });

    if (signatureImg !== undefined || !isFromDownloadButton) {
        var firmaImg = new Image();
        firmaImg.src = signatureImg;
        doc.addImage(firmaImg, 'png', 36, 200, 50, 15);
    }

    if (footprintImg !== undefined || !isFromDownloadButton) {
        var firmaImg = new Image();
        firmaImg.src = footprintImg;
        doc.addImage(firmaImg, 'png', 133, 185, 30, 30);
    }

    doc.addPage();
    doc.setPage(2);

    var logoImg = new Image();
    logoImg.src = 'assets/img/logo-fonsabana.png';
    doc.addImage(logoImg, 'png', 20, 14, 50, 20);
    var formDate = $("#formDateSaving").val().split('-');

    doc.autoTable({
        theme: 'plain',
        styles: { lineColor: [142, 142, 142], lineWidth: 0.1, fontSize: 8 },
        head: [[{ content: '', colSpan: 6, styles: { minCellHeight: 20 } }, { content: 'SOLICITUD APERTURA AHORRO PROGRAMADO', colSpan: 6, styles: { valign: 'middle', halign: 'center' } }, { content: 'Versión 3 \n Enero 25 de 2018', colSpan: 4, styles: { valign: 'middle', halign: 'center' } }]],
    });

    doc.setFont("arial");
    doc.setFontSize(11);
    doc.setFontType("normal");
    doc.text(20, 45, "Fecha: " + formDate[2] + " de " + formDate[1] + " del " + formDate[0] + ". \t No. Solicitud: " + $("#requestNumber").val() + "\n"
        + "Nombre Asociado: " + $("#associateName").val() + "\n"
        + "No Identificación" + $("#identificationNumber").val() + "\n"
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
    doc.text(20, 107, "Me permito autorizar a ustedes efectuar los siguientes descuentos de mi sueldo con destino al FONDO DE EMPLEADOS DE LA SABANA - FONSABANA:",
        { maxWidth: 170, align: "justify" });
    doc.text(20, 117, "1. La suma de $" + $("#discountSum").val() + " por una sola vez, correspondiente a la cuota de afiliación a la línea de ahorro programado Fonsabanito.",
        { maxWidth: 170, align: "justify" });
    doc.text(20, 127, "2. Descuente mensualmente de mi sueldo con destino a FonSabana, de la cual soy asociado (a) la suma mensual de $" + $("#discountMonth").val() + " por " + $("#discountMotive").val() + " meses, con destino a la constitución de ahorro programado.",
        { maxWidth: 170, align: "justify" });
    doc.text(20, 137, "Declaro que he leído y acepto el contrato para la constitución de ahorro programado en el Fondo de Empleados de la Sabana.",
        { maxWidth: 170, align: "justify" });
    doc.setFontType("bold");
    doc.text(20, 152, "AUTORIZACIÓN TRATAMIENTO DATOS PERSONALES");
    doc.setFontType("normal");
    doc.text(20, 157, "Autorizo a que la información recolectada en este formulario, repose en las bases de datos del fondo y sea utilizada para los fines propios de la institución y en general, para el ejercicio del objeto social. Así, mis datos personales podrán ser procesados, recolectados, almacenados, usados y actualizados para fines administrativos, comerciales, de publicidad y contacto con FONSABANA.",
        { maxWidth: 170, align: "justify" });
    doc.setFontType("bold");
    doc.text(20, 180, "DECLARACIÓN VOLUNTARIA DE ORIGEN DE FONDOS");
    doc.setFontType("normal");
    doc.text(20, 185, "Declaro que: el origen de los fondos que manejaré en la cuenta solicitada provienen del giro ordinario de actividades lícitas, y mi ocupación económica no es ni se relaciona con la actividad profesional de compra o venta de divisas. Igualmente declaro que el origen de mis recursos proceden del desarrollo de la(s) siguiente (s) actividad (es), " + $("#activities").val() + ".",
        { maxWidth: 170, align: "justify" });
    doc.text(20, 207, "Me obligo a no prestar mi cuenta y a no permitir que terceros efectúen depósitos o transferencias a mi cuenta y a no hacer pagos o transferencias desde mi cuenta a desconocidos. También declaro que la información que suministro es veraz, completa, la he proporcionado sin reticencia y si el Fondo lo solicita me obligo a entregar la información, documentos y explicaciones pertinentes. Cualquier inexactitud al respecto o al verme sindicado o involucrado por cualquier autoridad, en investigaciones relacionadas con el lavado de activos o enriquecimiento ilícito, faculta al Fondo para dar por terminado sin explicaciones el presente contrato.",
        { maxWidth: 170, align: "justify" });
    doc.setFontSize(8);
    doc.text(20, 240, "Protección de Datos: En Cumplimiento del artículo 10 del Decreto 1377 de 2013, reglamentario de la Ley Estatutaria 1581 de 2012, FONSABANA, informa que previamente a la expedición del Decreto, ha recolectado información personal de nuestros asociados, la cual reposa en las bases de datos del Fondo, y es utilizada para los fines propios de nuestra institución, específicamente para mantener los lazos con todos los asociados y en general, para el ejercicio del objeto social. Los titulares de los datos podrán ejercer los derechos de acceso, corrección, supresión, revocación o reclamo, mediante escrito dirigido al FONDO DE EMPLEADOS DE LA SABANA - FONSABANA a la dirección de correo electrónico protecciondedatos@fonsabana.com.co, atendiendo los requisitos para el trámite de consultas y reclamos establecidos en la política de protección de datos del Fondo.",
        { maxWidth: 170, align: "justify" });
    doc.setFontSize(11);
    doc.text(20, 283, "Firma y No Identificación");

    if (signatureImg !== undefined || !isFromDownloadButton) {
        var firmaImg = new Image();
        firmaImg.src = signatureImg;
        doc.addImage(firmaImg, 'png', 20, 263, 50, 15);
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
                Subject: "Formulario de afiliación fonsabanito",
                Body: "Apreciado(a) fonsabanito: Reciba un cordial saludo. Queremos informarle que su solicitud de afiliación de fonsabanito al Fondo de Empleados de La Sabana pasará a aprobación de descuento del ahorro. Así mismo, en los próximos días le notificaremos por correo electrónico la respuesta respectiva. ",
                Attachments: [
                    {
                        name: "Formulario Fonsabanito.pdf",
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
var signatureImg, footprintImg, identificationCardDoc;

document.getElementById('print').onclick = function () {
    try {
        var doc = demoFromHTML(signatureImg, footprintImg);
        doc.save('table.pdf');
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
    doc.text(20, 185, "Declaro que: el origen de los fondos que manejaré en la cuenta solicitada provienen del giro ordinario de actividades lícitas, y mi ocupación económica no es ni se relaciona con la actividad profesional de compra o venta de divisas. Igualmente declaro que el origen de mis recursos proceden del desarrollo de la(s) siguiente (s) actividad (es), ____________________________________________________ ______________________________________________________________________________________ _ ",
        { maxWidth: 170, align: "justify" });
    doc.text(20, 210, "Me obligo a no prestar mi cuenta y a no permitir que terceros efectúen depósitos o transferencias a mi cuenta y a no hacer pagos o transferencias desde mi cuenta a desconocidos. También declaro que la información que suministro es veraz, completa, la he proporcionado sin reticencia y si el Fondo lo solicita me obligo a entregar la información, documentos y explicaciones pertinentes. Cualquier inexactitud al respecto o al verme sindicado o involucrado por cualquier autoridad, en investigaciones relacionadas con el lavado de activos o enriquecimiento ilícito, faculta al Fondo para dar por terminado sin explicaciones el presente contrato.",
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
    try {
        var doc = demoFromHTML(signatureImg, footprintImg);
        $("#sendEmailButton").text("Enviando...");
        Email.send({
            SecureToken: "785ccc29-2210-4806-bc5e-3576e0d769e9",
            To: ['chang.andres@hotmail.com', $("#personalEmailToSend").val(), $("#laboralEmailToSend").val()],
            From: "andresfabi90@gmail.com",
            Subject: "Nuevo Formulario Asociado - " + $("#names").val() + " " + $("#firstSurname").val(),
            Body: $("#names").val() + " " + $("#firstSurname").val() + " te acaba de enviar su Formulario Asociado Digilenciado.",
            Attachments: [
                {
                    name: "Formulario.pdf",
                    data: doc.output('datauri')
                }]
        }).then(
            message => {
                $("#sendEmailButton").text("Enviar formulario");
                alert(message)
            }

        );
    } catch (err) {
        alert("Error al generar el documento, verifica que subiste toda la información requerida.");
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
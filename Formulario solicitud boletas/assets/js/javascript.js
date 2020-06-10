var signatureImg, footprintImg, identificationCardDoc;

document.getElementById('print').onclick = function () {
    try {
        var doc = demoFromHTML(signatureImg, footprintImg);
        doc.save('Formulario Boletas.pdf');
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

function demoFromHTML(signatureImg, footprintImg) {
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
    doc.text(20, 100, "Autorizo para que en el caso de retirarme de la empresa, el saldo de la presente obligaciónque contraigo por el presente documento, se me descuente de la liquidación final de mis prestaciones sociales, o de cualquier indemnización, bonificación o crédito laboral que en esa oportunidad se me reconozca.", { maxWidth: 170, align: "justify" });
    doc.text(20, 140, "Para constancia, se firma en Chía a los " + $("#signDay").val() + " del mes de " + $("#signMonth").val() + " de " + $("#signYear").val() + ".");
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
            SecureToken: "396783f6-a017-417c-a5bf-f17b2ab6b137",
            To: [$("#personalEmailToSend").val(), $("#laboralEmailToSend").val(), $("#functionaryEmailToSend").val()],
            From: "fonsabana@fonsabana.com.co",
            Subject: "Formulario solicitud boletas",
            Body: "Apreciado(a) asociado(a): Reciba un cordial saludo. Queremos informarle que su solicitud de boletas al Fondo de Empleados de La Sabana pasará a aprobación de descuento. Así mismo, en los próximos días le notificaremos por correo electrónico la respuesta respectiva.",
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
});

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
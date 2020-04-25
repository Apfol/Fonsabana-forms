var signatureImg, signatureAImg, footprintImg, identificationCardDoc;

document.getElementById('print').onclick = function () {
    try {
        var doc = demoFromHTML(signatureImg, footprintImg);
        doc.save('Formulario Caminata.pdf');
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

const signatureAFile = $("#signatureAFile");
const signatureAButton = $("#signatureAButton");
const signatureAText = $("#signatureAText");

signatureAButton.click(function () {
    signatureAFile.click();
});

signatureAFile.change(function () {
    if (signatureAFile.val()) {
        signatureAText.html("Firma." + signatureAFile.val().split('.').pop());
        if (this.files && this.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                signatureAImg = e.target.result;
            }

            reader.readAsDataURL(this.files[0]);
        }
    } else {
        signatureAText.html("Sin archivo");
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
    doc.text(20, 60, "Chía,    " + $("#signDay").val() + " del " + $("#signMonth").val() + " 2020.");
    doc.text(20, 80, "Señores");
    doc.text(20, 90, "FONDO DE EMPLEADOS DE LA SABANA");
    doc.text(20, 110, "YO " + $("#name").val() + " mayor de edad, domiciliado y residente en " + $("#residence").val() + " e identificado como aparece al pie de mi firma, obrando en mi carácter de asociado de FONSABANA, manifiesto a ustedes que por medio del presente escrito confiero poder especial, amplio y suficiente a " + $("#apoderado").val() + " también mayor de edad, e identificado con cédula de ciudadanía No. " + $("#identification").val() + " expedida en " + $("#expedition").val() + "para que me represente en la ASAMBLEA GENERAL ORDINARIA DE ASOCIADOS DE FONSABANA, que tendrá lugar el día 20 de Mayo de 2020, a partir de las 11:30 a.m. en el auditorio Álvaro del Portillo, Ad Portas de la Universidad de La Sabana, Campus Universidad de La Sabana, Autopista norte, Puente del común Chía - Cundinamarca. En caso de no celebrarse la Asamblea, en la fecha señalada, el presente poder se extiende a las nuevas convocatorias.", { maxWidth: 170, align: "justify" });
    doc.text(20, 180, "Mi apoderado queda facultado para participar con voto en dicha Asamblea.");
    doc.text(20, 200, "Se otorga este poder en la ciudad de " + $("#city").val() + " a los " + $("#power").val() + " días del mes de " + $("#powerMonth").val() + " de 2020", { maxWidth: 170, align: "justify" });
    doc.text(20, 230, "Firma del poderante");
    doc.text(60, 240, "ACEPTO EL ANTERIOR PODER");
    doc.text(20, 270, "Firma del apoderado");

    var firmaImg = new Image();
    firmaImg.src = signatureImg;
    doc.addImage(firmaImg, 'png', 20, 210, 50, 15);

    var firmaImg = new Image();
    firmaImg.src = signatureAImg;
    doc.addImage(firmaImg, 'png', 20, 250, 50, 15);

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
            To: [$("#personalEmailToSend").val(), $("#laboralEmailToSend").val(), $("#functionaryEmailToSend").val()],
            From: "andresfabi90@gmail.com",
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
});

function getBase64(file) {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
    });
}
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
    doc.text(20, 236, "NOMBRE: " + $("#name").val());
    doc.text(20, 246, "FIRMA Y CÉDULA: ");

    var firmaImg = new Image();
    firmaImg.src = signatureImg;
    doc.addImage(firmaImg, 'png', 20, 253, 50, 15);

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
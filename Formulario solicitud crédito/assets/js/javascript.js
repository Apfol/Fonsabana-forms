var signatureImg, footprintImg, identificationCardDoc;

document.getElementById('print').onclick = function () {
    try {
        var doc = demoFromHTML(signatureImg, footprintImg, true);
        doc.save('Formulario Solicitud Crédito.pdf');
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

const incomeCertificationFile = $("#incomeCertificationFile");
const incomeCertificationButton = $("#incomeCertificationButton");
const incomeCertificationText = $("#incomeCertificationText");

incomeCertificationButton.click(function () {
    incomeCertificationFile.click();
});

incomeCertificationFile.change(function () {
    if (incomeCertificationFile.val()) {
        incomeCertificationText.html("Certificación." + incomeCertificationFile.val().split('.').pop());
        if (this.files && this.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                identificationCardDoc = e.target.result;
            }

            reader.readAsDataURL(this.files[0]);
        }
    } else {
        incomeCertificationText.html("Sin archivo");
    }
});

function demoFromHTML(signatureImg, footprintImg, isFromDownloadButton) {
    var doc = new jsPDF();

    var logoImg = new Image();
    logoImg.src = 'assets/img/logo-fonsabana.png';
    doc.addImage(logoImg, 'png', 20, 14, 50, 15);
    var entryDate = $("#formDate").val().split('-');

    doc.autoTable({
        theme: 'plain',
        styles: { lineColor: [142, 142, 142], lineWidth: 0.1, fontSize: 8 },
        head: [[{ content: '', colSpan: 6, styles: { minCellHeight: 15 } }, { content: 'SOLICITUD DE CRÉDITO', colSpan: 6, styles: { valign: 'middle', halign: 'center' } }, { content: 'Fecha de elaboración: Octubre 29 de 2018. Versión 03', colSpan: 4, styles: { valign: 'middle', halign: 'center' } }]],
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
        head: [[{ content: 'INFORMACIÓN DEUDOR', colSpan: 7, styles: { halign: 'center', minCellWidth: 15, fillColor: [242, 242, 242] } }]],
        body: [[{ content: "Valor solicitado", colSpan: 2, styles: { fillColor: [242, 242, 242], fontStyle: 'bold', halign: 'center' } }, { content: "Modalidad", colSpan: 2, styles: { fillColor: [242, 242, 242], fontStyle: 'bold', halign: 'center' } }, { content: "No. de cuotas", colSpan: 3, styles: { fillColor: [242, 242, 242], fontStyle: 'bold', halign: 'center' } }],
        [{ content: $("#requestValue").val(), colSpan: 2 }, { content: $("#modality").val(), colSpan: 2 }, { content: $("#quotesNumber").val(), colSpan: 3 }],
        [{ content: "Recoge créditos vigentes: " + getSelected("outstandingCredits"), colSpan: 3, styles: { fontStyle: 'bold' } }, { content: "¿Cuáles? " + $("#which").val(), colSpan: 4, styles: { fontStyle: 'bold' } }],
        [{ content: 'Valor solicitado en letras', colSpan: 7, styles: { halign: 'center', minCellWidth: 15, fillColor: [242, 242, 242], fontStyle: 'bold' } }],
        [{ content: $("#valueInWords").val(), colSpan: 7, styles: { halign: 'center', minCellWidth: 15 } }],
        [{ content: "Nombres y apellidos: " + $("#names").val(), colSpan: 2 }, { content: "Cédula: " + $("#identificationNumber").val(), colSpan: 2 }, { content: "De: " + $("#identificationFrom").val(), colSpan: 3 }],
        [{ content: "Empresa donde trabaja: " + $("#business").val(), colSpan: 2 }, { content: "Dependencia: " + $("#ext").val(), colSpan: 1, styles: { cellWidth: 25 } }, { content: "Cargo: " + $("#position").val(), colSpan: 2, styles: { cellWidth: 25 } }, { content: "Fecha ingreso: " + $("#admissionDate").val(), colSpan: 2 }],
        [{ content: "Dirección residencia: " + $("#residenceDirection").val(), colSpan: 2 }, { content: getSelected("residenceType"), colSpan: 1, styles: { cellWidth: 25 } }, { content: "Ciudad: " + $("#city").val(), colSpan: 2, styles: { cellWidth: 25 } }, { content: "Teléfono: " + $("#phone").val() + "\nCelular: " + $("#cellphone").val(), colSpan: 2 }],
        [{ content: "E-mail: " + $("#email").val(), colSpan: 7 }],
        [{ content: "Nombre cónyuge: " + $("#spouseName").val(), colSpan: 2 }, { content: "Cédula: " + $("#spouseIdentificationNumber").val(), colSpan: 1, styles: { cellWidth: 25 } }, { content: "Profesión: " + $("#spouseProfession").val(), colSpan: 2, styles: { cellWidth: 25 } }, { content: "Personas a cargo: " + $("#spousePeople").val(), colSpan: 2 }],
        [{ content: "Empresa donde labora: " + $("#spouseBusiness").val(), colSpan: 2 }, { content: "Cargo: " + $("#spousePosition").val(), colSpan: 1, styles: { cellWidth: 25 } }, { content: "Antigüedad: " + $("#spouseOld").val(), colSpan: 2, styles: { cellWidth: 25 } }, { content: "Teléfono: " + $("#spousePhone").val(), colSpan: 2 }],
        [{ content: 'RELACIÓN DE BIENES', colSpan: 7, styles: { halign: 'center', minCellWidth: 15, fillColor: [242, 242, 242], fontStyle: 'bold' } }],
        [{ content: "Dirección y teléfono", colSpan: 1, styles: { halign: 'center' } }, { content: "No y fecha Esc.", colSpan: 1, styles: { halign: 'center' } }, { content: "No Matrícula", colSpan: 1, styles: { halign: 'center' } }, { content: "Notaría", styles: { cellWidth: 20, halign: 'center' }, colSpan: 1 }, { content: "Hipoteca a", colSpan: 1, styles: { halign: 'center' } }, { content: "Vr. Hipoteca", colSpan: 1, styles: { halign: 'center' } }, { content: "Valor Ccial", colSpan: 1, styles: { halign: 'center' } }],
        [{ content: $("#direction1").val(), colSpan: 1, styles: { halign: 'center' } }, { content: $("#esc1").val(), colSpan: 1, styles: { halign: 'center' } }, { content: $("#enrollment1").val(), colSpan: 1, styles: { halign: 'center' } }, { content: $("#notary1").val(), styles: { cellWidth: 20, halign: 'center' }, colSpan: 1 }, { content: $("#mortgage1").val(), colSpan: 1, styles: { halign: 'center' } }, { content: $("#mortgageValue1").val(), colSpan: 1, styles: { halign: 'center' } }, { content: $("#commercialValue1").val(), colSpan: 1, styles: { halign: 'center' } }],
        [{ content: $("#direction2").val(), colSpan: 1, styles: { halign: 'center' } }, { content: $("#esc2").val(), colSpan: 1, styles: { halign: 'center' } }, { content: $("#enrollment2").val(), colSpan: 1, styles: { halign: 'center' } }, { content: $("#notary2").val(), styles: { cellWidth: 20, halign: 'center' }, colSpan: 1 }, { content: $("#mortgage2").val(), colSpan: 1, styles: { halign: 'center' } }, { content: $("#mortgageValue2").val(), colSpan: 1, styles: { halign: 'center' } }, { content: $("#commercialValue2").val(), colSpan: 1, styles: { halign: 'center' } }],
        [{ content: 'RELACIÓN VEHÍCULOS Y MAQUINARIA', colSpan: 7, styles: { halign: 'center', minCellWidth: 15, fillColor: [242, 242, 242], fontStyle: 'bold' } }],
        [{ content: "Marca Modelo y Tipo", colSpan: 2, styles: { halign: 'center' } }, { content: "Placa", colSpan: 1, styles: { halign: 'center' } }, { content: "Pignorado a", colSpan: 2, styles: { halign: 'center' } }, { content: "Vr. Pignoración", styles: { cellWidth: 20, halign: 'center' }, colSpan: 1 }, { content: "Vr. Ccial", colSpan: 1, styles: { halign: 'center' } }],
        [{ content: $("#model1").val(), colSpan: 2, styles: { halign: 'center' } }, { content: $("#licensePlate1").val(), colSpan: 1, styles: { halign: 'center' } }, { content: $("#pledged1").val(), colSpan: 2, styles: { halign: 'center' } }, { content: $("#pledgedValue1").val(), styles: { cellWidth: 20, halign: 'center' }, colSpan: 1 }, { content: $("#commercialValueVehicle1").val(), colSpan: 1, styles: { halign: 'center' } }],
        [{ content: $("#model2").val(), colSpan: 2, styles: { halign: 'center' } }, { content: $("#licensePlate2").val(), colSpan: 1, styles: { halign: 'center' } }, { content: $("#pledged2").val(), colSpan: 2, styles: { halign: 'center' } }, { content: $("#pledgedValue2").val(), styles: { cellWidth: 20, halign: 'center' }, colSpan: 1 }, { content: $("#commercialValueVehicle2").val(), colSpan: 1, styles: { halign: 'center' } }],
        [{ content: 'INFORMACIÓN FINANCIERA ', colSpan: 7, styles: { halign: 'center', minCellWidth: 15, fillColor: [242, 242, 242], fontStyle: 'bold' } }],
        [{ content: "TOTAL ACTIVO (valor bienes): $" + $("#actives").val(), colSpan: 4 }, { content: "TOTAL PASIVO (valor deudas): $" + $("#pasives").val(), colSpan: 3 }],
        [{ content: "TOTAL PATRIMONIO (Activo - Pasivo): $" + $("#heritage").val(), colSpan: 7 }],
        [{ content: 'INGRESOS Y EGRESOS', colSpan: 7, styles: { halign: 'center', minCellWidth: 15, fillColor: [242, 242, 242], fontStyle: 'bold' } }],
        [{ content: "1. Sueldo* $" + $("#revenue").val(), colSpan: 4 }, { content: "1. Arriendo o cuota vivienda $" + $("#rent").val(), colSpan: 3 }],
        [{ content: "2. Sueldo esposo (a)* $" + $("#spouseSalary").val(), colSpan: 4 }, { content: "2. Gastos de sostenimiento $" + $("#supportCosts").val(), colSpan: 3 }],
        [{ content: "3. Otros ingresos* $" + $("#otherIncome").val(), colSpan: 4 }, { content: "3. Pago deudas $" + $("#payDebts").val(), colSpan: 3 }],
        [{ content: "Total ingresos (1+2+3) $" + $("#totalIncomes").val(), colSpan: 4 }, { content: "Total gastos (1+2+3) $" + $("#totalCosts").val(), colSpan: 3 }],
        ]
    });

    doc.setFontSize(8);
    doc.text(20, 260, "Descripción otros ingresos: " + $("#descriptionOtherIncomes").val(), { maxWidth: 170, align: "justify" });
    doc.text(20, 265, "*Adjuntar certificación de ingresos o desprendibles de nómina: personal y otros ingresos", { maxWidth: 170, align: "justify" });

    doc.text(180, 280, "Pag. 1 de 2");

    doc.addPage();
    doc.setPage(2);

    doc.addImage(logoImg, 'png', 20, 14, 50, 15);

    doc.autoTable({
        theme: 'plain',
        styles: { lineColor: [142, 142, 142], lineWidth: 0.1, fontSize: 8 },
        head: [[{ content: '', colSpan: 6, styles: { minCellHeight: 15 } }, { content: 'SOLICITUD DE CRÉDITO', colSpan: 6, styles: { valign: 'middle', halign: 'center' } }, { content: 'Fecha de elaboración: Octubre 29 de 2018. Versión 03', colSpan: 4, styles: { valign: 'middle', halign: 'center' } }]],
    });

    doc.autoTable({
        theme: 'plain',
        styles: { lineColor: [142, 142, 142], lineWidth: 0.1, fontSize: 8 },
        head: [[{ content: 'REFERENCIAS', colSpan: 7, styles: { halign: 'center', minCellWidth: 15, fillColor: [242, 242, 242] } }]],
        body: [[{ content: "Entidad bancaria", colSpan: 2, styles: { fontStyle: 'bold', halign: 'center' } }, { content: "No. Cuenta", colSpan: 2, styles: { fontStyle: 'bold', halign: 'center' } }, { content: "Sucursal", colSpan: 3, styles: { fontStyle: 'bold', halign: 'center' } }],
        [{ content: $("#bankEntity1").val(), colSpan: 2 }, { content: $("#accountNumber1").val(), colSpan: 2 }, { content: $("#branchOffice1").val(), colSpan: 3 }],
        [{ content: $("#bankEntity2").val(), colSpan: 2 }, { content: $("#accountNumber2").val(), colSpan: 2 }, { content: $("#branchOffice2").val(), colSpan: 3 }],
        [{ content: "No Tarjeta de crédito", colSpan: 2, styles: { fontStyle: 'bold', halign: 'center' } }, { content: "Entidad", colSpan: 2, styles: { fontStyle: 'bold', halign: 'center' } }, { content: "Cupo", colSpan: 3, styles: { fontStyle: 'bold', halign: 'center' } }],
        [{ content: $("#creditCard").val(), colSpan: 2 }, { content: $("#entity").val(), colSpan: 2 }, { content: $("#quota").val(), colSpan: 3 }],
        [{ content: "Personales", colSpan: 2, styles: { fontStyle: 'bold', halign: 'center' } }, { content: "Teléfono", colSpan: 2, styles: { fontStyle: 'bold', halign: 'center' } }, { content: "Actividad", colSpan: 3, styles: { fontStyle: 'bold', halign: 'center' } }],
        [{ content: $("#personal1").val(), colSpan: 2 }, { content: $("#phone1").val(), colSpan: 2 }, { content: $("#activity1").val(), colSpan: 3 }],
        [{ content: $("#personal2").val(), colSpan: 2 }, { content: $("#phone2").val(), colSpan: 2 }, { content: $("#activity2").val(), colSpan: 3 }],
        ]
    });

    doc.text(20, 105, "Certifico que la información suministrada es exacta y expresamente autorizamos a FONSABANA para que exclusivamente con fines de información financiera reporte, consulte, registre y circule información a las entidades de consulta de base de datos o cualquier entidad vigilada por las Superintendencias sobre los saldos a nuestro cargo, operaciones de crédito, estado de las obligaciones y manejo del crédito, que bajo cualquier modalidad nos hubieran otorgado o se otorgue en el futuro.",
        { maxWidth: 170, align: "justify" });

    doc.setFontSize(12);
    doc.text(15, 125, "Agradezco desembolsar el crédito en:", { maxWidth: 170, align: "justify" });
    doc.text(20, 135, "1.");
    doc.text(25, 135, "TITULAR " + $("#titular").val() + "\tC.C. O NIT " + $("#ccNit").val());
    doc.text(25, 142, "BANCO " + $("#titular").val() + "\tCuenta No. " + $("#ccNit").val());
    doc.text(25, 149, "TIPO DE CUENTA: " + getSelected("titularAccountType"));
    doc.text(20, 156, "2.");
    doc.text(25, 156, "CHEQUE A FAVOR DE: " + $("#check").val() + "\tC.C o NIT " + $("#ccNitCheck").val());
    doc.text(15, 240, "FIRMAR DEUDOR");

    doc.setFontSize(8);
    doc.text(20, 170, "Protección de Datos: En Cumplimiento del artículo 10 del Decreto 1377 de 2013, reglamentario de la Ley Estatutaria 1581 de 2012, FONSABANA, informa que previamente a la expedición del Decreto, ha recolectado información personal de nuestros asociados, la cual reposa en las bases de datos del Fondo, y es utilizada para los fines propios de nuestra institución, específicamente para mantener los lazos con todos los asociados y en general, para el ejercicio del objeto social. Los titulares de los datos podrán ejercer los derechos de acceso, corrección, supresión, revocación o reclamo, mediante escrito dirigido al FONDO DE EMPLEADOS DE LA SABANA - FONSABANA a la dirección de correo electrónico protecciondedatos@fonsabana.com.co, atendiendo los requisitos para el trámite de consultas y reclamos establecidos en la política de protección de datos del Fondo.",
        { maxWidth: 170, align: "justify" });
    doc.text(180, 280, "Pag. 2 de 2");

    if (signatureImg !== undefined || !isFromDownloadButton) {
        var firmaImg = new Image();
        firmaImg.src = signatureImg;
        doc.addImage(firmaImg, 'png', 15, 220, 50, 15);
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
            var files = document.getElementById('incomeCertificationFile').files;
            $("#sendEmailButton").text("Enviando...");
            if (files.length == 0) {
                $("#sendEmailButton").text("Enviar formulario");
                alert(message);
            }
            getBase64(files[0]).then((data) => {
                Email.send({
                    SecureToken: "496b6536-febe-4b21-a895-813a97633794",
                    To: getEmailsTo(),
                    From: "fonsabana@fonsabana.com.co",
                    Subject: "Formulario solicitud de crédito",
                    Body: 'Apreciado(a) asociado(a): Reciba un cordial saludo. Queremos informarle que su solicitud de crédito al Fondo de Empleados de La Sabana pasará a estudio y análisis . Así mismo, en los próximos días le notificaremos por correo electrónico la respuesta respectiva. ',
                    Attachments: [
                        {
                            name: "Formulario Asociado.pdf",
                            data: doc.output('datauri')
                        },
                        {
                            name: "Certificación." + incomeCertificationFile.val().split('.').pop(),
                            data: data
                        }]
                }).then(
                    message => {
                        $("#sendEmailButton").text("Enviar formulario");
                        alert("¡Correo enviado! Comprueba en tu bandeja de entrada");
                    }
                );
            });
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
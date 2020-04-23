var signatureImg, footprintImg, identificationCardDoc;

document.getElementById('print').onclick = function () {
    try {
        var doc = demoFromHTML(signatureImg, footprintImg);
        doc.save('Formulario Asociado.pdf');
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

const identificationCardFile = $("#identificationCardFile");
const identificationCardButton = $("#identificationCardButton");
const identificationCardText = $("#identificationCardText");

identificationCardButton.click(function () {
    identificationCardFile.click();
});

identificationCardFile.change(function () {
    if (identificationCardFile.val()) {
        identificationCardText.html("Cédula." + identificationCardFile.val().split('.').pop());
        if (this.files && this.files[0]) {
            var reader = new FileReader();

            reader.onload = function (e) {
                identificationCardDoc = e.target.result;
            }

            reader.readAsDataURL(this.files[0]);
        }
    } else {
        identificationCardText.html("Sin archivo");
    }
});

function demoFromHTML(signatureImg, footprintImg) {
    var doc = new jsPDF();
    var expeditionDate = $("#expeditonDate").val().split('-');
    var partnerBornDate = $("#partnerBornDate").val().split('-');
    var formDate = $("#formDate").val().split('-');
    var bornDate = $("#bornDate").val().split('-');
    var entryDate = $("#entryDate").val().split('-');

    var logoImg = new Image();
    logoImg.src = 'assets/img/logo-fonsabana.png';
    doc.addImage(logoImg, 'png', 20, 14, 50, 15);

    doc.autoTable({
        theme: 'plain',
        styles: { lineColor: [142, 142, 142], lineWidth: 0.1, fontSize: 8 },
        head: [[{ content: '', colSpan: 6, styles: { minCellHeight: 15 } }, { content: 'Formulario de afiliación Asociado', colSpan: 6, styles: { valign: 'middle', halign: 'center' } }, { content: 'Fecha de elaboración: 11 de septiembre de 2019. Versión 7', colSpan: 4, styles: { valign: 'middle' } }]],
        body: [
            [{ content: 'Fecha de diligenciamiento', colSpan: 6, styles: { halign: 'center' } }, { content: 'Referido por', colSpan: 6, styles: { valign: 'middle', halign: 'center' } }, { content: 'Radicado', colSpan: 4, styles: { valign: 'middle', halign: 'center' } }],
            [{ content: formDate[2] + "/" + formDate[1] + "/" + formDate[0], colSpan: 6, styles: { halign: 'center' } }, { content: $("#refered").val(), colSpan: 6, styles: { halign: 'center' } }, { content: $("#filed").val(), colSpan: 4, styles: { halign: 'center' } }],
            [{ content: 'El formulario se diligencia con motivo de: ' + getSelected("reason"), styles: { fillColor: [242, 242, 242] }, colSpan: 16 }],
            [{ content: 'DATOS PERSONALES', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: 'Nombres completos: ' + $("#names").val(), colSpan: 6 }, { content: 'Primer apellido: ' + $("#firstSurname").val(), colSpan: 6 }, { content: 'Segundo apellido: ' + $("#secondSurname").val(), colSpan: 4 }],
            [{ content: 'Tipo de documento: ' + getSelected("documentType"), colSpan: 4, rowSpan: 2 }, { content: 'Numero: ' + $("#documentNumber").val(), colSpan: 2, rowSpan: 2 }, { content: 'Fecha de expedición: ' + expeditionDate[2] + "/" + expeditionDate[1] + "/" + expeditionDate[0], colSpan: 2, rowSpan: 2 }, { content: 'Lugar de expedición: ' + $("#expeditionPlace").val(), colSpan: 2, rowSpan: 2 }, { content: 'Nacionalidad: ' + $("#nationality").val(), colSpan: 2, rowSpan: 2 }, { content: 'Estado civil: ' + $("#civilStatus").val(), colSpan: 2, rowSpan: 2 }, { content: 'RH: ' + $("#rh").val(), colSpan: 2 }],
            [{ content: '# Hijos: ' + $("#sonsNumber").val(), colSpan: 2 }],
            [{ content: 'Fecha de nacimiento:\n ' + bornDate[2] + "/" + bornDate[1] + "/" + bornDate[0], colSpan: 5 }, { content: 'Municipio: ' + $("#bornTown").val(), colSpan: 4 }, { content: 'Departamento: ' + $("#bornDepartment").val(), colSpan: 4 }, { content: 'Sexo:\n' + getSelected("sex"), colSpan: 3 }],
            [{ content: 'Nivel de escolaridad: ' + getSelected("scholarship"), colSpan: 6 }, { content: 'Profesión: ' + $("#profession").val(), colSpan: 6 }, { content: 'Estrato: ' + $("#stratum").val(), colSpan: 4 }],
            [{ content: 'Residencia: ' + $("#home").val(), colSpan: 6 }, { content: 'Municipio: ' + $("#homeTown").val(), colSpan: 6 }, { content: 'Departamento: ' + $("#homeDepartment").val(), colSpan: 4 }],
            [{ content: 'Teléfono residencia: ' + $("#homeTel").val(), colSpan: 4 }, { content: 'Teléfono celular: ' + $("#homeCel").val(), colSpan: 4 }, { content: 'Correo electrónico personal: ' + $("#personalEmail").val(), colSpan: 8 }],
            [{ content: 'INFORMACIÓN LABORAL', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: 'Empresa donde laboral: ' + $("#company").val(), colSpan: 6 }, { content: 'Dependencia: ' + $("#dependence").val(), colSpan: 6 }, { content: 'Cargo: ' + $("#position").val(), colSpan: 4 }],
            [{ content: 'Fecha de ingreso', colSpan: 2 }, { content: 'Día: ' + entryDate[2], colSpan: 2 }, { content: 'Mes: ' + entryDate[1], colSpan: 2 }, { content: 'Año: ' + entryDate[0], colSpan: 2 }, { content: 'Tipo de contrato: ' + $("#contractType").val(), colSpan: 2 }, { content: 'Correo electrónico laboral: ' + $("#laboralEmail").val(), colSpan: 6 }],
            [{ content: 'Dirección: ' + $("#laborDirection").val(), colSpan: 6 }, { content: 'Teléfono: ' + $("#laborTel").val(), colSpan: 2 }, { content: 'Ext: ' + $("#laborExt").val(), colSpan: 2 }, { content: 'Municipio: ' + $("#laborTown").val(), colSpan: 3 }, { content: 'Departamento: ' + $("#laborDepartment").val(), colSpan: 3 }],
            [{ content: 'Ocupación: ' + getSelected("occupation"), colSpan: 8 }, { content: 'Sector económico: ' + getSelected("economicSector"), colSpan: 8 }],
            [{ content: 'Actividad económica: ' + getSelected("economicActivity"), colSpan: 16 }],
            [{ content: 'Cuenta bancario No: ' + $("#bankAccount").val(), colSpan: 6 }, { content: 'Tipo de cuenta: ' + getSelected("accountType"), colSpan: 4 }, { content: 'Banco: ' + $("#bank").val(), colSpan: 6 }],
            [{ content: 'DATOS DEL CONYUGE', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: 'Nombres completos: ' + $("#partnerName").val(), colSpan: 6 }, { content: 'Primer apellido: ' + $("#partnerFirstSurname").val(), colSpan: 6 }, { content: 'Segundo apellido: ' + $("#partnerSecondSurname").val(), colSpan: 4 }],
            [{ content: 'Tipo de documento: ' + getSelected("partnerDocumentType"), colSpan: 4 }, { content: 'Numero: ' + $("#partnerDocumentNumber").val(), colSpan: 6 }, { content: 'Fecha de nacimiento:\n' + partnerBornDate[2] + "/" + partnerBornDate[1] + "/" + partnerBornDate[0], colSpan: 6 }],
            [{ content: 'Nivel de escolaridad: ' + getSelected('partnerScholarship'), colSpan: 8 }, { content: 'Profesión: ' + $("#partnerProfession").val(), colSpan: 8 }],
            [{ content: 'Empresa donde laboral: ' + $("#partnerCompany").val(), colSpan: 6 }, { content: 'Dependencia: ' + $("#partnerDependency").val(), colSpan: 6 }, { content: 'Cargo: ' + $("#partnerPosition").val(), colSpan: 4 }],
            [{ content: 'Dirección: ' + $("#partnerAddress").val(), colSpan: 6 }, { content: 'Municipio: ' + $("#partnerTown").val(), colSpan: 3 }, { content: 'Correo electrónico: ' + $("#partnerEmail").val(), colSpan: 4 }, { content: 'Teléfono: ' + $("#partnerTel").val(), colSpan: 3 }],
            [{ content: 'INFORMACIÓN FINANCIERA', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: 'Sueldo o ingreso mensual ', colSpan: 4 }, { content: '$ ' + $("#salary").val(), colSpan: 4 }, { content: 'Activo ', colSpan: 4 }, { content: '$ ' + $("#asset").val(), colSpan: 4 }],
            [{ content: 'Otros ingresos ', colSpan: 4 }, { content: '$ ' + $("#otherSalary").val(), colSpan: 4 }, { content: 'Pasivo ', colSpan: 4 }, { content: '$ ' + $("#liability").val(), colSpan: 4 }],
            [{ content: 'Egresos mensuales ', colSpan: 4 }, { content: '$ ' + $("#monthlyExpenses").val(), colSpan: 4 }, { content: 'Patrimonio ', colSpan: 4 }, { content: '$ ' + $("#heritage").val(), colSpan: 4 }],
            [{ content: 'Concepto otros ingresos: ' + $("#otherSalariesConcept").val(), colSpan: 16 }],
            [{ content: 'Vivienda: ' + getSelected("living-place"), colSpan: 4 }, { content: 'Dirección: ' + $("#homeDirection").val(), colSpan: 4 }, { content: 'Valor comercial: ' + $("#homeCost").val(), colSpan: 4 }, { content: 'Saldo hipoteca: ' + $("#homeMortgageBalance").val(), colSpan: 4 }],
            [{ content: 'Vehículo Automotor: ' + getSelected("vehicle-type"), colSpan: 4, rowSpan: 2 }, { content: 'Marca: ' + $("#vehicleBrand").val(), colSpan: 4 }, { content: 'Valor comercial: ' + $("#vehicleCost").val(), colSpan: 4, rowSpan: 2 }, { content: 'Saldo hipoteca: ' + $("#vehicleMortgageBalance").val(), colSpan: 4, rowSpan: 2 }],
            [{ content: 'Modelo: ' + $("#vehicleModel").val(), colSpan: 4 }],
            [{ content: 'Otras propiedades: ' + $("#otherProperties").val(), colSpan: 12 }, { content: 'Valor comercial: ' + $("#otherPropertiesMortgageBalance").val(), colSpan: 4 }],
            [{ content: 'OPERACIONES EN MONEDA EXTRANJERA', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: '¿Realiza transacciones en moneda extranjera? ' + getSelected("coin-transactions"), colSpan: 4 }, { content: '¿Con cuáles paises? ' + $("#coinCountry").val(), colSpan: 6 }, { content: 'Tipo de moneda: ' + $("#coinType").val(), colSpan: 6 }],
            [{ content: '¿Posee cuentas en moneda extranjera? ' + getSelected("coin-account"), colSpan: 4 }, { content: 'No cuenta:' + $("#coinAccountNumber").val(), colSpan: 3 }, { content: 'Banco: ' + $("#coinBankAccount").val(), colSpan: 3 }, { content: 'Ciudad: ' + $("#coinCityAccount").val(), colSpan: 3 }, { content: 'País: ' + $("#coinCountryAccount").val(), colSpan: 3 }],
            [{ content: '¿Es usted sujeto de obligaciones tributarias en otro pais o grupo de paises?  ' + getSelected("tax-obligations"), colSpan: 8 }, { content: '¿Cuáles? ' + $("#taxObligationsCountries").val(), colSpan: 8 }],
            [{ content: 'PERSONA POLÍTICA O PÚBLICAMENTE EXPUESTA', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: '¿Goza usted de reconocimiento público o político? ' + getSelected("public-recognition"), colSpan: 8 }, { content: '¿En los últimos años ha ocupado algún cargo público? ' + getSelected("public-office"), colSpan: 8 }],
            [{ content: 'Cargo público: ' + $("#publicOfficeName").val(), colSpan: 4 }, { content: 'Duración en el cargo: ' + $("#publicOfficeTime").val(), colSpan: 4 }, { content: '¿Por su cargo o actividad, administra recursos publicos? ' + getSelected("public-resources"), colSpan: 8 }],
            [{ content: '¿Existe algún vínculo entre usted y una persona considerada política o públicamente expuesta? ' + getSelected("social-bond"), colSpan: 8 }, { content: 'EN CASO DE RESPONDER SÍ A LA PREGUNTA ANTERIOR POR FAVOR RESPONDA ', colSpan: 8 }],
            [{ content: '¿Tipo de relación? ' + $("#publicOfficeRelation").val(), colSpan: 7 }, { content: 'Nombre ' + $("#publicOfficeName").val(), colSpan: 5 }, { content: 'Cédula ' + $("#publicOfficeIdentificationCard").val(), colSpan: 4 }],
            [{ content: 'REFERENCIAS PERSONALES', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: 'Nombres y apellidos', colSpan: 5, styles: { halign: 'center' } }, { content: 'Dirección', colSpan: 3, styles: { halign: 'center' } }, { content: 'Municipio', colSpan: 4, styles: { halign: 'center' } }, { content: 'Teléfono fijo y/o celular', colSpan: 4, styles: { halign: 'center' } }],
            [{ content: $("#rfsNamesAndSurnames").val(), colSpan: 5, styles: { halign: 'center' } }, { content: $("#rfsDirection").val(), colSpan: 3, styles: { halign: 'center' } }, { content: $("#rfsTown").val(), colSpan: 4, styles: { halign: 'center' } }, { content: $("#rfsTel").val(), colSpan: 4, styles: { halign: 'center' } }],
            [{ content: $("#rfsNamesAndSurnames2").val(), colSpan: 5, styles: { halign: 'center' } }, { content: $("#rfsDirection2").val(), colSpan: 3, styles: { halign: 'center' } }, { content: $("#rfsTown2").val(), colSpan: 4, styles: { halign: 'center' } }, { content: $("#rfsTel2").val(), colSpan: 4, styles: { halign: 'center' } }],
            [{ content: 'DECLARACIÓN DE VOLUNTAD', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: 'Yo, ' + $("#dcName").val() + ' de Nacionalidad ' + $("#dcNationality").val() + ' y nacido el ' + $("#dcBornDay").val() + ' del mes de ' + $("#dcBornMonth").val() + ' del año ' + $("#dcBornYear").val() + ' en ' + $("#dcBornPlace").val() + ' identificado(a) con C.C. No. ' + $("#dcIdentificationNumber").val() + ' expedida en ' + $("#dcIdentificationExpedition").val() + ' declaro bajo juramento que es mi libre deseo y voluntad que de acuerdo a la ley en caso de fallecimiento, mis aportes, ahorros y cualquier seguro a que tenga derecho sean entregados a las personas a continuación referidas', colSpan: 16 }],
            [{ content: '', colSpan: 5, styles: { halign: 'center' } }, { content: 'Identificación ', colSpan: 3, styles: { halign: 'center' } }, { content: 'Parentesco', colSpan: 4, styles: { halign: 'center' } }, { content: 'Porcentaje', colSpan: 4, styles: { halign: 'center' } }],
            [{ content: $("#rfName1").val(), colSpan: 5, styles: { halign: 'center' } }, { content: $("#rfIdentification1").val(), colSpan: 3, styles: { halign: 'center' } }, { content: $("#rfRelationship1").val(), colSpan: 4, styles: { halign: 'center' } }, { content: $("#rfPercentage1").val(), colSpan: 4, styles: { halign: 'center' } }],
            [{ content: $("#rfName2").val(), colSpan: 5, styles: { halign: 'center' } }, { content: $("#rfIdentification2").val(), colSpan: 3, styles: { halign: 'center' } }, { content: $("#rfRelationship2").val(), colSpan: 4, styles: { halign: 'center' } }, { content: $("#rfPercentage2").val(), colSpan: 4, styles: { halign: 'center' } }],
            [{ content: $("#rfName3").val(), colSpan: 5, styles: { halign: 'center' } }, { content: $("#rfIdentification3").val(), colSpan: 3, styles: { halign: 'center' } }, { content: $("#rfRelationship3").val(), colSpan: 4, styles: { halign: 'center' } }, { content: $("#rfPercentage3").val(), colSpan: 4, styles: { halign: 'center' } }],
            [{ content: $("#rfName4").val(), colSpan: 5, styles: { halign: 'center' } }, { content: $("#rfIdentification4").val(), colSpan: 3, styles: { halign: 'center' } }, { content: $("#rfRelationship4").val(), colSpan: 4, styles: { halign: 'center' } }, { content: $("#rfPercentage4").val(), colSpan: 4, styles: { halign: 'center' } }],
            [{ content: $("#rfName5").val(), colSpan: 5, styles: { halign: 'center' } }, { content: $("#rfIdentification5").val(), colSpan: 3, styles: { halign: 'center' } }, { content: $("#rfRelationship5").val(), colSpan: 4, styles: { halign: 'center' } }, { content: $("#rfPercentage5").val(), colSpan: 4, styles: { halign: 'center' } }],
            [{ content: 'En el caso de la devolución de aportes y ahorros dejo a salvo las normas que rigen el derecho sucesoral.', colSpan: 16 }],
            [{ content: 'DOCUMENTACIÓN REQUERIDA', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: '* Fotocopia de la cédula de ciudadanía del asociado por ambas caras.', colSpan: 16 }],
            [{ content: 'AUTORIZACIÓN DE DESCUENTO', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: 'Me permito autorizar a ustedes efectuar los siguientes descuentos de mi sueldo con destino al FONDO DE EMPLEADOS DE LA SABANA.\n1. La suma de ' + $("#discount").val() + ' por una sola vez, correspondiente a mi cuota de afiliación a la entidad.\n2. Descontar mensualmente el ' + $("#discountPercentage").val() + ' % de mi sueldo básico a partir de la fecha, con ajuste por exceso o defecto a la cantidad del ciento próximo. De acuerdo a lo contemplado en el artículo 30 del estatuto vigente.\n3. La cuota mensual correspondiente al Fondo de Bienestar. La cual se podrá ajustar de acuerdo con lo que determine la Asamblea del Fondo de Empleados.\n4. Acepto de acuerdo con la ley los descuentos por nómina que determine la Asamblea de la Entidad y los ajustes respectivos.', colSpan: 16 }],
            [{ content: 'AUTORIZACIONES ESPECIALES', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: '1) Autorizo a FONSABANA a enviar los documentos correspondientes, ya sea extractos, rendimientos de cuentas, u otra información relacionada con el manejo de mis productos o servicios, o cualquier información que considere pertinente, por correo electrónico a la cuenta registrada en el formulario de afiliación o a la dirección de notificación registrada en el presente formulario o a la que indique por comunicación escrita. Manifiesto que estas son direcciones válidas, reales y me comprometo a actualizar la información de contacto aquí relacionada cada vez que cambie o cuando me sea solicitado. 2) Autorizo a todas las áreas de FONSABANA, para el desarrollo de su actividad comercial, a recolectar, recaudar, almacenar, usar, circular, suprimir, procesar, compilar, intercambiar, dar tratamiento, actualizar y disponer de los datos que han sido suministrados y que se han incorporado a distintas bases o bancos de datos, o en repositorios electrónicos de todo tipo con los que cuenta FONSABANA.3) Autorizo a FONSABANA, para que reporte, procese, solicite y consulte mi información comercial y financiera en las centrales de riesgo que para tales efectos cumplan con dicha labor, así como la de mi representante legal, apoderado y/u ordenante. 4) Autorizo a FONSABANA a compartir mi información comercial y financiera a terceros con los cuales posea un vínculo contractual de cualquier índole, siempre y cuando estos terceros cuenten con los medios electrónicos y controles idóneos para brindar seguridad a la información, y siempre que el tratamiento que estos terceros le den a la información esté relacionado con las actividades que correspondan a la gestión de la entidad. 5) Autorizo a cancelar los productos o servicios que mantenga en FONSABANA, en caso de infracción de cualquiera de los numerales contenidos en este documento, eximiendo a FONSABANA de toda responsabilidad que se derive por información errónea, falsa o inexacta que yo hubiere proporcionado en este documento o de violación del mismo. 6) Declaro que conozco y cumpliré las normas que obligan a actualizar mis datos personales e información financiera al menos una vez por año. 7) No admitiré que terceros efectúen depósitos a mis productos con recursos provenientes de actividades ilícitas contempladas en el Código Penal Colombiano o en cualquier norma que lo modifique o adicione, ni efectuaré transacciones o actividades a favor de personas relacionadas con las mismas. 8) Conozco que los canales establecidos para ejercer en cualquier momento los derechos que me asisten, en especial: conocer la información, solicitar la actualización, rectificación y/o supresión o revocar el consentimiento otorgado para el tratamiento de datos personales, será a través de: forma personal, comunicación escrita o al correo electrónico fonsabana@fonsabana.com.co. 9) Declaro que los recursos que se deriven de la relación comercial entre FONSABANA y yo no se destinarán a la financiación del terrorismo, grupos terroristas o actividades terroristas. 10) Declaro que no he sido declarado responsable jurídicamente por la comisión de delitos contra la administración pública cuya pena sea privación de la libertad o que afecten el patrimonio del estado o por delitos relacionados con la pertenencia, promoción o financiación de grupos ilegales, delitos de lesa humanidad, narcotráfico en Colombia o en el exterior, o soborno trasnacional. ', colSpan: 16 }],
            [{ content: 'DECLARACIÓN DE ORIGEN DE FONDOS', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: 'Declaro bajo la gravedad de juramento que los recursos que entrego no provienen de ninguna actividad ilícita de las contempladas en el Código Penal Colombiano o en cualquier norma que lo modifique o adicione. \nLos recursos que entrego provienen de las siguientes fuentes:\n\nSalarios y remuneraciones:' + getChecked("salaryAndRemunerations") + ' Honorarios:' + getChecked("fee") + ' Pensión:' + getChecked("pension") + ' Actividad Económica:' + getChecked("economicActivityFundOrigins") + ' Otros:' + getChecked("otherFundOrigins") + ' ¿Cuales? ' + $("#whichFundOrigins").val() + '\n\nSe hace constar que la presente autorización no constituye por parte de FONSABANA acto contrario a la ley y que, en su correcta utilización, de acuerdo con lo previsto en este documento, no es en ningún caso violatoria de mis derechos constitucionales o legales o de los cuales quiera de los autorizados u ordenantes registrados. ', colSpan: 16 }],
            [{ content: 'Al presentar esta solicitud de ingreso al Fondo de Empleados, declaro que acepto y me someto a los Estatutos y Reglamentos del Fondo de Empleados de La Sabana\n\nPor ello firmo a los ' + $("#firmDay").val() + ' días del mes de ' + $("#firmMonth").val() + ' del año ' + $("#firmYear").val() + ' .\n\n\n\n\n\n\n\n\n\n\n\t\t\t\t\t\tFirma y No. C.C.\t\t\t\t\t\t\t\t\tHuella Indice derecho', colSpan: 16 }],
            // ...
        ],
    });

    var firmaImg = new Image();
    firmaImg.src = signatureImg;
    doc.addImage(firmaImg, 'png', 40, 155, 50, 15);

    var firmaImg = new Image();
    firmaImg.src = footprintImg;
    doc.addImage(firmaImg, 'png', 130, 140, 30, 30);

    doc.setPage(2);
    doc.addImage(logoImg, 'png', 20, 14.2, 50, 14);

    doc.setPage(3);
    doc.addImage(logoImg, 'png', 20, 14.2, 50, 14);

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
        var files = document.getElementById('identificationCardFile').files;
        if (files.length == 0) {
            $("#sendEmailButton").text("Enviar formulario");
            alert(message);
        }
        $("#sendEmailButton").text("Enviando...");
        getBase64(files[0]).then((data) => {
            Email.send({
                SecureToken: "785ccc29-2210-4806-bc5e-3576e0d769e9",
                To: [$("#personalEmailToSend").val(), $("#laboralEmailToSend").val(), $("#functionaryEmailToSend").val()],
                From: "andresfabi90@gmail.com",
                Subject: "Formulario de afiliación de asociado",
                Body: 'Apreciado(a) asociado(a):' + '\r\n\r\n' + 'Reciba un cordial saludo. Queremos informarle que su solicitud de afiliación al Fondo de Empleados de La Sabana pasará a Comité de nuestra Junta Directiva. Así mismo, en los próximos días le notificaremos por correo electrónico la respuesta respectiva. ',
                Attachments: [
                    {
                        name: "Formulario Asociado.pdf",
                        data: doc.output('datauri')
                    },
                    {
                        name: "Cédula." + identificationCardFile.val().split('.').pop(),
                        data: data
                    }]
            }).then(
                message => {
                    $("#sendEmailButton").text("Enviar formulario");
                    alert("¡Correo enviado! Comprueba en tu bandeja de entrada")
                }
            );
        });
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
document.getElementById('print').onclick = function () {
    demoFromHTML();
};

function generatePDF() {
    var doc = new jsPDF()

    doc.text('Hello world!', 10, 10)
    doc.save('a4.pdf');
    alert("button was clicked");
}

function demoFromHTML() {
    var doc = new jsPDF();
    // It can parse html:
    //doc.autoTable({ html: '#my-table' })
    var date = new Date($("#expeditonDate").val());
    // Or use javascript directly:
    doc.autoTable({
        theme: 'plain',
        styles: { lineColor: [142, 142, 142], lineWidth: 0.1, fontSize: 8 },
        head: [[{ content: '', colSpan: 6 }, { content: 'Formulario de afiliación Asociado', colSpan: 6, styles: { valign: 'middle', halign: 'center' } }, { content: 'Fecha de elaboración: 11 de septiembre de 2019. Versión 7', colSpan: 4 }]],
        body: [
            [{ content: 'Fecha de diligenciamiento', colSpan: 6, styles: { halign: 'center' } }, { content: 'Referido por', colSpan: 6, styles: { valign: 'middle', halign: 'center' } }, { content: 'Radicado', colSpan: 4, styles: { valign: 'middle', halign: 'center' } }],
            [{ content: 'Día:\n' + $("#formDay").val(), colSpan: 2 }, { content: 'Mes:\n' + $("#formMonth").val(), colSpan: 2 }, { content: 'Año:\n' + $("#formYear").val(), colSpan: 2 }, { content: $("#refered").val(), colSpan: 6 }, { content: $("#filed").val(), colSpan: 4 }],
            [{ content: 'El formulario se diligencia con motivo de: ' + getSelected("reason"), styles: { fillColor: [242, 242, 242] }, colSpan: 16 }],
            [{ content: 'DATOS PERSONALES', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: 'Nombres completos: ' + $("#names").val(), colSpan: 6 }, { content: 'Primer apellido: ' + $("#firstSurname").val(), colSpan: 6 }, { content: 'Segundo apellido: ' + $("#secondSurname").val(), colSpan: 4 }],
            [{ content: 'Tipo de documento: ' + getSelected("documentType"), colSpan: 4, rowSpan: 2 }, { content: 'Numero: ' + $("#documentNumber").val(), colSpan: 2, rowSpan: 2 }, { content: 'Fecha de expedición: ' + date.getDay() + "/" + date.getMonth() + "/" + date.getFullYear(), colSpan: 2, rowSpan: 2 }, { content: 'Lugar de expedición: ' + $("#expeditionPlace").val(), colSpan: 2, rowSpan: 2 }, { content: 'Nacionalidad: ' + $("#nationality").val(), colSpan: 2, rowSpan: 2 }, { content: 'Estado civil: ' + $("#civilStatus").val(), colSpan: 2, rowSpan: 2 }, { content: 'RH: ' + $("#rh").val(), colSpan: 2 }],
            [{ content: '# Hijos: ' + $("#sonsNumber").val(), colSpan: 2 }],
            [{ content: 'Fecha de nacimiento', colSpan: 2 }, { content: 'Día: ' + $("#bornDay").val(), colSpan: 2 }, { content: 'Mes: ' + $("#bornMonth").val(), colSpan: 2 }, { content: 'Año: ' + $("#bornYear").val(), colSpan: 2 }, { content: 'Municipio: ' + $("#bornTown").val(), colSpan: 4 }, { content: 'Departamento: ' + $("#bornDepartment").val(), colSpan: 2 }, { content: 'Sexo:\n' + getSelected("sex"), colSpan: 2 }],
            [{ content: 'Nivel de escolaridad: ' + getSelected("scholarship"), colSpan: 6 }, { content: 'Profesión: ' + $("#profession").val(), colSpan: 6 }, { content: 'Estrato: ' + $("#stratum").val(), colSpan: 4 }],
            [{ content: 'Residencia: ', colSpan: 6 }, { content: 'Municipio: ', colSpan: 6 }, { content: 'Departamento: ', colSpan: 4 }],
            [{ content: 'Teléfono residencia: ', colSpan: 4 }, { content: 'Teléfono celular: ', colSpan: 4 }, { content: 'Correo electrónico personal: ', colSpan: 8 }],
            [{ content: 'INFORMACIÓN LABORAL', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: 'Empresa donde laboral: ', colSpan: 6 }, { content: 'Dependencia: ', colSpan: 6 }, { content: 'Cargo: ', colSpan: 4 }],
            [{ content: 'Fecha de ingreso: ', colSpan: 2 }, { content: 'Día: ', colSpan: 2 }, { content: 'Mes: ', colSpan: 2 }, { content: 'Año: ', colSpan: 2 }, { content: 'Tipo de contrato: ', colSpan: 2 }, { content: 'Correo electrónico laboral: ', colSpan: 6 }],
            [{ content: 'Dirección: ', colSpan: 6 }, { content: 'Teléfono: ', colSpan: 2 }, { content: 'Ext: ', colSpan: 2 }, { content: 'Municipio: ', colSpan: 3 }, { content: 'Departamento: ', colSpan: 3 }],
            [{ content: 'Ocupación: ', colSpan: 8 }, { content: 'Sector económico: ', colSpan: 8 }],
            [{ content: 'Actividad económica: ', colSpan: 16 }],
            [{ content: 'Cuenta bancario No: ', colSpan: 6 }, { content: 'Tipo de cuenta: ', colSpan: 4 }, { content: 'Banco: ', colSpan: 6 }],
            [{ content: 'DATOS DEL CONYUGE', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: 'Nombres completos: ', colSpan: 6 }, { content: 'Primer apellido: ', colSpan: 6 }, { content: 'Segundo apellido: ', colSpan: 4 }],
            [{ content: 'Tipo de documento: ', colSpan: 4 }, { content: 'Numero: ', colSpan: 3 }, { content: 'Fecha de nacimiento', colSpan: 3 }, { content: 'Día: ', colSpan: 2 }, { content: 'Mes: ', colSpan: 2 }, { content: 'Año: ', colSpan: 2 }],
            [{ content: 'Nivel de escolaridad: ', colSpan: 8 }, { content: 'Profesión: ', colSpan: 8 }],
            [{ content: 'Empresa donde laboral: ', colSpan: 6 }, { content: 'Dependencia: ', colSpan: 6 }, { content: 'Cargo: ', colSpan: 4 }],
            [{ content: 'Dirección: ', colSpan: 6 }, { content: 'Municipio: ', colSpan: 3 }, { content: 'Correo electrónico: ', colSpan: 4 }, { content: 'Teléfono: ', colSpan: 3 }],
            [{ content: 'INFORMACIÓN FINANCIERA', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: 'Sueldo o ingreso mensual ', colSpan: 4 }, { content: '$ ', colSpan: 4 }, { content: 'Activo ', colSpan: 4 }, { content: '$ ', colSpan: 4 }],
            [{ content: 'Otros ingresos ', colSpan: 4 }, { content: '$ ', colSpan: 4 }, { content: 'Pasivo ', colSpan: 4 }, { content: '$ ', colSpan: 4 }],
            [{ content: 'Egresos mensuales ', colSpan: 4 }, { content: '$ ', colSpan: 4 }, { content: 'Patrimonio ', colSpan: 4 }, { content: '$ ', colSpan: 4 }],
            [{ content: 'Concepto otros ingresos: ', colSpan: 16 }],
            [{ content: 'Vivienda: ', colSpan: 4 }, { content: 'Dirección: ', colSpan: 4 }, { content: 'Valor comercial: ', colSpan: 4 }, { content: 'Saldo hipoteca: ', colSpan: 4 }],
            [{ content: 'Vehículo Automotor: ', colSpan: 4, rowSpan: 2 }, { content: 'Marca: ', colSpan: 4 }, { content: 'Valor comercial: ', colSpan: 4, rowSpan: 2 }, { content: 'Saldo hipoteca: ', colSpan: 4, rowSpan: 2 }],
            [{ content: 'Modelo: ', colSpan: 4 }],
            [{ content: 'Otras propiedades: ', colSpan: 12 }, { content: 'Valor comercial: ', colSpan: 4 }],
            [{ content: 'OPERACIONES EN MONEDA EXTRANJERA', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: '¿Realiza transacciones en moneda extranjera? ', colSpan: 4 }, { content: '¿Con cuáles paises? ', colSpan: 6 }, { content: 'Tipo de moneda: ', colSpan: 6 }],
            [{ content: '¿Posee cuentas en moneda extranjera? ', colSpan: 4 }, { content: 'No cuenta:', colSpan: 3 }, { content: 'Banco: ', colSpan: 3 }, { content: 'Ciudad: ', colSpan: 3 }, { content: 'País: ', colSpan: 3 }],
            [{ content: '¿Es usted sujeto de obligaciones tributarias en otro pais o grupo de paises?  ', colSpan: 8 }, { content: '¿Cuáles? ', colSpan: 8 }],
            [{ content: 'PERSONA POLÍTICA O PÚBLICAMENTE EXPUESTA', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: '¿Goza usted de reconocimiento público o político? ', colSpan: 8 }, { content: '¿En los últimos años ha ocupado algún cargo público? ', colSpan: 8 }],
            [{ content: 'Cargo público: ', colSpan: 4 }, { content: 'Duración en el cargo: ', colSpan: 4 }, { content: '¿Por su cargo o actividad, administra recursos publicos? ', colSpan: 8 }],
            [{ content: '¿Existe algún vínculo entre usted y una persona considerada política o públicamente expuesta? ', colSpan: 8 }, { content: 'EN CASO DE RESPONDER SÍ A LA PREGUNTA ANTERIOR POR FAVOR RESPONDA ', colSpan: 8 }],
            [{ content: '¿Tipo de relación? ', colSpan: 7 }, { content: 'Nombre ', colSpan: 5 }, { content: 'Cédula ', colSpan: 4 }],
            [{ content: 'REFERENCIAS PERSONALES', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: 'Nombres y apellidos', colSpan: 5, styles: { halign: 'center' } }, { content: 'Dirección', colSpan: 3, styles: { halign: 'center' } }, { content: 'Municipio', colSpan: 4, styles: { halign: 'center' } }, { content: 'Teléfono fijo y/o celular', colSpan: 4, styles: { halign: 'center' } }],
            [{ content: ' ', colSpan: 5, styles: { halign: 'center' } }, { content: ' ', colSpan: 3, styles: { halign: 'center' } }, { content: ' ', colSpan: 4, styles: { halign: 'center' } }, { content: ' ', colSpan: 4, styles: { halign: 'center' } }],
            [{ content: ' ', colSpan: 5, styles: { halign: 'center' } }, { content: ' ', colSpan: 3, styles: { halign: 'center' } }, { content: ' ', colSpan: 4, styles: { halign: 'center' } }, { content: ' ', colSpan: 4, styles: { halign: 'center' } }],
            [{ content: 'DECLARACIÓN DE VOLUNTAD', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: 'Yo,_____________________________________________ de Nacionalidad____________________________ y nacido el __ del mes de \n _______ del año_____ en _______________________________ identificado(a) con C.C. No. __________________ expedida en ________________________ declaro bajo juramento que es mi libre deseo y voluntad que de acuerdo a la ley en caso de fallecimiento, mis aportes, ahorros y cualquier seguro a que tenga derecho sean entregados a las personas a continuación referidas', colSpan: 16 }],
            [{ content: '', colSpan: 5, styles: { halign: 'center' } }, { content: 'Identificación ', colSpan: 3, styles: { halign: 'center' } }, { content: 'Parentesco', colSpan: 4, styles: { halign: 'center' } }, { content: 'Porcentaje', colSpan: 4, styles: { halign: 'center' } }],
            [{ content: ' ', colSpan: 5, styles: { halign: 'center' } }, { content: ' ', colSpan: 3, styles: { halign: 'center' } }, { content: ' ', colSpan: 4, styles: { halign: 'center' } }, { content: ' ', colSpan: 4, styles: { halign: 'center' } }],
            [{ content: ' ', colSpan: 5, styles: { halign: 'center' } }, { content: ' ', colSpan: 3, styles: { halign: 'center' } }, { content: ' ', colSpan: 4, styles: { halign: 'center' } }, { content: ' ', colSpan: 4, styles: { halign: 'center' } }],
            [{ content: ' ', colSpan: 5, styles: { halign: 'center' } }, { content: ' ', colSpan: 3, styles: { halign: 'center' } }, { content: ' ', colSpan: 4, styles: { halign: 'center' } }, { content: ' ', colSpan: 4, styles: { halign: 'center' } }],
            [{ content: ' ', colSpan: 5, styles: { halign: 'center' } }, { content: ' ', colSpan: 3, styles: { halign: 'center' } }, { content: ' ', colSpan: 4, styles: { halign: 'center' } }, { content: ' ', colSpan: 4, styles: { halign: 'center' } }],
            [{ content: ' ', colSpan: 5, styles: { halign: 'center' } }, { content: ' ', colSpan: 3, styles: { halign: 'center' } }, { content: ' ', colSpan: 4, styles: { halign: 'center' } }, { content: ' ', colSpan: 4, styles: { halign: 'center' } }],
            [{ content: ' ', colSpan: 5, styles: { halign: 'center' } }, { content: ' ', colSpan: 3, styles: { halign: 'center' } }, { content: ' ', colSpan: 4, styles: { halign: 'center' } }, { content: ' ', colSpan: 4, styles: { halign: 'center' } }],
            [{ content: ' ', colSpan: 5, styles: { halign: 'center' } }, { content: ' ', colSpan: 3, styles: { halign: 'center' } }, { content: ' ', colSpan: 4, styles: { halign: 'center' } }, { content: ' ', colSpan: 4, styles: { halign: 'center' } }],
            [{ content: 'En el caso de la devolución de aportes y ahorros dejo a salvo las normas que rigen el derecho sucesoral.', colSpan: 16 }],
            [{ content: 'DOCUMENTACIÓN REQUERIDA', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: '* Fotocopia de la cédula de ciudadanía del asociado por ambas caras.', colSpan: 16 }],
            [{ content: 'AUTORIZACIÓN DE DESCUENTO', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: 'Me permito autorizar a ustedes efectuar los siguientes descuentos de mi sueldo con destino al FONDO DE EMPLEADOS DE LA SABANA.\n1. La suma de $______________ por una sola vez, correspondiente a mi cuota de afiliación a la entidad.\n2. Descontar mensualmente el _____ % de mi sueldo básico a partir de la fecha, con ajuste por exceso o defecto a la cantidad del ciento próximo. De acuerdo a lo contemplado en el artículo 30 del estatuto vigente.\n3. La cuota mensual correspondiente al Fondo de Bienestar. La cual se podrá ajustar de acuerdo con lo que determine la Asamblea del Fondo de Empleados.\n4. Acepto de acuerdo con la ley los descuentos por nómina que determine la Asamblea de la Entidad y los ajustes respectivos.', colSpan: 16 }],
            [{ content: 'AUTORIZACIONES ESPECIALES', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: '1) Autorizo a FONSABANA a enviar los documentos correspondientes, ya sea extractos, rendimientos de cuentas, u otra información relacionada con el manejo de mis productos o servicios, o cualquier información que considere pertinente, por correo electrónico a la cuenta registrada en el formulario de afiliación o a la dirección de notificación registrada en el presente formulario o a la que indique por comunicación escrita. Manifiesto que estas son direcciones válidas, reales y me comprometo a actualizar la información de contacto aquí relacionada cada vez que cambie o cuando me sea solicitado. 2) Autorizo a todas las áreas de FONSABANA, para el desarrollo de su actividad comercial, a recolectar, recaudar, almacenar, usar, circular, suprimir, procesar, compilar, intercambiar, dar tratamiento, actualizar y disponer de los datos que han sido suministrados y que se han incorporado a distintas bases o bancos de datos, o en repositorios electrónicos de todo tipo con los que cuenta FONSABANA.3) Autorizo a FONSABANA, para que reporte, procese, solicite y consulte mi información comercial y financiera en las centrales de riesgo que para tales efectos cumplan con dicha labor, así como la de mi representante legal, apoderado y/u ordenante. 4) Autorizo a FONSABANA a compartir mi información comercial y financiera a terceros con los cuales posea un vínculo contractual de cualquier índole, siempre y cuando estos terceros cuenten con los medios electrónicos y controles idóneos para brindar seguridad a la información, y siempre que el tratamiento que estos terceros le den a la información esté relacionado con las actividades que correspondan a la gestión de la entidad. 5) Autorizo a cancelar los productos o servicios que mantenga en FONSABANA, en caso de infracción de cualquiera de los numerales contenidos en este documento, eximiendo a FONSABANA de toda responsabilidad que se derive por información errónea, falsa o inexacta que yo hubiere proporcionado en este documento o de violación del mismo. 6) Declaro que conozco y cumpliré las normas que obligan a actualizar mis datos personales e información financiera al menos una vez por año. 7) No admitiré que terceros efectúen depósitos a mis productos con recursos provenientes de actividades ilícitas contempladas en el Código Penal Colombiano o en cualquier norma que lo modifique o adicione, ni efectuaré transacciones o actividades a favor de personas relacionadas con las mismas. 8) Conozco que los canales establecidos para ejercer en cualquier momento los derechos que me asisten, en especial: conocer la información, solicitar la actualización, rectificación y/o supresión o revocar el consentimiento otorgado para el tratamiento de datos personales, será a través de: forma personal, comunicación escrita o al correo electrónico fonsabana@fonsabana.com.co. 9) Declaro que los recursos que se deriven de la relación comercial entre FONSABANA y yo no se destinarán a la financiación del terrorismo, grupos terroristas o actividades terroristas. 10) Declaro que no he sido declarado responsable jurídicamente por la comisión de delitos contra la administración pública cuya pena sea privación de la libertad o que afecten el patrimonio del estado o por delitos relacionados con la pertenencia, promoción o financiación de grupos ilegales, delitos de lesa humanidad, narcotráfico en Colombia o en el exterior, o soborno trasnacional. ', colSpan: 16 }],
            [{ content: 'DECLARACIÓN DE ORIGEN DE FONDOS', styles: { fillColor: [200, 200, 200], halign: 'center' }, colSpan: 16 }],
            [{ content: 'Declaro bajo la gravedad de juramento que los recursos que entrego no provienen de ninguna actividad ilícita de las contempladas en el Código Penal Colombiano o en cualquier norma que lo modifique o adicione. \nLos recursos que entrego provienen de las siguientes fuentes:\nSalarios y remuneraciones_____ Honorarios_____ Pensión _____ Actividad Económica ______ Otros______ Cuales ? ________________________________________________\nSe hace constar que la presente autorización no constituye por parte de FONSABANA acto contrario a la ley y que, en su correcta utilización, de acuerdo con lo previsto en este documento, no es en ningún caso violatoria de mis derechos constitucionales o legales o de los cuales quiera de los autorizados u ordenantes registrados. ', colSpan: 16 }],
            [{ content: 'Al presentar esta solicitud de ingreso al Fondo de Empleados, declaro que acepto y me someto a los Estatutos y Reglamentos del Fondo de Empleados de La Sabana\n\nPor ello firmo a los ______ días del mes de ________________ del año __________.', colSpan: 16 }],
            // ...
        ],
    })

    function getSelected(name) {
        var radios = $('input[name=' + name + ']');
        for (var i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                // do whatever you want with the checked radio
                return radios[i].value;

                // only one radio can be logically checked, don't check the rest
                break;
            }
        }
    }

    doc.save('table.pdf')
}
var UrlGetFacturas = 'http://localhost:90/G7_20/controller/Facturas_Clientes.php?op=Getfacturas';
var UrlPostFacturas = 'http://localhost:90/G7_20/controller/Facturas_Clientes.php?op=GetFacturacliente';
var InsertPostFacturas = 'http://localhost:90/G7_20/controller/Facturas_Clientes.php?op=InsertFactura'
var facturaDelete = 'http://localhost:90/G7_20/controller/Facturas_Clientes.php?op=Deletefactura'
var actualizarFactura = 'http://localhost:90/G7_20/controller/Facturas_Clientes.php?op=UpdateFactura'
var verFacturaUrl = 'http://localhost:90/G7_20/controller/Facturas_Clientes.php?op=GetFacturacliente'

const form_factura = document.getElementById('form_factura')
const form_factura_edit = document.getElementById('form_factura_edit')
const btnCerrarFormVer = document.getElementById('btnCerrarFormVer')


$(document).ready(function() {
    CargarFacturas();
});

//  Cargar todos los datos
function CargarFacturas() {
    $.ajax({
        url: UrlGetFacturas,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse) {
            var MiItems = reponse;
            var Valores = '';

            for (i = 0; i < MiItems.length; i++) {

                Valores += '<tr>' +
                    '<td>' + MiItems[i].ID + '</td>' +
                    '<td>' + MiItems[i].NUMERO_FACTURA + '</td>' +
                    '<td>' + MiItems[i].ID_SOCIO + '</td>' +
                    '<td>' + MiItems[i].FECHA_FACTURA + '</td>' +
                    '<td>' + MiItems[i].DETALLE + '</td>' +
                    '<td>' + MiItems[i].SUB_TOTAL + '</td>' +
                    '<td>' + MiItems[i].TOTAL_ISV + '</td>' +
                    '<td>' + MiItems[i].TOTAL + '</td>' +
                    '<td>' + MiItems[i].FECHA_VENCIMIENTO + '</td>' +
                    '<td>' + MiItems[i].ESTADO + '</td>' +
                    '<td>' + `<button class="btn btn-danger" data-id=${MiItems[i].ID} onclick=eliminarUsuario(${MiItems[i].ID})>Eliminar</button>` + '</td>' +
                    '<td>' + `<button type="button" class="btn btn-warning" data-bs-toggle="modal" data-bs-target="#exampleModal" data-id=${MiItems[i].ID}>Editar</button>` + '</td>' +
                    '<td>' + `<button type="button" class="btn btn-success" data-bs-toggle="modal" data-bs-target="#exampleModalVer" onclick=verFactura(${MiItems[i].ID}) data-id=${MiItems[i].ID}>Ver</button>` + '</td>' +

                    '</tr>';

                $('.Facturas').html(Valores);
            }
        }
    });
}


// Agregar un usuario
form_factura.addEventListener('submit', e => {
    e.preventDefault()

    var datosFacturas = {
        ID: $('#ID').val(),
        NUMERO_FACTURA: $('#NUMERO_FACTURA').val(),
        ID_SOCIO: $('#ID_SOCIO').val(),
        FECHA_FACTURA: $('#FECHA_FACTURA').val(),
        DETALLE: $('#DETALLE').val(),
        SUB_TOTAL: $('#SUB_TOTAL').val(),
        TOTAL_ISV: $('#TOTAL_ISV').val(),
        TOTAL: $('#TOTAL').val(),
        FECHA_VENCIMIENTO: $('#FECHA_VENCIMIENTO').val(),
        ESTADO: $('#ESTADO').val()
    };


    var datosFacturasjson = JSON.stringify(datosFacturas);
    $.ajax({
        url: InsertPostFacturas,
        type: 'POST',
        data: datosFacturasjson,
        dataType: 'JSON',
        "Content-Type": 'application/json',
        success: function(reponse) {
            console.log(reponse);
        },
        error: function() {
            alert('Error al crear Factura');
        }
    });
    alert('Factura agregada exitosamente');
    location.reload() // Recargar pagina
})


// Actualizar Usuario
form_factura_edit.addEventListener('submit', e => {
    e.preventDefault()

    const datosFacturas = {
        ID: $('#ID_EDIT').val(),
        NUMERO_FACTURA: $('#NUMERO_FACTURA_EDIT').val(),
        ID_SOCIO: $('#ID_SOCIO_EDIT').val(),
        FECHA_FACTURA: $('#FECHA_FACTURA_EDIT').val(),
        DETALLE: $('#DETALLE_EDIT').val(),
        SUB_TOTAL: $('#SUB_TOTAL_EDIT').val(),
        TOTAL_ISV: $('#TOTAL_ISV_EDIT').val(),
        TOTAL: $('#TOTAL_EDIT').val(),
        FECHA_VENCIMIENTO: $('#FECHA_VENCIMIENTO_EDIT').val(),
        ESTADO: $('#ESTADO_EDIT').val()
    };

    const datosFacturasjson = JSON.stringify(datosFacturas);
    console.log(datosFacturas)

    $.ajax({
        url: actualizarFactura,
        type: 'PUT',
        data: datosFacturasjson,
        dataType: 'JSON',
        "Content-Type": 'application/json',
        success: function(reponse) {
            console.log(reponse);
        },
        error: function() {
            alert('Error al actualizar Factura');
        }
    });
    alert('Factura actualizada exitosamente');
    location.reload() // Recargar pagina


})


// Eliminar Usuarios
function eliminarUsuario(idUsuario) {
    const idUser = {
        ID: idUsuario
    }

    var idDelUser = JSON.stringify(idUser);
    // console.log(typeof idUsuario)
    // console.log(idDelUser)
    // console.log(typeof idDelUser);
    $.ajax({
        url: facturaDelete,
        type: 'DELETE',
        data: idDelUser,
        dataType: 'JSON',
        "Content-Type": 'application/json',
        success: function(reponse) {
            console.log(reponse);
        },
        error: function() {
            alert('Error al eliminar Factura');
        }
    });
    alert('Factura eliminada exitosamente');
    location.reload() // Recargar pagina
}


function verFactura(idUsuario) {
    const idUser = {
        ID: idUsuario
    }

    var idDelUser = JSON.stringify(idUser);

    // console.log(idUser)

    $.ajax({
        url: verFacturaUrl,
        type: 'POST',
        data: idDelUser,
        dataType: 'JSON',
        "Content-Type": 'application/json',
        success: function(reponse) {
            // console.log(typeof reponse);
            // console.log(reponse)
            const { DETALLE, ESTADO, FECHA_FACTURA, FECHA_VENCIMIENTO, ID, ID_SOCIO, NUMERO_FACTURA, SUB_TOTAL, TOTAL, TOTAL_ISV } = reponse[0]

            // Programar aqui
            const ID_VER = document.getElementById('ID_VER')
            const NUMERO_FACTURA_VER = document.getElementById('NUMERO_FACTURA_VER')
            const ID_SOCIO_VER = document.getElementById('ID_SOCIO_VER')
            const FECHA_FACTURA_VER = document.getElementById('FECHA_FACTURA_VER')
            const DETALLE_VER = document.getElementById('DETALLE_VER')
            const SUB_TOTAL_VER = document.getElementById('SUB_TOTAL_VER')
            const TOTAL_ISV_VER = document.getElementById('TOTAL_ISV_VER')
            const TOTAL_VER = document.getElementById('TOTAL_VER')
            const FECHA_VENCIMIENTO_VER = document.getElementById('FECHA_VENCIMIENTO_VER')
            const ESTADO_VER = document.getElementById('ESTADO_VER')

            // DETALLE_VER.textContent = DETALLE

            // Agregar datos
            ID_VER.value = ID
            NUMERO_FACTURA_VER.value = NUMERO_FACTURA
            ID_SOCIO_VER.value = ID_SOCIO
            FECHA_FACTURA_VER.value = FECHA_FACTURA
            DETALLE_VER.value = DETALLE
            SUB_TOTAL_VER.value = SUB_TOTAL
            TOTAL_ISV_VER.value = TOTAL_ISV
            TOTAL_VER.value = TOTAL
            FECHA_VENCIMIENTO_VER.value = FECHA_VENCIMIENTO
            ESTADO_VER.value = ESTADO

        },
        error: function() {
            alert('Error al ver Factura');
        }
    });
    // alert('Factura eliminada exitosamente');
    // location.reload() // Recargar pagina

}

function limpiarFormVer() {
    ID_VER.value = ''
    NUMERO_FACTURA_VER.value = ''
    ID_SOCIO_VER.value = ''
    FECHA_FACTURA_VER.value = ''
    DETALLE_VER.value = ''
    SUB_TOTAL_VER.value = ''
    TOTAL_ISV_VER.value = ''
    TOTAL_VER.value = ''
    FECHA_VENCIMIENTO_VER.value = ''
    ESTADO_VER.value = ''
}

btnCerrarFormVer.addEventListener('click', e => {
    // console.log('aw')
    limpiarFormVer()
        // form_factura_edit.reset();

})





// qwe
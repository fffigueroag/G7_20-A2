//DECLARACION DE VARIABLES
var UrlPedidos = 'http://52.152.236.67:90/G7_20/controller/Pedidos_Proveedor.php?op=GetPedidos';
var UrlPostPedidos = 'http://52.152.236.67:90/G7_20/controller/Pedidos_Proveedor.php?op=InsertPedido';
var UrlGetUno = 'http://52.152.236.67:90/G7_20/controller/Pedidos_Proveedor.php?op=GetUno';
var UrlPutPedidos = 'http://52.152.236.67:90/G7_20/controller/Pedidos_Proveedor.php?op=UpdatePedido';
var UrlDelPedidos = 'http://52.152.236.67:90/G7_20/controller/Pedidos_Proveedor.php?op=deletePedido';

//FUNCION 
$(document).ready(function(){
CargarPedidosProveedor();
});

function CargarPedidosProveedor(){
    $.ajax({
        url: UrlPedidos,
        type: 'GET',
        dataType: 'JSON',
        success: function(reponse){
            var MiItems = reponse;
            var Valores='';

            for( i=0; i < MiItems.length; i++){
                Valores += '<tr>'+
                    '<td>'+ MiItems[i].ID +'</td>'+
                    '<td>'+ MiItems[i].ID_SOCIO +'</td>'+
                    '<td>'+ MiItems[i].FECHA_PEDIDO +'</td>'+
                    '<td>'+ MiItems[i].DETALLE +'</td>'+
                    '<td>'+ MiItems[i].SUB_TOTAL +'</td>'+
                    '<td>'+ MiItems[i].TOTAL_ISV +'</td>'+
                    '<td>'+ MiItems[i].TOTAL +'</td>'+
                    '<td>'+ MiItems[i].FECHA_ENTREGA +'</td>'+
                    '<td>'+ MiItems[i].ESTADO +'</td>'+
                    '<td>'+ 
                    '<button class="btn btn-outline-secondary" onclick="CargarPedidoID('+ MiItems[i].ID +')">Editar</button>'+ 
                    '<button class="btn btn-outline-danger" onclick="EliminarPedido('+ MiItems[i].ID +')">Eliminar</button>'
                    '</td>'+ 
                '</tr>'; 
                $('.Pedidos').html(Valores);
            }
        }
    });
}

function AgregarPedido(){
    var datospedidos={
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
        ESTADO:$('#ESTADO').val()
    };
    var datospedidosjson = JSON.stringify(datospedidos);

    $.ajax({
        url: UrlPostPedidos,
        type: 'POST',
        data: datospedidosjson,
        dataType: 'JSON',
        contenttype: 'application/json',
        success: function(reponse){
            console.log(reponse)
        },
        error: function(){
            alert('Error al agregar nuevo pedido')
        }        
    });
    alert('Pedido agregado exitosamente');
}

function CargarPedidoID(idpedido){ 
    var datospedidos = { 
        ID: idpedido 
    } 
    var datospedidosjson = JSON.stringify(datospedidos); 

    $.ajax({ 
        url: UrlGetUno, 
        type: 'POST', 
        data: datospedidosjson, 
        datatype: 'application/json', 
        success:function(response)
        { 
            var MiItems = response 
            $('#ID_SOCIO').val(MiItems[0].ID_SOCIO); 
            $('#FECHA_PEDIDO').val(MiItems[0].FECHA_PEDIDO); 
            $('#DETALLE').val(MiItems[0].DETALLE); 
            $('#SUB_TOTAL').val(MiItems[0].SUB_TOTAL); 
            $('#TOTAL_ISV').val(MiItems[0].TOTAL_ISV); 
            $('#TOTAL').val(MiItems[0].TOTAL); 
            $('#FECHA_ENTREGA').val(MiItems[0].FECHA_ENTREGA); 
            $('#ESTADO').val(MiItems[0].ESTADO); 
            
            var btnactualizar= '<input type="submit" id="btnactualizar" onclick="ActualizarPedido('+ MiItems[0].ID +')"' + 
            'value="Actualizar pedido" class="btn btn-primary"></input>'; 
            $('.btnpedido').html(btnactualizar); 
        } 
    });
}

function ActualizarPedido(idpedido){
    var datospedidos = {
        ID: idpedido,
        ID_SOCIO:$('#ID_SOCIO').val(),
        FECHA_PEDIDO:$('#FECHA_PEDIDO').val(),
        DETALLE:$('#DETALLE').val(),
        SUB_TOTAL:$('#SUB_TOTAL').val(),
        TOTAL_ISV:$('#TOTAL_ISV').val(),
        TOTAL:$('#TOTAL').val(),
        FECHA_ENTREGA:$('#FECHA_ENTREGA').val(),
        ESTADO:$('#ESTADO').val(),
    };
    var datospedidosjson = JSON.stringify(datospedidos);

    $.ajax({
        url: UrlPutPedidos,
        type: 'PUT',
        data: datospedidosjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response)
        }
    });
    alert("Pedido Actualizado Exitosamente");
}

function EliminarPedido(idpedido){
    var datospedidos = {
        ID: idpedido
    };
    var datospedidosjson = JSON.stringify(datospedidos);

    $.ajax({
        url: UrlDelPedidos,
        type: 'DELETE',
        data: datospedidosjson,
        dataType: 'JSON',
        contentType: 'application/json',
        success: function(reponse){
            console.log(reponse);
        }
    });
    alert("Pedido Eliminado Exitosamente");
}
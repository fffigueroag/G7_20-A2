var UrlMateriales = 'http://52.152.236.67:90/G7_20/controller/Materiales.php?op=GetMaterials';
var UrlPostMaterial= 'http://52.152.236.67:90/G7_20/controller/Materiales.php?op=InsertMaterial';
var UrlMaterialId= 'http://52.152.236.67:90/G7_20/controller/Materiales.php?op=GetMaterial';
var UrlPutMaterial= 'http://52.152.236.67:90/G7_20/controller/Materiales.php?op=UpdateMaterial';
var UrlDeleteMaterial= 'http://52.152.236.67:90/G7_20/controller/Materiales.php?op=DeleteMaterial';

$(document). ready(function(){
    CargarMaterial();
});

function CargarMaterial(){
    $.ajax({
        url: UrlMateriales,
        type: 'GET',
        datatype: 'JSON',
        success: function(reponse){
            var MiItems= reponse ;
            var Valores= '';

            for(i=0; i < MiItems.length; i++){ 
                Valores +=    '<tr>'+
                '<td>'+ MiItems[i].ID +'</td>'+
                '<td>'+ MiItems[i].DESCRIPCION +'</td>'+
                '<td>'+ MiItems[i].UNIDAD+'</td>'+
                '<td>'+ MiItems[i].COSTO +'</td>'+
                '<td>'+ MiItems[i].PRECIO +'</td>'+
                '<td>'+ MiItems[i].APLICA_ISV +'</td>'+
                '<td>'+ MiItems[i].PORCENTAJE_ISV +'</td>'+
                '<td>'+ MiItems[i].ESTADO +'</td>'+
                '<td>'+ MiItems[i].ID_SOCIO +'</td>'+
                '<td>'+
                '<button class="btn btn-success" onclick="CargarMaterialid('+ MiItems[i].ID +')">Editar</button>'+
                '<button class="btn btn-danger"  onclick="EliminarMaterial('+ MiItems[i].ID +')">Eliminar</button>'+ 
                '</td>'+
             '</tr>';
             $('.Materiales').html(Valores);
            }


        }
    });
}

function AgregarMaterial(){
    var datosmaterial={
        DESCRIPCION:$('#DESCRIPCION').val(),
        UNIDAD:$('#UNIDAD').val(),
        COSTO:$('#COSTO').val(),
        PRECIO:$('#PRECIO').val(),
        APLICA_ISV:$('#APLICA_ISV').val(),
        PORCENTAJE_ISV:$('#PORCENTAJE_ISV').val(),
        ESTADO:$('#ESTADO').val(),
        ID_SOCIO:$('#ID_SOCIO').val()
    };
    var datosmaterialjson= JSON.stringify(datosmaterial);
    $.ajax({
        url: UrlPostMaterial,
        type: 'POST',
        data: datosmaterialjson,
        dataType: 'JSON',
        contenttype:'application/json',
        success: function(reponse){
            console.log(reponse);
        },
        error: function(){
            alert('Error al crear Material');
        }
    });
    alert('Material agregado exitosamente');
}

function CargarMaterialid(idmaterial){
    var datosmaterial ={
        ID:idmaterial
    };
    var datosmaterialjson= JSON.stringify(datosmaterial);

    $.ajax({
        url: UrlMaterialId,
        type: 'POST',
        data: datosmaterialjson,
        dataType: 'JSON',
        contenttype:'application/json',
        success: function(response){
         var MiItems= response;
         $('#DESCRIPCION').val(MiItems[0].DESCRIPCION);
         $('#UNIDAD').val(MiItems[0].UNIDAD);
         $('#COSTO').val(MiItems[0].COSTO);
         $('#PRECIO').val(MiItems[0].PRECIO);
         $('#APLICA_ISV').val(MiItems[0].APLICA_ISV);
         $('#PORCENTAJE_ISV').val(MiItems[0].PORCENTAJE_ISV);
         $('#ESTADO').val(MiItems[0].ESTADO);
         $('#ID_SOCIO').val(MiItems[0].ID_SOCIO);
         var btnactualizar = '<input type="submit" id="btn_actualizar" onclick="ActualizarMaterial(' + MiItems[0].ID + ')"'+ 
         'value="Actualizar Material" class="btn btn-primary"></input>';
         $('.btnmaterial').html(btnactualizar);
         var lblactualizar ='<label for="">Actualizar Materiales</label>'
            $(' #22').html(lblactualizar);
        

        }
    });
}

function ActualizarMaterial(idmaterial){
    var datosmaterial = {
        ID: idmaterial,
        DESCRIPCION:$('#DESCRIPCION').val(),
        UNIDAD:$('#UNIDAD').val(),
        COSTO:$('#COSTO').val(),
        PRECIO:$('#PRECIO').val(),
        APLICA_ISV:$('#APLICA_ISV').val(),
        PORCENTAJE_ISV:$('#PORCENTAJE_ISV').val(),
        ESTADO:$('#ESTADO').val(),
        ID_SOCIO:$('#ID_SOCIO').val(),
    };
    var datosmaterialjson= JSON.stringify(datosmaterial);

    $.ajax({
        url: UrlPutMaterial,
        type: 'PUT',
        data: datosmaterialjson,
        datatype: 'JSON',
        contentType: 'application/json',
        success: function(response){
            console.log(response)
        }
    });
    alert("El Material se ha Actualizado");
}

function EliminarMaterial(idmaterial) {
    var datosmaterial = {
        ID: idmaterial
    };
    var datosmaterialjson = JSON.stringify(datosmaterial);

    $.ajax({
        url: UrlDeleteMaterial,
        type: 'DELETE',
        data: datosmaterialjson,
        datatype: 'JSON',
        contentType: 'application/json',
  
        success: function(response) {
            console.log(response)
        }
    });
    alert("El Material ha sido Eliminado");
}

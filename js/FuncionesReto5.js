function traerInformacionCategory() {
    $.ajax({
        url: "http://150.230.72.66:8080/api/Category/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            obtenerDatosCategory(respuesta);
        }
    });
}

function obtenerDatosCategory(respuesta) {
    let tablaCategory = "<table border='1px solid' width='500px' style='margin-left:50%'>";
    tablaCategory += "<thead>" + "<tr>" + "<th>Nombre</th>" + "<th>Descripción</th>" + "</tr>" + "</thead>" + "<tbody>";
    for (i = 0; i < respuesta.length; i++) {
        tablaCategory += "<tr>";
        tablaCategory += "<td id=''>" + respuesta[i].name + "</td>";
        tablaCategory += "<td>" + respuesta[i].description + "</td>";
        tablaCategory += "<td>" + "<button onclick='borrarCategoria(" + respuesta[i].id + ")'>Borrar</button>" + "</td>";
        tablaCategory += "<td>" + "<button onclick='seleccionarCategoria(" + respuesta[i].id + ")' style='margin-left:auto; margin-right:auto;'>Actualizar</button>" + "</td>";
        tablaCategory += "</tr>";
    }
    tablaCategory += "</tbody>";
    tablaCategory += "</table>";
    $("#resultadoC").html(tablaCategory);
}

function guardarInformacionCategory() {
    let nuevo = {
        name: $("#nameC").val(),
        description: $("#descriptionC").val(),
    };
    if (nuevo.name == "" || nuevo.description == "") {
        alert("Todos los campos son obligatorios");
    } else {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "JSON",
            data: JSON.stringify(nuevo),
            url: "http://150.230.72.66:8080/api/Category/save",
            success: function (respuesta) {
                console.log(respuesta);
                alert("Se ha agregado nueva categoría");
                traerInformacionCategory();
                window.location.reload()
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");

            }
        });
    }

}

function seleccionarCategoria(id) {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        url: "http://150.230.72.66:8080/api/Category/" + id,
        success: function (respuesta) {
            console.log(respuesta);
            document.getElementById("idC").innerHTML = respuesta.id;
            $("#nameC").val(respuesta.name);
            $("#descriptionC").val(respuesta.description);
        }
    });
}

function editarInformacionCategory() {
    let nuevo = {
        id: document.getElementById("idC").innerHTML,
        name: $("#nameC").val(),
        description: $("#descriptionC").val(),
    };
    console.log(nuevo);
    if (nuevo.name == "" || nuevo.description == "") {
        alert("Todos los campos son obligatorios");
    } else {
        $.ajax({
            type: "PUT",
            contentType: "application/json; charset=utf-8",
            datatype: "JSON",
            data: JSON.stringify(nuevo),
            url: "http://150.230.72.66:8080/api/Category/update",
            success: function (respuesta) {
                console.log(respuesta);
                alert("Se ha actualizado la categoría");
                window.location.reload();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se actualizó correctamente");

            }
        });
    }

}

function borrarCategoria(id) {
    let categoria = {
        id: id
    };
    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(categoria),
        url: "http://150.230.72.66:8080/api/Category/" + id,
        success: function (respuesta) {
            console.log(respuesta);
            alert("Se ha eliminado la categoría");
            traerInformacionCategory();
            window.location.reload()
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se eliminó correctamente");

        }
    });
}

function traerInformacionBarco() {
    $.ajax({
        url: "http://150.230.72.66:8080/api/Boat/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            obtenerDatosBarco(respuesta);
        }
    });
}

function obtenerDatosBarco(respuesta) {
    let tablaBarco = "<table border='1px solid' width='500px' style='margin-left:50%'>";
    tablaBarco += "<thead>" + "<tr>" + "<th>Nombre</th>" + "<th>Marca</th>" + "<th>Modelo</th>" + "<th>Descripción</th>"+ "<th>Categoría</th>" + "</tr>" + "</thead>" + "<tbody>";
    for (i = 0; i < respuesta.length; i++) {
        tablaBarco += "<tr>";
        tablaBarco += "<td>" + respuesta[i].name + "</td>";
        tablaBarco += "<td>" + respuesta[i].brand + "</td>";
        tablaBarco += "<td>" + respuesta[i].year + "</td>";
        tablaBarco += "<td>" + respuesta[i].description + "</td>";
        tablaBarco += "<td>" + respuesta[i].category.name + "</td>";
        tablaBarco += "<td>" + "<button onclick='borrarElementoBarco(" + respuesta[i].id + ")'>Borrar</button>" + "</td>";
        tablaBarco += "<td>" + "<button onclick='seleccionarBarco(" + respuesta[i].id + ")' style='margin-left:auto; margin-right:auto;'>Actualizar</button>" + "</td>";
        tablaBarco += "</tr>";
    }
    tablaBarco += "</tbody>";
    tablaBarco += "</table>";
    $("#resultadoB").html(tablaBarco);
}

function guardarInformacionBarco() {
    let nuevo = {
        brand: $("#brand").val(),
        year: $("#model").val(),
        description: $("#descriptionB").val(),
        name: $("#nameB").val(),
        category:{id: +$("#select-category").val()},
    };
    if (nuevo.brand == "" || nuevo.year == "" || nuevo.description == "" || nuevo.name == "") {
        alert("Todos los campos son obligatorios")
    } else {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "JSON",
            data: JSON.stringify(nuevo),
            url: "http://150.230.72.66:8080/api/Boat/save",
            success: function (respuesta) {
                console.log(respuesta);
                alert("Se ha agregado nuevo barco");
                window.location.reload()
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");

            }
        });
    }

}

function seleccionarBarco(id) {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        url: "http://150.230.72.66:8080/api/Boat/" + id,
        success: function (respuesta) {
            console.log(respuesta);
            document.getElementById("idB").innerHTML = respuesta.id;
            $("#nameB").val(respuesta.name);
            $("#brand").val(respuesta.brand),
            $("#model").val(respuesta.year),
            $("#descriptionB").val(respuesta.description);
        }
    });
}

function editarInformacionBarco() {

    let nuevo = {
        id: document.getElementById("idB").innerHTML,
        name: $("#nameB").val(),
        brand: $("#brand").val(),
        year: $("#model").val(),
        description: $("#descriptionB").val(),
        category:{id: +$("#select-category").val()},
    };
    if (nuevo.name == "" || nuevo.description == "" || nuevo.brand == "" || nuevo.year == "") {
        alert("Todos los campos son obligatorios");
    } else {
        $.ajax({
            type: "PUT",
            contentType: "application/json; charset=utf-8",
            datatype: "JSON",
            data: JSON.stringify(nuevo),
            url: "http://150.230.72.66:8080/api/Boat/update",
            success: function (respuesta) {
                console.log(respuesta);
                alert("Se ha actualizado el barco");
                window.location.reload();
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se actualizó correctamente");

            }
        });
    }

}

function borrarElementoBarco(id) {
    let barco = {
        id: id
    };
    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(barco),
        url: "http://150.230.72.66:8080/api/Boat/" + id,
        success: function (respuesta) {
            console.log(respuesta);
            alert("Se ha eliminado el barco");
            window.location.reload()
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se eliminó correctamente");

        }
    });
}

function traerInformacion() {
    $.ajax({
        url: "http://150.230.72.66:8080/api/Client/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            obtenerDatosCliente(respuesta);
        }
    });
}

function obtenerDatosCliente(respuesta) {
    let tablaCliente = "<table border='1px solid' width='500px' style='margin-left:50%'>";
    tablaCliente += "<thead>" + "<tr>" + "<th>Nombre</th>" + "<th>Email</th>" + "<th>Edad</th>" + "</tr>" + "</thead>" + "<tbody>";
    for (i = 0; i < respuesta.length; i++) {
        tablaCliente += "<tr>";
        tablaCliente += "<td>" + respuesta[i].name + "</td>";
        tablaCliente += "<td>" + respuesta[i].email + "</td>";
        tablaCliente += "<td>" + respuesta[i].age + "</td>";
        tablaCliente += "<td>" + "<button onclick='borrarElemento(" + respuesta[i].idClient + ")' style='margin-left:auto; margin-right:auto;'>Borrar</button>" + "</td>";
        tablaCliente += "<td>" + "<button onclick='seleccionar(" + respuesta[i].idClient + ")' style='margin-left:auto; margin-right:auto;'>Actualizar</button>" + "</td>";
        tablaCliente += "</tr>";
    }
    tablaCliente += "</tbody>";
    tablaCliente += "</table>";
    $("#resultado").html(tablaCliente);
}

function guardarInformacion() {
    let nuevo = {
        name: $("#name").val(),
        email: $("#email").val(),
        age: $("#age").val(),
        password: $("#passwordC").val(),
    };
    if (nuevo.name == "" || nuevo.email == "" || nuevo.password == "" || nuevo.age == "") {
        alert("Todos los campos son obligatorios")
    } else {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "JSON",
            data: JSON.stringify(nuevo),
            url: "http://150.230.72.66:8080/api/Client/save",
            success: function (respuesta) {
                console.log(respuesta);
                alert("Se ha agregado nuevo cliente");
                traerInformacion();
                window.location.reload()
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");

            }
        });
    }

}

function seleccionar(id) {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        url: "http://150.230.72.66:8080/api/Client/" + id,
        success: function (respuesta) {
            console.log(respuesta);
            document.getElementById("id").innerHTML = respuesta.idClient;
            $("#name").val(respuesta.name);
            $("#email").val(respuesta.email);
            $("#passwordC").val(respuesta.password);
            $("#age").val(respuesta.age);
        }
    });
}

function editarInformacion(){
    let nuevo ={
        idClient: document.getElementById("id").innerHTML,
        name: $("#name").val(),
        email: $("#email").val(),
        age: $("#age").val(),
        password: $("#passwordC").val(),
    };
    console.log(nuevo);
    if (nuevo.name == "" || nuevo.email == "" || nuevo.password == "" || nuevo.age == "") {
        alert("Todos los campos son obligatorios");
    }else{
        $.ajax({
            type:"PUT",
            contentType: "application/json; charset=utf-8",
            datatype:"JSON",
            data: JSON.stringify(nuevo),
            url:"http://150.230.72.66:8080/api/Client/update",
            success:function(respuesta){
                console.log(respuesta);
                alert("Se ha actualizado el cliente");
                window.location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
              alert("No se actualizó correctamente");
    
            }
        });
    }
    
}

function borrarElemento(id) {
    let cliente = {
        id: id
    };
    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(cliente),
        url: "http://150.230.72.66:8080/api/Client/" + id,
        success: function (respuesta) {
            console.log(respuesta);
            alert("Se ha eliminado el cliente");
            window.location.reload()
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se eliminó correctamente");

        }
    });
}

function traerInformacionMensaje() {
    $.ajax({
        url: "http://150.230.72.66:8080/api/Message/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            obtenerDatosMensaje(respuesta);
        }
    });
}

function obtenerDatosMensaje(respuesta) {
    let tablaMensaje = "<table border='1px solid' width='500px' style='margin-left:50%'>";
    tablaMensaje += "<thead>" + "<tr>" + "<th>Mensaje</th>" + "<th>Cliente</th>"+ "<th>Barco</th>"+ "</tr>" + "</thead>" + "<tbody>";
    for (i = 0; i < respuesta.length; i++) {
        tablaMensaje += "<tr>";
        tablaMensaje += "<td>" + respuesta[i].messageText + "</td>";
        tablaMensaje += "<td>" + respuesta[i].client.name + "</td>";
        tablaMensaje += "<td>" + respuesta[i].boat.name + "</td>";
        tablaMensaje += "<td>" + "<button onclick='borrarElementoMensaje(" + respuesta[i].idMessage + ")'>Borrar</button>" + "</td>";
        tablaMensaje += "<td>" + "<button onclick='seleccionarMensaje(" + respuesta[i].idMessage + ")' style='margin-left:auto; margin-right:auto;'>Actualizar</button>" + "</td>";
        tablaMensaje += "</tr>";
    }
    tablaMensaje += "</tbody>";
    tablaMensaje += "</table>";
    $("#resultadoM").html(tablaMensaje);
}

function guardarInformacionMensaje() {
    let nuevo = {
        messageText: $("#m").val(),
        boat:{id: +$("#select-boatM").val()},
        client:{idClient: +$("#select-clientM").val()},
    };
    if (nuevo.messageText == "") {
        alert("Todos los campos son obligatorios")
    } else {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "JSON",
            data: JSON.stringify(nuevo),
            url: "http://150.230.72.66:8080/api/Message/save",
            success: function (respuesta) {
                console.log(respuesta);
                alert("Se ha agregado nuevo mensaje");
                traerInformacionMensaje();
                window.location.reload()
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");

            }
        });
    }

}

function seleccionarMensaje(id) {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        url: "http://150.230.72.66:8080/api/Message/" + id,
        success: function (respuesta) {
            console.log(respuesta);
            document.getElementById("idM").innerHTML = respuesta.idMessage;
            $("#m").val(respuesta.messageText);
        }
    });
}

function editarInformacionMensaje(){
    
    let nuevo ={
        idMessage: document.getElementById("idM").innerHTML,
        messageText:$("#m").val(),
    };
    if (nuevo.messageText == "") {
        alert("Todos los campos son obligatorios");
    }else{
        $.ajax({
            type:"PUT",
            contentType: "application/json; charset=utf-8",
            datatype:"JSON",
            data: JSON.stringify(nuevo),
            url:"http://150.230.72.66:8080/api/Message/update",
            success:function(respuesta){
                console.log(respuesta);
                alert("Se ha actualizado el mensaje");
                window.location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
              alert("No se actualizó correctamente");
    
            }
        });
    }
    
}

function borrarElementoMensaje(id) {
    let mensaje = {
        idMessage: id
    };
    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(mensaje),
        url: "http://150.230.72.66:8080/api/Message/" + id,
        success: function (respuesta) {
            console.log(respuesta);
            alert("Se ha eliminado el mensaje");
            window.location.reload()
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se eliminó correctamente");

        }
    });
}

function traerInformacionAdmin() {
    $.ajax({
        url: "http://150.230.72.66:8080/api/Admin/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            obtenerDatosAdmin(respuesta);
        }
    });
}

function obtenerDatosAdmin(respuesta) {
    let tablaAdmin = "<table border='1px solid' width='500px' style='margin-left:50%'>";
    tablaAdmin += "<thead>" + "<tr>" + "<th>Nombre</th>" + "<th>Email</th>" + "</tr>" + "</thead>" + "<tbody>";
    for (i = 0; i < respuesta.length; i++) {
        tablaAdmin += "<tr>";
        tablaAdmin += "<td>" + respuesta[i].nameAdmin + "</td>";
        tablaAdmin += "<td>" + respuesta[i].emailAdmin + "</td>";
        tablaAdmin += "<td>" + "<button onclick='borrarElementoAdmin(" + respuesta[i].idAdmin + ")'>Borrar</button>" + "</td>";
        tablaAdmin += "<td>" + "<button onclick='seleccionarAdmin(" + respuesta[i].idAdmin + ")' style='margin-left:auto; margin-right:auto;'>Actualizar</button>" + "</td>";
        tablaAdmin += "</tr>";
    }
    tablaAdmin += "</tbody>";
    tablaAdmin += "</table>";
    $("#resultadoA").html(tablaAdmin);
}

function guardarInformacionAdmin() {
    let nuevo = {
        nameAdmin: $("#nameA").val(),
        emailAdmin: $("#emailA").val(),
        passwordAdmin: $("#passwordA").val(),
    };
    if (nuevo.nameAdmin == "" || nuevo.passwordAdmin == "" || nuevo.emailAdmin == "") {
        alert("Todos los campos son obligatorios")
    } else {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "JSON",
            data: JSON.stringify(nuevo),
            url: "http://150.230.72.66:8080/api/Admin/save",
            success: function (respuesta) {
                console.log(respuesta);
                alert("Se ha agregado nuevo usuario");
                traerInformacionAdmin();
                window.location.reload()
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");

            }
        });
    }

}

function seleccionarAdmin(id) {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        url: "http://150.230.72.66:8080/api/Admin/" + id,
        success: function (respuesta) {
            console.log(respuesta);
            document.getElementById("idA").innerHTML = respuesta.idAdmin;
            $("#nameA").val(respuesta.nameAdmin);
            $("#emailA").val(respuesta.emailAdmin);
            $("#passwordA").val(respuesta.passwordAdmin);
        }
    });
}

function traerInformacionReserva() {
    $.ajax({
        url: "http://150.230.72.66:8080/api/Reservation/all",
        type: "GET",
        datatype: "JSON",
        success: function (respuesta) {
            console.log(respuesta);
            obtenerDatosReserva(respuesta);
        }
    });
}

function obtenerDatosReserva(respuesta) {
    let tablaReserva = "<table border='1px solid' width='700px' style='margin-left:35%'>";
    tablaReserva += "<thead>" + "<tr>" + "<th>ID</th>" + "<th>Fecha Inicio</th>" + "<th>Fecha Devolución</th>" + "<th>Status</th>" + "<th>Barco</th>"+ "<th>Cliente</th>"+ "</tr>" + "</thead>" + "<tbody>";
    for (i = 0; i < respuesta.length; i++) {
        tablaReserva += "<tr>";
        tablaReserva += "<td>" + respuesta[i].idReservation + "</td>";
        tablaReserva += "<td>" + respuesta[i].startDate + "</td>";
        tablaReserva += "<td>" + respuesta[i].devolutionDate + "</td>";
        tablaReserva += "<td>" + respuesta[i].status + "</td>";
        tablaReserva += "<td>" + respuesta[i].boat.name+"</td>";
        tablaReserva += "<td>" + respuesta[i].client.name+"</td>";
        tablaReserva += "<td>" + "<button onclick='borrarElementoReserva(" + respuesta[i].idReservation + ")'>Borrar</button>" + "</td>";
        tablaReserva += "<td>" + "<button onclick='seleccionarReserva(" + respuesta[i].idReservation + ")' style='margin-left:auto; margin-right:auto;'>Actualizar</button>" + "</td>";
        tablaReserva += "</tr>";
    }
    tablaReserva += "</tbody>";
    tablaReserva += "</table>";
    $("#resultadoR").html(tablaReserva);
}

function guardarInformacionReserva() {
    let nuevo = {
        startDate: $("#Sdate").val(),
        devolutionDate: $("#Edate").val(),
        status: $("#status").val(),
        boat:{id: +$("#select-boat").val()},
        client:{idClient: +$("#select-client").val()},
    };
    if (nuevo.startDate == "" || nuevo.devolutionDate == "") {
        alert("Todos los campos son obligatorios")
    } else {
        $.ajax({
            type: "POST",
            contentType: "application/json; charset=utf-8",
            datatype: "JSON",
            data: JSON.stringify(nuevo),
            url: "http://150.230.72.66:8080/api/Reservation/save",
            success: function (respuesta) {
                console.log(respuesta);
                alert("Se ha agregado nueva reserva");
                traerInformacionReserva();
                window.location.reload()
            },
            error: function (jqXHR, textStatus, errorThrown) {
                window.location.reload()
                alert("No se guardo correctamente");

            }
        });
    }

}

function seleccionarReserva(id) {
    $.ajax({
        type: "GET",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        url: "http://150.230.72.66:8080/api/Reservation/" + id,
        success: function (respuesta) {
            console.log(respuesta);
            document.getElementById("idR").innerHTML = respuesta.idReservation;
            $("#Sdate").val(respuesta.startDate);
            $("#Edate").val(respuesta.devolutionDate);
            $("#status").val(respuesta.status);

        }
    });
}

function editarInformacionReserva(){
    
    let nuevo ={
        idReservation: document.getElementById("idR").innerHTML,
        startDate:$("#Sdate").val(),
        devolutionDate:$("#Edate").val(),
        status:$("#status").val(),
        boat:{id: +$("#select-boat").val()},
        client:{idClient: +$("#select-client").val()},
    };
    if (nuevo.startDate == "" || nuevo.devolutionDate == "") {
        alert("Todos los campos son obligatorios");
    }else{
        $.ajax({
            type:"PUT",
            contentType: "application/json; charset=utf-8",
            datatype:"JSON",
            data: JSON.stringify(nuevo),
            url:"http://150.230.72.66:8080/api/Reservation/update",
            success:function(respuesta){
                console.log(respuesta);
                alert("Se ha actualizado la reserva");
                window.location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
              alert("No se actualizó correctamente");
    
            }
        });
    }
    
}

function borrarElementoReserva(id) {
    let reserva = {
        id: id
    };
    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(reserva),
        url: "http://150.230.72.66:8080/api/Reservation/" + id,
        success: function (respuesta) {
            console.log(respuesta);
            alert("Se ha eliminado la reserva");
            window.location.reload()
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se eliminó correctamente");

        }
    });
}

function editarInformacionAdmin(){
    let admin={
        idAdmin: document.getElementById("idA").innerHTML,
        nameAdmin: $("#nameA").val(),
        emailAdmin: $("#emailA").val(),
        passwordAdmin: $("#passwordA").val(),
    };
    console.log(admin)
    if(admin.nameAdmin == "" || admin.emailAdmin == "" || admin.passwordAdmin==""){
        alert("Todos los campos son obligatorios");
    }else{
        $.ajax({
            type:"PUT",
            contentType: "application/json; charset=utf-8",
            datatype:"JSON",
            data: JSON.stringify(admin),
            url:"http://150.230.72.66:8080/api/Admin/update",
            success:function(respuesta){
                console.log(respuesta);
                alert("Se ha actualizado el usuario");
                window.location.reload();
            },
            error: function(jqXHR, textStatus, errorThrown) {
                window.location.reload()
              alert("No se actualizó correctamente");
            }
        });
    }

}

function borrarElementoAdmin(id){
    let admin = {
        idAdmin: id
    };
    $.ajax({
        type: "DELETE",
        contentType: "application/json; charset=utf-8",
        datatype: "JSON",
        data: JSON.stringify(admin),
        url: "http://150.230.72.66:8080/api/Admin/" + id,
        success: function (respuesta) {
            console.log(respuesta);
            alert("Se ha eliminado el usuario");
            window.location.reload()
        },
        error: function (jqXHR, textStatus, errorThrown) {
            window.location.reload()
            alert("No se eliminó correctamente");

        }
    });
}

function traerReporteStatus(){
    console.log("test");
    $.ajax({
        url:"http://150.230.72.66:8080/api/Reservation/report-status",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuesta(respuesta);
        }
    });
}

function pintarRespuesta(respuesta){

    let myTable="<table border='1px solid' width='500px' style='margin-left:50%; margin-top:20px;'>";
    myTable+="<thead>" + "<tr>" + "<th>Completadas</th>" + "<th>Canceladas</th>"+ "</tr>" + "</thead>" + "<tbody>";;
        myTable+="<td>"+respuesta.completed+"</td>";
        myTable+="<td>"+respuesta.cancelled+"</td>";
        myTable+="</tr>";
    myTable+="</table>";
    $("#resultadoStatus").html(myTable);
}
function traerReporteDate(){

    var fechaInicio = document.getElementById("RstarDate").value;
    var fechaCierre = document.getElementById("RdevolutionDate").value;    
        $.ajax({
            url:"http://150.230.72.66:8080/api/Reservation/report-dates/"+fechaInicio+"/"+fechaCierre,
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaDate(respuesta);
            }
        });
}

function pintarRespuestaDate(respuesta){

        let myTable="<table border='1px solid' width='500px' style='margin-left:50%; margin-top:20px;'>";
        myTable+="<thead>" + "<tr>" + "<th>Fecha Inicio</th>" + "<th>Fecha Devolución</th>" + "<th>Status</th>" + "</tr>" + "</thead>" + "<tbody>";
          
        for(i=0;i<respuesta.length;i++){
            myTable+="<td>"+respuesta[i].startDate+"</td>";
            myTable+="<td>"+respuesta[i].devolutionDate+"</td>";
            myTable+="<td>"+respuesta[i].status+"</td>"; 
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoDate").html(myTable);
}

function traerReporteClientes(){
        $.ajax({
            url:"http://150.230.72.66:8080/api/Reservation/report-clients",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                pintarRespuestaClientes(respuesta);
            }
        });
}

function pintarRespuestaClientes(respuesta){

        let myTable="<table border='1px solid' width='700px' style='margin-left:35%; margin-top:20px;'>";
        myTable+= "<thead>" + "<tr>" + "<th>Total Reservas</th>" + "<th>Cliente</th>" + "<th>Correo</th>" + "<th>Edad</th>" +"</tr>" + "</thead>" + "<tbody>";
          
        for(i=0;i<respuesta.length;i++){
            myTable+="<td>"+respuesta[i].total+"</td>";
            myTable+="<td>"+respuesta[i].client.name+"</td>";
            myTable+="<td>"+respuesta[i].client.email+"</td>";
            myTable+="<td>"+respuesta[i].client.age+"</td>";
          
            myTable+="</tr>";
        }
        myTable+="</table>";
        $("#resultadoClientes").html(myTable);
}


function autoInicioRelacionCliente(){
    
        $.ajax({
            url:"http://150.230.72.66:8080/api/Client/all",
            type:"GET",
            datatype:"JSON",
            success:function(respuesta){
              
                let $select = $("#select-client");
                $.each(respuesta, function (id, name) {
                    $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
                
                }); 
            }
        
        })
}

function autoInicioBoat(){

    $.ajax({
        url:"http://150.230.72.66:8080/api/Boat/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
            let $select = $("#select-boat");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
         
            }); 
        }
    
    })
}

function autoInicioCategoria(){
    console.log("se esta ejecutando")
    $.ajax({
        url:"http://150.230.72.66:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    
    })
}

function autoInicioCliente(){
    
    $.ajax({
        url:"http://150.230.72.66:8080/api/Client/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
          
            let $select = $("#select-clientM");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.idClient+'>'+name.name+'</option>');
            
            }); 
        }
    
    })
}

function autoInicioBoatMensaje(){

    $.ajax({
        url:"http://150.230.72.66:8080/api/Boat/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
        
            let $select = $("#select-boatM");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
         
            }); 
        }
    
    })
}
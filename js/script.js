jQuery.validator.addMethod("cpf", function (value, element) {
    value = jQuery.trim(value);

    value = value.replace('.', '');
    value = value.replace('.', '');
    cpf = value.replace('-', '');
    while (cpf.length < 11)
        cpf = "0" + cpf;
    var expReg = /^0+$|^1+$|^2+$|^3+$|^4+$|^5+$|^6+$|^7+$|^8+$|^9+$/;
    var a = [];
    var b = new Number;
    var c = 11;
    for (i = 0; i < 11; i++) {
        a[i] = cpf.charAt(i);
        if (i < 9)
            b += (a[i] * --c);
    }
    if ((x = b % 11) < 2) {
        a[9] = 0
    } else {
        a[9] = 11 - x
    }
    b = 0;
    c = 11;
    for (y = 0; y < 10; y++)
        b += (a[y] * c--);
    if ((x = b % 11) < 2) {
        a[10] = 0;
    } else {
        a[10] = 11 - x;
    }

    var retorno = true;
    if ((cpf.charAt(9) != a[9]) || (cpf.charAt(10) != a[10]) || cpf.match(expReg))
        retorno = false;

    return this.optional(element) || retorno;

}, "Informe um CPF válido");

jQuery.validator.addMethod("veia", function (value, element) {
    //se existe rex
    if ((value != '') && (value.toLowerCase().indexOf("véia") == -1)) {
        return false
    }
    return true

}, "Cadê a véia, mano?");


$.validator.addMethod("dateBR", function (value, element) {
    if (value.length != 10) {
        return false;
    }
    return value.match(/^(0?[1-9]|[12][0-9]|3[01])[\/\-](0?[1-9]|1[012])[\/\-]\d{4}$/);
    
}, "Data Inválida");


$(document).ready(function () {
    $("#cpf").mask("000.000.000-00");
    $("#dataNasc").mask("00/00/0000");

    $("#formCadastro").validate({
        rules: {
            nome: {
                minlength: 10,
                minWords: 2
            },
            email: {
                required: true,
                email: true
            },
            cpf: {
                required: true,
                cpf: true

            },
            prof: {
                veia: true
            },

            dataNasc: {
                dateBR: true
            }

        },
        submitHandler: function (form) {
            alert("Cadastrado com sucesso")
        }
    })
})
function adiciona_tec() {
    var input_tec = document.getElementById('input-tec').value;
    var text_tecs = document.getElementById('text-tecs');
    const list_tecs = [];

    list_tecs.push(input_tec);

    if (text_tecs.value == false) {
        text_tecs.value = list_tecs;
    } else {
        text_tecs.value = text_tecs.value + ' ' + list_tecs;
    }
}

function adiciona_ts() {
    var input_ts = document.getElementById('input-ts').value;
    var text_ts = document.getElementById('text-ts');
    const list_ts = [];

    list_ts.push(input_ts);

    if (text_ts.value == false) {
        text_ts.value = list_ts;
    } else {
        text_ts.value = text_ts.value + ' ' + list_ts;
    }
}

function simula_valores() {
    var tempo_simulacao = document.getElementById('tempo-simulacao').value;
    var text_tecs = document.getElementById('text-tecs').value;
    var text_ts = document.getElementById('text-ts').value;
    var tabela_calculos = document.getElementById('table-body');

    const array_text_tecs = text_tecs.split(' ');
    const array_text_ts = text_ts.split(' ');

    var cliente = 0;
    var tempo_chegada_relogio = 0
    var tempo_servico_relogio = 0
    var tempo_cliente_fila = 0
    var tempo_final_servico_relogio = 0
    var tempo_cliente_sistema = 0
    var tempo_livre_operador = 0

    while (tempo_servico_relogio <= tempo_simulacao) {
        const chegada_random = Math.floor(Math.random() * array_text_tecs.length);
        const servico_random = Math.floor(Math.random() * array_text_ts.length);

        var tempo_chegada = array_text_tecs[chegada_random];
        var tempo_servico = array_text_ts[servico_random];

        cliente += 1
        if (cliente == 1) {
            tempo_chegada_relogio = tempo_chegada;
            tempo_servico_relogio = tempo_chegada_relogio;
            tempo_cliente_fila = 0;
            tempo_final_servico_relogio = parseInt(tempo_servico) + parseInt(tempo_servico_relogio);
            tempo_cliente_sistema = tempo_servico;
            tempo_livre_operador = tempo_chegada;

            tabela_calculos.innerHTML += '<tr><th scope="row">' + cliente + '</th><td>' + tempo_chegada + '</td><td>' + tempo_chegada_relogio + '</td><td>' + tempo_servico + '</td><td>' + tempo_servico_relogio + '</td><td>' + tempo_cliente_fila + '</td><td>' + tempo_final_servico_relogio + '</td><td>' + tempo_cliente_sistema + '</td><td>' + tempo_livre_operador + '</td></tr>';
        } else {
            tempo_chegada_relogio = parseInt(tempo_chegada_relogio) + parseInt(tempo_chegada);

            if (tempo_final_servico_relogio >= tempo_chegada_relogio) {
                tempo_cliente_fila = tempo_final_servico_relogio - tempo_chegada_relogio;
            } else {
                tempo_cliente_fila = 0;
            }

            tempo_servico_relogio = parseInt(tempo_chegada_relogio) + parseInt(tempo_cliente_fila);
            tempo_final_servico_relogio = parseInt(tempo_servico) + parseInt(tempo_servico_relogio);
            tempo_cliente_sistema = parseInt(tempo_servico) + parseInt(tempo_cliente_fila);

            if (tempo_final_servico_relogio < tempo_chegada_relogio) {
                tempo_livre_operador = tempo_chegada_relogio - tempo_final_servico_relogio;
            } else {
                tempo_livre_operador = 0;
            }

            tabela_calculos.innerHTML += '<tr><th scope="row">' + cliente + '</th><td>' + tempo_chegada + '</td><td>' + tempo_chegada_relogio + '</td><td>' + tempo_servico + '</td><td>' + tempo_servico_relogio + '</td><td>' + tempo_cliente_fila + '</td><td>' + tempo_final_servico_relogio + '</td><td>' + tempo_cliente_sistema + '</td><td>' + tempo_livre_operador + '</td></tr>';
        }
    }
}
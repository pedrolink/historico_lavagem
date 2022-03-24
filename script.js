function adiciona_tec() {
    var input_tec = document.getElementById('input-tec').value;
    var text_tecs = document.getElementById('text-tecs');
    const list_tecs = [];

    if (input_tec) {
        list_tecs.push(input_tec);

        if (text_tecs.value == false) {
            text_tecs.value = list_tecs;
        } else {
            text_tecs.value = text_tecs.value + ' ' + list_tecs;
        }
    } else {
        alert('Favor preencha um valor para o tempo entre chegada!');
    }
}

function adiciona_ts() {
    var input_ts = document.getElementById('input-ts').value;
    var text_ts = document.getElementById('text-ts');
    const list_ts = [];

    if (input_ts) {
        list_ts.push(input_ts);

        if (text_ts.value == false) {
            text_ts.value = list_ts;
        } else {
            text_ts.value = text_ts.value + ' ' + list_ts;
        }
    } else {
        alert('Favor preencha um valor para o tempo de serviço!');
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
    var tempo_chegada_relogio = 0;
    var tempo_servico_relogio = 0;
    var tempo_cliente_fila = 0;
    var tempo_final_servico_relogio = 0;
    var tempo_cliente_sistema = 0;
    var tempo_livre_operador = 0;

    var total_tempo_chegada = 0;
    var total_tempo_servico = 0;
    var total_tempo_cliente_fila = 0;
    var total_tempo_cliente_sistema = 0;
    var total_tempo_livre_operador = 0;

    tabela_calculos.innerHTML = '';

    if (tempo_simulacao && text_tecs && text_ts) {
        while (tempo_chegada_relogio <= tempo_simulacao) {
            const chegada_random = Math.floor(Math.random() * array_text_tecs.length);
            const servico_random = Math.floor(Math.random() * array_text_ts.length);

            var tempo_chegada = array_text_tecs[chegada_random];
            var tempo_servico = array_text_ts[servico_random];

            cliente += 1
            if (cliente == 1) {
                // CÁLCULOS PRIMEIRO CLIENTE
                tempo_chegada_relogio = parseInt(tempo_chegada);
                tempo_servico_relogio = parseInt(tempo_chegada_relogio);
                tempo_cliente_fila = 0;
                tempo_final_servico_relogio = parseInt(tempo_servico) + parseInt(tempo_servico_relogio);
                tempo_cliente_sistema = parseInt(tempo_servico);
                tempo_livre_operador = parseInt(tempo_chegada);

                // SOMA VALORES PRIMEIRO CLIENTE
                total_tempo_chegada += parseInt(tempo_chegada);
                total_tempo_servico += parseInt(tempo_servico);
                total_tempo_cliente_fila += parseInt(tempo_cliente_fila);
                total_tempo_cliente_sistema += parseInt(tempo_cliente_sistema);
                total_tempo_livre_operador += parseInt(tempo_livre_operador);

                // INSERE LINHA DO PRIMEIRO CLIENTE
                tabela_calculos.innerHTML += '<tr><th scope="row">' + cliente + '</th><td>' + tempo_chegada + '</td><td>' + tempo_chegada_relogio + '</td><td>' + tempo_servico + '</td><td>' + tempo_servico_relogio + '</td><td>' + tempo_cliente_fila + '</td><td>' + tempo_final_servico_relogio + '</td><td>' + tempo_cliente_sistema + '</td><td>' + tempo_livre_operador + '</td></tr>';
            } else {
                var tempo_break = parseInt(tempo_chegada_relogio) + parseInt(tempo_chegada);
                if (tempo_break > tempo_simulacao){
                    break;
                }

                // CÁLCULOS RESTANTE DOS CLIENTES
                tempo_chegada_relogio = parseInt(tempo_chegada_relogio) + parseInt(tempo_chegada);

                if (tempo_final_servico_relogio >= tempo_chegada_relogio) {
                    tempo_cliente_fila = tempo_final_servico_relogio - tempo_chegada_relogio;
                } else {
                    tempo_cliente_fila = 0;
                }

                tempo_servico_relogio = parseInt(tempo_chegada_relogio) + parseInt(tempo_cliente_fila);
                tempo_cliente_sistema = parseInt(tempo_servico) + parseInt(tempo_cliente_fila);

                if (tempo_final_servico_relogio < tempo_chegada_relogio) {
                    tempo_livre_operador = tempo_chegada_relogio - tempo_final_servico_relogio;
                } else {
                    tempo_livre_operador = 0;
                }

                tempo_final_servico_relogio = parseInt(tempo_servico) + parseInt(tempo_servico_relogio);

                //  SOMA VALORES RESTANTE CLIENTES
                total_tempo_chegada += parseInt(tempo_chegada);
                total_tempo_servico += parseInt(tempo_servico);
                total_tempo_cliente_fila += parseInt(tempo_cliente_fila);
                total_tempo_cliente_sistema += parseInt(tempo_cliente_sistema);
                total_tempo_livre_operador += parseInt(tempo_livre_operador);

                // INSERE LINHA DOS CLIENTES
                tabela_calculos.innerHTML += '<tr><th scope="row">' + cliente + '</th><td>' + tempo_chegada + '</td><td>' + tempo_chegada_relogio + '</td><td>' + tempo_servico + '</td><td>' + tempo_servico_relogio + '</td><td>' + tempo_cliente_fila + '</td><td>' + tempo_final_servico_relogio + '</td><td>' + tempo_cliente_sistema + '</td><td>' + tempo_livre_operador + '</td></tr>';
            }
        }

        // ADICIONA LINHA COM TOTAIS
        tabela_calculos.innerHTML += '<tr class="table-active"><th scope="row">Totais</th><td style="color: red">' + total_tempo_chegada + '</td><td></td><td style="color: red">' + total_tempo_servico + '</td><td></td><td style="color: red">' + total_tempo_cliente_fila + '</td><td></td><td style="color: red">' + total_tempo_cliente_sistema + '</td><td style="color: red">' + total_tempo_livre_operador + '</td></tr>';

        // ADICIONA VALORES DA TABELA FINAL
        var tempo_medio_espera = ((total_tempo_cliente_fila / cliente) * 60);
        var probabilidade_cliente_espera = ((total_tempo_cliente_fila / cliente) * 100);
        var probabilidade_operador_livre = ((total_tempo_livre_operador / tempo_final_servico_relogio) * 100);
        var tempo_medio_servico = (total_tempo_servico / cliente);
        var tempo_medio_despendido = (total_tempo_cliente_sistema / cliente);

        document.getElementById('tempo-medio-espera').innerHTML = tempo_medio_espera.toFixed(2);
        document.getElementById('probabilidade-cliente-espera').innerHTML = probabilidade_cliente_espera.toFixed(2);
        document.getElementById('probabilidade-operador-livre').innerHTML = probabilidade_operador_livre.toFixed(2);
        document.getElementById('tempo-medio-servico').innerHTML = tempo_medio_servico.toFixed(2);
        document.getElementById('tempo-medio-despendido').innerHTML = tempo_medio_despendido.toFixed(2);
    } else {
        alert('Favor preencha os campos com seus devidos valores!');
    }
}

function limpa_valores() {
    document.getElementById('input-tec').value = '';
    document.getElementById('input-ts').value = '';
    document.getElementById('tempo-simulacao').value = '';
    document.getElementById('text-tecs').value = '';
    document.getElementById('text-ts').value = '';
    document.getElementById('table-body').innerHTML = '';
    document.getElementById('tempo-medio-espera').innerHTML = '';
    document.getElementById('probabilidade-cliente-espera').innerHTML = '';
    document.getElementById('probabilidade-operador-livre').innerHTML = '';
    document.getElementById('tempo-medio-servico').innerHTML = '';
    document.getElementById('tempo-medio-despendido').innerHTML = '';
}
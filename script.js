
const cpfCnpjPrestador = document.getElementById("cpfCnpjPrestador");
const inscricaoMunicipio = document.getElementById("inscricaoMunicipio");
const discriminacao = document.getElementById("discriminacao");
const valorServico = document.getElementById("valorServico");
const valorDeducao = document.getElementById("valorDeducao");
const codigoCnae = document.getElementById("codigoCnae");
const itemListaServico = document.getElementById("itemListaServico");
const codigoTributacaoMunicipio = document.getElementById("codigoTributacaoMunicipio");
const codigoMunicipio = document.getElementById("codigoMunicipio");
const cpfCnpjTomador = document.getElementById("cpfCnpjTomador");
const razaoSocial = document.getElementById("razaoSocial");
const tipoLucro = document.querySelectorAll(".tipoLucro");

let containerNfse = document.getElementById("containerNfse");
const nfseDataEmissao = document.getElementById("nfse-emissao");
const nfseDiscriminacao = document.getElementById("nfse-discriminacao");
const nfseValor = document.getElementById("nfse-valor");
const nfseDeducao = document.getElementById("nfse-deducao");
const nfseCnae = document.getElementById("nfse-cnae");
const nfseItemLista = document.getElementById("nfse-itemLista");
const nfseTributacaoMunicipal = document.getElementById("nfse-tributacaoMunicipio");
const nfseCodigoMunicipio = document.getElementById("nfse-codigoMunicipio");
const nfseBaseCalculo = document.getElementById("nfse-baseCalculo");
const nfsePis = document.getElementById("nfse-pis");
const nfseCofins = document.getElementById("nfse-cofins");
const nfseIrpj = document.getElementById("nfse-irpj");
const nfseInss = document.getElementById("nfse-inss");
const nfseIss = document.getElementById("nfse-iss");
const nfseCsll = document.getElementById("nfse-csll");
const nfsePrestador = document.getElementById("nfse-prestador");
const nfseInscricaoMunicipal = document.getElementById("nfse-inscricaoMunicipal");
const nfseTomador = document.getElementById("nfse-tomador");
const nfseRazaoSocial = document.getElementById("nfse-razaoSocial");

let exibeNfse;

window.onload = () => {
    exibirNfse(false)
}

function exibirNfse(resp){
    if(resp){
        if(containerNfse.classList.contains('displayNone')){
            containerNfse.classList.remove('displayNone');
        }
    } else {
        if(!containerNfse.classList.contains('displayNone')){
            containerNfse.classList.add('displayNone');
        }
    }
}

function handleForm(){
    
    if(validaCampos() ){

        gerarNfse();
        exibirNfse(true);

    } else {
        exibirNfse(false);
    }
   
    return false;
}

function validaCampos() {

    if(cpfCnpjPrestador.value.length == 0){
        alert("O campo CPF/CNPJ Prestador está vazio");
        return false;
    }
    if(inscricaoMunicipio.value.length == 0){
        alert("O campo Inscrição Municipal está vazio");
        return false;
    }
    if(discriminacao.value.length == 0){
        alert("O campo Descrição do Serviço está vazio");
        return false;
    }
    if(valorServico.value.length == 0){
        alert("O campo Valor de Serviço está vazio");
        return false;
    }
    if(valorDeducao.value.length == 0){
        alert("O campo Valor Dedução está vazio");
        return false;
    }
    if(codigoCnae.value.length == 0){
        alert("O campo Código CNAE está vazio");
        return false;
    }
    if(itemListaServico.value.length == 0){
        alert("O campo Item Lista Serviço está vazio");
        return false;
    }
    if(codigoTributacaoMunicipio.value.length == 0){
        alert("O campo Código Tributação de Município está vazio");
        return false;
    }
    if(codigoMunicipio.value.length == 0){
        alert("O campo Código de Município está vazio");
        return false;
    }
    if(cpfCnpjTomador.value.length == 0){
        alert("O campo CPF/CNPJ CPF/CNPJ Tomador está vazio");
        return false; 
    }
    if(cpfCnpjTomador.value.length == 0){
        alert("O campo razaoSocial está vazio");
        return false;
    }

    return true;
}

function gerarNfse(){
    const dataAtual = new Date();
    let dia = dataAtual.getDate();
    if(dia < 10){
        dia=`0${dia}`;
    }
    nfseDataEmissao.textContent = `Data de emissão: ${dataAtual.getFullYear()}-${dataAtual.getMonth() + 1}-${dia}`;
    nfseDiscriminacao.textContent = ` Descrição Servico: ${discriminacao.value}`;
    nfseValor.textContent = ` Valor: R$ ${valorServico.value}`;
    nfseCnae.textContent = ` Código CNAE: ${codigoCnae.value}`;
    nfseItemLista.textContent = ` Item Lista Serviço:  ${itemListaServico.value}`;
    nfseTributacaoMunicipal.textContent = ` Código Tributação de Município:   ${codigoTributacaoMunicipio.value}`;
    nfseCodigoMunicipio.textContent = ` Código de Município:   ${codigoMunicipio.value}`;
    nfsePrestador.textContent = ` CPF/CNPJ Prestador:   ${cpfCnpjPrestador.value}`;
    nfseInscricaoMunicipal.textContent = `Inscrição Municipal:    ${inscricaoMunicipio.value}`;
    nfseTomador.textContent = `ICPF/CNPJ Tomador:   ${cpfCnpjTomador.value}`;
    nfseRazaoSocial.textContent = `Razão Social:  ${razaoSocial.value}`;
    calcularImpostos();
}

function calcularImpostos(){
    let regimeTributario;
    tipoLucro.forEach(element => {
        if(element.checked){
            regimeTributario = element.value;
        }
    });

    let valorCalculo =  Number(valorServico.value);
    let deducao = Number(valorDeducao.value);

    nfseBaseCalculo.textContent =`Base cálculo: R$ ${valorCalculo} -  R$ ${deducao} = R$ ${valorCalculo - deducao}` ;
    valorCalculo = valorCalculo - deducao;
    
    if(regimeTributario == "presumido") {
        nfsePis.textContent = `PIS: R$ ${valorCalculo} * 0.65% = R$ ${(valorCalculo * 0.0065).toFixed(2)}`;
        nfseCofins.textContent = `COFINS: R$ ${valorCalculo} * 3% = R$ ${(valorCalculo * 0.03).toFixed(2)}`;
    } else {
        nfsePis.textContent = `PIS: R$ ${valorCalculo} * 1.65% = R$ ${(valorCalculo * 0.0165).toFixed(2)}`;
        nfseCofins.textContent = `COFINS: R$ ${valorCalculo} * 7.6% =  R$ ${(valorCalculo * 0.076).toFixed(2)}`;
    }

    nfseIrpj.textContent =`IRPJ: R$ ${valorCalculo} * 15% = R$ ${(valorCalculo * 0.15).toFixed(2)}`;
    nfseInss.textContent = `INSS: R$ ${valorCalculo} * 11% = R$ ${(valorCalculo * 0.11).toFixed(2)}`;
    nfseCsll.textContent = `CSLL: R$ ${valorCalculo} * 9% = R$ ${(valorCalculo * 0.09).toFixed(2)}`;

}

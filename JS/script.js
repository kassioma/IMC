// IMC DATA
const data = [
    {
      min: 0, //faixas de min e max
      max: 18.4,
      classification: "Menor que 18,5", //onde o usuário se encaixará
      info: "Magreza", // estatus baseado no IMC do usuário
      obesity: "0", // grau do IMC
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Entre 18,5 e 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Entre 25,0 e 29,9",
      info: "Sobrepeso",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Entre 30,0 e 39,9",
      info: "Obesidade",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Maior que 40,0",
      info: "Obesidade grave",
      obesity: "III",
    },
];
  
// Seleção de elementos
const imcTable = document.querySelector("#imc-table"); //Tabela de imc
const heightInput = document.querySelector("#height"); //Input de altura
const weightInput = document.querySelector("#weight"); //Input de peso
const calcBtn = document.querySelector("#calc-btn"); //Botão Calcular
const clearBtn = document.querySelector("#clear-btn"); //Botão limpar
  
const calcContainer = document.querySelector("#calc-container");
const resultContainer = document.querySelector("#result-container");
  
const imcNumber = document.querySelector("#imc-number span");
const imcInfo = document.querySelector("#imc-info span");
const backBtn = document.querySelector("#back-btn"); //Botão voltar
  
  // Funções
function createTable(data) { //função para receber os dados da tabela
    data.forEach((item) => {
        const div = document.createElement("div");
        div.classList.add("table-data");
        //inserindo parágrafos com informações sobre as divs
        const classification = document.createElement("p"); //Colocando o texto do primeiro parágrafo igual ao item da classificação do item atual
        classification.innerText = item.classification;

        const info = document.createElement("p");
        info.innerText = item.info;

        const obesity = document.createElement("p");
        obesity.innerText = item.obesity;

        div.appendChild(classification); //incluindo na div table data
        div.appendChild(info);
        div.appendChild(obesity);

        imcTable.appendChild(div); 
    });
}
  
function validDigits(text) {
    return text.replace(/[^0-9,]/g, ""); // Validando digitos de 0 ate 9 e virgulas  e substituindo por vazio "". o g indica que é global(texto todo, não só na primeira ocorrência) 
}
  
function calcImc(height, weight) { //calculando o IMC peso dividido pela altura vezes a altura
    const imc = (weight / (height * height)).toFixed(1); //arredondadno para uma casa depois da virgula
    return imc;
}
  
function cleanInputs() { //limpando os inputs
    heightInput.value = "";
    weightInput.value = "";
    imcNumber.className = "";
    imcInfo.className = "";
}
  
function showOrHideResults() {
    calcContainer.classList.toggle("hide"); //com hide não mostra sem hide mostra
    resultContainer.classList.toggle("hide");
}

  
// Iniciialização
createTable(data);
  
// Eventos
[heightInput, weightInput].forEach((el) => {
    el.addEventListener("input", (e) => {
      const updatedValue = validDigits(e.target.value);
  
      e.target.value = updatedValue;
    });
});
  
calcBtn.addEventListener("click", (e) => {
    e.preventDefault();
  
    const weight = +weightInput.value.replace(",", "."); // convertendo texto em numeros (string para float) 
    const height = +heightInput.value.replace(",", ".");
  
    if (!weight || !height) return;
    const imc = calcImc(height, weight);
    
    let info;
  
    data.forEach((item) => {
      if (imc >= item.min && imc <= item.max) {
        info = item.info;
      }
    });
  
    if (!info) return;
  
    imcNumber.innerText = imc;
    imcInfo.innerText = info;
  
    switch (info) { //feedback visual baseado na informação
      case "Magreza":
        imcNumber.classList.add("low");
        imcInfo.classList.add("low");
        break;
      case "Normal":
        imcNumber.classList.add("good");
        imcInfo.classList.add("good");
        break;
      case "Sobrepeso":
        imcNumber.classList.add("low");
        imcInfo.classList.add("low");
        break;
      case "Obesidade":
        imcNumber.classList.add("medium");
        imcInfo.classList.add("medium");
        break;
      case "Obesidade grave":
        imcNumber.classList.add("high");
        imcInfo.classList.add("high");
        break;
    }
  
    showOrHideResults();
  });
  
  clearBtn.addEventListener("click", (e) => {
    e.preventDefault();
  
    cleanInputs();
  });
  
  backBtn.addEventListener("click", () => {
    cleanInputs();
    showOrHideResults();
  });
const ufSelect = document.getElementById("ufSelect");
const tabela = document.getElementById("municipiosTable");

// Buscar UFs
async function carregarUFs() {
  const resposta = await fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados");
  const dados = await resposta.json();

  dados.sort((a, b) => a.nome.localeCompare(b.nome)); // organizar de forma alfabética

  dados.forEach(uf => {
    const option = document.createElement("option");
    option.value = uf.id;
    option.textContent = uf.sigla + " - " + uf.nome;
    ufSelect.appendChild(option);
  });
}

// Buscar Municípios da UF selecionada
async function carregarMunicipios(ufID) {
  tabela.innerHTML = ""; // limpar automáticamente
  if (!ufID) return;

  const resp = await fetch(`https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufID}/municipios`);
  const municipios = await resp.json();

  municipios.forEach(m => {
    const linha = document.createElement("tr");
    linha.innerHTML = `
      <td>${m.id}</td>
      <td>${m.nome}</td>
    `;
    tabela.appendChild(linha);
  });
}

// Quando mudar UF
ufSelect.addEventListener("change", () => {
  carregarMunicipios(ufSelect.value);
});

// Inicializar
carregarUFs();


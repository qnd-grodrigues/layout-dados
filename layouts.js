// Obter o parâmetro "file" da URL
const urlParams = new URLSearchParams(window.location.search);
const fileName = urlParams.get('file');

// Mapeamento dos arquivos para os seus respectivos JSONs
const fileToJsonMap = {
    "Bancos.json": "configGer_bancos.json",
    "Tipo_Endereco.json": "configGer_tipo_endereco.json",
    "Cidades.json": "configGer_cidades.json",
    "Finalidade_Conta_Bancaria.json": "configGer_finalidade_conta_bancaria.json",
    // Adicione os outros arquivos e seus JSONs aqui
};

// Verificar se o arquivo está no mapeamento
if (fileName && fileToJsonMap[fileName]) {
    // Caminho do JSON correspondente
    const jsonFile = fileToJsonMap[fileName];

    // Fazer o fetch para carregar os dados do JSON
    fetch(jsonFile)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro ao carregar o arquivo JSON: ${response.statusText}`);
            }
            return response.json();
        })
        .then(data => {
            // Preencher o conteúdo na página
            const contentDiv = document.getElementById("content");
            contentDiv.innerHTML = `
                <h1>${data.namespace} / ${data.name}</h1>
                <h2>Tipo: ${data.type}</h2>
                <p>${data.doc}</p>

                <h2>Campos:</h2>
                <ul>
                    ${data.fields.map(field => `<li>${field.name} (${field.type})</li>`).join('')}
                </ul>

                <h2>Exemplo:</h2>
                <pre>${JSON.stringify(data.fields, null, 2)}</pre>
            `;
        })
        .catch(error => {
            console.error('Erro ao carregar JSON:', error);
            document.getElementById("content").innerHTML = `
                <p style="color: red;">Não foi possível carregar as informações para o arquivo "${fileName}".</p>
            `;
        });
} else {
    // Exibir mensagem caso o arquivo não seja encontrado no mapeamento
    document.getElementById("content").innerHTML = `
        <p style="color: red;">Arquivo "${fileName}" não está disponível no mapeamento ou não foi informado.</p>
    `;
}

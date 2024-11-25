// Função para obter parâmetros da URL
function getQueryParams() {
    const params = new URLSearchParams(window.location.search);
    return {
        module: params.get("module"),
        file: params.get("file"),
    };
}

// Função para normalizar strings, removendo acentos e caracteres especiais
function normalizeString(str) {
    return str
        .normalize("NFD") // Decomposição de caracteres acentuados
        .replace(/[\u0300-\u036f]/g, "") // Remove diacríticos (acentos)
        .replace(/ç/g, "c") // Substitui cedilha por "c"
        .replace(/\s/g, "_") // Substitui espaços por "_"
        .toLowerCase(); // Converte para letras minúsculas
}

// Renderizar os detalhes do arquivo
function renderDetails() {
    const params = getQueryParams();
    const detailsDiv = document.getElementById("details");
    const fileContentDiv = document.getElementById("file-content");

    if (params.module && params.file) {
        // Normaliza o nome do módulo
        const normalizedModule = normalizeString(params.module);
        detailsDiv.innerHTML = `
            <p><strong>Módulo:</strong> ${params.module}</p>
            <p><strong>Arquivo:</strong> ${params.file}</p>
            <p><strong>Caminho:</strong> <code>carga_resumida/${normalizedModule}/${params.file}</code></p>
        `;

        // Monta o caminho do arquivo normalizado
        const filePath = `../carga_resumida/${normalizedModule}/${params.file}`;

        // Tenta carregar o arquivo JSON
        fetch(filePath)
            .then((response) => {
                if (!response.ok) {
                    throw new Error(`Erro ao carregar o arquivo: ${response.statusText}`);
                }
                return response.json();
            })
            .then((data) => {
                // Exibe o conteúdo do arquivo JSON
                console.log(data);
                fileContentDiv.innerHTML = `
                    <h3>Conteúdo do Arquivo</h3>
                    <h5>Exemplo:</h5>
                    <pre>${JSON.stringify(data[0], null, 2)}</pre>
                `;
            })
            .catch((error) => {
                fileContentDiv.innerHTML = `<p style="color: red;">Erro ao carregar o arquivo JSON: ${error.message}</p>`;
            });
    } else {
        detailsDiv.textContent = "Parâmetros inválidos na URL.";
    }
}

renderDetails();

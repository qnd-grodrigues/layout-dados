// Carrega o JSON dinamicamente
fetch("../carga_resumida/conf.json")
    .then((response) => {
        if (!response.ok) {
            throw new Error(`Erro ao carregar o arquivo JSON: ${response.statusText}`);
        }
        return response.json();
    })
    .then((data) => {
        generateCards(data); // Chama a função para gerar o HTML
    })
    .catch((error) => {
        console.error(error);
    });

// Função para remover a extensão do nome do arquivo
const removeExtension = (filename) => filename.replace(/\.[^/.]+$/, "");

function generateCards(jsonData) {
    const container = document.getElementById("content");

    jsonData[0].carga.forEach((item) => {
        // Acessa o módulo e suas informações
        const moduleName = Object.keys(item.modulo)[0];
        const moduleData = item.modulo[moduleName];
        const moduleFolder = moduleName.replace(/\s/g, "_"); // Substitui espaços por "_"

        // Cria o card
        const card = document.createElement("div");
        card.className = "card";

        // Título do módulo
        const cardTitle = document.createElement("h3");
        cardTitle.textContent = moduleName;
        card.appendChild(cardTitle);

        // Lista de arquivos
        const fileList = document.createElement("ul");
        moduleData.collections.forEach((collection) => {
            const listItem = document.createElement("li");

            // Cria o link para o arquivo
            const link = document.createElement("a");
            const filePath = `../carga_resumida/${moduleFolder}/${collection.file}`;
            link.href = `default.html?module=${encodeURIComponent(moduleName)}&file=${encodeURIComponent(collection.file)}`;
            link.textContent = removeExtension(collection.file);
            // link.target = "_blank";

            listItem.appendChild(link);
            fileList.appendChild(listItem);
        });

        card.appendChild(fileList);
        container.appendChild(card);
    });
}


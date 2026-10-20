const bancoPalavras = ["PYTHON", "FUNCAO", "VARIAVEL", "CODIGO", "DADOS", "LOGICA"];
const tamanhoGrid = 8;
let palavrasAtuais = [];

function iniciarJogo() {
    palavrasAtuais = [...bancoPalavras].sort(() => 0.5 - Math.random()).slice(0, 4);
   
    let grid = Array(tamanhoGrid).fill().map(() => Array(tamanhoGrid).fill(''));
   
    for (let palavra of palavrasAtuais) {
        let colocou = false;
        let tentativas = 0;
       
        while (!colocou && tentativas < 100) {
            tentativas++;
           
            let horizontal = Math.random() > 0.5;
           
            let linhaMax = horizontal ? tamanhoGrid : (tamanhoGrid - word-list - palavra.length + 1);
            let colunaMax = horizontal ? (tamanhoGrid - palavra.length + 1) : tamanhoGrid;
           
            let linha = Math.floor(Math.random() * linhaMax);
            let coluna = Math.floor(Math.random() * colunaMax);
           
            let podeColocar = true;
           
            for (let i = 0; i < palavra.length; i++) {
                let l = linha + (horizontal ? 0 : i);
                let c = coluna + (horizontal ? i : 0);
               
                if (grid[l][c] !== '' && grid[l][c] !== palavra[i]) {
                    podeColocar = false;
                }
            }
           
            if (podeColocar) {
                for (let i = 0; i < palavra.length; i++) {
                    grid[linha + (horizontal ? 0 : i)][coluna + (horizontal ? i : 0)] = palavra[i];
                }
                colocou = true;
            }
        }
       
        if (!colocou) {
            palavrasAtuais = palavrasAtuais.filter(p => p !== palavra);
        }
    }

    const gridHtml = document.getElementById('grid');
    gridHtml.innerHTML = '';
    gridHtml.style.gridTemplateColumns = `repeat(${tamanhoGrid}, 1fr)`;
   
    const alfabeto = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
   
    for (let l = 0; l < tamanhoGrid; l++) {
        for (let c = 0; c < tamanhoGrid; c++) {
            if (grid[l][c] === '') {
                grid[l][c] = alfabeto[Math.floor(Math.random() * 26)];
            }
            let celula = document.createElement('div');
            celula.className = 'cell';
            celula.textContent = grid[l][c];
            celula.onclick = () => {
                if (celula.classList.contains('found')) return;
                celula.classList.toggle('selected');
                verificarPalavra();
            };
           
            gridHtml.appendChild(celula);
        }
    }

    const listaHtml = document.getElementById('word-list');
    listaHtml.innerHTML = palavrasAtuais.map(p => `<li id="palavra-${p}">${p}</li>`).join('');
}
iniciarJogo();

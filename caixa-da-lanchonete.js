class CaixaDaLanchonete {
    constructor() {
        // Criação do cardápio com os preços dos itens
        this.cardapio = {
            cafe: 3.00,
            chantily: 1.50,
            suco: 6.20,
            sanduiche: 6.50,
            queijo: 2.00,
            salgado: 7.25,
            combo1: 9.50,
            combo2: 7.50
        };
    }

    calcularValorDaCompra(formaDePagamento, itens) {
        // Verificar se o carrinho está vazio
        if (itens.length === 0) {
            return "Não há itens no carrinho de compra!";
        }

        // Inicializar o valor total com base nos itens selecionados
        let valorTotal = itens.reduce((total, item) => {
            const [codigo, quantidade] = item.split(",");
            
            // Verificar se o item é válido
            if (!this.cardapio[codigo]) {
                return "Item inválido!";
            }

            // Verificar se item extra tem o principal correspondente
            if (!itens.includes("combo1") && !itens.includes("combo2") && codigo !== "chantily" && codigo !== "queijo") {
                return "Item extra não pode ser pedido sem o principal";
            }

            // Verificar se a quantidade é válida
            if (quantidade <= 0) {
                return "Quantidade inválida!";
            }

            // Somar ao total o valor do item multiplicado pela quantidade
            total += this.cardapio[codigo] * quantidade;
            return total;
        }, 0);

        // Verificar forma de pagamento válida
        if (!["dinheiro", "credito", "debito"].includes(formaDePagamento)) {
            return "Forma de pagamento inválida!";
        }

        // Aplicar descontos e acréscimos com base na forma de pagamento
        if (formaDePagamento === "dinheiro") {
            valorTotal *= 0.95; // Aplicar desconto de 5% para pagamento em dinheiro
        } else if (formaDePagamento === "credito") {
            valorTotal *= 1.03; // Aplicar acréscimo de 3% para pagamento a crédito
        }

        // Formatar o valor total como uma string no formato "R$ X.XX"
        return `R$ ${valorTotal.toFixed(2)}`;
    }
}

export { CaixaDaLanchonete };

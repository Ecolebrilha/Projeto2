const { sqlQuery } = require('../db');

class pagamentoServices {
    insertPagamento(credor, descricao, numDocumento, numParcela, datVencimento, datPagamento, vlrPago) {
        const q = `
        USE fernando_db;
        INSERT INTO PAGAR (Credor, Descricao, Num_documento, Num_parcela, Dat_vencimento, Dat_pagamento, Vlr_pago)
        VALUES
        ('${credor}', '${descricao}', '${numDocumento}', '${numParcela}', '${datVencimento}', '${datPagamento}', ${vlrPago});
        `;

        const result = sqlQuery(q);
        return result;
    }

    selectAllPagamentos() {
        const q = `
        USE fernando_db;
        SELECT * FROM PAGAR;
        `;

        const result = sqlQuery(q);
        return result;
    }

    selectPagamentoById(id) {
        const q = `
        USE fernando_db;
        SELECT * FROM PAGAR WHERE Id = ${id};
        `;

        const result = sqlQuery(q);
        return result;
    }

    updatePagamento(id, credor, descricao, numDocumento, numParcela, datVencimento, datPagamento, vlrPago) {
        const q = `
        USE fernando_db;
        UPDATE PAGAR
        SET Credor = '${credor}', 
            Descricao = '${descricao}', 
            Num_documento = '${numDocumento}', 
            Num_parcela = '${numParcela}', 
            Dat_vencimento = '${datVencimento}', 
            Dat_pagamento = '${datPagamento}', 
            Vlr_pago = ${vlrPago}
        WHERE Id = ${id};
        `;

        const result = sqlQuery(q);
        return result;
    }

    deletePagamento(id) {
        const q = `
        USE fernando_db;
        DELETE FROM PAGAR WHERE Id = ${id};
        `;

        const result = sqlQuery(q);
        return result;
    }
}

module.exports = new pagamentoServices();

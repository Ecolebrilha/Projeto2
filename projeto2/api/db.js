const sql = require('mssql')

const sqlConfig = {
    user: 'sa',
    password: 'vls021130',
    database:'fernando_db',
    server: '10.5.1.34',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    };

async function sqlQuery (con) {
    const q = con
    try {
        
        await sql.connect(sqlConfig)
        const result = await sql.query(q);
        console.log(result)
        return result.recordset;
        sql.close();
    } catch (err) {
        console.error(err);
    }
}

module.exports = {sqlQuery}

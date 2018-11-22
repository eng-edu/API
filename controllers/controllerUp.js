var fs = require('fs');
const execute = require('../executeSQL');

module.exports = function (req, res) {

	const uuidv4 = require('uuid/v4'); 
	var filename = uuidv4();

	res.setHeader("Access-Control-Allow-Origin", "*");
	var temporario = req.files.file.path;
	//	var novo = './uploads/' + req.files.file.name;

	const NOME = req.files.file.name;
    const CAMINHO = './uploads/' + filename + ".pdf"; //CAMINHO
    const ETAPA_ID = req.params.ETAPA_ID
    const ARCO_ID = req.params.ARCO_ID

	var sqlQry = `INSERT INTO DOCUMENTO (NOME, CAMINHO, ETAPA_ID, ARCO_ID) VALUES ('${NOME}','${CAMINHO}','${ETAPA_ID}','${ARCO_ID}')`;

    execute.executeSQL(sqlQry, function (results) {

        if (results['insertId'] > 0) {
            res.status(201);
        } else {
            res.status(405);
        }
        console.log(results);
    });

	fs.rename(temporario,'./uploads/' + filename + ".pdf", function (err) {
		if (err) {
			res.status(500).json({ error: err })
		}
		res.json({ message: "enviado com sucesso" });
	})


}
var fs = require('fs');
const execute = require('../executeSQL');

module.exports = function (req, res) {

	//	console.log(req.params.ARCO_ID)
	//	console.log(req.params.ETAPA_ARCO_ID)

	const uuidv4 = require('uuid/v4'); 
	var filename = uuidv4();

	res.setHeader("Access-Control-Allow-Origin", "*");
	var temporario = req.files.file.path;
	//	var novo = './uploads/' + req.files.file.name;

	const NOME = req.files.file.name;
    const BASE64 = './uploads/' + filename + ".pdf"; //CAMINHO
    const ETAPA_ID = req.params.ETAPA_ARCO_ID
    const ETAPA_ARCO_ID = req.params.ARCO_ID


	var sqlQry = `INSERT INTO DOCUMENTO (NOME, BASE64, ETAPA_ID, ETAPA_ARCO_ID) VALUES ('${NOME}','${BASE64}','${ETAPA_ID}','${ETAPA_ARCO_ID}')`;

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
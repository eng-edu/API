var fs = require('fs');

module.exports = function(req, res){
	res.setHeader("Access-Control-Allow-Origin", "*");
	var temporario = req.file;
	var novo = './uploads/' + req.files.file.name;
 	fs.rename(temporario, novo, function(err){
 		if(err){
 			res.status(500).json({error: err})
 		}
 		res.json({message: "enviado com sucesso.", file: novo});
 	})
}
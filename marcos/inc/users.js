var conn = require('./db');

module.exports = {

    render(req, res, error){

        res.render("admin/login", {
            body: req.body,
            error
        });
    },

    login(email, password){

    return new Promise((resolve, reject) => {

        conn.query(`
            SELECT * FROM tb_users WHERE email = ?
        `, [
            email
        ], (err, results)=>{

            if(err){

                reject(err);
            } else {

                if(!results.length > 0){
                    // tb_users sem o email inserido pelo usuario
                    reject("E-mail inválido.");
                } else {

                    let row = results[0];

                    if (row.password !== password){

                        reject("A senha que você colocou para o e-mail está incorreta.");
                    } else {

                        resolve(row);
                    }
                    
                }
            }
        });
        
    });
}

};
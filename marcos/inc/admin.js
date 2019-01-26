var conn = require('./db');
var moment = require('moment');
var path = require('path');

module.exports = {

getUsers(){

    return new Promise((resolve, reject)=>{

        conn.query(`
            SELECT * FROM tb_users ORDER BY id`, (err, results) => {

            if (err) {

                reject(err);

            } else {

                resolve(results);
            }
        });
    });
},

saveUsers(fields, files){

return new Promise((resolve, reject)=> {

    fields.photo = `../img/${path.parse(files.photo.path).base}`;

    let query, queryPhoto = '', params = [
        fields.name,
        fields.email,
        fields.password
    ];

    if (files.photo.name) {

        queryPhoto = ',photo = ?';

        params.push(fields.photo);
    }

    if (fields.nivel) {

        queryNivel = ',nivel = ?';

        params.push(fields.nivel);
    }

    if (parseInt(fields.id) > 0) {

        params.push(fields.id);

        query = `
            UPDATE tb_users
            SET name = ?,
                email = ?,
                password = ?
                ${queryPhoto}
                ${queryNivel}
            WHERE id = ?
        `;

    } else {

        if (!files.photo.name) {

            reject('Envie a foto do usuário.');
        } 

        query = `
            INSERT INTO tb_users (name, email, password, photo, nivel)
            VALUES (?, ?, ?, ?, ?)
        `;

    }

    conn.query(query, params, (err, results) => {

        if(err){

            reject(err);

        } else {

            resolve(results);
        } 

    });

});

},

deleteUsers(id){

    return new Promise((resolve, reject) => {

        conn.query(`
            DELETE FROM tb_users WHERE id = ? 
        `, [
            id
        ], (err, results) => {

            if(err){

                reject(err);
            } else {
                
                resolve(results);
            }

        });

    });
},

getPortfolio(){

    return new Promise((resolve, reject) => {

        conn.query(`SELECT * FROM tb_portfolio ORDER BY id`, (err, results) => {

            if (err){

                reject(err);
                
            } else {

                resolve(results);

            }

        });

    });
    
},

savePortfolio(fields, files){

    return new Promise((resolve, reject)=> {
    
        fields.photo = `../img/${path.parse(files.photo.path).base}`;
    
        let query, queryPhoto = '', params = [
            fields.title,
            fields.description
        ];
    
        if (files.photo.name) {
    
            queryPhoto = ',photo = ?';
    
            params.push(fields.photo);
        }
    
        if (parseInt(fields.id) > 0) {
    
            params.push(fields.id);
    
            query = `
                UPDATE tb_portfolio
                SET title = ?,
                    description = ?
                    ${queryPhoto}
                WHERE id = ?
            `;
    
        } else {
    
            if (!files.photo.name) {
    
                reject('Envie a foto do projeto.');
            }
    
            query = `
                INSERT INTO tb_portfolio (title, description, photo)
                VALUES (?, ?, ?)
            `;
    
        }
    
        conn.query(query, params, (err, results) => {
    
            if(err){
    
                reject(err);
    
            } else {
    
                resolve(results);
            }
    
        });
    
    });
    
    },
    
    deletePortfolio(id){
    
        return new Promise((resolve, reject) => {
    
            conn.query(`
                DELETE FROM tb_portfolio WHERE id = ? 
            `, [
                id
            ], (err, results) => {
    
                if(err){
    
                    reject(err);
                } else {
                    
                    resolve(results);
                }
    
            });
    
        });
    },

getSettings(){

    return new Promise((resolve, reject) => {

        conn.query(`SELECT * FROM tb_settings ORDER BY id`, (err, results) => {

            if (err){

                reject(err);
                
            } else {

                resolve(results);

            }

        });

    });
},

saveSettings(fields, files){

    return new Promise((resolve, reject)=> {
    
        fields.icon = `../img/${path.parse(files.icon.path).base}`;
    
        let query, queryIcon = '', params = [
            fields.title,
            fields.description,
            fields.url
        ];
    
        if (files.icon.name) {
    
            queryIcon = ',icon = ?';
    
            params.push(fields.icon);
        }
    
        if (parseInt(fields.id) > 0) {
    
            params.push(fields.id);
    
            query = `
                UPDATE tb_settings
                SET title = ?,
                    description = ?,
                    url = ?
                    ${queryIcon}
                WHERE id = ?
            `;
    
        } 
        
        conn.query(query, params, (err, results) => {
    
            if(err){
    
                reject(err);
    
            } else {
    
                resolve(results);

            }
    
        });
    
    });
    
    },

getParams(req, params){

    return Object.assign({}, {
        moment,
        menus: req.menus,
        user: req.session.user
        
    }, params);
    
},

getAlert(req, params){

    return Object.assign({}, {
        success: "Configurações atualizadas com sucesso!"
        
    }, params);
    
},

getMenus(req){

    let menus = [
        {
            text: "Tela Inicial",
            href: "/admin/",
            icon: "home",
            active: false

        },
        {
            text: "Portfólio",
            href: "/admin/manage-portfolio",
            icon: "archive",
            active: false,
            nivel: "admin"

        },
        {
            text: "E-mail",
            href: "/admin/email",
            icon: "at",
            active: false,
            nivel: "admin"
        },
        {
            text: "Configurações",
            href: "/admin/settings",
            icon: "cog",
            active: false,
            nivel: "admin"

        },

        {
            text: "Visitar Site",
            href: "../",
            icon: "arrow-left",
            active: false

        }
    ];

    menus.map(menu => {

        if(menu.href === `/admin${req.url}`) menu.active = true;
    });


    return menus;
}

};
var express = require('express');
var router = express.Router();
var users = require("./../inc/users");
var admin = require("./../inc/admin");

router.use((req,res,next)=>{

    if (['/login'].indexOf(req.url) === -1 && !req.session.user){
        
        res.redirect("/admin/login");
    } else {

        next();
    }

});

router.use((req, res, next)=>{

    req.menus = admin.getMenus(req);

    next();

});

router.get('/logout', (req, res, next) => {

    delete req.session.user;

    res.redirect("/admin/login");

});

router.get('/', (req, res, next) => {

    admin.getSettings().then(results=>{

        let settings = results[0];

        res.render("admin/index", admin.getParams(req, { settings }));

    });
});

router.get('/login', (req, res, next) => {

    admin.getSettings().then(results=>{

        let settings = results[0];
        
        res.render("admin/login", {
            
            settings,
            body: req.body
        }); 
    });
});

router.post('/login', (req, res, next) => {
    
    if (!req.body.email){

        users.render(req, res, "Preencha o campo e-mail.");

    } else if (!req.body.password) {

        users.render(req, res, "Preencha o campo senha.");

    } else {

        users.login(req.body.email, req.body.password).then(user => {

        req.session.user = user;
        
            res.redirect("/admin");

        }).catch(err => {

            users.render(req, res, err.message || err);
        });
    }

});

router.get('/contacts', (req, res, next) => {

    res.render("admin/contacts", admin.getParams(req));
});

router.get('/emails', (req, res, next) => {

    res.render("admin/emails", admin.getParams(req));
});

router.get('/menus', (req, res, next) => {

    res.render("admin/menus", admin.getParams(req));
});

router.get('/reservations', (req, res, next) => {

    res.render("admin/reservations", admin.getParams(req, {date: {}
    
    }));
});

router.get('/users', (req, res, next) => {

    res.render("admin/users", admin.getParams(req));
});

router.get('/manage-portfolio', (req, res, next) => {

    admin.getPortfolio().then(data=>{

        res.render("admin/manage-portfolio", admin.getParams(req, {

            data
        }));
    });
});

router.post('/manage-portfolio', (req, res, next) => {

    admin.savePortfolio(req.fields, req.files).then(results=>{

        res.send(results);

    }).catch(err=>{

        res.send(err);

    });

});

router.delete('/manage-portfolio/:id', (req, res, next) => {

    admin.deletePortfolio(req.params.id).then(results=>{

        res.send(results);

    }).catch(err=>{

        res.send(err);

    });

});

router.get('/email', (req, res, next) => {

    res.render("admin/email", admin.getParams(req));
});

router.get('/settings', (req, res, next) => {

    admin.getSettings().then(data=>{

        res.render("admin/settings", admin.getParams(req, {
            
            data
        }));
    });
});

router.post('/settings', (req, res, next) => {

    admin.saveSettings(req.fields, req.files).then(results=>{

        res.render(results); 

    }).catch(err=>{

        res.send(err);

    });

});

router.get('/profile', (req, res, next) => {

    res.render("admin/profile", admin.getParams(req));
});

router.post('/profile', (req, res, next) => {

    admin.saveUsers(req.fields, req.files).then(results=>{

        res.send(results);

    }).catch(err=>{

        res.send(err);

    });

});

router.get('/manage-users', (req, res, next) => {

    admin.getUsers().then(data=>{
        
        res.render("admin/manage-users", admin.getParams(req, {
            
            data
        })); 
    });
});

router.post('/manage-users', (req, res, next) => {

    admin.saveUsers(req.fields, req.files).then(results=>{

        res.send(results);

    }).catch(err=>{

        res.send(err);

    });

});

router.delete('/manage-users/:id', (req, res, next) => {

    admin.deleteUsers(req.params.id).then(results=>{

        res.send(results);

    }).catch(err=>{

        res.send(err);

    });

});

module.exports = router;
const express = require("express");

const router = express.Router();

router.post('/login', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;

    if (username === 'rahul' && password === 'nair') {
        res.redirect('../main');
    } else {
        const err = new Error('authentication failed');
        err.status = 500;
        
        // set locals, only providing error in development
        res.locals.message = err.message;
        res.locals.error = req.app.get('env') === 'development' ? err : {};

        // render the error page
        res.status(err.status || 500);
        res.render('error');
    }
});

module.exports = router;
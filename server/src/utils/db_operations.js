module.exports = {
    dropDb: function (db, callback) {
        db.connection.query("SET FOREIGN_KEY_CHECKS = 0")
            .then(function (result) {
                return db.connection.sync({ force: true });
            }).then(function () {
                return db.connection.query("SET FOREIGN_KEY_CHECKS = 1");
            }).catch(function (err) {
                console.log({ isError: true, status: err.message });
            })
            .then(() => { callback() });
    }

}
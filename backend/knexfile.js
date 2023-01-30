module.exports = {
    test: {
        client: "mysql",
        connection: {
            host: "162.241.203.130",
            user: "jonath31_matheus_leal_user",
            password: "MySqlDatabase",
            database: "jonath31_matheus_leal_database",
        },
        migrations: {
            directory: "migrations",
        },
    },
};
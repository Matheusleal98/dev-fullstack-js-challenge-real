/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable("students", (table)=> {
        table.bigInteger("ra").primary();
        table.string("nome").notNull();
        table.string("email").notNull();
        table.bigInteger("cpf").notNull();
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropSchema("students");
};

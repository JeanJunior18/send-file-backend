import Knex from "knex";


export async function up(knex: Knex): Promise<void> {
  return knex.schema.createTable('images', function(table){
    table.increments('id');
    table.string('filename').unique().notNullable();
    table.string('originalname').notNullable();
    table.string('user_id').references('users.id').notNullable().onDelete('CASCADE');
    table.timestamps(true, true)
  })
}


export async function down(knex: Knex): Promise<void> {
  return knex.schema.dropTable('images');
}


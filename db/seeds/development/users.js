
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('table_name').del()
    .then(function () {
      // Inserts seed entries
      return knex('table_name').insert([
        {email: 'puhlalex@gmail.com', password: 'supersecret'},
        {email: 'briancbarrow@gmail.com', password: 'supersecret'}
      ]);
    });
};

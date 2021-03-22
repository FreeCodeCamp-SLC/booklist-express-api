
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('reading_status').del()
    .then(function () {
      // Inserts seed entries
      return knex('reading_status').insert([
        {name: 'To Read'},
        {name: 'Currently Reading'},
        {name: 'On Hold'},
        {name: 'Finished'},
        {name: 'Abandoned'}
      ]);
    });
};

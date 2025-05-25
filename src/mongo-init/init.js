db.createUser({
  user: 'bonsae',
  pwd: 'bonsae',
  roles: [
    {
      role: 'readWrite',
      db: 'bonsae',
    },
  ],
});
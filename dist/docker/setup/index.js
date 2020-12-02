config = {
  _id: 'rs0',
  members: [
    { _id: 0, host: 'db-rs1' },
    { _id: 1, host: 'db-rs2' },
    { _id: 2, host: 'db-rs3' },
  ],
};

rs.initiate(config);
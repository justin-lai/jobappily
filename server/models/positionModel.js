// position:
//  id: integer
//  title: string
//  company: string
//  description: string
//  UserId: integer
const db = require('./../db');

module.exports = {
  get: (id, cb) => {
    if (id) {
      db.Position.findOne({ include: [{ model: db.Event }], where: { id } })
        .then(position => cb(null, position))
        .catch(cb);
    } else {
      db.Position.findAll()
        .then(positions => cb(null, positions))
        .catch(cb);
    }
  },
  post: (newPosition, cb) => {
    db.Position.create(newPosition)
      .then((pos) => cb(null, pos))
      .catch(cb);
  },
  put: (positionChanges, cb) => {
    console.log('EDITS: ', positionChanges);
    db.Position.findOne({ where: { id: positionChanges.id } })
      .then(position => position.update(positionChanges))
      .then((pos) => cb(null, pos))
      .catch(cb);
  },
  remove: (oldPosition, cb) => {
    db.Position.findOne({ where: { id: oldPosition.id } })
      .then(position => position.destroy())
      .then((pos) => cb(null, pos))
      .catch(cb);
  }
};

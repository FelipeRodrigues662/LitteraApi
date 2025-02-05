const defineAssociations = () => {
    // Importações dentro da função
    const User = require('./User.js');
    const Genero = require('./Genero.js');
    const Book = require('./Book.js');
    const TypeTransaction = require('./TypeTransaction.js');
    const StatusBook = require('./StatusBook.js');
    const BookGenero = require('./BookGenero.js');
    const Imagens = require('./Imagems.js');
    const Preferencias = require('./Preferencias.js');
    const Interesses = require('./Interesses.js');
    const Notification = require('./Notification.js')

    // Book
    Book.belongsTo(TypeTransaction, { foreignKey: 'TypeTransactionId' }); 
    Book.belongsTo(StatusBook, { foreignKey: 'StatusBookId' });
    Book.belongsTo(User, { foreignKey: 'ownerBook' });

    Book.belongsToMany(Genero, { through: BookGenero, foreignKey: 'BookId' });
    Genero.belongsToMany(Book, { through: BookGenero, foreignKey: 'GeneroId' });

    // Imagens
    Book.hasMany(Imagens, { foreignKey: 'BookId', as: 'imagens' });
    Imagens.belongsTo(Book, { foreignKey: 'BookId', as: 'book' });

    // Preferencias
    Preferencias.belongsTo(Genero, { foreignKey: 'GeneroId' }); 
    Preferencias.belongsTo(User, { foreignKey: 'UserId' });

    // Interesses
    Book.belongsToMany(User, { through: Interesses, foreignKey: 'BookId', otherKey: 'UserId' });
    User.belongsToMany(Book, { through: Interesses, foreignKey: 'UserId', otherKey: 'BookId' });

    Interesses.belongsTo(Book, { foreignKey: 'BookId' });
    Interesses.belongsTo(User, { foreignKey: 'UserId' });

    Book.hasMany(Interesses, { foreignKey: 'BookId' });
    User.hasMany(Interesses, { foreignKey: 'UserId' });

    // Notifications
    Notification.belongsTo(User, { foreignKey: 'UserId' }); 
    Notification.belongsTo(Book, { foreignKey: 'BookId' }); 
    Notification.belongsTo(User, { foreignKey: 'InterestedUserId', as: 'InterestedUser' });
};

module.exports = defineAssociations;

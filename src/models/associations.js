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

    // Book
    Book.belongsTo(TypeTransaction, { foreignKey: 'TypeTransactionId' }); 
    Book.belongsTo(StatusBook, { foreignKey: 'StatusBookId' });
    Book.belongsTo(User, { foreignKey: 'ownerBook' });

    Book.belongsToMany(Genero, { through: BookGenero, foreignKey: 'BookId' });
    Genero.belongsToMany(Book, { through: BookGenero, foreignKey: 'GeneroId' });

    // Imagens
    Imagens.belongsTo(Book, { foreignKey: 'BookId' });

    // Preferencias
    Preferencias.belongsTo(Genero, { foreignKey: 'GeneroId' }); 
    Preferencias.belongsTo(User, { foreignKey: 'UserId' });

    // Interesses
    Book.belongsToMany(User, { through: Interesses, foreignKey: 'BookId' })
    User.belongsToMany(Book, { through: Interesses, foreignKey: 'UserId' })
};

module.exports = defineAssociations;

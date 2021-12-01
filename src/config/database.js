module.exports = {
    dialect: "postgres",
    host: "localhost",
    port: 5434,
    username: "dev",
    password: "1",
    database: "api_node",
    define: {
      timestamp: true, // cria duas colunas: createdAt e updatedAt
     // underscored: true,// nomeclatura _ (não camelCase) Ex.: customerGroup => customers_group
     // underscoredAll: true,// nomeclatura _ (não camelCase) para colunas da tabela
    },
  };
  
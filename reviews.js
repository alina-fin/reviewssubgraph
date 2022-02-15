const { buildSubgraphSchema } = require('@apollo/subgraph');
const { ApolloServer, gql } = require ('apollo-server-lambda');

const reviews = [
    {
        id: "1",
        rating: 1,
        upc: "a1"
    },
    {
        id: '2',
        rating: 2,
        upc: "a2"
    },
    {
        id: '3',
        rating: 3,
        upc: "a3"
    }
];


const typeDefs = gql`
    type Review{
        id: ID!
        rating: Int
        product: Product
    }

    extend type Product @key(fields: "upc"){
        upc: String! @external
    }

    type Query {
        allReviews: [Review]
    }

`;

const resolvers = {
    Query : {
        allReviews(){
            return reviews
        }
    },
    Review: {
        product(review){
            return {__typename: "Product", upc: review.upc}
        }
    }
};

const server = new ApolloServer({
    schema: buildSubgraphSchema({typeDefs, resolvers})
    });

exports.reviewsHandler = server.createHandler();
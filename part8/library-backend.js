const { ApolloServer, gql, UserInputError, AuthenticationError } = require('apollo-server')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'NEED_HERE_A_SECRET_KEY'

const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

mongoose.set('useFindAndModify', false)
mongoose.set('useUnifiedTopology', true)
mongoose.set('useCreateIndex', true)
const MONGODB_URI = `mongodb+srv://Author:123456abc@freecluster-eomvq.mongodb.net/Books?retryWrites=true&w=majority`
mongoose.connect(MONGODB_URI, { useNewUrlParser: true }).then(() => {console.log('connected to MongoDB')})
.catch((error) => {console.log('error connection to MongoDB:', error.message)})

const typeDefs = gql`
  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Author {
    name: String!
    born: Int
    bookCount: Int!
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks (author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook ( title: String! published: Int! author: String! genres: [String!]! ) : Book!
    editAuthor ( name: String! born: Int! ): Author!
    createUser( username: String! favoriteGenre: String! ): User
    login( username: String! password: String! ): Token
  }
`

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      const query = args.genre ? { genres: { $in: args.genre} } : {}
      return Book.find(query).populate('author', { name: 1, born: 1 })
    },
    allAuthors: () => Author.find({}),

    me: (root, args, context) => {
      return context.currentUser
    }
  },

  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) { throw new AuthenticationError("not authenticated") }

      // Save author if it was not there already
      let author = await Author.findOne({ name: args.author })
      if (!author) {
        const newAuthor = new Author({ name: args.author })
        try { author = await newAuthor.save() } 
        catch (error) { throw new UserInputError(error.message, { invalidArgs: args, }) }
      }

      const book = new Book({ ...args, author : author.id })
      try {
        const savedBook = await book.save()
        return Book.findOne(savedBook).populate('author', { name: 1, born: 1 })
      } catch (error) { throw new UserInputError(error.message, { invalidArgs: args, }) }
    },

    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) { throw new AuthenticationError("not authenticated") }

      const author = await Author.findOne({ name: args.name })
      author.born = args.born
      return author.save()
    },

    createUser: (root, args) => {
      const user = new User({ username: args.username })
  
      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },

    login: async (root, args) => {
      // Check database for user
      const user = await User.findOne({ username: args.username })
      // Check credentials
      if ( !user || args.password !== 'secred' ) {
        throw new UserInputError("wrong credentials")
      }
      // Sign it with jwt and return
      const userForToken = {
        username: user.username,
        id: user._id,
      }
  
      return { value: jwt.sign(userForToken, JWT_SECRET) }
    }

  },

  Author: {
    bookCount: (root) => Book.collection.countDocuments({ author : mongoose.Types.ObjectId(root.id) })
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    console.log('Backend auth: ', auth)
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify( auth.substring(7), JWT_SECRET )
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
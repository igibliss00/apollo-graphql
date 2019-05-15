import getUserId from '../utils/getUserId'

const Query = {
    users(parent, args, { prisma }, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy
        }
        
        if (args.query) {
            opArgs.where = {
                OR: [{
                    name_contains: args.query
                }]
            }
        }

        return prisma.query.users(opArgs, info)
    },
    posts(parent, args, { prisma }, info) {
        const opArgs = {
            first: args.first,
            skip: args.skip,
            after: args.after,
            orderBy: args.orderBy,
            where: {
                published: true
            }
        }
        if(args.query) {
            opArgs.where.OR = [{
                title_contains: args.query
            }, {
                body_contains: args.query
            }]
        }
        return prisma.query.posts(opArgs, info)
    },
    post(parent, args, { prisma }, info) {
        if(!args.id) {
            throw new Error("No search query input")
        }
        return prisma.query.post({
            where: {
                id: args.id
            }, info})
    },
    reviews(parent, args, { prisma }, info) {
      const opArgs = {
          first: args.first,
          skip: args.skip,
          after: args.after,
          orderBy: args.orderBy
      }
      return prisma.query.reviews(opArgs, info)
    },
    me(parent, args, { prisma, request }, info) {
        const userId = getUserId(request)
        
        return prisma.query.user({
            where: {
                id: userId
            }
        })
    }
}

export { Query as default }
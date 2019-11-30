const info= ()=>`Welcome to Polytech Campus GraphQl Api`

async function users(parent,args,context,info){
    const users = await context.prisma.users({})
    return users
}
async function crews(parent,args,context,info){
    const crews = await context.prisma.crews({})
    return crews
}
async function posts(parent,args,context,info){
    const posts = await context.prisma.posts({})
    return posts
}
async function crew(parent,args,context,info){
    const crew = await context.prisma.crew({id:args.id})
    return crew
}
async function post(parent,args,context,info){
    const post = await context.prisma.post({id:args.id})
    return post
}
async function postsByCrew(parent,args,context,info){
    const posts = await context.prisma.crew({id:args.crewId}).posts()
    return posts
}
module.exports={
    info,
    users,
    crews,
    posts,
    crew,
    postsByCrew
}
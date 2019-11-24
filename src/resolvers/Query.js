const info= ()=>`Welcome to Polytech Campus GraphQl Api`

async function users(parent,args,context,info){
    const users = await context.prisma.users({})
    return users
}
module.exports={
    info,
    users
}
const info= ()=>`Welcome to Polytech Campus GraphQl Api`

async function users(parent,args,context,info){
    const users = await context.prisma.users({})
    return users
}
async function crews(parent,args,context,info){
    const crews = await context.prisma.crews({})
    return crews
}
module.exports={
    info,
    users,
    crews
}
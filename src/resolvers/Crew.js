function users(parent,args,context,info){
return context.prisma.crew({id:parent.id}).users()
}
function posts(parent,args,context,info){
    return context.prisma.crew({id:parent.id}).posts()
}
module.exports = {
    users,
    posts
}
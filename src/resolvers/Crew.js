function users(parent,args,context,info){
return context.prisma.crew({id:parent.id}).users()
}
function posts(parent,args,context,info){
    return context.prisma.crew({id:parent.id}).posts({orderBy:'id_DESC'})
}
module.exports = {
    users,
    posts
}
function users(parent,args,context,info){
return context.prisma.crew({id:parent.id}).users()
}
module.exports = {
    users
}
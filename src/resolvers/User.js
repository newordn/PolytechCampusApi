function crews(parent,args,context,info){
    return context.prisma.user({id:parent.id}).crews({orderBy:'id_DESC'})
    }
    function posts(parent,args,context,info){
        return context.prisma.user({id:parent.id}).posts({orderBy:'id_DESC'})
    }
    module.exports = {
        crews,posts
    }
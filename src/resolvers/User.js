function crews(parent,args,context,info){
    return context.prisma.user({id:parent.id}).crews()
    }
    function posts(parent,args,context,info){
        return context.prisma.user({id:parent.id}).posts()
    }
    module.exports = {
        crews,posts
    }
function postedBy(parent,args,context,info){
    return context.prisma.post({id:parent.id}).postedBy()
    }
    function belongTo(parent,args,context,info){
        return context.prisma.post({id:parent.id}).belongTo()
        }
    module.exports = {
        postedBy,
        belongTo
    }
const moment = require('moment')

function postedBy(parent,args,context,info){
    return context.prisma.post({id:parent.id}).postedBy()
    }
    function belongTo(parent,args,context,info){
        return context.prisma.post({id:parent.id}).belongTo()
        }
    const creationDate = async (parent,args,context,info)=>{
        return moment(await context.prisma.post({id:parent.id}).creationDate()).fromNow()
    }
    module.exports = {
        postedBy,
        belongTo,
        creationDate
    }
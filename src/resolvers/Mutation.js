const {APP_SECRET} = require('../helpers/user')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const {getUserId} = require('../helpers/user')


async function signUp(parent,args,context,info)
{
    const password = await bcrypt.hash(args.password,10)
    const user = await context.prisma.createUser({...args,password})
    const token = jwt.sign({userId:user.id},APP_SECRET)
    return {
        token,user
    }
}
async function logIn(parent,args,context,info)
{
    const user =  await context.prisma.user({matricule:args.matricule})
    if(!user){
        throw new Error("L'utilisateur n'existe pas. Inscrivez-vous")
    }
    const valid = await bcrypt.compare(args.password,user.password)
    if(!valid){
        throw new Error('Mot de passe incorrect')
    }
    const token = jwt.sign({userId: user.id},APP_SECRET)
    return {
        token,
        user
    }
}

async function crew(parent,args,context,info)
{
    const userId = getUserId(context)
    const users = args.users.map( v=>({id: v}))
     crew = await context.prisma.createCrew({...args,users:{connect: users}})
    return crew
}
async function post(parent,args,context,info)
{
    const userId = getUserId(context)
    console.log(args.files)
    let files = await Promise.all(args.files.map(async v=>await context.storeUpload(v)))
    files = files.map(v=>`${v.path.substr(1)}`)
    console.log(files)
     post = await context.prisma.createPost({...args,files: {set:files},belongTo:{connect:{id:args.belongTo}},postedBy:{connect:{id:userId}}})
    return post
}


module.exports={
    signUp,
    logIn,
    crew,
    post
}
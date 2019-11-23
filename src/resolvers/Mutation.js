const APP_SECRET = "POLYTECTCAMPUSAPPSECRET"
async function signUp(parent,args,context,info)
{
    
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

module.exports={
    signUp,
    logIn
}
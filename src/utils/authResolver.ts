//curring technique


const authResolver = (resolverFunction) => async (parent, args, context, info) =>   {
 if(!context.req.user){
     throw new Error("No access token, you are not verified!");
 } 
   const resolved = await resolverFunction(parent, args, context, info);
   return resolved;
};

export default authResolver;
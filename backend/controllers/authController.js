

const login=(req,res)=>{

    const user={
        email:"abc.gmail.com",
        passowrd:"123456",
    }

    try{
        const{email,password}=req.body;

        if(!email || !password){
            return res.status(400)
            .json({
                success:false,
                massage:"Email and password are required",
            });
        }
            if(email!==user.email ||password!==user.password){
                return res.status(401).
                joson({
                    success:false,
                    massage:"Invalid email or password",
                });
            
            }

            const token=jwt.sign(
                {
                    email:user.email
                }
                ,process.env.JWT_SECRET,
                {
                    expiresIn:"1h"
                });

            res.status(200).json({
                success:true,
                massage:"Login successful",
                token,
            });
    }   catch(error){

        console.error("Login Error");
        console.error("Login error:",error);
        res.status(500).json({
            success:false,
            massage:"Server error", 
        });
    }
    
    
}
import Lead from '../models/lead.js';
export const lead=async(req,res)=>{
    try {
        const {name,email,city,message,phone}=req.body;
        if(!name || name.trim().length==0 ) return res.status(400).json({message:"Username cannot be blank"})
        if(!email || email.trim().length==0 ) return res.status(400).json({message:"Email cannot be blank"})
        if(!phone) return res.status(400).json({message:"Phone cannot be blank"})
        
        const lead=new Lead({name:name.trim(),email:email.toLowerCase(),city:city?.trim(),message,phone});
        await lead.save();
        return res.status(200).json(lead)

    } catch (error) {
        console.log(error)
        res.status(500).send({message:"Internal Server Error"})
    }
}



const tryCatch = (controller) =>{

    return async(req, res)=>{

        try{

            await controller(req, res);

        } catch (error) {
            console.error('Error during registration:', error);
            res.status(500).json({ success: false, 
                message: 'Something went wrong! Please try again.' 
            });
          }
    }
   
}

export default tryCatch
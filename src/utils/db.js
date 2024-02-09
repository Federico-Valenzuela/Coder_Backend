import { connect } from "mongoose";

const dbConnection = async()=>{
    try {
      await connect(process.env.DB_LINK)  
      console.log(  "Connected to db mongoose")
    } catch (error) {
        console.log(error);
    }
}

export default dbConnection;
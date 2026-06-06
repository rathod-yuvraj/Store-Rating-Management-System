const db = require("../config/db");
const bcrypt = require("bcryptjs");

exports.register = async (req, res) => {

    try {

        const { name, email, password, address } = req.body;

        const hashedPassword =
            await bcrypt.hash(password, 10);

        const sql =
        `INSERT INTO Users
        (Name,Email,Password,Address,Role)
        VALUES(?,?,?,?,?)`;

        db.query(
            sql,
            [name,email,hashedPassword,address,"User"],
            (err,result)=>{

                if(err){
                    return res.status(500).json(err);
                }

                res.status(201).json({
                    message:"User Registered Successfully"
                });
            }
        );

    } catch (error) {

        res.status(500).json(error);
    }
};
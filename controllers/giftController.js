const db = require("../models/connection")

const getAllGift = (req,res ) => {
    const sql = "SELECT * FROM gift"
    db.query(sql, (error, result) => {
        if (error){
            res.status(500).json({
                message: "Error fetching gift",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({ 
                    message: "gift not found"
                });
            } else {
                const formattedData = result.map(data => ({
                    id: data.id,
                    data : {
                        name : data.name,
                        message : data.message,
                    },
                    "message" : "success"
                }))
                res.json(formattedData)
        }
        }      
    })
}

const postGift = (req, res) => {
    const {name,msg} = req.body
    console.log(name,msg);
    const sql = "INSERT INTO gift ( name, message) VALUES (?, ?)"
    const value = [name, msg]
    db.query(sql, value, (error, result) => {
        if (error) {
            res.status(500).json({
                message: "Error inserting gift",
                error: error
            });
        } else {
            res.json({
                message: "Success",
                giftId: result.insertId
            });
        }
    })
}

const deleteGift = (req, res) => {
    const sql = 'DELETE FROM gift';

    db.query(sql, (error, result) => {
        if (error) {
            console.error("Error deleting gift:", error);
            res.status(500).json({
                message: "Error deleting gift",
                error: error
            });
        } else {

            const resetAutoIncrement = 'ALTER TABLE gift AUTO_INCREMENT = 1';
            db.query(resetAutoIncrement, (error, result) => {
                if (error) {
                    console.error("Error resetting auto-increment counter:", error);
                    res.status(500).json({
                        message: "Error resetting auto-increment counter",
                        error: error
                    });
                } else {
                    res.json({
                        message: "deleted"
		            });
	            }
            });
        }
    });
}

const putGift = (req, res) => {
    const giftID = req.params.id
    const name = req.body.name
    const msg = req.body.msg
    console.log(name, msg);
    const sql = "UPDATE gift SET name = ?, message = ? WHERE id = ?"
    const value = [name, msg,giftID]
    db.query(sql, value, (error, result) => {
        if (error) {
            console.error("Error updating gift:", error);
            res.status(500).json({
                message: "Error updating gift",
                error: error
            });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({
                    message: "gift not found"
                });
            } else {
                res.json({
                    message: "Updated"
                });
            }
        }
    });

}

const getGiftbyID = (req, res) => {
    const giftId = req.params.id
    const sql = "SELECT * FROM gift WHERE id = ?"
    db.query(sql, [giftId], (error, result) => {
        if (error) {
            console.error("Error fetching gift:", error);
            res.status(500).json({
                message: "Error fetching gift",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({
                    message: "gift not found"
                });
            } else {
                res.json({
                    id: result[0].id,
                    data : {
                        name : result[0].name,
                        message : result[0].message,
                    },
                    message: "Success"
                });
            }
        }
    })
}

const deleteGiftbyID = (req, res) => {
    const giftId = req.params.id;

    const sql = 'DELETE FROM gift WHERE id = ?';

    db.query(sql, [giftId], (error, result) => {
        if (error) {
            console.error("Error deleting gift:", error);
            res.status(500).json({
                message: "Error deleting gift",
                error: error
            });
        } else {
            if (result.affectedRows === 0) {
                res.status(404).json({
                    message: "gift not found"
                });
            } else {
                res.json({
                    message: "deleted"
                });
            }
        }
    });
}


const paginationGift = (req, res) => {
    const sql = "SELECT * FROM gift"
    const page = parseInt(req.query.page)|| 1;
    const pageSize = parseInt(req.query.pageSize) || 20;
    console.log(page, pageSize)
    const start = (page - 1) * pageSize;
    const end = start + pageSize;
    console.log(start,end)
    db.query(sql, (error, result) => {
        if (error) {
            res.status(500).json({
                message: "Error fetching user",
                error: error
            });
        } else {
            if (result.length === 0) {
                res.status(404).json({
                    message: "user not found"
                });
            } else {
                const paginatedResult = result.slice(start, end);
    
                const formattedData = paginatedResult.map(data => ({
                    id: data.id,
                    data : {
                        name : data.name,
                        message : data.message,
                    },
                    message: "success"
                }));
    
                res.json({
                    page,
                    pageSize: pageSize,
                    totalItems: result.length,
                    totalPages: Math.ceil(result.length / pageSize),
                    data: formattedData
                });
            }
        }
    });
}

module.exports = {
    getAllGift,
    postGift,
    deleteGift,
    putGift ,
    getGiftbyID,
    deleteGiftbyID,
    paginationGift
}
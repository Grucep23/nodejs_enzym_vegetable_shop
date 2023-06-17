import pool from '../configs/connectDB';

let getAllItems = async (req, res) => {
    //http
    // 404 501
    // json/xml => object
    const [rows, fields] = await pool.execute('SELECT * FROM items');

    return res.status(200).json({
        message: 'ok',
        data: rows
    })
}

let createNewItem = async (req, res) => {
    let { name, date, price, amount } = req.body;

    if (!name || !date || !price || !amount) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('insert into items(name, date, price, amount) values (?, ?, ?, ?)',
        [name, date, price, amount]);

    return res.status(200).json({
        message: 'ok'
    })
}

let updateItem = async (req, res) => {
    let { name, date, price, amount, id } = req.body;
    if (!name || !date || !price || !amount || !id) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }

    await pool.execute('update users set name= ?, date = ? , price = ? , amount= ? where id = ?',
        [name, date, price, amount, id]);

    return res.status(200).json({
        message: 'ok'
    })
}

let deleteItem = async (req, res) => {
    let itemId = req.params.id;
    if (!itemId) {
        return res.status(200).json({
            message: 'missing required params'
        })
    }
    await pool.execute('delete from items where id = ?', [itemId])
    return res.status(200).json({
        message: 'ok'
    })
}

module.exports = {
    getAllItems, createNewItem, updateItem, deleteItem
}
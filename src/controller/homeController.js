import pool from '../configs/connectDB';
// import multer from 'multer';


let getHomepage = async (req, res) => {
    const [rows, fields] = await pool.execute('SELECT * FROM items');

    return res.render('index.ejs', { dataItem: rows, test: 'abc string test' })
}

let getDetailPage = async (req, res) => {
    let itemId = req.params.id;
    let [item] = await pool.execute(`select * from items where id = ?`, [itemId]);
    return res.send(JSON.stringify(item))
}

let createNewItem = async (req, res) => {
    let { name, date, price, amount } = req.body;

    await pool.execute('insert into items(name, date, price, amount) values (?, ?, ?, ?)',
        [name, date, price, amount]);

    return res.redirect('/')
}

let deleteItem = async (req, res) => {
    let itemId = req.body.itemId;
    await pool.execute('delete from items where id = ?', [itemId])
    return res.redirect('/');
}

let getEditPage = async (req, res) => {
    let id = req.params.id;
    let [item] = await pool.execute('Select * from items where id = ?', [id]);
    return res.render('update.ejs', { dataItem: item[0] }); // x <- y
}

let postUpdateItem = async (req, res) => {
    let { name, date, price, amount, id } = req.body;

    await pool.execute('update items set name= ?, date = ? , price = ? , amount= ? where id = ?',
        [name, date, price, amount, id]);

    return res.redirect('/');
}

// let getUploadFilePage = async (req, res) => {
//     return res.render('uploadFile.ejs')
// }


// let handleUploadFile = async (req, res) => {

//     if (req.fileValidationError) {

//         return res.send(req.fileValidationError);
//     }
//     else if (!req.file) {
//         return res.send('Please select an image to upload');
//     }

//     // Display uploaded image for Item validation
//     res.send(`You have uploaded this image: <hr/><img src="/image/${req.file.filename}" width="500"><hr /><a href="/upload">Upload another image</a>`);
//     // });
// }


// let handleUploadMultipleFiles = async (req, res) => {

//     if (req.fileValidationError) {
//         return res.send(req.fileValidationError);
//     }
//     else if (!req.files) {
//         return res.send('Please select an image to upload');
//     }

//     let result = "You have uploaded these images: <hr />";
//     const files = req.files;
//     let index, len;

    // Loop through all the uploaded images and display them on frontend
    // for (index = 0, len = files.length; index < len; ++index) {
    //     result += `<img src="/image/${files[index].filename}" width="300" style="margin-right: 20px;">`;
    // }
    // result += '<hr/><a href="/upload">Upload more images</a>';
    // res.send(result);

// }

module.exports = {
    getHomepage, getDetailPage, createNewItem, deleteItem, getEditPage, postUpdateItem,
    // getUploadFilePage, handleUploadFile, handleUploadMultipleFiles
}
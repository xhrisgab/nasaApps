// Import Librarier
const express = require('express');
const multer = require('multer');
const sharp = require('sharp');
const fs = require('fs');

const storageStrategy = multer.memoryStorage();

//const upload = multer({dest: './uploads'}); //Guarda en carpeta local
const upload = multer( {storage: storageStrategy} );


// Import own Functions
//const controller  = require('./controller');
//const response = require('../../../network/response');

const router = express.Router();

/*/render page "adenda/""
router.get('/', function(req, res){
    res.render('adenda')
})
*/

//get Search
// router.get('/', function(req, res){

//     res.render('adenda', {
//         title: 'Reporte de Adendas',
//     })
// })


router.get('/', function(req, res) {
    res.send('Hola Mundo');
})

router.post('/imagen', upload.single('imagen'), async function(req, res) {
    const imagen = req.file;
    const processedImage = sharp(imagen.buffer);
    const resizedImage = processedImage.resize(200,190, {
        fit: 'contain',
    });
    const resizedImageBuffer = await resizedImage.toBuffer();

    fs.writeFileSync('files/prueba.png',resizedImageBuffer)
    
    console.log(resizedImageBuffer.length);

    res.send({ resizeImage: resizedImageBuffer });
})

module.exports = router;
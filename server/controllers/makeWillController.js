const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

const makeWillModel = require('../models/makeWill');

exports.getMakeWill = async (req, res) => {
   return res.json('success');
}

const createEstatePdf = async (req, relativePath) => {
    
    const filePath = path.join(__dirname, '../../public', relativePath);

    const padding = 28; // 1cm in points

    // Create a new PDF document with padding
    const doc = new PDFDocument({
        pdfVersion: '1.5',
        lang: 'ja-JP',
        tagged: true,
        displayTitle: true,
        margin: padding
    });

    // Stream the document to a file
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Set font
    doc.font('./public/assets/fonts/static/NotoSansJP-Bold.ttf');

    // Define table function
    const drawTable = (doc, x, y, table) => {
        const cellPadding = 5;
        const cellHeight = 25;

        table.forEach((row, rowIndex) => {
            let maxHeight = cellHeight;
            let startY = y + rowIndex * maxHeight;

            row.forEach((cell, colIndex) => {
                const startX = x + colIndex * (doc.page.width - padding * 2) / row.length;

                doc.rect(startX, startY, (doc.page.width - padding * 2) / row.length, maxHeight).stroke();
                doc.text(cell, startX + cellPadding, startY + cellPadding, {
                    width: (doc.page.width - padding * 2) / row.length - cellPadding * 2,
                    height: maxHeight - cellPadding * 2,
                    align: 'left'
                });
            });
        });
    };

    // Example of sections and fields with borders
    const tables = [
        [
            ['登録番号', req.body.reg_num],
            ['所在地', req.body.location],
            ['種類', req.body.prop_type]
        ],
        [
            ['所有者', req.body.owner],
            ['住所', req.body.address],
            ['地目', req.body.land_category]
        ],
        [
            ['面積', req.body.area],
            ['取得日', req.body.acq_date],
            ['登録権利', req.body.reg_right]
        ],
        [
            ['前所有者', req.body.prev_owner],
            ['境界の詳細', req.body.boundary_detail],
            ['使用権', req.body.usage_right]
        ],
        [
            ['その他の権利', req.body.other_right],
            ['制限', req.body.restriction],
            ['共有物', req.body.shared_prop]
        ],
        [
            ['所有権割合', req.body.own_ratio],
            ['共同所有者', req.body.co_owner]
        ]
    ];

    let currentY = padding * 2;

    // Draw each table section
    tables.forEach(table => {
        drawTable(doc, padding, currentY, table);
        currentY += table.length * 25 + padding; // Adjust the Y position for the next table
    });
    const textX = doc.page.width - padding - 150; // Calculate the X position with a right margin of 150px

// Add signature and stamp sections (as per the image design)
currentY += padding / 2;
doc.text('', padding, currentY);
doc.text('署名', textX); // Manually place the text without 'align: right'
doc.moveDown(1);
doc.text('押印', textX, currentY + 20); // Manually place the text without 'align: right'



    // currentY += padding * 2;
    // doc.text('', padding, currentY); // Add an empty line
    // doc.text('署名', { align: 'right' }).moveDown(1); // Adjust moveDown to increase space
    // doc.text('押印', { align: 'right' });

    // Finalize the document
    doc.end();

    req.body.will_real_url = relativePath;

    var result = await makeWillModel.UpdateWills(req);

    // writeStream.on('finish', () => {
    //     return res.json(relativePath);
    // });

    // return res.json({
    //   relativePath
    // });
    return relativePath;
}

exports.updateWills = async (req, res) => {
   var result = await makeWillModel.UpdateWills(req);


   res.json(result)
}

exports.getEstateWill = async(req, res) => {
   var result = await makeWillModel.GetEstateWill(req);

   res.json(result)
}

exports.updateEstateWill = async(req, res) => {
    const relativePath = path.join('', Date.now().toString() + '.pdf');
    console.log(relativePath, '--------->')
    req.body.pdf_name = relativePath;


   var result = await makeWillModel.UpdateEstateWill(req);
   const res1 = await createEstatePdf(req, '/data/' + relativePath);

   res.json(relativePath)
}

exports.deleteEstateWill = async(req, res) => {
   var result = await makeWillModel.deleteEstateWill(req);

   res.json(result)
}


exports.createEstateWill = async(req, res) => {
    const relativePath = path.join('', Date.now().toString() + '.pdf');
    req.body.pdf_name = relativePath;
    try {
        var result = await makeWillModel.InsertEstateWill(req);
        const res1 = await createEstatePdf(req, '/data/' + relativePath);
        res.json(relativePath)
    }
    catch(ex)
    {

    }
    
}

exports.getHandWill = async(req, res) => {
    var result = await makeWillModel.GetHandWill(req);
 
    res.json(result)
 }
 
//  exports.updateHandWill = async(req, res) => {
//      const relativePath = path.join('/data', Date.now().toString() + '.pdf');
//      req.body.pdf_name = relativePath;
 
//     var result = await makeWillModel.UpdateEstateWill(req);
//     const res1 = await createEstatePdf(req, relativePath);
 
//     res.json(relativePath)
//  }
 
//  exports.deleteHandWill = async(req, res) => {
//     var result = await makeWillModel.deleteEstateWill(req);
 
//     res.json(result)
//  }
 
 
//  exports.createHandWill = async(req, res) => {
//      const relativePath = path.join('/data', Date.now().toString() + '.pdf');
//      req.body.pdf_name = relativePath;
//      try {
//          var result = await makeWillModel.InsertEstateWill(req);
//          const res1 = await createEstatePdf(req, relativePath);
//          res.json(relativePath)
//      }
//      catch(ex)
//      {
 
//      }
     
//  }

exports.createWills = async (req, res) => {

    console.log(req.body);

   const relativePath = path.join('', Date.now().toString() + '.pdf');
   if(req.body.id != -1)
    {
        req.body.pdf_name = relativePath;
        var result = await makeWillModel.UpdateWills(req);
    }
    else
    {
        req.body.pdf_name = relativePath;
        var result = await makeWillModel.InsertHandWill(req);
    }

    const filePath = path.join(__dirname, '../../public', '/data/' + relativePath);

    // Set padding/margin
    const padding = 28; // 1cm in points

    // Create a new PDF document with padding
    const doc = new PDFDocument({
        pdfVersion: '1.5',
        lang: 'ja-JP',
        tagged: true,
        displayTitle: true,
        margin: padding
    });

    // Stream the document to a file
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Draw the border
    doc.rect(padding / 2, padding / 2, doc.page.width - padding, doc.page.height - padding)
        .stroke();

    // Add text to the document
    doc.font('./public/assets/fonts/static/NotoSansJP-Bold.ttf');

    doc.fontSize(20).text(`財産目録見本: ${req.body.will_real_estate}`, {
        align: 'left',
        width: doc.page.width - padding * 2
    });
    doc.moveDown();
    doc.fontSize(18).text(`遺言書作成日': ${req.body.will_real_estate}`, {
        align: 'left',
        width: doc.page.width - padding * 2
    });
    doc.moveDown();
    doc.moveDown();
    doc.fontSize(16).text(`簡単な説明:`, {
        align: 'left',
        width: doc.page.width - padding * 2
    });
    doc.moveDown();
    doc.fontSize(15).text(req.body.will_note, {
        align: 'left',
        width: doc.page.width - padding * 2
    });

    // Finalize the document
    doc.end();

    req.body.will_real_url = relativePath;

    var result = await makeWillModel.UpdateWills(req);

    writeStream.on('finish', () => {
        // return res.json({will_real_url: relativePath});
    });

    return res.json({
        will_real_url: relativePath
    });
}
const PDFDocument = require('pdfkit');
const path = require('path');
const fs = require('fs');

const makeWillModel = require('../models/makeWill');

exports.getMakeWill = async (req, res) => {
    return res.json('success');
}

// Function to draw a table cell with dynamic height and multiple lines of text, with page overflow handling
function drawTableCellWithMultiLineText(doc, x, y, width, textsArray, rowHeight, paddingY = 3) {
    let currentY = y + paddingY; // Starting Y position
    let fontSize = 7; // Default font size

    // Split the text into lines and process each one
    
    textsArray.forEach((line) => {
        console.log(line, 'line----------->')
        // Check if the line includes "余白"
        if (typeof line === 'string' && line.includes('余白')) {
            doc.fontSize(5); // Set smaller font size for "余白"

            // Measure the text "余白"
            const yohakuWidth = doc.widthOfString('余白');
            const yohakuHeight = doc.heightOfString('余白');

            // Draw a rectangle around "余白"
            const textX = x + 5; // Position the text inside the cell with padding
            doc.rect(textX - 2, currentY + 2, yohakuWidth + 4, yohakuHeight + 4).stroke();

            // Draw the text "余白"
            doc.text('余白', textX, currentY + 4);

            // Reset the font size after drawing
            doc.fontSize(fontSize);
        } else {
            // Draw the regular text with default font size
            doc.text(line, x + 5, currentY, { width: width - 10 });
        }

        // Move to the next line's Y position
        currentY += doc.heightOfString(line, { width: width - 10 });
    });

    // Draw the border of the cell
    doc.rect(x, y, width, rowHeight).stroke();

    // Page overflow handling
    if (y + rowHeight > doc.page.height - 50) {
        doc.addPage(); // Add a new page when content exceeds the page height
        y = 50; // Reset the vertical position to the top of the new page
    }
}


// Function to draw a table row with consistent height for all cells, with page overflow handling
function drawTableRow(doc, x, y, colWidths, textsArray, paddingY = 3) {
    let maxRowHeight = 20; // Minimum row height
    textsArray.forEach((text, index) => {
        const textHeight = doc.heightOfString(Array.isArray(text) ? text.join('\n') : text, { width: colWidths[index] - 10 });
        maxRowHeight = Math.max(maxRowHeight, textHeight + paddingY * 2);
    });

    if (y + maxRowHeight > doc.page.height - 50) {
        doc.addPage(); // Add a new page when content exceeds the page height
        y = 50; // Reset the vertical position to the top of the new page
    }

    let currentX = x;
    textsArray.forEach((text, index) => {
        if (Array.isArray(text)) {
            drawTableCellWithMultiLineText(doc, currentX, y, colWidths[index], text, maxRowHeight, paddingY);
        } else {
            drawTableCellWithMultiLineText(doc, currentX, y, colWidths[index], [text], maxRowHeight, paddingY);
        }
        currentX += colWidths[index];
    });

    return maxRowHeight;
}

// Function to generate the table with page overflow handling
function generateTable(doc, data) {
    const pageWidth = doc.page.width;
    const startX = 20;
    let currentY = 50;
    const paddingY = 3;
    const availableWidth = pageWidth - startX * 2;

    const colWidths = {
        titleSection: availableWidth * 0.5,
        creationDate: availableWidth * 0.05,
        creationGap: availableWidth * 0.2,
        mapNumber: availableWidth * 0.08,
        blankSpace: availableWidth * 0.17,
        estateNumberLabel: availableWidth * 0.15,
        estateNumberValue: availableWidth * 0.85,
        locationLabel: availableWidth * 0.1,
        locationValue: availableWidth * 0.9,
        landNumber: availableWidth * 0.15,
        landUse: availableWidth * 0.15,
        landSize: availableWidth * 0.15,
        reason: availableWidth * 0.4,
        regDate: availableWidth * 0.15,
        distNumber: availableWidth * 0.1,
        docNumber: availableWidth * 0.4,
        certCopyNumber: availableWidth * 0.1,
        year: availableWidth * 0.4,
        rightsRegNumber: availableWidth * 0.13,
        rightsPurpose: availableWidth * 0.3,
        receptionDateNumber: availableWidth * 0.12,
        cause: availableWidth * 0.2,
        receptCause: availableWidth * 0.45,
        rightsHolder: availableWidth * 0.25,
    };

    // Table 1 (Title Section, Creation Date, Map Number, Extra Space)
    const firstRowTexts = [
        '【表 題 部】  (土地の表示)',
        '調製',
        '余白',
        '地図番号',
        '余白'
    ];
    doc.fontSize(8);
    const firstRowWidths = [colWidths.titleSection, colWidths.creationDate, colWidths.creationGap, colWidths.mapNumber, colWidths.blankSpace];
    const firstRowHeight = drawTableRow(doc, startX, currentY, firstRowWidths, firstRowTexts, paddingY);
    currentY += firstRowHeight;
    doc.fontSize(8.5);

    // Second row (Real Estate Number)
    const secondRowTexts = ['【不動産番号】', data.land.estate_num];
    const secondRowWidths = [colWidths.estateNumberLabel, colWidths.estateNumberValue];
    const secondRowHeight = drawTableRow(doc, startX, currentY, secondRowWidths, secondRowTexts, paddingY);
    currentY += secondRowHeight;

    // Third row (Location)
    const thirdRowTexts = ['【所在】', data.land.location];
    const thirdRowWidths = [colWidths.locationLabel, colWidths.locationValue];
    const thirdRowHeight = drawTableRow(doc, startX, currentY, thirdRowWidths, thirdRowTexts, paddingY);
    currentY += thirdRowHeight;

    // Fourth row (Land Number, Land Use, Land Size, Reason, Registration Date)
    const fourthRowTexts = [
        '【①地番】',
        '【②地目】',
        '【③地積】    ㎡',
        '【原因及びその日付】',
        '【登記の日付】'
    ];
    const fourthRowWidths = [
        colWidths.landNumber,
        colWidths.landUse,
        colWidths.landSize,
        colWidths.reason,
        colWidths.regDate
    ];
    const fourthRowHeight = drawTableRow(doc, startX, currentY, fourthRowWidths, fourthRowTexts, paddingY);
    currentY += fourthRowHeight;

    // Fifth row (Values for Land Number, Land Use, etc.)
    const fifthRowTexts = [data.land.land_num, data.land.land_use, data.land.land_area, data.land.cause_date, data.land.reg_date];
    const fifthRowHeight = drawTableRow(doc, startX, currentY, fourthRowWidths, fifthRowTexts, paddingY);
    currentY += fifthRowHeight;

    // Ownership Information
    const ownershipRowTexts = ['【所有者】', data.land.owner];
    const ownershipRowWidths = [colWidths.estateNumberLabel, colWidths.estateNumberValue];
    const ownershipRowHeight = drawTableRow(doc, startX, currentY, ownershipRowWidths, ownershipRowTexts, paddingY);
    currentY += ownershipRowHeight;

    // Add some space between Table 1 and Table 2
    currentY += 10; // Adjust the gap as necessary

    // Table 2 (Rights Section - Ko-ku)
    doc.fontSize(8);
    const rightsKoKuHeader = ['【権利部 (甲区)】 (所有権に関する事項)'];
    const rightsKoKuHeaderWidths = [availableWidth];
    const rightsKoKuHeaderHeight = drawTableRow(doc, startX, currentY, rightsKoKuHeaderWidths, rightsKoKuHeader, paddingY);
    doc.fontSize(8.5);
    currentY += rightsKoKuHeaderHeight;

    const rightsKoKuTexts = [
        '【順位番号】',
        '【登記の目的】',
        '【受付年月日・受付番号】',
        '【原因】',
        '【権利者その他の事項】'
    ];
    const rightsKoKuWidths = [colWidths.rightsRegNumber, colWidths.rightsPurpose, colWidths.receptionDateNumber, colWidths.cause, colWidths.rightsHolder];
    const rightsKoKuRowHeight = drawTableRow(doc, startX, currentY, rightsKoKuWidths, rightsKoKuTexts, paddingY);
    currentY += rightsKoKuRowHeight;

    if(data.owner_right.length !== 0)
        {
            data.owner_right.map((item, index) => {
                let rightsKoKuData = [
                    index + 1,
                    item.reg_purpose,
                    item.reg_date,
                    item.cause,
                    item.other_info
                ];
                let rightsKoKuDataHeight = drawTableRow(doc, startX, currentY, rightsKoKuWidths, rightsKoKuData, paddingY);
                currentY += rightsKoKuDataHeight;
            })
        }

    // const rightsKoKuData2 = [
    //     '2',
    //     '所有権移転',
    //     '令和1年5月7日 第806号',
    //     '平成〇〇年〇月〇日 売買',
    //     '所有者 〇〇市〇〇町1番1号 甲野 太郎'
    // ];
    // const rightsKoKuDataHeight2 = drawTableRow(doc, startX, currentY, rightsKoKuWidths, rightsKoKuData2, paddingY);
    // currentY += rightsKoKuDataHeight2;

    // Add some space between Table 2 and Table 3
    currentY += 10; // Adjust the gap as necessary

    // Table 3 (Rights Section - Otsu-ku)
    doc.fontSize(8);
    const rightsOtsuKuHeader = ['【権利部 (乙区)】 (所有権以外の権利に関する事項)'];
    const rightsOtsuKuHeaderWidths = [availableWidth];
    const rightsOtsuKuHeaderHeight = drawTableRow(doc, startX, currentY, rightsOtsuKuHeaderWidths, rightsOtsuKuHeader, paddingY);
    doc.fontSize(8.5);
    currentY += rightsOtsuKuHeaderHeight;

    const rightsOtsuKuTexts = [
        '【順位番号】',
        '【登記の目的】',
        '【受付年月日・受付番号】',
        '【原因】',
        '【権利者その他の事項】'
    ];
    const rightsOtsuKuWidths = [colWidths.rightsRegNumber, colWidths.rightsPurpose, colWidths.receptionDateNumber, colWidths.cause, colWidths.rightsHolder];
    const rightsOtsuKuRowHeight = drawTableRow(doc, startX, currentY, rightsOtsuKuWidths, rightsOtsuKuTexts, paddingY);
    currentY += rightsOtsuKuRowHeight;

    if(data.other_right.length !== 0)
        {
            data.other_right.map((item, index) => {
                let rightsKoKuData = [
                    index + 1,
                    item.reg_purpose,
                    item.reg_date,
                    item.cause,
                    item.other_info
                ];
                let rightsKoKuDataHeight = drawTableRow(doc, startX, currentY, rightsKoKuWidths, rightsKoKuData, paddingY);
                currentY += rightsKoKuDataHeight;
            })
        }

    // const rightsOtsuKuData = [
    //     '1',
    //     '抵当権設定',
    //     '令和1年5月7日 第806号',
    //     '金銭消費貸借同日設定',
    //     ['債権額 金3000万円', '利息 年5%', '損害金 年6%', '債務者 特別区南都町一丁目1番1号 甲野 太郎', '連帯債務者 〇〇県〇〇市〇〇丁目〇〇番〇〇号', '株式会社 〇〇〇〇〇〇']
    // ];
    // const rightsOtsuKuDataHeight = drawTableRow(doc, startX, currentY, rightsOtsuKuWidths, rightsOtsuKuData, paddingY);
    // currentY += rightsOtsuKuDataHeight;

    // Add some space before the fourth table
    currentY += 10;

    // Fourth Table - Joint Mortgage Information
    doc.fontSize(8);
    const fourthTableHeader = ['共同担保目録'];
    const fourthTableHeaderWidths = [availableWidth];
    const fourthTableHeaderHeight = drawTableRow(doc, startX, currentY, fourthTableHeaderWidths, fourthTableHeader, paddingY);
    doc.fontSize(8.5);
    currentY += fourthTableHeaderHeight;

    const fourthNumberHeader = ['配号及び番号', data.cert_info.cert_num, '謄製', data.cert_info.cert_copy];
    const fourthNumberHeaderWidths = [colWidths.distNumber, colWidths.docNumber, colWidths.distNumber, colWidths.docNumber,];
    const fourthNumberHeaderHeight = drawTableRow(doc, startX, currentY, fourthNumberHeaderWidths, fourthNumberHeader, paddingY);
    currentY += fourthNumberHeaderHeight;

    const fourthTableTexts = [
        '【番号】',
        '【担保の目的である権利の表示】',
        '【順位番号】',
        '【予備】',
    ];
    const fourthTableWidths = [colWidths.rightsRegNumber, colWidths.rightsPurpose, colWidths.receptionDateNumber, colWidths.receptCause];
    const fourthTableRowHeight = drawTableRow(doc, startX, currentY, fourthTableWidths, fourthTableTexts, paddingY);
    currentY += fourthTableRowHeight;

    if(data.cert_info.mort_info.length !== 0)
        {
            data.cert_info.mort_info.map((item, index) => {
                let data = [
                    index + 1,
                    item.rights_desc,
                    item.ranking_number,
                    item.other
                ];
                let dataHeight = drawTableRow(doc, startX, currentY, fourthTableWidths, data, paddingY);
                currentY += dataHeight;
            })
        }

    // const fourthTableData = [
    //     '1',
    //     '特別区南都町一丁目 101番の土地',
    //     '1',
    //     '余白',
    // ];
    // const fourthTableDataHeight = drawTableRow(doc, startX, currentY, fourthTableWidths, fourthTableData, paddingY);
    // currentY += fourthTableDataHeight;

    // const fourthTableData2 = [
    //     '2',
    //     '特別区南都町一丁目 101番の建物',
    //     '1',
    //     '余白',
    // ];
    // const fourthTableDataHeight2 = drawTableRow(doc, startX, currentY, fourthTableWidths, fourthTableData2, paddingY);
    // currentY += fourthTableDataHeight2;

    // here is bottom section
    drawBottomSection(doc, data);
    // 
}

// Function to calculate the height of the bottom section
function calculateBottomSectionHeight(doc) {
    let bottomSectionHeight = 0;
    bottomSectionHeight += doc.heightOfString('これは登記記録に記録されている事項の全部を証明した書面である。');
    bottomSectionHeight += doc.heightOfString('令和2年1月14日');
    bottomSectionHeight += doc.heightOfString('関東法務局特別出張所');
    bottomSectionHeight += 30; // For spacing and the larger font size text
    bottomSectionHeight += doc.heightOfString('＊下線のあるものは抹消事項であることを示す。');
    bottomSectionHeight += doc.heightOfString('整 理 番 号 D12445 (1/3)');
    return bottomSectionHeight;
}

// First, create a utility function to add page numbers
function addPageNumbers(doc, totalPages) {
    for (let i = 1; i <= totalPages; i++) {
        doc.switchToPage(i - 1); // Go to the page by index (0-based)
        const pageNumberText = `${i}/${totalPages}`;
        doc.fontSize(8).text(pageNumberText, doc.page.width - 40, doc.page.height - 30, { align: 'right' });
    }
}

// Function to place bottom section text at the bottom of the current page
function drawBottomSection(doc, data) {
    const marginBottom = 50; // Define a margin from the bottom of the page
    const bottomSectionHeight = calculateBottomSectionHeight(doc);
    const startY = doc.page.height - marginBottom - bottomSectionHeight; // Starting Y based on available space

    // Now draw the bottom section text
    let currentY = startY;
    doc.text('これは登記記録に記録されている事項の全部を証明した書面である。', 20, currentY);
    
    currentY += 20;
    doc.text(data.land.date, 20, currentY);
    
    currentY += 10;
    doc.text('関東法務局特別出張所', 20, currentY);
    doc.text('登記官', 20 + doc.page.width * 0.46, currentY); // Adjust this to center the text if needed
    
    doc.fontSize(10);
    doc.text('法 務 八 郎', 20 + doc.page.width * 0.7, currentY - 5);
    
    doc.fontSize(8.5);
    currentY += 30;

    doc.fontSize(6);
    doc.text('＊下線のあるものは抹消事項であることを示す。', 20, currentY);
    doc.fontSize(8.5);
    doc.text('整 理 番 号 ' + data.land.serial, 20 + doc.page.width * 0.5, currentY);
}


// Function to generate the PDF
function generatePDF(relativePath, data) {
    const padding = 28; // 1cm in points
    const doc = new PDFDocument({
        pdfVersion: '1.5',
        lang: 'ja-JP',
        tagged: true,
        displayTitle: true,
        margin: padding,
        bufferPages: true
    });

    // Set font
    doc.font('./public/assets/fonts/static/NotoSansJP-Regular.ttf');

    // Save the PDF to a file
    const filePath = path.join(__dirname, '../../public', relativePath);
    const writeStream = fs.createWriteStream(filePath);
    doc.pipe(writeStream);

    // Call the function to draw the table and content
    generateTable(doc, data);
    
    // Global Edits to All Pages (Header/Footer, etc)
    let pages = doc.bufferedPageRange();
    for (let i = 0; i < pages.count; i++) {
        doc.switchToPage(i);
        
        // Header: Add page number (optional, can be removed if only footer is needed)
        let oldTopMargin = doc.page.margins.top;
        doc.page.margins.top = 0; // Have to remove top margin in order to write into it
        // doc.text(
        //     `Page: ${i + 1} of ${pages.count}`,
        //     0,
        //     oldTopMargin / 2, // Centered vertically in top margin
        //     { align: 'center' }
        // );
        doc.page.margins.top = oldTopMargin; // Restore top margin

        // Footer: Add page number at the bottom right
        let oldBottomMargin = doc.page.margins.bottom;
        doc.page.margins.bottom = 0; // Have to remove bottom margin in order to write into it
        doc.text(
            `${i + 1} / ${pages.count}`,
            doc.page.width - 60, // Positioned at the right edge (40 points from the right)
            doc.page.height - (oldBottomMargin / 2), // Centered vertically in bottom margin
            { align: 'right' }
        );
        doc.page.margins.bottom = oldBottomMargin; // Restore bottom margin
    }

    // Finalize the PDF and write to file
    doc.end();
}

const createEstatePdf = async (req, relativePath) => {

    //     const filePath = path.join(__dirname, '../../public', relativePath);

    //     const padding = 28; // 1cm in points

    //     // Create a new PDF document with padding
    //     const doc = new PDFDocument({
    //         pdfVersion: '1.5',
    //         lang: 'ja-JP',
    //         tagged: true,
    //         displayTitle: true,
    //         margin: padding
    //     });

    //     // Stream the document to a file
    //     const writeStream = fs.createWriteStream(filePath);
    //     doc.pipe(writeStream);

    //     // Set font
    //     doc.font('./public/assets/fonts/static/NotoSansJP-Bold.ttf');

    //     // Define table function
    //     const drawTable = (doc, x, y, table) => {
    //         const cellPadding = 5;
    //         const cellHeight = 25;

    //         table.forEach((row, rowIndex) => {
    //             let maxHeight = cellHeight;
    //             let startY = y + rowIndex * maxHeight;

    //             row.forEach((cell, colIndex) => {
    //                 const startX = x + colIndex * (doc.page.width - padding * 2) / row.length;

    //                 doc.rect(startX, startY, (doc.page.width - padding * 2) / row.length, maxHeight).stroke();
    //                 doc.text(cell, startX + cellPadding, startY + cellPadding, {
    //                     width: (doc.page.width - padding * 2) / row.length - cellPadding * 2,
    //                     height: maxHeight - cellPadding * 2,
    //                     align: 'left'
    //                 });
    //             });
    //         });
    //     };

    //     // Example of sections and fields with borders
    //     const tables = [
    //         [
    //             ['登録番号', req.body.reg_num],
    //             ['所在地', req.body.location],
    //             ['種類', req.body.prop_type]
    //         ],
    //         [
    //             ['所有者', req.body.owner],
    //             ['住所', req.body.address],
    //             ['地目', req.body.land_category]
    //         ],
    //         [
    //             ['面積', req.body.area],
    //             ['取得日', req.body.acq_date],
    //             ['登録権利', req.body.reg_right]
    //         ],
    //         [
    //             ['前所有者', req.body.prev_owner],
    //             ['境界の詳細', req.body.boundary_detail],
    //             ['使用権', req.body.usage_right]
    //         ],
    //         [
    //             ['その他の権利', req.body.other_right],
    //             ['制限', req.body.restriction],
    //             ['共有物', req.body.shared_prop]
    //         ],
    //         [
    //             ['所有権割合', req.body.own_ratio],
    //             ['共同所有者', req.body.co_owner]
    //         ]
    //     ];

    //     let currentY = padding * 2;

    //     // Draw each table section
    //     tables.forEach(table => {
    //         drawTable(doc, padding, currentY, table);
    //         currentY += table.length * 25 + padding; // Adjust the Y position for the next table
    //     });
    //     const textX = doc.page.width - padding - 150; // Calculate the X position with a right margin of 150px

    // // Add signature and stamp sections (as per the image design)
    // currentY += padding / 2;
    // doc.text('', padding, currentY);
    // doc.text('署名', textX); // Manually place the text without 'align: right'
    // doc.moveDown(1);
    // doc.text('押印', textX, currentY + 20); // Manually place the text without 'align: right'



    //     // currentY += padding * 2;
    //     // doc.text('', padding, currentY); // Add an empty line
    //     // doc.text('署名', { align: 'right' }).moveDown(1); // Adjust moveDown to increase space
    //     // doc.text('押印', { align: 'right' });

    //     // Finalize the document
    //     doc.end();

    //     req.body.will_real_url = relativePath;

    //     var result = await makeWillModel.UpdateWills(req);

    //     // writeStream.on('finish', () => {
    //     //     return res.json(relativePath);
    //     // });

    //     // return res.json({
    //     //   relativePath
    //     // });
    //     return relativePath;
    generatePDF(relativePath, req.body);
    return "";
}

// const createEstatePdf = async (req, relativePath) => {

//     const filePath = path.join(__dirname, '../../public', relativePath);

//     const padding = 28; // 1cm in points

//     // Create a new PDF document with padding
//     const doc = new PDFDocument({
//         pdfVersion: '1.5',
//         lang: 'ja-JP',
//         tagged: true,
//         displayTitle: true,
//         margin: padding
//     });

//     // Stream the document to a file
//     const writeStream = fs.createWriteStream(filePath);
//     doc.pipe(writeStream);

//     // Set font
//     doc.font('./public/assets/fonts/static/NotoSansJP-Bold.ttf');

//     // Define table function
//     const drawTable = (doc, x, y, table) => {
//         const cellPadding = 5;
//         const cellHeight = 30;

//         table.forEach((row, rowIndex) => {
//             let maxHeight = cellHeight;
//             let startY = y + rowIndex * maxHeight;

//             row.forEach((cell, colIndex) => {
//                 const startX = x + colIndex * (doc.page.width - padding * 2) / row.length;

//                 // Draw cell border
//                 doc.rect(startX, startY, (doc.page.width - padding * 2) / row.length, maxHeight).stroke();

//                 // Add text in the cell
//                 doc.text(cell, startX + cellPadding, startY + cellPadding, {
//                     width: (doc.page.width - padding * 2) / row.length - cellPadding * 2,
//                     align: 'left'
//                 });
//             });
//         });
//     };

//     // Example of sections and fields with borders
//     const tables = [
//         [
//             ['登録番号 (Registration Number)', req.body.reg_num],
//             ['所在地 (Location)', req.body.location],
//             ['種類 (Type of Property)', req.body.prop_type]
//         ],
//         [
//             ['所有者 (Owner)', req.body.owner],
//             ['住所 (Address)', req.body.address],
//             ['地目 (Land Category)', req.body.land_category]
//         ],
//         [
//             ['面積 (Area)', req.body.area],
//             ['取得日 (Acquisition Date)', req.body.acq_date],
//             ['登録権利 (Registered Rights)', req.body.reg_right]
//         ],
//         [
//             ['前所有者 (Previous Owner)', req.body.prev_owner],
//             ['境界の詳細 (Boundary Details)', req.body.boundary_detail],
//             ['使用権 (Usage Rights)', req.body.usage_right]
//         ],
//         [
//             ['その他の権利 (Other Rights)', req.body.other_right],
//             ['制限 (Restrictions)', req.body.restriction],
//             ['共有物 (Shared Property)', req.body.shared_prop]
//         ],
//         [
//             ['所有権割合 (Ownership Ratio)', req.body.own_ratio],
//             ['共同所有者 (Co-owner)', req.body.co_owner]
//         ]
//     ];

//     let currentY = padding * 2;

//     // Draw each table section with section titles
//     tables.forEach((table, index) => {
//         // Add section titles for each group
//         doc.fontSize(12).font('./public/assets/fonts/static/NotoSansJP-Bold.ttf');
//         doc.text(`Section ${index + 1}`, padding, currentY);
//         currentY += padding; // Add space after the title

//         // Draw the table
//         drawTable(doc, padding, currentY, table);
//         currentY += table.length * 30 + padding; // Adjust the Y position for the next table
//     });

//     // Position signature and seal sections (bottom right)
//     const textX = doc.page.width - padding - 150; // Adjust based on the image layout

//     currentY += padding * 2;
//     doc.fontSize(12).font('./public/assets/fonts/static/NotoSansJP-Bold.ttf');
//     doc.text('署名 (Signature)', textX, currentY);
//     currentY += 25; // Add space for signature

//     doc.text('押印 (Seal)', textX, currentY + 20);

//     // Finalize the document
//     doc.end();

//     req.body.will_real_url = relativePath;

//     var result = await makeWillModel.UpdateWills(req);

//     return relativePath;
// };


exports.updateWills = async (req, res) => {
    var result = await makeWillModel.UpdateWills(req);


    res.json(result)
}

exports.getEstateWill = async (req, res) => {
    var result = await makeWillModel.GetEstateWill(req);

    res.json(result)
}

exports.updateEstateWill = async (req, res) => {
    const relativePath = path.join('', Date.now().toString() + '.pdf');
    console.log(relativePath, '--------->')
    req.body.pdf_name = relativePath;


    // var result = await makeWillModel.UpdateEstateWill(req);
    const res1 = await createEstatePdf(req, '/data/' + relativePath);

    await makeWillModel.UpdateUserMakeWill(req);
    

    res.json(relativePath)
}

exports.deleteEstateWill = async (req, res) => {
    var result = await makeWillModel.deleteEstateWill(req);

    res.json(result)
}


exports.createEstateWill = async (req, res) => {
    const relativePath = path.join('', Date.now().toString() + '.pdf');
    req.body.pdf_name = relativePath;
    try {
        // var result = await makeWillModel.InsertEstateWill(req);
        const res1 = await createEstatePdf(req, '/data/' + relativePath);
        await makeWillModel.UpdateUserMakeWill(req);
        res.json(relativePath)
    } catch (ex) {

    }

}

exports.getHandWill = async (req, res) => {
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
    if (req.body.id != -1) {
        req.body.pdf_name = relativePath;
        var result = await makeWillModel.UpdateWills(req);
    } else {
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

    console.log(relativePath)

    var result = await makeWillModel.UpdateWills(req);

    writeStream.on('finish', () => {
        // return res.json({will_real_url: relativePath});
    });

    return res.json({
        will_real_url: relativePath
    });
}
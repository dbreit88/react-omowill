const { AsyncCompiler } = require('sass');
const getConnection = require('../util/dbconnection');

const userMakeWillModel = {
    GetMakeWill: async (req) => {
        const userID = req.body.id;
        const connection = await getConnection();
        const [result] = await connection.query('select * from user_make_will where user_id = ?;', [userID]);

        return result;
    },

    UpdateWills: async (req) => {
        const query = `
            UPDATE user_make_will 
            SET 
                will_real_estate = ?, 
                will_real_url = ?, 
                will_status = ?,
                will_update_date = NOW() 
            WHERE id = ?`;

        const connection = await getConnection();
        const [result] = await connection.query(query, [
            req.body.will_real_estate,
            req.body.will_real_url,
            req.body.will_status,
            req.body.id]);

        return result
    },
    
    InsertEstateWill: async (req) => {
        const connection = await getConnection();
        const [result] = await connection.query(
            `INSERT INTO user_estate_pdf (pdf_name, reg_num, location, prop_type, owner, address, land_category, area, acq_date, reg_right, prev_owner, boundary_detail, usage_right, other_right, restriction, shared_prop, own_ratio, co_owner, created_at, updated_at) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
                req.body.pdf_name,
                req.body.reg_num,
                req.body.location,
                req.body.prop_type,
                req.body.owner,
                req.body.address,
                req.body.land_category,
                req.body.area,
                req.body.acq_date,
                req.body.reg_right,
                req.body.prev_owner,
                req.body.boundary_detail,
                req.body.usage_right,
                req.body.other_right,
                req.body.restriction,
                req.body.shared_prop,
                req.body.own_ratio,
                req.body.co_owner,
                'NOW()',
                'NOW()'
            ]
        );

        const query1 = `UPDATE user_make_will SET will_real_estate = ? where id = ?`;
        const [result1] = await connection.query(query1, [req.body.pdf_name, req.body.userId]);

        return result
    },

    UpdateEstateWill: async (req) => {
            
        const query = `UPDATE user_estate_pdf SET pdf_name = ?, reg_num = ?, location = ?, prop_type = ?, owner = ?, address = ?, land_category = ?, area = ?, acq_date = ?, reg_right = ?, prev_owner = ?, boundary_detail = ?, usage_right = ?, other_right = ?, restriction = ?, shared_prop = ?, own_ratio = ?, co_owner = ?, updated_at = NOW() where id = ?`;
        const connection = await getConnection();
        console.log(req.body)
        const [result] = await connection.query(query, [
            req.body.pdf_name,
            req.body.reg_num,
            req.body.location,
            req.body.prop_type,
            req.body.owner,
            req.body.address,
            req.body.land_category,
            req.body.area,
            req.body.acq_date,
            req.body.reg_right,
            req.body.prev_owner,
            req.body.boundary_detail,
            req.body.usage_right,
            req.body.other_right,
            req.body.restriction,
            req.body.shared_prop,
            req.body.own_ratio,
            req.body.co_owner,
            req.body.id]);
    

        const query1 = `UPDATE user_make_will SET will_real_estate = ? where id = ?`;
        const [result1] = await connection.query(query1, [req.body.pdf_name, req.body.userId]);
    

        return result
    },

    UpdateUserMakeWill: async (req) => {
        const connection = await getConnection();
        const query = `UPDATE user_make_will SET will_real_estate = ? where id = ?`;
        const [result] = await connection.query(query, [req.body.pdf_name, req.body.userId]);
    

        return result;
    },

    

    DeleteEstateWill: async (req) => {
        const pdf_name = req.body.pdf_name;
        const connection = await getConnection();
        const [result] = await connection.query('DELETE * from user_estate_pdf where pdf_name = ?;', [pdf_name]);

        return result;
    },

    InsertHandWill: async (req) => {
        console.log('--------------------->1')
        const connection = await getConnection();
        const [result] = await connection.query(
            `INSERT INTO user_will_content (pdf_name, will_note) VALUES (?, ?)`,
            [
                req.body.pdf_name,
                req.body.will_note,
            ]
        );
        console.log('--------------------->2')

        const query1 = `UPDATE user_make_will SET will_real_url = ? where id = ?`;
        const [result1] = await connection.query(query1, [req.body.pdf_name, req.body.userId]);

        return result;
    },

    // UpdateEstateWill: async (req) => {
            
    //     const query = `UPDATE user_will_content SET pdf_name = ?, will_note = ? where id = ?`;
    //     const connection = await getConnection();
    //     const [result] = await connection.query(query, [
    //         req.body.pdf_name,
    //         req.body.will_note,
    //         req.body.id]);

    //     const query1 = `UPDATE user_make_will SET will_real_url = ? where id = ?`;
    //     const [result1] = await connection.query(query1, [req.body.pdf_name, req.body.userId]);
    

    //     return result
    // },

    GetEstateWill: async (req) => {
        const pdf_name = req.body.pdf_name;
        const connection = await getConnection();
        const [result] = await connection.query('select * from user_estate_pdf where pdf_name = ?;', [pdf_name]);

        return result;
    },

    GetHandWill: async (req) => {
        const pdf_name = req.body.pdf_name;
        const connection = await getConnection();
        const [result] = await connection.query('select * from user_will_content where pdf_name = ?;', [pdf_name]);

        return result;
    },

    DeleteEstateWill: async (req) => {
        const pdf_name = req.body.pdf_name;
        const connection = await getConnection();
        const [result] = await connection.query('DELETE * from user_will_content where pdf_name = ?;', [pdf_name]);

        return result;
    }
}

module.exports = userMakeWillModel;
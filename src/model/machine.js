
var db = require('../db');

async function prices(req, resp) {
    const { machineId } = req.params;
    let sql, result;
    
    sql = `select pricing_id from machines where id = $1 limit 1`;
    result = await db.query(sql, [machineId]);
    if(!result.rowCount) return resp.status(404).send({error: "machine id not found"});

    const pricing_id = result.rows[0]['pricing_id'];
    sql = `select p2.id PRICING_ID, p2.name PRICING_NAME,
                p3.id PRICE_ID, p3.name PRICE_NAME, p3.price PRICE_PRICE,
                p3.value PRICE_VALUE from 
                pricings p2, pricing_price pp, prices p3
                where p2.id = $1 
                and pp.pricing_id = p2.id and p3.id = pp.price_id`;
                    
    if(!pricing_id){
        result = await db.query(sql, [999]); // 999 : default pricing id
        return resp.json({"default_pricing" : result.rows.map(r => ({price: r['price_price'], name: r['PRICE_NAME'], value:r['price_value']}))});
    }    

    result = await db.query(sql, [pricing_id]);

    if(!result.rowCount){
        return resp.status(404).send();
    }

    return resp.json({id: result.rows[0].pricing_id,
                      name: result.rows[0].pricing_name,
                      pricing: result.rows.map(r => ({price: r['price_price'], name: r['PRICE_NAME'], value:r['price_value']})) });
}

async function setPriceModel(req, resp){
    const { machineId, pmId } = req.params;
    
    const sql1 = `select * from pricings where id = $1`;
    const result1 = await db.query(sql1, [pmId]);
    if(!result1.rowCount) return resp.status(404).json({error: "invalid pricing model id"});
    
    const sql = `update machines set pricing_id = $2 where id = $1`;
    const result = await db.query(sql, [machineId, pmId]);
    if(!result.rowCount) return resp.status(404).json({error: "invalid machine Id"});

    resp.send();
}

async function unsetPriceModel(req, resp){
    const { machineId, pmId } = req.params;
    
    const sql1 = `select * from pricings where id = $1`;
    const result1 = await db.query(sql1, [pmId]);
    if(!result1.rowCount) return resp.status(404).json({error: "invalid pricing model id"});
    
    const sql = `update machines set pricing_id = NULL where id = $1`;
    const result = await db.query(sql, [machineId]);
    if(!result.rowCount) return resp.status(404).json({error: "invalid machine Id"});

    resp.send();
}

function mokeup(req, resp) {
    resp.send('ok');
}

module.exports = {
    prices,
    setPriceModel,
    unsetPriceModel
}
const cds = require('@sap/cds');
const { Books } = cds.entities

module.exports = (srv) => {
    srv.after('READ', 'Books', each => {if (each.stock > 101) each.title += " -- 11% discount!" });
    srv.before('CREATE', 'Orders', _reduceStock);
}

async function _reduceStock (req) {
    const tx = cds.transaction(req), order = req.data;
    if(order.Items){
        const affectedRows = await tx.run(order.Items.map(item => 
            UPDATE(Books).where({ID:item.book_ID})
            .and(`stock >=`, item.amount)
            .set(`stock -=`, item.amount)    
            ))
        if (affectedRows.some(row => !row)) req.error(409, 'Sold out, sorry!')
    }
}
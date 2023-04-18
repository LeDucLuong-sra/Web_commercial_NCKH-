
const MenuController = {
    getLienHe: async(req,res)=>{
        res.render('menu/lienhe',{layout: false});
    },
    getTuyenDung: async(req,res)=>{
        res.render('menu/tuyendung',{layout: false});
    }
    
}
module.exports = MenuController;
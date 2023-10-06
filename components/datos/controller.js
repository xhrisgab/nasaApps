// Import libraries and utils for this module
const store  = require('./store');
const Retorna = require('../../../lib/utils');
const adendaPDF = require('../../../lib/jspdf_adenda');
const hddPDF = require('../../../lib/jspdf_hdd');
const otuPDF = require('../../../lib/jspdf_otu');

function getAdenda(id){    
    return new Promise (async (resolve, reject)=> {
        if(!id){
            console.error('[Controller Adenda] Campo Chassis vacio')
            reject('Campo Chassis vacio')
        }
        await store.exist(id)
            .then((x) =>{
                if(x[0]){
                    //console.log(x[0].ct_vendedore);
                    x[0].saldoLiteral=Retorna.NumeroALetras(x[0].precio - x[0].conversion);
                    x[0].saldo=Retorna.RetornaNunero(x[0].precio - x[0].conversion);
                    x[0].precioLiteral=Retorna.NumeroALetras(x[0].precio);
                    x[0].precio=Retorna.RetornaNunero(x[0].precio);
                    x[0].conversionLiteral=Retorna.NumeroALetras(x[0].conversion);
                    x[0].conversion=Retorna.RetornaNunero(x[0].conversion);
                    resolve([x[0],x[1],x[2]]);
                } else {
                    resolve([{chassis:0},{contrato:0}]);
                }
            })
            .catch(err=> {
                reject(err);
                return false;
            })
    });
}

function reportePdf(y){
    return new Promise (async (resolve, reject)=> {
        var yy=[];
        await store.exist(y)
            .then((x) =>{
                if(x[0]){
                    //console.log(x[0].ct_vendedore);
                    x[0].saldoLiteral=Retorna.NumeroALetras(x[0].precio - x[0].conversion);
                    x[0].saldo=Retorna.RetornaNunero(x[0].precio - x[0].conversion);
                    x[0].precioLiteral=Retorna.NumeroALetras(x[0].precio);
                    x[0].precio=Retorna.RetornaNunero(x[0].precio);
                    x[0].conversionLiteral=Retorna.NumeroALetras(x[0].conversion);
                    x[0].conversion=Retorna.RetornaNunero(x[0].conversion);
                    yy=[x[0],x[1],x[2]];
                }
                adendaPDF(yy).then((ff)=>{
                    resolve(ff);
                }).catch(err=>{
                    reject(err);
                    return false;
                });
            })
            .catch(err=> {
                reject(err);
                return false;
            })
    });
/*    console.log(x);
    var yy = adendaPDF(x);
    return yy;*/
};
function reportHHD(y){
    return new Promise (async (resolve, reject)=> {
        var yy=[];
        await store.exist(y)
            .then((x) =>{
                if(x[0]){
                    //console.log(x[0].ct_vendedore);
                    x[0].precioLista=Retorna.RetornaNunero(x[0].precio_fabrica);
                    x[0].precioTotal=Retorna.RetornaNunero(x[0].precio);
                    x[0].descPorcent=Retorna.RetornaNunero(x[0].desc_a);
                    x[0].descTotal=Retorna.RetornaNunero(x[0].desc_b);
                    yy=[x[0],x[1],x[2]];
                }
                hddPDF(yy).then((ff)=>{
                    resolve(ff);
                }).catch(err=>{
                    reject(err);
                    return false;
                });
            })
            .catch(err=> {
                reject(err);
                return false;
            })
    });
};
function reportOTU(y){
    return new Promise (async (resolve, reject)=> {
        var yy=[];
        await store.exist(y)
            .then((x) =>{
                if(x[2]){
                    var z=x[2];
                    //console.log(x[0].ct_vendedore);
                    yy=[x[0],x[1],z];
                }
                otuPDF(yy).then((ff)=>{
                    resolve(ff);
                }).catch(err=>{
                    reject(err);
                    return false;
                });
            })
            .catch(err=> {
                reject(err);
                return false;
            })
    });
};

module.exports = {
    reportePdf,
    getAdenda,
    reportHHD,
    reportOTU,
}
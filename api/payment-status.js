export default async function handler(req,res){
  const id=req.query?.id;if(!id)return res.status(400).json({error:'Falta payment id'});
  const token=process.env.MERCADOPAGO_ACCESS_TOKEN;if(!token)return res.status(200).json({approved:false,mode:'demo'});
  const r=await fetch(`https://api.mercadopago.com/v1/payments/${encodeURIComponent(id)}`,{headers:{Authorization:`Bearer ${token}`}});const d=await r.json();
  if(!r.ok)return res.status(r.status).json({error:d.message||'No se pudo validar el pago'});
  return res.status(200).json({approved:d.status==='approved',status:d.status,external_reference:d.external_reference});
}

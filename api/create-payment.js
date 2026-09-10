export default async function handler(req,res){
  if(req.method!=='POST') return res.status(405).json({error:'Method not allowed'});
  const {service,customer,returnUrl}=req.body||{};
  if(!service?.id||!service?.price||!customer?.email) return res.status(400).json({error:'Datos incompletos'});
  const token=process.env.MERCADOPAGO_ACCESS_TOKEN;
  const external=`psy_${Date.now()}_${Math.random().toString(36).slice(2,8)}`;
  if(!token){
    const u=new URL(returnUrl||`https://${req.headers.host}/`);u.searchParams.set('payment','demo-approved');u.searchParams.set('ref',external);
    return res.status(200).json({mode:'demo',demo_url:u.toString(),external_reference:external});
  }
  const base=returnUrl||`https://${req.headers.host}/`;
  const preference={
    items:[{id:String(service.id),title:`Reserva ${service.name}`,quantity:1,currency_id:'CLP',unit_price:Number(service.price)}],
    payer:{email:customer.email,name:customer.name||undefined},
    external_reference:external,
    back_urls:{success:`${base}?payment=success`,failure:`${base}?payment=failure`,pending:`${base}?payment=pending`},
    auto_return:'approved',
    notification_url:process.env.MERCADOPAGO_WEBHOOK_URL||undefined,
    statement_descriptor:'PSICOLOGIA ONLINE',
    metadata:{service_id:String(service.id),customer_email:customer.email}
  };
  const r=await fetch('https://api.mercadopago.com/checkout/preferences',{method:'POST',headers:{Authorization:`Bearer ${token}`,'Content-Type':'application/json'},body:JSON.stringify(preference)});
  const data=await r.json();if(!r.ok)return res.status(r.status).json({error:data.message||'Mercado Pago rechazó la solicitud'});
  return res.status(200).json({mode:'production',init_point:data.init_point,id:data.id,external_reference:external});
}

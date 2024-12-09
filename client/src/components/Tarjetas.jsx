export default function Tarjetas({transactionDetails}) {




    useEffect(() => {
        if (transactionDetails !== null) {
          setTimeout(() => {
            setLoading(false);
          }, 1000);
        }
      }, [transactionDetails]);

    return(


           // Detalle de la transacción Webpay
           <div className="border rounded-md p-4 mb-2">
           <p>
             <strong>Orden de Compra: </strong> {transactionDetails.buy_order}
           </p>
           <p>
             <strong>Tipo de pago: </strong>{" "}
             {transactionDetails.payment_type_code}
           </p>
           <p>
             <strong>Monto: </strong>
             <FormatCLP precio={transactionDetails.amount} />
           </p>
           <p>
             <strong>Estado: </strong> {transactionDetails.status}
           </p>
           <p>
             <strong>Código de Autorización:</strong>{" "}
             {transactionDetails.authorization_code}
           </p>
           <p>
             <strong>Fecha de Transacción:</strong>{" "}
             {transactionDetails.transaction_date}
           </p>
         </div>
    )
}
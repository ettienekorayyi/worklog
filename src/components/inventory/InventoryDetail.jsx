import React from "react";
import InventoryForm from "./InventoryForm";


export default function InventoryDetail() {

    let iid = window.location.pathname.split('/detail/inventory')[1];
    if(iid !== ""){
        iid = iid.split('/')[1];
    }

  return (
    <InventoryForm 
        iid={iid}
    />
  );
}

    

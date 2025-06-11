import React from "react";

const SideBar = ({ showFirmHandler, showProductHandler, showAllProductsHandler, showFirmTitle }) => {
  return (
    <div>
      <div className="sideBarSection">
        <ul>
          { showFirmTitle ?  <li onClick={showFirmHandler}>Add Firm</li> : "" }
            <li onClick={showProductHandler}>Add Product</li>
            <li onClick={showAllProductsHandler}>All Products</li>
            <li>User Details</li>
        </ul>
      </div>
    </div>
  )
}

export default SideBar;

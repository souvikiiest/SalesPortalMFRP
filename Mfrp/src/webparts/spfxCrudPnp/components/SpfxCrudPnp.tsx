import * as React from 'react';
import styles from './SpfxCrudPnp.module.scss';
import { ISpfxCrudPnpProps } from './ISpfxCrudPnpProps';
import { escape } from '@microsoft/sp-lodash-subset';
import { sp } from "@pnp/sp";
import { Dropdown, DropdownMenuItemType, IDropdownStyles, IDropdownOption } from 'office-ui-fabric-react/lib/Dropdown';
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
import { Item, ItemVersions } from '@pnp/sp/items';
export default class SpfxCrudPnp extends React.Component<ISpfxCrudPnpProps, {}> {
  public async componentWillMount() {
    await this.getItemsfromcdm(); 
}
  public render(): React.ReactElement<ISpfxCrudPnpProps> {
    return (
      <div className={styles.spfxCrudPnp}>
      <div className={styles.navbar}>
        <h1><u>SUN MOTORS</u></h1>
      </div>
        <div className={styles.form}>
        <h2>ORDER PLACING FORM</h2>
        <div className={styles.row}>
        
        <button className={styles.buttfull} onClick={this.showme}>FETCH ORDER BY ORDER-ID</button>
        <button className={styles.buttfull} onClick={this.getItems}>PLACE NEW ORDER</button>
        </div>
        <div className={styles.row}>
          <label id='showME' style={{display:"none"}}>Enter the orderID:<input id="IDinput" type="text" placeholder='OD0000'></input>
          <button className={styles.button } onClick={this.readitemsbyID}>READ</button>
          </label>
        </div>
        <div className={styles.row}>
          <label>Customer Name: <span id='customerName' ></span> </label>
          
        </div>

        <div className={styles.row}>
            <label>Product Name:  <span id="productName" ></span></label>
            
        </div>

        <div className={styles.row}>
          <label>Units Sold: </label>
          <input type="number" id="unitSold"  placeholder='Units Sold' required></input>
        </div>
        <div className={styles.row}>
          <label>Unit Price: </label>
          <input id='unitPrice' placeholder='Units Price' readOnly></input><button className={styles.button} onClick={this.getItemByPdtId}>GET</button>
        </div>
        <div className={styles.row}>
          <label>Sale Value:</label>
          <input id='saleValue' placeholder='Sale Value' readOnly></input>
        </div>
              
        {/* Buttons fields */}
        
          <button id="create" className={styles.button} style={{display:"none"}} onClick={this.createItem}>CREATE</button>
          <div className={styles.buttondiv} id="update" style={{ display: "none" }}>
            <button className={styles.button} onClick={this.updateItem}>UPDATE</button>
            <button className={styles.button} onClick={this.deleteItem}>DELETE</button>

          </div>
        
        </div>
        <div className={styles.footbar}>
        <h3>Copyright © Sun Motors, 2022</h3>

      </div>
      </div>



    );

  }
  //Create Item
  private createItem = async () => {
    try {
      
      const custname: any = document.getElementById('custvalue')['value'];//fetching name from dropdown
      const pdtname: any = document.getElementById('pdtvalue')['value']; //storing productname

      var unitsold=document.getElementById("unitSold")['value'];//taking unitsold
      if(custname.length>0 && pdtname.length>0)//checking if list is empty
      {
        if(unitsold>0)//validation for units sold
        {
      //Fetch Customer ID
      const custid: any[] = await sp.web.lists.getByTitle("Customers").items.filter("CustomerName eq '" + custname + "'").getAll();
      var id = "";//initialising customer id
      custid.map((custid, index) => {
        id = custid.CustomerID; //storing CustomerID into id.
      });
      //Fetch ProductID
      const item: any[] = await sp.web.lists.getByTitle("Products").items.filter("ProductName eq '" + pdtname + "'").getAll();
      var productid = ""; // initializing productid
      item.map((item, index) => {
        productid = item.ProductID; //storing productID into productid.
      });

      //Creating Items into Orders List
      const addItem = await sp.web.lists.getByTitle("Orders").items.add({
        'CustomerName':custname,
        'ProductName':pdtname,
        'CustomerID': id,
        'ProductID': productid,
        'UnitsSold': document.getElementById("unitSold")['value'],
        'UnitPrice': document.getElementById("unitPrice")['value'],
        'SaleValue': document.getElementById("saleValue")['value'],
      });
      console.log(addItem);
      alert(`Order with OrderID: OD0${addItem.data.ID} created successfully!`);    //Confirm message
      this.resetField();
    }
    else{
      alert("Units Sold must be greater than 0");// exception for unit price
    }
  }
    else{
      alert("please select valid details"); // if list is empty
    }
  }
    catch (e) {
      alert(console.error(e));//showing any miscllaneous error.
    }
  }
  //For invisiblity from COmponent didmount
  private getItemsfromcdm = async () => {

      const _cust: any[] = await sp.web.lists.getByTitle("Customers").items.get(); //Taking Customer Name
      const _pdt: any[] = await sp.web.lists.getByTitle("Products").items.get(); //Taking Product Name
        var custhtml = `<select id="custvalue" disabled >`;
        var pdthtml = `<select id="pdtvalue" disabled >`;
        _pdt.map((_pdt, index) => {
          pdthtml += `<option value="${_pdt.ProductName}">${_pdt.ProductName}</option>`;

        });
        pdthtml += `</select>`;
        document.getElementById("productName").innerHTML = pdthtml; //sending pdthtml into Div(id)

        _cust.map((_cust, index) => {
          custhtml += `<option value="${_cust.CustomerName}">${_cust.CustomerName}</option>`;
        });
        custhtml += `</select>`;
        document.getElementById("customerName").innerHTML = custhtml;//sendign custhtml dropdown to div
      
    
  }
//For fethcing customername and product name
private getItems=async()=>{
  try {
    //Visibility for create button
    var create = document.getElementById("create");
    if (create.style.display === "none") {
      create.style.display = "block";//changing display to block
    } else {
      create.style.display = "none";//changing display to none
    }
    //visibility for update
    var update=document.getElementById("update");
    if(update.style.display=="block"){
      update.style.display = "none";//changing display to block
    }  
    //Visibility for id field button
    var x = document.getElementById("showME");
    if (x.style.display === "block") {
      x.style.display = "none";//changing display to block
    } 

    //fetching customername and product name
    const _cust: any[] = await sp.web.lists.getByTitle("Customers").items.get(); //Taking Customer Name
    const _pdt: any[] = await sp.web.lists.getByTitle("Products").items.get(); //Taking Product Name
    if (_cust.length > 0 && _pdt.length>0) {
      var custhtml = `<select id="custvalue" >`;
      var pdthtml = `<select id="pdtvalue" >`;
      _pdt.map((_pdt, index) => {
        pdthtml += `<option value="${_pdt.ProductName}">${_pdt.ProductName}</option>`;

      });
      pdthtml += `</select>`;
      document.getElementById("productName").innerHTML = pdthtml; //sending pdthtml into Div(id)

      _cust.map((_cust, index) => {
        custhtml += `<option value="${_cust.CustomerName}">${_cust.CustomerName}</option>`;
      });
      custhtml += `</select>`;
      document.getElementById("customerName").innerHTML = custhtml;//sendign custhtml dropdown to div
    }
  }
  catch (e) {
    alert(console.error(e));
  }
}
  //Get Item by PDTname
  private getItemByPdtId = async () => {
    try {
      const pdtname: any = document.getElementById('pdtvalue')['value'];//storing product name from dropdown

      if (pdtname.length > 0) {
        const item: any[] = await sp.web.lists.getByTitle("Products").items.filter("ProductName eq '" + pdtname + "'").getAll();
        var Itemprice = 0;
        item.map((item, index) => {
          Itemprice = item.UnitPrice;
        });
        document.getElementById('unitPrice')['value'] = Itemprice;

        document.getElementById('saleValue')['value'] = Itemprice * document.getElementById('unitSold')['value'];//multiplication
      }
      else {
        alert(`Please enter a valid item id.`); 
      }
    }
    catch (e) {
      alert(console.error(e));
    }
  }
  //Show Update/delete field and hiding create field
  private showme = async () => {
    var create = document.getElementById("create");
    if (create.style.display === "block") {
      create.style.display = "none";//changing display to block
    } 
    var orderid = document.getElementById("showME");
    if (orderid.style.display === "none") {
      orderid.style.display = "block";//changing display to block
    } else {
      orderid.style.display = "none";//changing display to none
    }
    var update=document.getElementById("update");
    if(update.style.display=="none"){
      update.style.display = "block";//changing display to block
    } else {
      update.style.display = "none";//changing display to none
    }
    this.getItemsfromcdm();
  }
  //Perform Read Operation by ID
  private readitemsbyID = async () => {
    try {
      const orderid: any = document.getElementById('IDinput')['value']; //storing ordeID from input
      if(orderid.length>0) 
      {
      const orderitem: any[] = await sp.web.lists.getByTitle("Orders").items.filter("OrderID eq '" + orderid + "'").getAll();
      if(orderitem.length>0)
      {
      var custid = ""; var unitprice = 0;
      var pdtid = ""; var unitsold = 0; var salesprice = 0;
      orderitem.map((orderitem, index) => {
        custid = orderitem.CustomerID;
        pdtid = orderitem.ProductID;
        unitprice = orderitem.UnitPrice;
        unitsold = orderitem.UnitsSold;
        salesprice = orderitem.SaleValue;
      });
      
      //read Customername
      const custlist: any[] = await sp.web.lists.getByTitle("Customers").items.filter("CustomerID eq '" + custid + "'").getAll();
      var custname = `<select id="custvalue" disabled>`;
      custlist.map((custlist, index) => {
        custname += `<option value="${custlist.CustomerName}" >${custlist.CustomerName}</option>`;
      });
      custname += `</select>`;

      //read Productname
      const pdtlist: any[] = await sp.web.lists.getByTitle("Products").items.filter("ProductID eq '" + pdtid + "'").getAll();
      const pdt: any[] = await sp.web.lists.getByTitle("Products").items.get();
      var pdtname = ``;
      pdtlist.map((pdtlist, index) => {
        pdtname = pdtlist.ProductName; //Product name fetched by productID(orderlist) to product list

      });
      //Populating dropdown with default value as pdtname
      var pdthtml = `<select id="pdtvalue">`;
      pdthtml += `<option value=${pdtname} selected>${pdtname}</option>`; //For default selected value
      pdt.map((pdt, index) => {

        pdthtml += `<option value="${pdt.ProductName}">${pdt.ProductName}</option>`;

      });
      pdthtml += `</select>`;


      //fill details in form from list
      document.getElementById("customerName").innerHTML = custname;
      document.getElementById("productName").innerHTML = pdthtml;
      document.getElementById("unitSold")['value'] = unitsold;
      document.getElementById("unitPrice")['value'] = unitprice;
        document.getElementById('saleValue')['value'] = salesprice;
    }
    else{
      alert("Please enter valid orderID");
    }
  }
    else{
      alert(`Please enter a valid Order id.`);

    }
    }
    catch (e) {
      alert(console.error(e));
    }
  }
  //Delete Item
  private deleteItem = async () => {
    try {
      let id: any = document.getElementById('IDinput')['value'];//from input
      id = id.replace(/[^\d]/g, '');  //Extracting only integer.
      id = parseInt(id, 10);         //Trimming Leading Zeros.

      if (id > 0) {
        let deleteItem = await sp.web.lists.getByTitle("Orders").items.getById(id).delete();
        console.log(deleteItem);
        alert(`Item ID: OD00${id} deleted successfully!`);
        this.resetField();
      }
      else {
        alert(`Please enter a valid Order id.`);
      
      }
    }
    catch (e) {
     alert(console.log(e));
    }
  }
  //Update Item
  private updateItem = async () => {
    try {
      let id: any = document.getElementById('IDinput')['value'];
      id = id.replace(/[^\d]/g, ''); //Extracting only integer.
      id = parseInt(id, 10);         //Trimming Leading Zeros.    
      if (id > 0) {
        const custname: any = document.getElementById('custvalue')['value'];
        var cusTid = "";
        
        //Fetch ProductID
        const pdtname: any = document.getElementById('pdtvalue')['value'];
        const item: any[] = await sp.web.lists.getByTitle("Products").items.filter("ProductName eq '" + pdtname + "'").getAll();
        var productid = "";
        item.map((item, index) => { 
          productid = item.ProductID; //storing productid from products list
        });
        const itemUpdate = await sp.web.lists.getByTitle("Orders").items.getById(id).update({
          'ProductID': productid,
          'UnitsSold': document.getElementById("unitSold")['value'],
          'UnitPrice': document.getElementById("unitPrice")['value'],
          'SaleValue': document.getElementById("saleValue")['value'],
        });
        console.log(itemUpdate);
        alert(`Item with ID: OD0${id} updated successfully!`);
        this.resetField();
      }
      else {
        alert(`Please enter a valid item id.`);
      }
    }
    catch (e) {
      alert(console.error(e));
    }
  }
  private resetField=async() =>{
    document.getElementById("customerName").innerHTML = ``;
      document.getElementById("productName").innerHTML = ``;
      document.getElementById("unitSold")['value'] = ``;
      document.getElementById("unitPrice")['value'] = ``;
      document.getElementById('saleValue')['value'] = ``;
  }
}

var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
import * as React from 'react';
import styles from './SpfxCrudPnp.module.scss';
import { sp } from "@pnp/sp";
import "@pnp/sp/webs";
import "@pnp/sp/lists";
import "@pnp/sp/items";
var SpfxCrudPnp = /** @class */ (function (_super) {
    __extends(SpfxCrudPnp, _super);
    function SpfxCrudPnp() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        //Create Item
        _this.createItem = function () { return __awaiter(_this, void 0, void 0, function () {
            var custname, pdtname, unitsold, custid, id, item, productid, addItem, e_1;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 8, , 9]);
                        custname = document.getElementById('custvalue')['value'];
                        pdtname = document.getElementById('pdtvalue')['value'];
                        unitsold = document.getElementById("unitSold")['value'];
                        if (!(custname.length > 0 && pdtname.length > 0)) return [3 /*break*/, 6];
                        if (!(unitsold > 0)) return [3 /*break*/, 4];
                        return [4 /*yield*/, sp.web.lists.getByTitle("Customers").items.filter("CustomerName eq '" + custname + "'").getAll()];
                    case 1:
                        custid = _a.sent();
                        id = "";
                        custid.map(function (custid, index) {
                            id = custid.CustomerID; //storing CustomerID into id.
                        });
                        return [4 /*yield*/, sp.web.lists.getByTitle("Products").items.filter("ProductName eq '" + pdtname + "'").getAll()];
                    case 2:
                        item = _a.sent();
                        productid = "";
                        item.map(function (item, index) {
                            productid = item.ProductID; //storing productID into productid.
                        });
                        return [4 /*yield*/, sp.web.lists.getByTitle("Orders").items.add({
                                'CustomerName': custname,
                                'ProductName': pdtname,
                                'CustomerID': id,
                                'ProductID': productid,
                                'UnitsSold': document.getElementById("unitSold")['value'],
                                'UnitPrice': document.getElementById("unitPrice")['value'],
                                'SaleValue': document.getElementById("saleValue")['value'],
                            })];
                    case 3:
                        addItem = _a.sent();
                        console.log(addItem);
                        alert("Order with OrderID: OD0" + addItem.data.ID + " created successfully!"); //Confirm message
                        this.resetField();
                        return [3 /*break*/, 5];
                    case 4:
                        alert("Units Sold must be greater than 0"); // exception for unit price
                        _a.label = 5;
                    case 5: return [3 /*break*/, 7];
                    case 6:
                        alert("please select valid details"); // if list is empty
                        _a.label = 7;
                    case 7: return [3 /*break*/, 9];
                    case 8:
                        e_1 = _a.sent();
                        alert(console.error(e_1)); //showing any miscllaneous error.
                        return [3 /*break*/, 9];
                    case 9: return [2 /*return*/];
                }
            });
        }); };
        //For invisiblity from COmponent didmount
        _this.getItemsfromcdm = function () { return __awaiter(_this, void 0, void 0, function () {
            var _cust, _pdt, custhtml, pdthtml;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, sp.web.lists.getByTitle("Customers").items.get()];
                    case 1:
                        _cust = _a.sent();
                        return [4 /*yield*/, sp.web.lists.getByTitle("Products").items.get()];
                    case 2:
                        _pdt = _a.sent();
                        custhtml = "<select id=\"custvalue\" disabled >";
                        pdthtml = "<select id=\"pdtvalue\" disabled >";
                        _pdt.map(function (_pdt, index) {
                            pdthtml += "<option value=\"" + _pdt.ProductName + "\">" + _pdt.ProductName + "</option>";
                        });
                        pdthtml += "</select>";
                        document.getElementById("productName").innerHTML = pdthtml; //sending pdthtml into Div(id)
                        _cust.map(function (_cust, index) {
                            custhtml += "<option value=\"" + _cust.CustomerName + "\">" + _cust.CustomerName + "</option>";
                        });
                        custhtml += "</select>";
                        document.getElementById("customerName").innerHTML = custhtml; //sendign custhtml dropdown to div
                        return [2 /*return*/];
                }
            });
        }); };
        //For fethcing customername and product name
        _this.getItems = function () { return __awaiter(_this, void 0, void 0, function () {
            var create, update, x, _cust, _pdt, custhtml, pdthtml, e_2;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 3, , 4]);
                        create = document.getElementById("create");
                        if (create.style.display === "none") {
                            create.style.display = "block"; //changing display to block
                        }
                        else {
                            create.style.display = "none"; //changing display to none
                        }
                        update = document.getElementById("update");
                        if (update.style.display == "block") {
                            update.style.display = "none"; //changing display to block
                        }
                        x = document.getElementById("showME");
                        if (x.style.display === "block") {
                            x.style.display = "none"; //changing display to block
                        }
                        return [4 /*yield*/, sp.web.lists.getByTitle("Customers").items.get()];
                    case 1:
                        _cust = _a.sent();
                        return [4 /*yield*/, sp.web.lists.getByTitle("Products").items.get()];
                    case 2:
                        _pdt = _a.sent();
                        if (_cust.length > 0 && _pdt.length > 0) {
                            custhtml = "<select id=\"custvalue\" >";
                            pdthtml = "<select id=\"pdtvalue\" >";
                            _pdt.map(function (_pdt, index) {
                                pdthtml += "<option value=\"" + _pdt.ProductName + "\">" + _pdt.ProductName + "</option>";
                            });
                            pdthtml += "</select>";
                            document.getElementById("productName").innerHTML = pdthtml; //sending pdthtml into Div(id)
                            _cust.map(function (_cust, index) {
                                custhtml += "<option value=\"" + _cust.CustomerName + "\">" + _cust.CustomerName + "</option>";
                            });
                            custhtml += "</select>";
                            document.getElementById("customerName").innerHTML = custhtml; //sendign custhtml dropdown to div
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        e_2 = _a.sent();
                        alert(console.error(e_2));
                        return [3 /*break*/, 4];
                    case 4: return [2 /*return*/];
                }
            });
        }); };
        //Get Item by PDTname
        _this.getItemByPdtId = function () { return __awaiter(_this, void 0, void 0, function () {
            var pdtname, item, Itemprice, e_3;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        pdtname = document.getElementById('pdtvalue')['value'];
                        if (!(pdtname.length > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, sp.web.lists.getByTitle("Products").items.filter("ProductName eq '" + pdtname + "'").getAll()];
                    case 1:
                        item = _a.sent();
                        Itemprice = 0;
                        item.map(function (item, index) {
                            Itemprice = item.UnitPrice;
                        });
                        document.getElementById('unitPrice')['value'] = Itemprice;
                        document.getElementById('saleValue')['value'] = Itemprice * document.getElementById('unitSold')['value']; //multiplication
                        return [3 /*break*/, 3];
                    case 2:
                        alert("Please enter a valid item id.");
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        e_3 = _a.sent();
                        alert(console.error(e_3));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        //Show Update/delete field and hiding create field
        _this.showme = function () { return __awaiter(_this, void 0, void 0, function () {
            var create, x, update;
            return __generator(this, function (_a) {
                create = document.getElementById("create");
                if (create.style.display === "block") {
                    create.style.display = "none"; //changing display to block
                }
                x = document.getElementById("showME");
                if (x.style.display === "none") {
                    x.style.display = "block"; //changing display to block
                }
                else {
                    x.style.display = "none"; //changing display to none
                }
                update = document.getElementById("update");
                if (update.style.display == "none") {
                    update.style.display = "block"; //changing display to block
                }
                else {
                    update.style.display = "none"; //changing display to none
                }
                this.getItemsfromcdm();
                return [2 /*return*/];
            });
        }); };
        //Perform Read Operation by ID
        _this.readitemsbyID = function () { return __awaiter(_this, void 0, void 0, function () {
            var orderid, orderitem, custid, unitprice, pdtid, unitsold, salesprice, custlist, custname, pdtlist, pdt, pdtname, pdthtml, e_4;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 9, , 10]);
                        orderid = document.getElementById('IDinput')['value'];
                        if (!(orderid.length > 0)) return [3 /*break*/, 7];
                        return [4 /*yield*/, sp.web.lists.getByTitle("Orders").items.filter("OrderID eq '" + orderid + "'").getAll()];
                    case 1:
                        orderitem = _a.sent();
                        if (!(orderitem.length > 0)) return [3 /*break*/, 5];
                        custid = "";
                        unitprice = 0;
                        pdtid = "";
                        unitsold = 0;
                        salesprice = 0;
                        orderitem.map(function (orderitem, index) {
                            custid = orderitem.CustomerID;
                            pdtid = orderitem.ProductID;
                            unitprice = orderitem.UnitPrice;
                            unitsold = orderitem.UnitsSold;
                            salesprice = orderitem.SaleValue;
                        });
                        return [4 /*yield*/, sp.web.lists.getByTitle("Customers").items.filter("CustomerID eq '" + custid + "'").getAll()];
                    case 2:
                        custlist = _a.sent();
                        custname = "<select id=\"custvalue\" disabled>";
                        custlist.map(function (custlist, index) {
                            custname += "<option value=\"" + custlist.CustomerName + "\" >" + custlist.CustomerName + "</option>";
                        });
                        custname += "</select>";
                        return [4 /*yield*/, sp.web.lists.getByTitle("Products").items.filter("ProductID eq '" + pdtid + "'").getAll()];
                    case 3:
                        pdtlist = _a.sent();
                        return [4 /*yield*/, sp.web.lists.getByTitle("Products").items.get()];
                    case 4:
                        pdt = _a.sent();
                        pdtname = "";
                        pdtlist.map(function (pdtlist, index) {
                            pdtname = pdtlist.ProductName; //Product name fetched by productID(orderlist) to product list
                        });
                        pdthtml = "<select id=\"pdtvalue\">";
                        pdthtml += "<option value=" + pdtname + " selected>" + pdtname + "</option>"; //For default selected value
                        pdt.map(function (pdt, index) {
                            pdthtml += "<option value=\"" + pdt.ProductName + "\">" + pdt.ProductName + "</option>";
                        });
                        pdthtml += "</select>";
                        //fill details in form from list
                        document.getElementById("customerName").innerHTML = custname;
                        document.getElementById("productName").innerHTML = pdthtml;
                        document.getElementById("unitSold")['value'] = unitsold;
                        document.getElementById("unitPrice")['value'] = unitprice;
                        document.getElementById('saleValue')['value'] = salesprice;
                        return [3 /*break*/, 6];
                    case 5:
                        alert("Please enter valid orderID");
                        _a.label = 6;
                    case 6: return [3 /*break*/, 8];
                    case 7:
                        alert("Please enter a valid Order id.");
                        _a.label = 8;
                    case 8: return [3 /*break*/, 10];
                    case 9:
                        e_4 = _a.sent();
                        alert(console.error(e_4));
                        return [3 /*break*/, 10];
                    case 10: return [2 /*return*/];
                }
            });
        }); };
        //Delete Item
        _this.deleteItem = function () { return __awaiter(_this, void 0, void 0, function () {
            var id, deleteItem, e_5;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 4, , 5]);
                        id = document.getElementById('IDinput')['value'];
                        id = id.replace(/[^\d]/g, ''); //Extracting only integer.
                        id = parseInt(id, 10); //Trimming Leading Zeros.
                        if (!(id > 0)) return [3 /*break*/, 2];
                        return [4 /*yield*/, sp.web.lists.getByTitle("Orders").items.getById(id).delete()];
                    case 1:
                        deleteItem = _a.sent();
                        console.log(deleteItem);
                        alert("Item ID: OD00" + id + " deleted successfully!");
                        this.resetField();
                        return [3 /*break*/, 3];
                    case 2:
                        alert("Please enter a valid Order id.");
                        _a.label = 3;
                    case 3: return [3 /*break*/, 5];
                    case 4:
                        e_5 = _a.sent();
                        alert(console.log(e_5));
                        return [3 /*break*/, 5];
                    case 5: return [2 /*return*/];
                }
            });
        }); };
        //Update Item
        _this.updateItem = function () { return __awaiter(_this, void 0, void 0, function () {
            var id, custname, cusTid, pdtname, item, productid, itemUpdate, e_6;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        _a.trys.push([0, 5, , 6]);
                        id = document.getElementById('IDinput')['value'];
                        id = id.replace(/[^\d]/g, ''); //Extracting only integer.
                        id = parseInt(id, 10); //Trimming Leading Zeros.    
                        if (!(id > 0)) return [3 /*break*/, 3];
                        custname = document.getElementById('custvalue')['value'];
                        cusTid = "";
                        pdtname = document.getElementById('pdtvalue')['value'];
                        return [4 /*yield*/, sp.web.lists.getByTitle("Products").items.filter("ProductName eq '" + pdtname + "'").getAll()];
                    case 1:
                        item = _a.sent();
                        productid = "";
                        item.map(function (item, index) {
                            productid = item.ProductID; //storing productid from products list
                        });
                        return [4 /*yield*/, sp.web.lists.getByTitle("Orders").items.getById(id).update({
                                'ProductID': productid,
                                'UnitsSold': document.getElementById("unitSold")['value'],
                                'UnitPrice': document.getElementById("unitPrice")['value'],
                                'SaleValue': document.getElementById("saleValue")['value'],
                            })];
                    case 2:
                        itemUpdate = _a.sent();
                        console.log(itemUpdate);
                        alert("Item with ID: OD0" + id + " updated successfully!");
                        this.resetField();
                        return [3 /*break*/, 4];
                    case 3:
                        alert("Please enter a valid item id.");
                        _a.label = 4;
                    case 4: return [3 /*break*/, 6];
                    case 5:
                        e_6 = _a.sent();
                        alert(console.error(e_6));
                        return [3 /*break*/, 6];
                    case 6: return [2 /*return*/];
                }
            });
        }); };
        _this.resetField = function () { return __awaiter(_this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                document.getElementById("customerName").innerHTML = "";
                document.getElementById("productName").innerHTML = "";
                document.getElementById("unitSold")['value'] = "";
                document.getElementById("unitPrice")['value'] = "";
                document.getElementById('saleValue')['value'] = "";
                return [2 /*return*/];
            });
        }); };
        return _this;
    }
    SpfxCrudPnp.prototype.componentWillMount = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, this.getItemsfromcdm()];
                    case 1:
                        _a.sent();
                        return [2 /*return*/];
                }
            });
        });
    };
    SpfxCrudPnp.prototype.render = function () {
        return (React.createElement("div", { className: styles.spfxCrudPnp },
            React.createElement("div", { className: styles.navbar },
                React.createElement("h1", null,
                    React.createElement("u", null, "SUN MOTORS"))),
            React.createElement("div", { className: styles.form },
                React.createElement("h2", null, "ORDER PLACING FORM"),
                React.createElement("div", { className: styles.row },
                    React.createElement("button", { className: styles.buttfull, onClick: this.showme }, "FETCH ORDER BY ORDER-ID"),
                    React.createElement("button", { className: styles.buttfull, onClick: this.getItems }, "PLACE NEW ORDER")),
                React.createElement("div", { className: styles.row },
                    React.createElement("label", { id: 'showME', style: { display: "none" } },
                        "Enter the orderID:",
                        React.createElement("input", { id: "IDinput", type: "text", placeholder: 'OD0000' }),
                        React.createElement("button", { className: styles.button, onClick: this.readitemsbyID }, "READ"))),
                React.createElement("div", { className: styles.row },
                    React.createElement("label", null,
                        "Customer Name: ",
                        React.createElement("span", { id: 'customerName' }),
                        " ")),
                React.createElement("div", { className: styles.row },
                    React.createElement("label", null,
                        "Product Name:  ",
                        React.createElement("span", { id: "productName" }))),
                React.createElement("div", { className: styles.row },
                    React.createElement("label", null, "Units Sold: "),
                    React.createElement("input", { type: "number", id: "unitSold", placeholder: 'Units Sold', required: true })),
                React.createElement("div", { className: styles.row },
                    React.createElement("label", null, "Unit Price: "),
                    React.createElement("input", { id: 'unitPrice', placeholder: 'Units Price', readOnly: true }),
                    React.createElement("button", { className: styles.button, onClick: this.getItemByPdtId }, "GET")),
                React.createElement("div", { className: styles.row },
                    React.createElement("label", null, "Sale Value:"),
                    React.createElement("input", { id: 'saleValue', placeholder: 'Sale Value', readOnly: true })),
                React.createElement("button", { id: "create", className: styles.button, style: { display: "none" }, onClick: this.createItem }, "CREATE"),
                React.createElement("div", { className: styles.buttondiv, id: "update", style: { display: "none" } },
                    React.createElement("button", { className: styles.button, onClick: this.updateItem }, "UPDATE"),
                    React.createElement("button", { className: styles.button, onClick: this.deleteItem }, "DELETE"))),
            React.createElement("div", { className: styles.footbar },
                React.createElement("h3", null, "Copyright \u00A9 Sun Motors, 2022"))));
    };
    return SpfxCrudPnp;
}(React.Component));
export default SpfxCrudPnp;
//# sourceMappingURL=SpfxCrudPnp.js.map
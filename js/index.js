var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDesc = document.getElementById("productDesc");
var addBtn = document.getElementById("addBtn");
var products ;

//show products in beginning
if(localStorage.getItem("products") == null)
    products = [];
else
{
    products = JSON.parse(localStorage.getItem("products"));
    showProduct();
}

//add product 
addBtn.addEventListener("click",function(){
    var product =
    {
        name : productName.value,
        price : productPrice.value,
        category : productCategory.value,
        desc : productDesc.value,
    }
    products.push(product);
    localStorage.setItem("products", JSON.stringify(products));
    showProduct();
    resetInputs();
})



//show Product after adding
function showProduct()
{
    var proContainer = "";
    for( var i = 0 ; i<products.length ; i++)
    {
        var j=i+1;
        proContainer += `<tr>
        <td>` + j + `</td>
        <td>` + products[i].name + `</td>
        <td>` + products[i].price + `</td>
        <td>` + products[i].category + `</td>
        <td >` + products[i].desc + `</td>
        <td> <i onclick = "showDeleteAlert(` + i + `)" class="icon-style  text-danger  far fa-trash-alt"></i> </td>
        <td> <i onclick = "update(` + i + `)" class="icon-style text-success fas fa-pen"></i> </td>
        </tr>`
    }
    document.getElementById("tBody").innerHTML = proContainer ;
}


//reset Inputs after adding
function resetInputs()
{
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDesc.value = "";
}


//search fun by product name
var search = document.getElementById("search");
search.addEventListener("keyup" , function()
{
    var searchContainer ="" ;
    if(search.value.trim() == "" )
    {
         searchContainer ="" ;
    }
    else 
    {
        for(var i=0 ; i<products.length ; i++)
        {
            if(products[i].name.includes(search.value.trim()) == true)
            {
                searchContainer += `<p  onclick = "showSearchReasult(` + i + `)" class="cursor-pointer px-3 py-2 mb-0">` + products[i].name +`</p>`;
            }
        }
    }
    document.getElementById("searchReasult").innerHTML = searchContainer;
})


//show Search Reasult
function showSearchReasult(index)
{
    search.value = "";
    productName.value = products[index].name;
    productPrice.value = products[index].price;
    productCategory.value = products[index].category;
    productDesc.value = products[index].desc;
    document.getElementById("searchReasult").innerHTML = "";
}


//delete funcs
function showDeleteAlert(index)
{
    document.getElementById("deleteProName").innerHTML = products[index].name ;
    document.getElementById("deleteBtns").innerHTML = 
    `<button  onclick = "yesDelete(` + index + `)" class="btn py-2 px-4 mr-3 badge-danger">Yes</button>
    <button id="noD" onclick = "noDelete()" class="btn py-2 px-4 btn-light">No</button>`
    document.getElementById("deleteAlert").style.display = "flex";
}

function yesDelete(index)
{
    document.getElementById("deleteAlert").style.display = "none";
    products.splice(index,1);
    localStorage.setItem("products", JSON.stringify(products));
    showProduct();
}

function noDelete()
{
    document.getElementById("deleteAlert").style.display = "none";
}

//update funcs
var updateConfirmIndex = null;
function update(index)
{
    addBtn.style.display ="none" ;
    document.getElementById("updateBtn").style.display="inline-block";
    document.getElementById("cancelBtn").style.display="inline-block";
    productName.value = products[index].name;
    productPrice.value = products[index].price;
    productCategory.value = products[index].category;
    productDesc.value = products[index].desc;

    updateConfirmIndex = index ;
}


//update btn fun 
document.getElementById("updateBtn").addEventListener("click" ,function()
    {
        updateConfirm(updateConfirmIndex);
    });
function updateConfirm(index)
{

    products[index].name = productName.value,
    products[index].price = productPrice.value,
    products[index].category = productCategory.value,
    products[index].desc = productDesc.value,

    localStorage.setItem("products", JSON.stringify(products));
    
    addBtn.style.display ="inline-block" ;
    document.getElementById("updateBtn").style.display="none";
    document.getElementById("cancelBtn").style.display="none";
    showProduct();
    resetInputs();
}


//cancel update btn fun
document.getElementById("cancelBtn").addEventListener("click" ,function()
{
    addBtn.style.display ="inline-block" ;
    document.getElementById("updateBtn").style.display="none";
    document.getElementById("cancelBtn").style.display="none";
    resetInputs();
});

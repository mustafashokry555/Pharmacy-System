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
    resetInputs();
    showProduct();
})



//show Product after adding
function showProduct()
{
    var proContainer = "";
    for( var i = 0 ; i<products.length ; i++)
    {
        proContainer += `<tr>
        <td>` + products[i].name + `</td>
        <td>` + products[i].price + `</td>
        <td>` + products[i].category + `</td>
        <td >` + products[i].desc + `</td>
        <td> <i onclick = "(` + i + `)" class="icon-style  text-danger  far fa-trash-alt"></i> </td>
        <td> <i onclick = "(` + i + `)" class="icon-style text-success fas fa-pen"></i> </td>
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
function showDeleteAlert()
{

}





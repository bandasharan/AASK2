s(document).ready(function () {
    
    var items = [];

    $("#item-form").on("submit", addItemToCart);
    $("#cart-table").on("click", ".btn-danger", removeItemFromCart);
    $("#generate-invoice"). on("click", generateInvoice);
    
    function addItemToCart(event) {
        event.preventDefault();

        var itemName = $("#item-name").val();
        var itemPrice = $("#item-price").val();
        
        if(itemName !=="" && itemPrice !== "") {
            var item = {
                name: itemName,
                price: parseFloat(itemPrice),
            };

            items.push(item);
            $("#cart-table tbody").append(
                "<tr><td>" +
                item.name +"</td><td>$" +item.price.
                toFixed(2) + '</td><td><button class="btn btn-sm
                btn-danger"><i class="fa fa-trash-alt"></i></
                buton></td></tr>'
            );

            updateTotalCost();
            $("#item-name").val("");
            $("#item-price").val("");
        }
    }
        function removeItemFromCart(){
            var index = $(this).closet("tr").index();
            items.slice(index, 1);
            $(this).closest("tr").remove();
            updateTotalCost();
        }

        function updateTotalCost() {
            var totalCost = 0;
            items.forEach(function (item){
                totalCost += item.price;
            });
            $("#total-cost").text("Total cost: $" + totalCost.
            toFixed(2));
        }
        function genrateInvoice() {
            var invoice =  `<html>
<head>
    <title>iNVOICE</title>
    <link
    href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0-alpha1/dist/css/bootstrap.min.css" 
    rel="stylesheet"
    integrity="sha384-T3c6CoIi6uLrA9TneNEoa7RxnatzjcDSCmG1MXxSR1GAsXEV/Dwwykc2MPK8M2HN" 
    crossorigin="anonymous"
    />
</head>
<body>
    <div class="container mt-5">
        <h1 class="text-center">Invoice</h1>
        <table class="table">
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Item Price</th>
                    <tr>
            </thead>
            <tbody>`;

            items.forEach(function (item) {
                invoice +=
                "<tr><td>" +
                item.name +
                "</td><td>$" +
                item.price.toFixed(2) +
                "</td></tr>";
            });

            invoice +=
            '</tbody></table><pclass="text-right">TotalCost: $'+
            getTotalCost() +
            "</p></div></body></html>";

            var popup = window.open("", " _blank");
            popup.document.open();
            popup.document.write(invoice);
            popup.document.close();
        }

        function getTotalCost() {
            var totalCost = 0;
            items.forEach(function (item) {
                totalCost += item.price;
            });
            return totalCost.toFixed(2);
    }
});
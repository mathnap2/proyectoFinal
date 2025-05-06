let data = {
    "users": [],
    "products": []
}

console.log("<----------------------------->");
console.log("<----------------------------->");
console.log("<-----------USERS----------->");
console.log("<----------------------------->");
console.log("<----------------------------->");
console.log("<-----------PUNTO 1----------->");
console.log("Users: ");
console.table(getAllUsers());

console.log("<-----------PUNTO 2----------->");
console.log("Creating User 1: ");
createUser("Angel", "1gmail", "12345678");
console.log("User 1 Created!");
console.log("Creating User 2: ");
createUser("Ali", "2gmail", "12345678");
console.log("User 2 Created!");
console.log("Creating User 3: ");
createUser("Cortes", "3gmail", "12345678");
console.log("User 3 Created!");
console.table(getAllUsers());

console.log("<-----------PUNTO 3----------->");
console.table(getUserById(2));

console.log("<-----------PUNTO 4----------->");
console.log("Searching name: Angel");
console.table(searchUsers("name", "Angel"));
console.log("Searching name: Ali");
console.table(searchUsers("name", "Ali"));
console.log("Searching name: Cortes");
console.table(searchUsers("name", "Cortes"));

console.log("<-----------PUNTO 5----------->");
console.log("Updating User 3: ");
updateUser(3, {name: "ACTUALIZADORX"});
console.log("User 3 Updated!");
console.table(getAllUsers());

console.log("<-----------PUNTO 6----------->");
console.log("Deleting User 1: ");
deleteUser(1);
console.log("User 3 Deleted!");
console.table(getAllUsers());

console.log("<----------------------------->");
console.log("<----------------------------->");
console.log("<-----------PRODUCTS---------->");
console.log("<----------------------------->");
console.log("<----------------------------->");

console.log("<-----------PUNTO 1----------->");
console.log("Products: ");
console.table(getAllProducts());

console.log("<-----------PUNTO 2----------->");
console.log("Creating Product 1: ");
createProduct("Camisa", "Camisa blanca de algodón", true, 50, "M", 19.99);
console.log("Product 1 Created!");
console.log("Creating Product 2: ");
createProduct("Pantalón", "Pantalón de mezclilla", true, 30, "L", 29.99);
console.log("Product 2 Created!");
console.log("Creating Product 3: ");
createProduct("Zapatos", "Zapatos de cuero negro", false, 0, "42", 59.99);
console.log("Product 3 Created!");
console.table(getAllProducts());

console.log("<-----------PUNTO 3----------->");
console.table(getProductById(2));

console.log("<-----------PUNTO 4----------->");
console.log("Searching title: Camisa");
console.table(searchProducts("title", "Camisa"));
console.log("Searching title: Pantalón");
console.table(searchProducts("title", "Pantalón"));
console.log("Searching title: Zapatos");
console.table(searchProducts("title", "Zapatos"));

console.log("<-----------PUNTO 5----------->");
console.log("Updating Product 3: ");
updateProduct(3, { title: "ZAPATOS RENOVADOS" });
console.log("Product 3 Updated!");
console.table(getAllProducts());

console.log("<-----------PUNTO 6----------->");
console.log("Deleting Product 1: ");
deleteProduct(1);
console.log("Product 1 Deleted!");
console.table(getAllProducts());

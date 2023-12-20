const { PrismaClient } = require ('@prisma/client');
const prisma = new PrismaClient();

const seed = async () =>{
   const usersData = [
    {signup_date:'2021-12-15', username:'user1', password:'password1', email:'user1@email.com', phone:'123-456-7890', first_name:'John', last_name:'Doe', can_sell:'true', address:'110 main street', addressline2:'apt1', city:'Los Angeles', state:'CA', zip:'90015'},
    {signup_date:'2021-12-16', username:'user2', password:'password2', email:'user2@email.com', phone:'234-567-8901', first_name:'Jason', last_name:'Smith', can_sell:'true', address:'220 oak street',addressline2:'apt2', city:'San Francisco', state:'CA', zip:'94158'},
    {signup_date:'2021-12-17', username:'user3', password:'password3', email:'user3@email.com', phone:'345-678-9012', first_name:'Tom', last_name:'James', can_sell:'true', address:'330 market street',addressline2:'apt3', city:'Iowa city', state:'IA', zip:'52245'},
    {signup_date:'2021-12-18', username:'user4', password:'password4', email:'user4@email.com', phone:'456-789-0123', first_name:'Fred', last_name:'Lincoln', can_sell:'false', address:'440 oakland street',addressline2:'apt4', city:'Cincinnati', state:'OH', zip:'45203'},
    {signup_date:'2021-12-19', username:'user5', password:'password5', email:'user5@email.com', phone:'567-890-1234', first_name:'Jake', last_name:'Carter', can_sell:'false', address:'550 queen street',addressline2:'apt5', city:'Boston', state:'MA', zip:'02108'},
    {signup_date:'2021-12-20', username:'user6', password:'password6', email:'user6@email.com', phone:'678-901-2345', first_name:'Mike', last_name:'Grayson', can_sell:'false', address:'660 sunset boulevard',addressline2:'apt6', city:'New York', state:'NY', zip:'10002'},  
];

await prisma.user.createMany({
    data: usersData,
});

   const productsData = [
    {description:'High-end smartphone', title:'Smartphone X', price:699.99, image_url:'image1.jpg', post_date: '2022-12-15', is_avaiable:'true', user_id:2, category:'Electronic Product'},
    {description:'Professional laptop', title:'Laptop Pro', price:1299.99, image_url:'image2.jpg', post_date: '2022-12-16', is_avaiable:'true', user_id:3, category:'Electronic Product'},
    {description:'Comfortable T-shirt', title:'Casual T-shirt', price:14.99, image_url:'image3.jpg', post_date: '2022-12-17', is_avaiable:'true', user_id:5, category:'Clothes'},
    {description:'Wireless Mouse', title:'Ergonomic Mouse', price:29.99, image_url:'image4.jpg', post_date: '2022-12-18', is_avaiable:'false', user_id:4, category:'Electronic Product'},
    {description:'Running Shoes', title:'Sporty Sneakers', price:59.99, image_url:'image5.jpg', post_date: '2022-12-19', is_avaiable:'false', user_id:6, category:'Sneaker'},
    {description:'Coffee Maker', title:'Automatic Coffee Mkaer', price:49.99, image_url:'image6.jpg', post_date: '2022-12-20', is_avaiable:'false', user_id:1, category:'Electronic Product'},
   ];

await prisma.product.createMany({
    data: productsData,
});

    const ordersData = [
        {total_amount: 1999.98, date_ordered: '2023-11-15', user_id:1, is_open: 'true'},
        {total_amount: 74.98, date_ordered: '2023-11-16', user_id:2, is_open: 'true'},
        {total_amount: 79.98, date_ordered: '2023-11-17', user_id:3, is_open: 'true'},
    ];

await prisma.order.createMany({
    data: ordersData,
});

    const cartItemsData = [
        {product_id: 1, created_at:'2023-11-10', updated_at:'2023-11-12',order_id:1, price: 699.99, quantity:1},
        {product_id: 2, created_at:'2023-11-11', updated_at:'2023-11-13',order_id:1, price: 1299.99, quantity:1},
        {product_id: 3, created_at:'2023-11-12', updated_at:'2023-11-14',order_id:2, price: 14.99, quantity:1},
        {product_id: 4, created_at:'2023-11-13', updated_at:'2023-11-15',order_id:3, price: 29.99, quantity:1},
        {product_id: 5, created_at:'2023-11-14', updated_at:'2023-11-16',order_id:2, price: 59.99, quantity:1},
        {product_id: 6, created_at:'2023-11-15', updated_at:'2023-11-17',order_id:3, price: 49.99, quantity:1},
    ]; 

await prisma.cartitems.createMany({
    data:cartItemsData,
});
   
   console.log('Tables created')
}

seed()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })
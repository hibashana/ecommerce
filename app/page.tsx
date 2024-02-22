

// import Signup from "./(auth)/signup/Sign_up";
import Category from "./(components)/category/Category";
import Offers from "./(components)/imageSlider/Offers";
import Products from "./(components)/products/ProductList";
// import PhoneCarousel from "./(components)/products/ProductList";
import RecmdProduct from "./(components)/recommended/RecmdProduct";
import TopCollection from "./(components)/topCollection/TopCollection";
// import AddtoCart from "./components/addtoCart/pages";

const phones = [
    { 
      id:1,
      name: 'Samsung note',
      description: "This is a sample product.",
      stockQuantity:10,
      offer_price: 34.98,
      actual_price: 39.00,
      image: '/samsungnote.jpg', 
      offer: '10',
    },
    {
      id:2,
      name: 'Iphone 14 pro',
      description: "This is a sample product.",
      stockQuantity:10,
      offer_price: 39.98,
      actual_price: 44.00,
      image: '/iphone-14-pro-gold.jpg',
      offer: '10',
    },
    {
      id:3,
      name: 'Iphone 12 Pro Max',
      description: "This is a sample product.",
      stockQuantity:10,
      offer_price: 31.98,
      actual_price: 35.00,
      image: '/12-pro-max.jpeg', 
      offer: '9.0',
    },
    {
      id:4,
      name: 'Iphone 13 Pro',
      description: "This is a sample product.",
      stockQuantity:10,
      offer_price: 34.98,
      actual_price: 39.00,
      image: '/apple-13.jpg', 
      offer: '5.5',
    },
    {
      id:5,
      name: 'Galaxy s23 Ultra',
      description: "This is a sample product.",
      stockQuantity:10,
      offer_price: 39.98,
      actual_price: 44.00,
      image: '/galaxys23.jpg',
      offer: '10',
    },
    {
      id:6,
      name: 'OnePlus',
      description: "This is a sample product.",
      stockQuantity:10,
      offer_price: 39.98,
      actual_price: 44.00,
      image: '/one-plus.jpg',
      offer: '10',
    },
  
    
  ];

  const products = [
    { id: 1, name: 'Orient Watch', imageUrl: '/ORIENT_BLACKGOLD3-2.jpg' },
    { id: 2, name: 'Gaming Mouse', imageUrl: '/mouse.jpg' },
    { id: 3, name: 'Curved TV', imageUrl: '/smart-tvs.jpg' },
    { id: 4, name: 'Gaming Headset', imageUrl: '/headset.jpg' },
    { id: 5, name: 'Oppo Mobiles', imageUrl: '/oppo.jpg' },
  ];

export default function Home(){
    return(
        <div className="px-2">
          
            {/* <div className="scroll-auto"> */}
                <Category />
            {/* </div> */}
            <Offers/>
           
            <Products/>
            <RecmdProduct />
            <TopCollection/> 
            
            {/* <AddtoCart/> */}
          {/* <PhoneCarousel phones={phones} /> */}
           {/* <Signup/> */}
          
           
        </div>
    )
}
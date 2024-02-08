import Link from "next/link";
import { FaInstagram ,FaTwitter,FaLinkedinIn } from "react-icons/fa";
import { FaFacebookF } from "react-icons/fa6";

const Footer = () => {
  return (
    <div className=" justify-between pt-3  p-10  footer ">
      <div className="flex flex-col  md:flex-row  justify-between pb-8">
        <h1 className="font-bold text-2xl  font-serif text-center hidden sm:block sm:text-left mb-4 sm:mb-0">
          Shop
        </h1>
        <div className="pt-2 mx-16  flex gap-2 flex-col">
          <h3 className="font-bold ">Shop</h3>
          <Link href={"/winter_collection"} className="text-slate-500">
            Winter Collection
          </Link>
          <Link href={"/"} className="text-slate-500">
            Special Discount
          </Link>
          <Link href={"/"} className="text-slate-500">
            Affiliates
          </Link>
        </div>

        <div className="pt-2  font-serif flex gap-2 flex-col">
          <h3 className="font-bold">Payment Method</h3>
          <Link href={"/"} className="text-slate-500">
            Credit Card
          </Link>
          <Link href={"/"} className="text-slate-500">
            Bank Transfer
          </Link>
          <Link href={"/"} className="text-slate-500">
            Paypal
          </Link>
        </div>

        <div className="pt-2 mx-14 font-serif flex gap-2 flex-col">
          <h3 className="font-bold">Contact Us</h3>
          <h1 className="text-slate-500">info@shop.com</h1>
          <h1 className="text-slate-500">444444444444</h1>
        </div>

        <div className="mt-2 font-serif flex gap-2 flex-col">
          <h3 className="font-bold ">Download App on Mobile</h3>
          <div className="flex flex-row gap-2">
            <Link
              href="https://play.google.com/store"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500"
            >
              <img
                src="/app.png"
                alt="Google Play"
                className="cursor-pointer w-32 rounded-lg"
              />
            </Link>
            <Link
              href="https://www.apple.com/app-store/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-slate-500"
            >
              <img
                src="/appstore.png"
                alt="Google Play"
                className="cursor-pointer w-32 rounded-lg"
              />
            </Link>
          </div>
        </div>
        
      </div>
      <hr></hr> {/*for border*/}
      <div className="flex w-full  footer  items-center justify-between  text-slate-500  px-2 my-3 ">
     {/* <div className="border  border-black border-spacing-2"/> */}
     <div className=" text-slate-500 text-xs" style={{ whiteSpace: "nowrap" }}>
      Copyright 2023. Shop, Reserved
     </div>
     <div className="flex gap-2">
          {/* Add your icons here */}
          <FaFacebookF/>
          <FaTwitter />
          <FaLinkedinIn/>
          <FaInstagram /> 
          
        </div>
  </div>
</div>
  );
};

export default Footer;

import React from 'react'
import Bgphoto from '../images/background.png'
import Logo from './logo'
import burger from '../images/burgerMenu.png'

function BackGround() {
  return (
    <div relative>
      <img src={Bgphoto} alt="Background" w-full h-full absolute top-0 left-0 />
      <div className="absolute top-0 left-0 mt-8 ml-8 flex items-center">
        <img src={burger} className='inline-block w-8 h-8 mr-4' alt="Burger Icon" />
        <Logo className='inline-block ml-2' />
      </div>
      <div className= "absolute top-1/3 left-0 mt-8 ml-8 transform w-full">
        <div className= "text-5xl font-bold mb-10 ">Order food to your door</div>
        <input placeholder='Enter Delivery Address 'className=" w-1/3 h-11 inline-block" ></input>
        <button className="w-44 bg-white inline-block h-11 ml-3">Deliver now  </button>
        <button className="w-32 inline-block h-11 ml-3 rounded-md bg-black text-white">Find food</button>
        <div className= "absolute mt-5">
          <span className = "underline cursor-pointer">Sign</span>
          <span> for your recent addresses</span>
        </div>
      </div>
</div>
  )
}

export default BackGround

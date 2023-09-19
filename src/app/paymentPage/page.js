"use client";

import Logo from "@/components/Logo";
import React, { useEffect, useState, useRef } from "react";
import * as cardValidator from "card-validator";
import masterCard from "../../../public/images/masterCard.png";
import visaCard from "../../../public/images/visaCard.png";
import amexCard from "../../../public/images/amexCard.png";
import emptyCard from "../../../public/images/emptyCard.png";
import Image from "next/image";
import { useSelector, useDispatch } from "react-redux";
import { updateTotals } from "../../redux/features/cartSlice";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useRouter, useSearchParams } from "next/navigation";

function paymentPage() {
  const [selectedView, setSelectedView] = useState("Card");
  const [cardNumber, setCardNumber] = useState("");
  const [cardExpiry, setCardExpiry] = useState("");
  const [cardImage, setCardImage] = useState(null);
  const [resPic, setResPic] = useState([]);

  const cardNumberRef = useRef(null);
  const cardExpiryRef = useRef(null);
  const cvvRef = useRef(null);
  const searchParams = useSearchParams();
  const email = searchParams.get("email");
  const router = useRouter();

  const dispatch = useDispatch();
  const cart = useSelector((state) => {
    console.log(state, "state");
    return state.cart.cartItem;
  });
  console.log(cart, "resId");
  const cartTotalAmount = useSelector((state) => state.cart.cartTotalAmount);

  useEffect(() => {
    dispatch(updateTotals());
  }, [cart]);

  const handleCardClick = () => {
    setSelectedView("Card");
  };

  const handlePaypalClick = () => {
    setSelectedView("Paypal");
  };

  const handleGiftCardClick = () => {
    setSelectedView("Uber giftcard");
  };

  function getImageUrlForCardType(cardType) {
    switch (cardType) {
      case "mastercard":
        return masterCard; // 마스터카드
      case "visa":
        return visaCard; // 비자
      case "amex":
        return amexCard; // 아멕스
      // 다른카드
      default:
        return emptyCard;
    }
  }

  const handleCardNumberInput = (e) => {
    let value = e.target.value;

    // 숫자와 공백만 허용
    value = value.replace(/[^0-9\s]/g, "");

    // 공백 제거
    value = value.replace(/\s/g, "");

    // 4자리마다 공백 추가
    value = value.replace(/(\d{4})/g, "$1 ");

    // maxLength에 도달하면 다음 입력 필드로 포커스 이동
    if (value.length >= 19 && cardExpiryRef.current) {
      cardExpiryRef.current.focus();
    }
    setCardNumber(value);

    const numberValidation = cardValidator.number(value);

    if (!numberValidation.isPotentiallyValid) {
      console.log("Card number is not potentially valid");
    }

    if (numberValidation.card) {
      const cardType = numberValidation.card.type;
      console.log(cardType); // 카드 타입 출력 (예: 'visa', 'mastercard' 등)

      // 카드 타입에 따라 이미지
      const cardImageUrl = getImageUrlForCardType(cardType);

      // 이미지를 상태 변수에 저장합니다.
      setCardImage(cardImageUrl);
    }
  };

  const handleCardExpiryInput = (e) => {
    let value = e.target.value;

    // 숫자와 /만 사용
    value = value.replace(/[^0-9/]/g, "");

    // 4자리마다 공백 추가
    if (value.length > 2 && value.indexOf("/") === -1) {
      value = value.slice(0, 2) + "/" + value.slice(2);
    }

    // maxLength에 도달하면 다음 입력 필드로 포커스 이동
    if (value.length >= 5 && cvvRef.current) {
      cvvRef.current.focus();
    }

    // 입력 값을 상태에 저장
    setCardExpiry(value);
  };

  useEffect(() => {
    axios
      .get("http://localhost:8000/resDelivery")
      .then((response) => {
        setResPic(response.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);

  const getRestaurantImage = () => {
    const matchingRes = resPic.find((item) => {
      console.log(cart[0].resId, "res"); // Access resId of the first item in cart array
      return item.id === cart[0].resId;
    });
    if (matchingRes && matchingRes.restaurantPic.length > 0) {
      return matchingRes.restaurantPic;
    }
    return null;
  };

  const mealNames = cart.map((item) => item.mealName);

  const onSubmit = () => {
    const requestData = {
      cardNumber,
      cardExpiry,
      CVV: cvvRef.current.value,
      resId: cart[0].resId,
      mealName: mealNames,
      email: email,
    };

    axios
      .post("http://localhost:8000/orderRecord", requestData)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Success Notification !", {
            position: toast.POSITION.TOP_RIGHT,
          });
        }
        router.push("/afterPay");
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  return (
    <div className="p-10">
      <Logo></Logo>
      {/* <Image src={masterCard} alt="masterCard" /> */}
      <div className="w-full ">
        <div className="w-1/2 mt-10 mx-auto">
          {resPic.length > 0 && (
            <img src={getRestaurantImage()} className="w-full h-60 mt-10" alt="Restaurant" />
          )}
          <p className="text-3xl text-center my-10 ">Choose a payment method</p>
          <button
            onClick={handleCardClick}
            className="w-1/4 bg-[#46a357] h-10 mx-5 rounded-md text-white"
          >
            Card
          </button>
          <button
            onClick={handlePaypalClick}
            className="w-1/4 bg-[#46a357] h-10 mx-5 text-white rounded-md"
          >
            Paypal
          </button>
          <button
            onClick={handleGiftCardClick}
            className="w-1/4  bg-[#46a357] h-10 mx-5 text-white rounded-md"
          >
            Uber giftcard
          </button>

          {selectedView === "Card" && (
            <div className="w-full mx-auto mt-10  ">
              <p className="mx-5">Name on card</p>
              <input
                name="name"
                placeholder="John Hill"
                className="w-1/2 border border-gray-500 rounded-md h-10 m-5"
              />
              <p className="mx-5">Card number</p>
              <div className="w-1/2 border border-gray-500 rounded-md h-10 m-5 relative">
                <input
                  name="cardNumber"
                  ref={cardNumberRef}
                  placeholder="1234 5678 9876 5432"
                  value={cardNumber}
                  onChange={handleCardNumberInput}
                  className="w-full h-full outline-none pr-10 pl-2 rounded-md"
                  //공백포함
                  maxLength="19"
                />
                {cardImage && (
                  <Image src={cardImage} alt="Card" className="absolute top-1 right-2 h-8" />
                )}
              </div>
              <p className="mx-5">Card expiry</p>
              <input
                name="cardExpiry"
                ref={cardExpiryRef}
                placeholder="08/09"
                value={cardExpiry}
                onChange={handleCardExpiryInput}
                className="w-1/2 border border-gray-500 rounded-md h-10 m-5"
              />
              <p className="mx-5">CVV</p>
              <input
                name="CVV"
                ref={cvvRef}
                placeholder="123"
                className="m-5 w-1/2 border border-gray-500 rounded-md h-10"
                type="text"
                onInput={(e) => {
                  e.target.value = e.target.value
                    .replace(/[^0-9.]/g, "")
                    .replace(/(\..*)\./g, "$1");
                }}
                maxLength="3"
              />
            </div>
          )}

          {selectedView === "Paypal" && (
            <div className="w-full mx-auto mt-10">
              <p className="mx-5">Paypal ID</p>
              <input
                placeholder="johnhill@gmail.com"
                className="m-5 w-1/2 border border-gray-500 rounded-md h-10 "
              />
              <p className="mx-5">Paypal password</p>
              <input
                placeholder="*****"
                className="m-5 w-1/2 border border-gray-500 rounded-md h-10"
              />
            </div>
          )}

          {selectedView === "Uber giftcard" && (
            <div className="w-full mx-auto mt-10 ">
              <p className="mx-5">Uber giftcard number</p>
              <input
                placeholder="1234 5678 9876 5432"
                className="m-5 w-1/2 border border-gray-500 rounded-md h-10 "
              />
              <p className="mx-5">Uber giftcard Pin number</p>
              <input
                placeholder="1234"
                className="m-5 w-1/2 border border-gray-500 rounded-md h-10"
              />
            </div>
          )}
          <div className="w-full text-center">
            <button
              onClick={onSubmit}
              className="m-5 w-1/2 border bg-[#46a357] text-white rounded-md h-10"
            >
              Pay ${(cartTotalAmount * 1.1).toFixed(2)}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default paymentPage;

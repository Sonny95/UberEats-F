import React, { useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";
import { searchById } from "@/features/restaurants/restaurantsAction";
import { reset } from "@/features/restaurants/restaurantsSlice";
import { useParams } from "react-router-dom";
import Logo from "@/components/Logo";

const Post = () => {
  const { loading, error, restaurantSearched } = useSelector((state) => state.restaurant);
  const dispatch = useDispatch();
  const code = useParams(); // id router랑 이름 중복됨

  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (code) {
      dispatch(searchById(code.toLowerCase())); // small letter setting
    }
    if (error) {
      console.log(error);
    }
  }, [dispatch, code, error]);
  return (
    <div>
      <Link href="/">
        <Logo />
      </Link>
      <div>
        <div>{restaurantSearched[0].name}</div>
        <div>{restaurantSearched[0].photo}</div>
      </div>
    </div>
  );
};

export default Post;

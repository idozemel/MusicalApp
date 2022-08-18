import React, { useEffect } from "react";
import MainScreen from "../../components/MainScreen/MainScreen";
import "./MyProfilePage.css";

import { useDispatch, useSelector } from "react-redux";
import { getUser } from "../../actions/userAction";

const MyProfilePage = () => {
  const dispatch = useDispatch();

  const user = useSelector((state) => state.getUser);
  const { loading, error, userInfo } = getUser;

  useEffect(() => {
    if (!userInfo) {
      dispatch(getUser());
    }
  }, [dispatch, userInfo]);

  return (
    <div class="container d-flex justify-content-center align-items-center">
      <div class="profileCard">
        <div class="mt-5 text-center">
          <p class="text">Name </p>
          <p class="text">Email </p>
          <button class="btn btn-primary btn-sm">change password</button>

          <div class="d-flex justify-content-between align-items-center mt-4 px-4">
            <div class="stats">
              <h6 class="mb-0">Followers</h6>
              <span>8,797</span>
            </div>

            <div class="stats">
              <h6 class="mb-0">Projects</h6>
              <span>142</span>
            </div>

            <div class="stats">
              <h6 class="mb-0">Ranks</h6>
              <span>129</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MyProfilePage;

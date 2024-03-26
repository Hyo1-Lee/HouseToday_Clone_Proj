import { useSelector } from "react-redux";
import { useState, useEffect } from "react";
import axios from "axios";

import "./css/User.scss";
import { FcLike } from "react-icons/fc";
import { AiOutlineHeart } from "react-icons/ai";

// * 사용자 프로필 설정
const User = () => {
  const [user, setUser] = useState({});

  const token = useSelector((state) => state.Auth.token);

  useEffect(() => {
    if (token) {
      axios
        .get("http://localhost:3005/api/users/profile", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
          withCredentials: true,
        })
        .then((res) => {
          console.log(res);
          setUser(res.data);
        })
        .catch((err) => console.log(err));
    }
  }, []);

  return (
    <>
      {/* //* 사용자 프로필  */}
      <main>
        <section className="uesr-profile">
          <div className="profile__card">
            <img src={user.profile_img} alt="프로필 사진" />
            <h2>{user.nickname}</h2>
            <div>
              <span>팔로워 0</span>
              <span>팔로잉 0</span>
            </div>
            <button>설정</button>

            <hr />

            <div className="card__like">
              <AiOutlineHeart size="24" />
              <strong>좋아요</strong>
              <p>0</p>
            </div>
          </div>
        </section>

        <div className="card__null"></div>

        {/* //* 사용자 게시글  */}
        <section className="post-list">
          <div className="lilst__title-box">
            <strong>게시글</strong>
            <span>0</span>
          </div>
          <article></article>
        </section>
      </main>
    </>
  );
};

export default User;

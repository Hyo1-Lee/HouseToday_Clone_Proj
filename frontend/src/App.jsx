import { lazy } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useSelector } from "react-redux";

// ! 레아이웃
import HomeLayout from "./layout/HomeLayout";
import NonAuthHomeLayout from "./layout/NonAuthHomeLayout";
import SettingLayout from "./layout/SettingLayout";

// ! 홈 화면
const Home = lazy(() => import("./pages/Home"));

// ! 사용자 인증 화면
const Login = lazy(() => import("./pages/auth/Login"));
const Signup = lazy(() => import("./pages/auth/Signup"));
const Oauth = lazy(() => import("./pages/auth/Oauth"));

// ! 게시글 화면
const KnowHow = lazy(() => import("./pages/know-how/KnowHow"));
const HousePhoto = lazy(() => import("./pages/house-photo/HousePhoto"));
const HousewraimngParty = lazy(() =>
  import("./pages/housewarming-party/HousewarmingParty")
);

// ! 게시글 쓰기, 수정, 상세
const Write = lazy(() => import("./pages/community/Write"));
const WriteEdit = lazy(() => import("./pages/community/WriteEdit"));
const Post = lazy(() => import("./pages/community/Post"));

// ! 사용자 설정 관련 화면
const User = lazy(() => import("./pages/user/User"));
const Setting = lazy(() => import("./pages/user/Setting"));

const queryClient = new QueryClient();

// 인증 여부에 따라 레이아웃 변경
const Layout = () => {
  const loggedIn = useSelector((state) => !!state.Auth.token);
  console.log("token", loggedIn);
  return loggedIn ? <HomeLayout /> : <NonAuthHomeLayout />;
};

const router = createBrowserRouter([
  // ! 홈 화면
  {
    index: "/",
    children: [
      // ! 사용자 인증 관련 화면
      // * 로그인 화면 http://localhost:5173/login
      { path: "login", element: <Login /> },
      // * 회원가입 화면 http://localhost:5173/signup
      { path: "signup", element: <Signup /> },
      // * 카카오 로그인 화면 http://localhost:5173/oauth
      { path: "oauth", element: <Oauth /> },

      // ! 홈 화면
      {
        element: <Layout />,
        children: [
          // * 홈 화면 http://localhost:5173/
          { index: true, element: <Home /> },
          // * 집들이 화면 http://localhost:5173/housewarming_party
          { path: "housewarming_party", element: <HousewraimngParty /> },
          // * 집 사진 화면 http://localhost:5173/house_photo
          { path: "house_photo", element: <HousePhoto /> },
          // * 노하우 화면 http://localhost:5173/comunity
          { path: "know_how", element: <KnowHow /> },
        ],
      },
      // ! 사용자 설정 관련 화면
      {
        path: "users/:uid",
        element: <SettingLayout />,
        children: [
          // * 마이페이지 화면 http://localhost:5173/users/:uid
          { path: "", element: <User /> },
          // * 설정 화면 http://localhost:5173/users/:uid/push
          { path: "edit", element: <Setting /> },
        ],
      },
      // * 글 읽기 화면 http://localhost:5173/post/:aid
      {
        path: "post/:aid",
        element: <Layout />,
        children: [{ index: true, element: <Post /> }],
      },

      // ! 게시글 쓰기, 수정
      {
        path: "write",
        children: [
          // * 글쓰기 화면 http://localhost:5173/write
          { path: "", element: <Write /> },
          // * 글 수정 화면 http://localhost:5173/write/edit/:aid
          { path: "edit/:aid", element: <WriteEdit /> },
        ],
      },
    ],
  },
]);

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <RouterProvider router={router} />
    </QueryClientProvider>
  );
}

export default App;

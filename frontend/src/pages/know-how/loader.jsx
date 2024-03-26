import { defer } from "react-router-dom";

const loadData = async () => {
  const response = await fetch("http://localhost:3005/api/blog/list/1/?code=1");

  if (!response.ok) {
    throw new Error("서버 오류");
  } else {
    const responseData = await response.json();
    return responseData;
  }
};

export const loader = () => {
  return defer({
    data: loadData(),
  });
};
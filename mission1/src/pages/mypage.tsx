import { useEffect, useState } from "react";
import { getMyInfo } from "../apis/auth.ts";
import type { ResponseMyinfoDto } from "../types/auth.ts";

const MyPage = () => {
  const [data, setData] = useState<ResponseMyinfoDto>([]);

  useEffect(() => {
    const getData = async () => {
      const response: ResponseMyinfoDto = await getMyInfo();
      console.log(response);
      setData(response);
    };
    getData();
  }, []);

  return <div>
    <h1 className="bg-white text-black">로그인에 성공했습니다!</h1>
  </div>;
};

export default MyPage;

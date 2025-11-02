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
    <h1 className="bg-white text-black">{data.data?.name}님의 페이지입니다</h1>
    <p className="bg-white text-black">이메일 : {data.data?.email}</p>
  </div>;
};

export default MyPage;

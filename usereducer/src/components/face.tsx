import React from "react";

const Face: React.FC = () => {
  return (
    <div style={styles.wrapper}>
      <div style={styles.body}>
        <div style={styles.eyeLeft}></div>
        <div style={styles.eyeRight}></div>
      </div>
    </div>
  );
};

const styles: { [key: string]: React.CSSProperties } = {
  wrapper: {
    display: "flex",
    justifyContent: "center",
    marginTop: "40px",
  },

  // 머리 (찌그러진 반타원)
  body: {
    position: "relative",
    width: "280px",
    height: "160px",
    background: "white",
    border: "5px solid black",
    borderBottom: "none", // 아래쪽 열어둠 (사진 느낌)
    borderTopLeftRadius: "300px 200px",
    borderTopRightRadius: "250px 180px",
    transform: "scaleX(1)", // 미묘한 찌그러짐
  },

  // 왼쪽 눈
  eyeLeft: {
    position: "absolute",
    width: "18px",
    height: "18px",
    background: "white",
    border: "4px solid black",
    borderRadius: "50%",
    left: "200px",
    top: "85px", // 일부러 조금 아래쪽
  },

  // 오른쪽 눈 (살짝 위)
  eyeRight: {
    position: "absolute",
    width: "12px",
    height: "12px",
    background: "white",
    border: "4px solid black",
    borderRadius: "50%",
    left: "230px",
    top: "75px", // 위치 차이로 “어긋난 느낌”
  },
};

export default Face;

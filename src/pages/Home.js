import { Carousel, Typography, Button } from "antd";

function Home() {
  const contentStyle = {
    width: "100%",
    maxHeight: "calc(100vh - 64px - 70px - 48px)",
    objectFit: "cover",
    filter: "grayscale(90%)",
    //   zIndex: '1',
    //   position: 'absolute'
  };
  return (
    <div style={{ position: "relative" }}>
      <Carousel className="carousel" autoplay dots={false}>
        <div>
          <img
            style={contentStyle}
            src="https://www.parentmap.com/sites/default/files/styles/1180x660_scaled_cropped/public/2020-06/iStock-1220581479_0.jpg?itok=AGFs-78O"
          />
        </div>
        <div>
          <img
            style={contentStyle}
            src="https://www.heritage.org/sites/default/files/styles/commentary_header_image_1280_945x520/public/images/2018-11/GettyImages-875614148.jpg?h=119335f7&itok=fFoAOAXg"
          />
        </div>
        <div>
          <img
            style={contentStyle}
            src="https://alejojo23.files.wordpress.com/2020/08/microschool.jpg"
          />
        </div>
      </Carousel>
      <div
        style={{
          //   backgroundColor: "rgba(0, 184, 234, 0.3)",
          backgroundColor: "rgba(255, 255, 255, 0.5)",
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "calc(100vh - 64px - 70px - 48px)",
          zIndex: 1,
        }}
      ></div>
      <div
        style={{
          zIndex: 2,
          position: "absolute",
          top: "0%",
          // left: "50%",
          // transform: "translate(-50%, -50%)",
          minWidth: "100%",
          height: "calc(100vh - 64px - 70px - 48px)",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-evenly",
          alignItems: "center",
        }}
      >
        <img
          src="/assets/defaultblack.png"
          alt="logo"
          className="logo"
          style={{
            minWidth: "40vw",
            height: "auto",
            filter: "grayscale(90%)",
          }}
        />
        <Typography className="home-title">
          TOP EDUCATION CUSTOMIZED TO YOUR KIDS' NEEDS
        </Typography>
        <h2
          style={{
            backgroundColor: "rgba(255, 191, 0, 0.7)",
            padding: "10px",
            borderRadius: "",
            textAlign: "center",
            color: "rgb(56, 54, 54)",
            fontStyle: "italic",
            minWidth: "100%",
            fontSize: "1.5vw",
          }}
        >
          The promise of a safe environment for kids to learn with friends is so
          appealing, thousands of parents have jumped at the opportunity to do
          something they may never have considered before: creating a new school
          just for their kids.
        </h2>
        <h1
          level={2}
          style={{
            color: "#33393d",
            fontSize: "2vw",
            fontWeight: "bolder",
            //   backgroundColor: "rgba(201, 201, 201, 0.7)",
            borderRadius: "25px",
            padding: "5px",
            textShadow: "2px 2px #2aabe4",
          }}
        >
          How it works
        </h1>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <div
            style={{
              margin: "10px",
              minWidth: "12vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src="/assets/circle1.png" style={{ width: "50%" }} />
            <h2
              style={{
                textAlign: "center",
                color: "#33393d",
              }}
            >
              Sign Up
            </h2>
          </div>
          <div
            style={{
              margin: "10px",
              minWidth: "12vw",
              maxWidth: "12vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src="/assets/circle2.png" style={{ width: "50%" }} />
            <h2
              style={{
                textAlign: "center",
                color: "#33393d",
              }}
            >
              Register Kids
            </h2>
          </div>
          <div
            style={{
              margin: "10px",
              minWidth: "12vw",
              maxWidth: "12vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src="/assets/circle3.png" style={{ width: "50%" }} />
            <h2
              style={{
                textAlign: "center",
                color: "#33393d",
              }}
            >
              Find School
            </h2>
          </div>
          <div
            style={{
              margin: "10px",
              minWidth: "12vw",
              maxWidth: "12vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src="/assets/circle4.png" style={{ width: "50%" }} />
            <h2
              style={{
                textAlign: "center",
                color: "#33393d",
              }}
            >
              Apply
            </h2>
          </div>
          <div
            style={{
              margin: "10px",
              minWidth: "12vw",
              maxWidth: "12vw",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <img src="/assets/circle5.png" style={{ width: "50%" }} />
            <h2
              style={{
                textAlign: "center",
                color: "#33393d",
              }}
            >
              Enroll
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

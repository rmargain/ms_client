import { Typography } from "antd";

function Team() {
  return (
    <div>
      <div className="founders">
        <div className="Dario">
          <div className="dario-pic">
            <img
              src="/assets/dario.jpeg"
              alt="dario"
              style={{ width: "10vw", borderRadius: "100%" }}
            />
          </div>
          <Typography.Title>Dario Villota</Typography.Title>
          <Typography.Title level={3}>Co-founder & CEO</Typography.Title>
          <Typography style={{ textAlign: "center" }}>
            Dario has +20 years of experience in education in USA and Mexico.
            Former principal in Pugh Elementary and Twin Creeks Middle Schools
            in Houston, Tx, and the Euroamerican School in Monterrey, Dario has
            experience in traditional and alternative education methods. But
            most important, he has learned from students in a wide array of
            environments, all of which have led him to find one common thing:
            each student is different and deserves to have a tailored education.
          </Typography>
        </div>
        <div className="Roberto">
          <div>
            <img
              className="roberto-pic"
              src="/assets/roberto.jpeg"
              alt="roberto"
              style={{ width: "10vw", borderRadius: "100%" }}
            />
          </div>
          <Typography.Title>Roberto Margain</Typography.Title>
          <Typography.Title level={3}>Co-founder & CTO</Typography.Title>
          <Typography style={{ textAlign: "center" }}>
            After +7 years in management consulting, Roberto started his career
            in e-commerce working for companies like Amazon and Canasta Rosa. In
            his retail-tech years, he found his new passion: developing tech
            products that enable disrruptive and transformational business
            models. When he heard Dario’s vision about matching students with
            caring teachers in a customized environment, an amazing project was
            born: SchoolMatch.
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default Team;

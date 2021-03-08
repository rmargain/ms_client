import { Card, Carousel, Button, Image } from "antd";
import { Link } from "react-router-dom";


const { Meta } = Card;

function SchoolCard({ school }) {
  const contentStyle = {
    fontSize: "1em",
    padding: "1px",
  };

  const carouselContentStyle = {
    height: "130px",
    color: "#fff",
    alignContent: 'center',
    marginLeft:'auto',
    marginRight:'auto'

  };

  return (
    <Card>
    <div style={{width: '50%',  display:'block', marginLeft:'auto', marginRight:'auto'}}> 
      <Carousel>
        {school.images
          ? school.images.map((image) => (
              <div style={{display:'block', marginLeft:'auto', marginRight:'auto'}}>
                <img
                  style={carouselContentStyle}
                  alt="school pic"
                  src={image}
                />
              </div>
            ))
          : null}
      </Carousel>
    </div>

      <p style={contentStyle}>
        <b>About the School: </b>
        {school.generalInfo}
      </p>
      <p style={contentStyle}>
        <b>Tuition: </b>
        {school.tuition}
      </p>
      <p style={contentStyle}>
        <b>Min Level: </b>
        {school.educationLevelMin}
      </p>
      <p style={contentStyle}>
        <b>Max Level: </b>
        {school.educationLevelMax}
      </p>
      <p style={contentStyle}>
        <b>Primary Language: </b>
        {school.primaryEducationalLanguage}
      </p>
      {school.secondaryEducationalLanguage ? (
        <p style={contentStyle}>
          <b>Secondary Language: </b>
          {school.secondaryEducationalLanguage}
        </p>
      ) : null}
      <p style={contentStyle}>
        <b>Address : </b>
        <p style={contentStyle}>
          {school.address.extNum} {school.address.street}, {school.address.intNum ? (`#${school.address.intNum}`) : null}
          <br/>
          {school.address.city}, {school.address.region},{" "}
          {school.address.zipcode}
        <br/>
        {school.address.country}</p>
      </p>
    </Card>
  );
}

export default SchoolCard;

import { Card, Carousel, Button } from "antd";
import {Link} from 'react-router-dom'

const { Meta } = Card;

function SchoolCard({school}) {
const contentStyle = {
  fontSize: '1em',
  padding: '1px'
};

console.log(school)

return (
  <>
      <Carousel>
        {school.images
          ? school.images.map((image, index) => {
              <img alt="school pic" src={image} />;
            })
          : null}
      </Carousel>
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
        {school.address.extNum} {school.address.street}, #
        {school.address.intNum}
      </p>
      <p style={contentStyle}>
        {school.address.city}, {school.address.region}, {school.address.zipcode}
      </p>
      <p style={contentStyle}>{school.address.country}</p>
    </p>
    <Button shape="round">
      <Link to="/apply" school={school}>
        Quick Apply Free!
      </Link>
    </Button>
  </>
);
}

export default SchoolCard;

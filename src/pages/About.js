import { Typography } from "antd";

function About() {
  return (
    <div className="about">
      <div className="about-top">
        <div className="about-top-left">
          <img
            className="about-top-left-image"
            src="/assets/aboutTopPic.png"
          ></img>
        </div>
        <div className="top-right">
          <div className="top-right-item">
            <img
              className="top-right-icon"
              src="/assets/knowledge.png"
              alt="own-pace"
            />
            <Typography className="top-right-text" level={3}>
              Learn at your own pace?
            </Typography>
            <img
              className="top-right-icon"
              src="/assets/check.png"
              alt="check"
            ></img>
          </div>
          <div className="top-right-item">
            <img
              className="top-right-icon"
              src="/assets/friends.png"
              alt="own-pace"
            />
            <Typography className="top-right-text" level={3}>
              Build lifetime friendships?
            </Typography>
            <img
              className="top-right-icon"
              src="/assets/check.png"
              alt="check"
            ></img>
          </div>
          <div className="top-right-item">
            <img
              className="top-right-icon"
              src="/assets/design.png"
              alt="own-pace"
            />
            <Typography className="top-right-text" level={3}>
              Design your own curriculum?
            </Typography>
            <img
              className="top-right-icon"
              src="/assets/check.png"
              alt="check"
            ></img>
          </div>
          <div className="top-right-item">
            <img
              className="top-right-icon"
              src="/assets/creativity.png"
              alt="own-pace"
            />
            <Typography className="top-right-text" level={3}>
              Create and innovate every day?
            </Typography>
            <img
              className="top-right-icon"
              src="/assets/check.png"
              alt="check"
            ></img>
          </div>
          <div className="top-right-item">
            <img
              className="top-right-icon"
              src="/assets/emotion.png"
              alt="own-pace"
            />
            <Typography className="top-right-text" level={3}>
              Meet social and emotional needs?
            </Typography>
            <img
              className="top-right-icon"
              src="/assets/check.png"
              alt="check"
            ></img>
          </div>
        </div>
      </div>
      <div className="about-bottom">
        <Typography.Title style={{color: 'white', marginBottom:0}} className="about-bottom-title">
          What is a Micro-school?
        </Typography.Title>
        <div>
          <Typography style={{color: 'white', textAlign:'center', fontSize: '1.3vw'}}>
            A new wave of tiny schools offering new options for parents,
            teachers, and students, where students benefit from personalized
            learning with close access to teachers.
          </Typography>
          <Typography style={{color: 'white', textAlign: 'center', fontSize: '1.3vw'}}>
            Our Micro-schools are groups of 8-15 students who meet in person,
            usually in the home of their learning guide. We serve students from
            preschool to 6th grade. Our Micro-schools regularly have a 3-grade
            span: preschool-Kinder, 1-3rd grade, 4th-6th grade. The Micro-school
            Day is designed to give students a well rounded academic, social,
            and creative experience, empowering students to live happy, full,
            and purposeful lives. Classes can be taught through a flipped
            classroom or blended learning approach. Class time usually involves
            hands-on, activity-based learning that often pairs students with
            experts in their fields. Lectures, worksheets and book work are
            replaced with carefully constructed activities that foster the
            individual growth of students.
          </Typography>
        </div>
      </div>
    </div>
  );
}

export default About;

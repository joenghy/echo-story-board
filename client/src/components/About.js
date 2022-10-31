const About = () => {
    return (
        <div className="about-page">
            <header className="header">
                <h1>The Crawford Technologies Programming Challenge</h1>
            </header>
            <div className="content-wrapper">
                <h2>Purpose</h2>
                <p>The purpose of this challenge is to gather further evidence of the true abilities and
                    qualifications of potential candidates for employment in Crawford Technologies software
                    engineering division than would normally be possible via a simple interview.
                    The prospective employee is asked to take the enclosed project requirements and return to
                    Crawford a functionally complete, working piece of software, for review by Crawford
                    Technologies Management and Technical staff. Crawford’s staff will use this to evaluate the
                    design decisions made by the prospective employee, as well as the craftsmanship and quality
                    of the code and the project returned. This project will have a significant impact on the
                    applicant selection process. Please take this opportunity to demonstrate for Crawford
                    Technologies your skills in software engineering.</p>
                <h2>The Challenge</h2>
                <p>John enjoys writing stories and sharing them with his friend Pat. Pat thinks his writing should
                    be preserved for others to see and enjoy. To this end, s/he has decided to build a website
                    devoted to storing and preserving the stories for others to see. In addition, Pat would like this
                    website to return a copy of his writing embedded in a graphic (*.png) image. This embedded
                    image should display the stories enclosed in a rectangular box. (note, you do not need to
                    write stories, you just need to show your ability with brief text paragraphs.) Pat also wants to
                    track how popular the different stories are, so she is going to log story views and downloads.
                    S/he will add a simple chart to each story’s page to show the data.</p>
                <h2>These are Pat’s requirements.</h2>
                <ol>
                    <li>Web site for stories</li>
                    <li>Ability to submit and display stories</li>
                    <li>Ability to download a graphic (*.png) with stories embedded</li>
                    <li>log views and downloads</li>
                    <li>Display a simple filtered chart of views and downloads over time</li>
                </ol>
                <h2>Deliverables:</h2>
                <p>The applicant should return their implementation of the above to Crawford Technologies
                    along with any installation instructions necessary to install and run their application. Please be
                    sure to include source code for review by our staff.</p>
            </div>
        </div>
    );
};

export default About;
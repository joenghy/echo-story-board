import '../onload.js';

const Home = () => {
  return (
    <div>
      <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.2.0/css/all.min.css" />
      <div className="menu-button"><i className="fas fa-bars" /></div>
      <div className="side-bar active">
        <div className="close-button"><i className="fas fa-times" /></div>
        <div className="icon"><a href="/"><img src="/echo_logo.png" /></a></div>
        <div className="menu">
          <div className="item" id="about"><a href="/about"><i className="fas fa-info-circle">  About  </i></a></div>
          <div className="item">
            <a className='sub-button'><i className="fas fa-book">  Story  </i><i className="fas fa-angle-right dropdown" /></a>
            <div className="sub-menu">
              <a href="/board">Story Board</a>
              <a href="/editor">Post A Story</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
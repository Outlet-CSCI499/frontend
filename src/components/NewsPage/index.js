import "./index.scss";
import LogoTitle from "../../assets/images/logo-outlet1.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const NewsPage = () => {
  const [recent, setRecent] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [text, setText] = useState(false);

  return (
    <>
      <div className="newsContainer">
        <h1>Related News</h1>
        <div className="headerBar">
          <div className="headerFilter">
            <input
              type="button"
              value="Recent"
              onClick={(recent) => setRecent(recent.target.value)}
            ></input>
            <input
              type="button"
              value="Top Rated"
              onClick={(topRated) => setTopRated(topRated.target.value)}
            ></input>
            <input
              type="button"
              value="Text"
              onClick={(text) => setText(text.target.value)}
            ></input>
            <input type="text" placeholder="Search Keywords"></input>
          </div>
          <div className="headerTopComments">
            <h2>Top Article Comments</h2>
            <div className="userComments">
              {/* Create Box + Boxes for comments */}
            </div>
          </div>
        </div>
        <div className="newsBox">
          <div className="articleHover">
            <div className="middle">
              <div class="text">Article 1</div>
            </div>
          </div>
          <div className="articleHover">
            <div className="middle">
              <div class="text">Article 2</div>
            </div>
          </div>
          <div className="articleHover">
            <div className="middle">
              <div class="text">Article 3</div>
            </div>
          </div>
          <div className="articleHover">
            <div className="middle">
              <div class="text">Article 4</div>
            </div>
          </div>
          <div className="articleHover">
            <div className="middle">
              <div class="text">Article 5</div>
            </div>
          </div>
          <div className="articleHover">
            <div className="middle">
              <div class="text">Article 6</div>
            </div>
          </div>
          <div className="articleHover">
            <div className="middle">
              <div class="text">Article 7</div>
            </div>
          </div>
          <div className="articleHover">
            <div className="middle">
              <div class="text">Article 8</div>
            </div>
          </div>
          <div className="articleHover">
            <div className="middle">
              <div class="text">Article 9</div>
            </div>
          </div>
        </div>
        <div className="pageBar">
          <h1></h1>
        </div>
      </div>
    </>
  );
};

export default NewsPage;

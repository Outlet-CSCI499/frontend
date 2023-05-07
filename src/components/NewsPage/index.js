import "./index.scss";
import { Link } from "react-router-dom";
import { useState } from "react";
import {
  SegmentedControl,
  TextInput,
  Center,
  Box,
  SimpleGrid,
  Pagination,
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faClockRotateLeft,
  faArrowUpLong,
} from "@fortawesome/free-solid-svg-icons";

const NewsPage = () => {
  const [filter, setFilter] = useState("recent");
  const [recent, setRecent] = useState(false);
  const [topRated, setTopRated] = useState(false);
  const [text, setText] = useState(false);

  return (
    <>
      <div className="newsContainer">
        <div className="news">
          <div className="newsTitle">
            <h1>Related News</h1>
          </div>
          <div className="newsTiles">
            <div className="newsFilter">
              <SegmentedControl
                value={filter}
                onChange={setFilter}
                data={[
                  {
                    label: (
                      <Center>
                        <FontAwesomeIcon icon={faClockRotateLeft} size="l" />
                        <Box ml={10}>Recent</Box>
                      </Center>
                    ),
                    value: "recent",
                  },
                  {
                    label: (
                      <Center>
                        <FontAwesomeIcon icon={faArrowUpLong} size="l" />
                        <Box ml={10}>Top Rated</Box>
                      </Center>
                    ),
                    value: "top",
                  },
                ]}
                size="xl"
              />
              <TextInput
                placeholder="Search Keywords"
                icon={<FontAwesomeIcon icon={faMagnifyingGlass} size="xl" />}
                size="xl"
                className="newsKeywords"
              />
            </div>
            <div>
              <SimpleGrid cols={3} spacing="md" className="newsGrid">
                <div>1</div>
                <div>2</div>
                <div>3</div>
                <div>4</div>
                <div>5</div>
                <div>6</div>
                <div>7</div>
                <div>8</div>
                <div>9</div>
              </SimpleGrid>
            </div>
            <div className="newsPagination">
              <Center>
                <Pagination total={10} size="xl" />
              </Center>
            </div>
          </div>
          {/* <div className="newsArticleComments">ssss</div> */}
        </div>
      </div>
    </>
  );
};

export default NewsPage;

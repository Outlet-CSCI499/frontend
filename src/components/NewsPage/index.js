import "./index.scss";
import { Link } from "react-router-dom";
import logo from "../../assets/images/logo.png";
import { useState } from "react";
import { useDisclosure, useDebouncedValue } from "@mantine/hooks";
import {
  SegmentedControl,
  TextInput,
  Center,
  Box,
  SimpleGrid,
  Pagination,
  BackgroundImage,
  Modal,
  Rating,
  Text,
} from "@mantine/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faMagnifyingGlass,
  faClockRotateLeft,
  faArrowUpLong,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const NewsPage = () => {
  const [filter, setFilter] = useState("recent");
  const [news, setNews] = useState([]);
  const [filteredNews, setFilteredNews] = useState([]);
  const [activePage, setPage] = useState(1);
  const [selectedArticle, setSelectedArticle] = useState({});
  const [opened, { open, close }] = useDisclosure(false);
  const [searchInput, setSearchInput] = useState("");
  const [debounced] = useDebouncedValue(searchInput, 200);

  useEffect(() => {
    //console.log(filter);
    if (filter === "recent") {
      fetch("http://localhost:3000/newsExample.json")
        .then((res) => res.json())
        .then((res) => {
          setNews(res.articles);
        });
    } else {
      fetch("http://localhost:3000/newsExample.json")
        .then((res) => res.json())
        .then((res) => {
          setNews(
            res.articles.sort((a, b) => {
              return a.rank - b.rank;
            })
          );
        });
    }
  }, [filter]);

  useEffect(() => {
    setFilteredNews(
      news.filter((article) =>
        article.title.toLowerCase().includes(debounced.toLowerCase())
      )
    );
  }, [debounced]);

  const handleArticleClick = (title, media, summary, link) => {
    setSelectedArticle({
      title: title,
      media: media,
      summary: summary,
      link: link,
    });
    open();
  };

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
                        <FontAwesomeIcon icon={faClockRotateLeft} size="sm" />
                        <Box ml={10}>Recent</Box>
                      </Center>
                    ),
                    value: "recent",
                  },
                  {
                    label: (
                      <Center>
                        <FontAwesomeIcon icon={faArrowUpLong} size="sm" />
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
                value={searchInput}
                onChange={(event) => setSearchInput(event.currentTarget.value)}
              />
            </div>
            <div style={{ height: "585px" }}>
              <SimpleGrid cols={3} spacing="md" className="newsGrid">
                {!searchInput &&
                  news
                    .slice(activePage * 9 - 9, activePage * 9)
                    .map((article) => {
                      return (
                        <div
                          className="newsGridTile"
                          onClick={() =>
                            handleArticleClick(
                              article.title,
                              article.media,
                              article.summary,
                              article.link
                            )
                          }
                          key={article.link}
                        >
                          <BackgroundImage src={article.media} radius="sm">
                            <Center>{article.title}</Center>
                          </BackgroundImage>
                        </div>
                      );
                    })}

                {searchInput &&
                  filteredNews
                    .slice(activePage * 9 - 9, activePage * 9)
                    .map((article) => {
                      return (
                        <div
                          className="newsGridTile"
                          onClick={() =>
                            handleArticleClick(
                              article.title,
                              article.media,
                              article.summary,
                              article.link
                            )
                          }
                          key={article.link}
                        >
                          <BackgroundImage src={article.media} radius="sm">
                            <Center>{article.title}</Center>
                          </BackgroundImage>
                        </div>
                      );
                    })}
              </SimpleGrid>
            </div>
            <div className="newsPagination">
              <Center>
                <Pagination
                  value={activePage}
                  onChange={setPage}
                  total={10}
                  size="xl"
                />
              </Center>
            </div>
          </div>
          {/* <div className="newsArticleComments">ssss</div> */}
        </div>
      </div>
      <Modal
        size="1000px"
        opened={opened}
        onClose={close}
        //title={selectedArticle.title}
        centered
      >
        <Text fz="20px" fw={700} ta="center">
          {selectedArticle.title}
        </Text>
        <br />
        <Center>
          <img src={selectedArticle.media} width="500px"></img>
        </Center>
        <br />
        <Center>
          <Text fz="15px">{selectedArticle.summary}</Text>
        </Center>
        <br />
        <Text fz="15px" ta="center">
          Full Article: <br />
          <a href={selectedArticle.link} target="_blank">
            {selectedArticle.title}
          </a>
        </Text>
      </Modal>
    </>
  );
};

export default NewsPage;

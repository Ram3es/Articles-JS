import React, { useState } from "react";
import "./index.scss";
import { Article } from "../../components";

export default () => {
  const [articles] = useState([
    {
      id: "001",
      title: "Article title 001",
      description: "lorem",
      image: "https://picsum.photos/id/388/200/300?grayscale",
    },
    {
      id: "002",
      title: "Article title 002",
      description: "lorem",
      image: "https://picsum.photos/id/389/200/300?grayscale",
    },
    {
      id: "003",
      title: "Article title 003",
      description: "lorem",
      image: "https://picsum.photos/id/390/200/300?grayscale",
    },
    {
      id: "004",
      title: "Article title 004",
      description: "lorem",
      image: "https://picsum.photos/id/391/200/300?grayscale",
    },
    {
      id: "005",
      title: "Article title 005",
      description: "lorem",
      image: "https://picsum.photos/id/392/200/300?grayscale",
    },
    {
      id: "006",
      title: "Article title 006",
      description: "lorem",
      image: "https://picsum.photos/id/393/200/300?grayscale",
    },
    {
      id: "007",
      title: "Article title 007",
      description: "lorem",
      image: "https://picsum.photos/id/395/200/300?grayscale",
    },
  ]);

  return (
    <div className="articles-list">
      {articles.map((article) => (
        <Article key={article.id} article={article} />
      ))}
    </div>
  );
};

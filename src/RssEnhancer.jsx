import rssEnhancer from "react-rss";

const DefaultRSSComponent = (props) => (
  <div>
    <h2>{props.label}</h2>
    <a href={props.rss.header.link}>{props.rss.header.title}</a>
    <ul>
      {props.rss.items.map((item) => (
        <li>{item.description}</li>
      ))}
    </ul>
  </div>
);

export default rssEnhancer(
  DefaultRSSComponent,
  "https://mwclearning.com/?feed=rss2"
);

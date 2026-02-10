import React from "react";

export default function NewsCard({ item, onClick, rightSlot }) {
  return (
    <div className="card" onClick={() => onClick(item.id)} role="button" tabIndex={0}>
      <div className="thumb">
        <div className="tag">{item.tag}</div>
      </div>
      <div className="card-body">
        <div className="row-between">
          <h3 className="title" style={{ marginRight: 10 }}>{item.title}</h3>
          {rightSlot}
        </div>
        <p className="desc">{item.desc}</p>
      </div>
    </div>
  );
}
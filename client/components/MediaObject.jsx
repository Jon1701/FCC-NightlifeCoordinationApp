// Dependencies.
import React from 'react';  // React.

// Component definition.
const MediaObject = props => (
  <article className="media box">
    <figure className="media-left">
      <p className="image is-64x64">
        <a href={props.field.url} target="_blank" rel="noopener noreferrer">
          <img src={props.field.image_url} alt={props.field.name} />
        </a>
      </p>
      <p className="has-text-centered">
        <span>
          <img src={props.field.rating_img_url_small} alt={`Rating: ${props.field.rating}/5`} />
        </span>
      </p>
    </figure>
    <div className="media-content">
      <div className="content">
        <p>
          <strong className="subtitle is-3">
            <a href={props.field.url} target="_blank" rel="noopener noreferrer">
              {props.field.name}
            </a>
          </strong>
          <br />
          <p className="is-italic">
            {props.field.snippet_text}
          </p>
        </p>
      </div>
    </div>
    <div className="media-right">
      <button className="delete" />
    </div>
  </article>
);

// Component export.
export default MediaObject;

// Typecheck props
MediaObject.propTypes = {
  field: React.PropTypes.shape({
    url: React.PropTypes.string,
    image_url: React.PropTypes.string,
    rating: React.PropTypes.number,
    rating_img_url_small: React.PropTypes.string,
    name: React.PropTypes.string,
    snippet_text: React.PropTypes.string,
  }),
};

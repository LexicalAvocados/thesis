import React from 'react';
import {Link, withRouter} from 'react-router-dom';
import axios from 'axios';

class SectionList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      options: [],
      date: ''
    };
    this.onClickCallback = this.onClickCallback.bind(this);
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    axios.get('/api/getOptionsForSection', { params: {sectionId: this.props.section.id}})
      .then((options) => {
        let sortedOptions = options.data.sort((one, two) => {
          if (one.createdAt < two.createdAt) return 1;
          if (one.createdAt > two.createdAt) return -1;
        });
        this.setState({
          options: sortedOptions
        });
      })
      .catch((err) => {
        console.log('Request to get options for section NOT sent to server');
      });
  }

  onClickCallback() {
    this.props.onSectionClick(this.props.section, this.state.options);
    this.props.history.push('/section' + this.props.section.id);
  }

  render () {
    return (
      <div onClick={this.onClickCallback} className="projectHomeSectionListEntry">
        {/* <Link to={'/section' + this.props.section.id}>  */}
        <p className="closerTextLarger">Section Name: {this.props.section.name}</p>
        <p className="closerText">Section Description: {this.props.section.description}</p>
        <p>Created On: {this.state.date = new Date(this.props.section.createdAt.slice(0, 19)).toString().slice(0, 24)}</p>
        <div>
          { this.state.options.map((option, i) => {
            return <img className="projectHomeSectionListThumbnail" src={option.thumbnail} alt="" key={i}/>
          })}
        </div>
        {/* </Link> */}
      </div>
    );
  }
}

export default withRouter(SectionList);
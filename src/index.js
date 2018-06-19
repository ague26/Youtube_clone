import _ from 'lodash';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import YTSearch from 'youtube-api-search';
import SearchBar from './components/search_bar';
import VideoList from './components/video_list';
import VideoDetails from './components/video_detail'
const API_KEY= 'AIzaSyBuAaD7B8E4uoqkmTrhhfSAWWGSZBOy_OE';

class App extends Component  {
	constructor(props){
		super(props);

		this.state={
			videos:[],
			selectedvideo:null,
		}

		this.videoSearch('surfboards');
	}

	videoSearch(term){
		YTSearch({key:API_KEY, term:term}, (videos)=>{
			this.setState({ 
				videos:videos, 
				selectedvideo:videos[0],
			});
		});
	}
	render(){
		const videoSearch= _.debounce((term) => {this.videoSearch(term)}, 300);
		return ( 
			<div> 
				<SearchBar onSearchTermChange={videoSearch} />
				<VideoDetails video={this.state.selectedvideo} /> 
				<VideoList
					onVideoSelect={ selectedvideo => this.setState({selectedvideo}) }
					videos={this.state.videos} />
			</div>
		);
	}
}

ReactDOM.render(<App />, document.querySelector('.container'));
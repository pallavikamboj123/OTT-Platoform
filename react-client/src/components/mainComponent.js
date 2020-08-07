import React, {Component} from 'react';
import Home from './homeComponent';
import AnimeDetail from './animeDetailComponent';
import WatchList from './watchListComponent';
import {connect} from 'react-redux';
import {signUp, loginUser, logoutUser, fetchTrending,
     fetchAnime, fetchAnimeEpisodes,fetchAnimeReviews,fetchAnimeStreamingLinks,
    addListServer, fetchWatchList, removeFromWatchList} from '../redux/actioncreators'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';


const mapStateToProps = state =>{
    return{
        trending: state.trending,
        auth: state.auth,
        anime: state.anime,
        animeContent: state.animeContent,
        watchList: state.watchList
    }
}

const mapDistpatchToProps = dispatch => ({
    signUp : (firstname, lastname, username, password)=> dispatch(signUp(firstname, lastname, username, password)),
    loginUser: (creds)=>dispatch(loginUser(creds)),
    logoutUser: ()=>dispatch(logoutUser()),
    fetchTrending: ()=>dispatch(fetchTrending()),
    fetchAnime: (anime)=>dispatch(fetchAnime(anime)) ,
    fetchAnimeReviews: (animeId) => dispatch(fetchAnimeReviews(animeId)),
    fetchAnimeEpisodes: (animeId) => dispatch(fetchAnimeEpisodes(animeId)),
    fetchAnimeStreamingLinks: (animeId) => dispatch(fetchAnimeStreamingLinks(animeId)),
    addListServer: (user,animeId) => dispatch(addListServer(user,animeId)),
    fetchWatchList: (user)=>dispatch(fetchWatchList(user)),
    removeFromWatchList: (animeId)=>dispatch(removeFromWatchList(animeId))

})



class Main extends Component{
    constructor(props){
        super(props);
        
    }

    componentWillMount(){
         this.props.fetchTrending();
       
    }
    


    render(){
        const Homepage= () => {
            return(
                <Home 
                    trending={this.props.trending} 
                    anime={this.props.anime}
                    signUp={this.props.signUp}
                    loginUser = {this.props.loginUser}
                    auth={this.props.auth}
                    logoutUser = {this.props.logoutUser}
                    fetchAnime = {this.props.fetchAnime}
                    fetchAnimeReviews = {this.props.fetchAnimeReviews}
                    fetchAnimeEpisodes = {this.props.fetchAnimeEpisodes}
                    fetchAnimeStreamingLinks = {this.props.fetchAnimeStreamingLinks}
                    fetchWatchList = {this.props.fetchWatchList}
                    
                />
            );
        }

        const TrendingAnimeDetail = ({match}) =>{
           
          
             
            return(
                <AnimeDetail 
                    anime = {this.props.trending.trending.data.filter((anime)=> anime.id === match.params.animeId)[0]}
                    animeContent= {this.props.animeContent}
                    addListServer = {this.props.addListServer}
                    auth = {this.props.auth}
                   
                />
            );
        }

        const AnimeIdDetail = ({match}) => {
           
            return(
                <AnimeDetail 
                    anime = {this.props.anime.anime.data.filter((anime) => anime.id === match.params.animeId)[0]}
                    animeContent= {this.props.animeContent}
                    addListServer = {this.props.addListServer}
                    auth = {this.props.auth}
                 
                />
            );
        }
       

        const Watchlist = ()=>{
            var data = this.props.watchList.watchList;
            var loading = this.props.watchList.isLoading;
            return(
                <WatchList 
                    auth = {this.props.auth} 
                    watchList = {data}
                    loading = {loading}
                    removeWatchList = {this.props.removeFromWatchList}
                />
            );
        } 
        return(
            <>
            <Switch>
                <Route exact path="/home" component={Homepage} />
                <Route exact path="/trending/:animeId" component={TrendingAnimeDetail} />
                <Route exact path="/anime/:animeId" component={AnimeIdDetail} />
                <Route exact path="/watchlist" component={Watchlist} />
                <Redirect to="/home" />
            </Switch>
            
            </>
        );
    }
}

export default withRouter(connect(mapStateToProps, mapDistpatchToProps)(Main));
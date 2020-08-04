import React, {Component} from 'react';
import Home from './homeComponent';
import AnimeDetail from './animeDetailComponent';
import WatchList from './watchListComponent';
import {connect} from 'react-redux';
import {signUp, loginUser, logoutUser, fetchTrending,
     fetchAnime, fetchAnimeEpisodes,fetchAnimeReviews,fetchAnimeStreamingLinks} from '../redux/actioncreators'
import {Switch, Route, Redirect, withRouter} from 'react-router-dom';


const mapStateToProps = state =>{
    return{
        trending: state.trending,
        auth: state.auth,
        anime: state.anime,
        animeContent: state.animeContent
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
    fetchAnimeStreamingLinks: (animeId) => dispatch(fetchAnimeStreamingLinks(animeId))

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
                />
            );
        }

        const TrendingAnimeDetail = ({match}) =>{
           
          
             
            return(
                <AnimeDetail 
                    anime = {this.props.trending.trending.data.filter((anime)=> anime.id === match.params.animeId)[0]}
                    animeContent= {this.props.animeContent}
                />
            );
        }

        const AnimeIdDetail = ({match}) => {
           
            return(
                <AnimeDetail 
                    anime = {this.props.anime.anime.data.filter((anime) => anime.id === match.params.animeId)[0]}
                    animeContent= {this.props.animeContent}
                />
            );
        }
       

        const Watchlist = ()=>{
            return(
                <WatchList auth = {this.props.auth} />
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
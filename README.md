# liri-node-app

LIRI is an easy to use for getting information on three different things. 

LIRI will not function without the user getting their own keys for Spotify and saving them to a .env file. Go to https://www.npmjs.com/package/node-spotify-api to get your keys and read their documenation to get set up on that front. 

To use LIRI, the user must run node and navigate to the root directory, at which point they must install all required packages. 

Once that is done, LIRI is ready to go. It has four different command function. All command functions must be initialized with the standatd 'node liri.js' to start, then followed up with a specific command.  

'node liri.js concert-this <ARTIST>' will make the Bands in Town API search its database for upcoming concerts by that artist, and will log to the console the name of the venue, the location, and the date of the vent, which will be formatted by moment.js into MM/DD/YYYY form. 

'node liri.js spotify-this-song <SONG>' seatch the spotify API for a song name, and will log to the console the artist, the song name, a preview link tot he song, and the album the song is from. If the user enters the command without specifying a song, it will default to The Sign by Ace of Base. 

'node liri.js movie-this <MOVIE>' will seatch the OMDB API for a movie and will log to the console the movie title, the release year, the IMDB rating, the rotten tomato rating, the conutry of origin, the language, a plot summary, and the top biolled actors. If the user enters the command without specifying a movie, it will default "Mr Nobody'. 

'node liri.js do-what-it-says' will read from the random.txt file and take arguments from it to run one of the above API searches. The default for this will be a spotify search for 'I Want it that way'.
import React, { useState, useEffect } from 'react';
import { getTVorMoviesByGenre, getTVorMovieDetailsByID } from '../../../index.js'
import { languageCodes } from '../id.js';

import { Button } from '@/components/shad/ui/button';
import { ChevronDown } from 'lucide-react';
import { useParams } from 'react-router-dom';
import { Link } from 'react-router-dom';


const getLanguageName = (code) => languageCodes[code] || code;

export default function Movies({categoryId}) {
  console.log("Current Category ID:", categoryId); // Add this line

  const [movies, setMovies] = useState([]);
  const [movie, setMovie] = useState(null);
  const [id, setId] = useState(null);

  useEffect(() => {
    const fetchMovies = async () => {
      const movies = await getTVorMoviesByGenre('movie', categoryId);
      setMovies(movies);
    };
    fetchMovies();
  }, [categoryId]);

  useEffect(() => {
    if (id!== null) {
      const fetchData = async () => {
        try {
          const movieData = await getTVorMovieDetailsByID('movie', id);
          setMovie(movieData);
        } catch (error) {
          console.error('Fetch Data Error:', error);
        }
      };
      fetchData();
    }
  }, [id]);


  const getCategoryName = () => {
    console.log(`CategoryId: ${categoryId}`);
  
    // Assuming these are the correct mappings for your genres
    const genreMap = {
      27: 'Horror',
      28: 'Action',
      12: 'Adventure',
      14: 'Fantasy',
      878: 'Sci-Fi',
    };
  
    return genreMap[categoryId] || 'Unknown';
  }

  return (
    <div>
      <div className='bg-red-950 '>
        <h1 className="text-4xl font-bold text-creepster text-center text-yellow-500 py-1">{getCategoryName()}</h1>
      </div>
      <div className='bg-red-950'>
        <div
          className="grid grid-cols-4 gap-1 p-2 ml-20"
          style={{
            gridTemplateColumns: 'epeat(4, 1fr)',
          }}
        >
          {movies.map((movie) => (
            <div key={movie.id} className="relative rounded-lg  overflow-hidden transform transition-all duration-300 ease-in-out  group">
              <img src={`https://image.tmdb.org/t/p/w500${movie.poster_path}`} alt={movie.title || movie.name} className="w-52 h-64 object-cover rounded-lg" />
              <div className="px-1 py-1 hidden group-hover:block bg-white group-hover:px-2 w-52 rounded-lg  ">
                <h2 className="text-black font-semibold" onClick={() => setId(movie.id)}>{movie.title}</h2>
                <h3 className="text-sm text-black">Language:{getLanguageName(movie.original_language)}</h3>
                <Link to={`/moviedetails/${movie.id}`}>
                  <Button className="ml-16 bg-transparent text-black hover:bg-red-900 hover:text-white "><ChevronDown/></Button>
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
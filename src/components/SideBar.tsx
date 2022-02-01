import { useEffect, useState } from "react";
import { api } from "../services/api";
import { Button } from "./Button";

interface MovieProps {
  imdbID: string;
  Title: string;
  Poster: string;
  Ratings: Array<{
    Source: string;
    Value: string;
  }>;
  Runtime: string;
}

interface GenreResponseProps {
  id: number;
  name: 'action' | 'comedy' | 'documentary' | 'drama' | 'horror' | 'family';
  title: string;
}

interface sidebarProps{
  handleClickButton: (id: number) => void;
  selectedGenreId: number;
}

export function SideBar({ handleClickButton, selectedGenreId }: sidebarProps) {
  const [genres, setGenres] = useState<GenreResponseProps[]>([]);

  useEffect(() => {
    api.get<GenreResponseProps[]>(`genres/${selectedGenreId}`).then(response => {
      setGenres(response.data);
    })
  }, [selectedGenreId]);

  return(
    <nav className="sidebar">
        <span>Watch<p>Me</p></span>

        <div className="buttons-container">
          {genres.map(genre => (
            <Button
              key={String(genre.id)}
              title={genre.title}
              iconName={genre.name}
              onClick={() => handleClickButton(genre.id)}
              selected={selectedGenreId === genre.id}
            />
          ))}
        </div>

      </nav>
  )
}
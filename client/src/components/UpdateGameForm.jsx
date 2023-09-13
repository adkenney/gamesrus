import { useQueryClient, useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { useGetPublishers } from '../api/useGetPublishers';
import { useGetPlatforms } from '../api/useGetPlatforms';
import { useGetGenres } from '../api/useGetGenres';

export default function UpdateGameForm(game) {
  const publishers = useGetPublishers();
  const platforms = useGetPlatforms();
  const genres = useGetGenres();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      title: game.game.title,
      summary: game.game.summary,
      release_date: game.game.release_date.slice(0, 10),
      publisher: game.game.publisher._id,
      platform: game.game.platform._id,
      genre: game.game.genre[0]._id,
      price: game.game.price,
    },
  });
  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async formData => {
      await fetch(
        `${import.meta.env.VITE_BASE_URL}/api/games/${game.game._id}`,
        {
          method: 'PUT',
          body: JSON.stringify(formData),
          headers: { 'Content-type': 'application/json' },
        }
      );
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKeys: ['game'] });
      alert('Game updated successfully');
    },
    onError: err => {
      console.log(err.message);
    },
  });
  return (
    <>
      <form onSubmit={handleSubmit(mutate, errors)}>
        <label htmlFor="title-input">Title</label>
        <input {...register('title')} name="title" id="title-input" />
        <label htmlFor="summary-text">Summary</label>
        <textarea {...register('summary')} name="summary" id="summary-text" />
        <label htmlFor="release_date-input">Release Date</label>
        <input
          {...register('release_date')}
          type="date"
          name="release_date"
          id="release_date-input"
        />
        <label htmlFor="publisher-select">Publisher</label>
        <select
          {...register('publisher')}
          name="publisher"
          id="publisher-select"
        >
          {publishers &&
            publishers.map(publisher => {
              return (
                <option key={publisher._id} value={publisher._id}>
                  {publisher.name}
                </option>
              );
            })}
        </select>
        <label htmlFor="platform-select">Platform</label>
        <select {...register('platform')} name="platform" id="platform-select">
          {platforms &&
            platforms.map(platform => {
              return (
                <option key={platform._id} value={platform._id.toString()}>
                  {platform.name}
                </option>
              );
            })}
        </select>
        <label htmlFor="genre-select">Genre</label>
        <select {...register('genre')} name="genre" id="genre-select">
          {genres &&
            genres.map(genre => {
              return (
                <option key={genre._id} value={genre._id}>
                  {genre.name}
                </option>
              );
            })}
        </select>
        <label htmlFor="price-input">Price</label>
        <input
          {...register('price')}
          type="number"
          name="price"
          id="price-input"
          step="0.01"
        />
        {errors && <span>{errors.message}</span>}
        <input type="submit" />
      </form>
    </>
  );
}

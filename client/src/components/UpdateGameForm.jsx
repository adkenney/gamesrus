import PropTypes from 'prop-types';
import { useQueryClient, useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { useGetPublishers } from '../api/useGetPublishers';
import { useGetPlatforms } from '../api/useGetPlatforms';
import { useGetGenres } from '../api/useGetGenres';

export default function UpdateGameForm({ game }) {
  const publishers = useGetPublishers();
  const platforms = useGetPlatforms();
  const genres = useGetGenres();
  const { register, handleSubmit, errors } = useForm({
    defaultValues: {
      title: game.title,
      summary: game.summary,
      release_date: game.release_date.slice(0, 10),
      publisher: game.publisher._id,
      platform: game.platform.map(platform => platform._id),
      genre: game.genre.map(genre => genre._id),
      price: game.price,
    },
  });

  const queryClient = useQueryClient();
  const { mutate } = useMutation({
    mutationFn: async formData => {
      await fetch(`${import.meta.env.VITE_BASE_URL}/api/games/${game._id}`, {
        method: 'PUT',
        body: JSON.stringify(formData),
        headers: { 'Content-type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKeys: ['game', game._id] });
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
        <fieldset>
          <legend>Platform</legend>
          {platforms &&
            platforms.map(platform => {
              return (
                <div key={platform._id}>
                  <input
                    type="checkbox"
                    {...register('platform')}
                    name="platform"
                    id={platform.name}
                    value={platform._id.toString()}
                  />
                  <label htmlFor={platform.name}>{platform.name}</label>
                </div>
              );
            })}
        </fieldset>
        <fieldset>
          <legend>Genre</legend>
          {genres &&
            genres.map(genre => {
              return (
                <div key={genre._id}>
                  <input
                    type="checkbox"
                    {...register('genre')}
                    name="genre"
                    id={genre.name}
                    key={genre._id}
                    value={genre._id}
                  />
                  <label htmlFor={genre.name}>{genre.name}</label>
                </div>
              );
            })}
        </fieldset>
        <label htmlFor="price-input">Price</label>
        <input
          {...register('price')}
          type="number"
          name="price"
          id="price-input"
          step="0.01"
        />
        {errors && <span>{errors.message}</span>}
        <input type="submit" value="Update" />
      </form>
    </>
  );
}

UpdateGameForm.propTypes = {
  game: PropTypes.object.isRequired,
};

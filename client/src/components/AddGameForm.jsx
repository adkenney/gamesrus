import { useState } from 'react';
import { useQueryClient, useMutation } from 'react-query';
import { useForm } from 'react-hook-form';
import { useGetPublishers } from '../api/useGetPublishers';
import { useGetPlatforms } from '../api/useGetPlatforms';
import { useGetGenres } from '../api/useGetGenres';

export default function AddGameForm() {
  const [showModal, setShowModal] = useState(false);
  const publishers = useGetPublishers();
  const platforms = useGetPlatforms();
  const genres = useGetGenres();

  const { register, handleSubmit, errors, reset } = useForm();

  const queryClient = useQueryClient();

  const { mutate } = useMutation({
    mutationFn: async formData => {
      await fetch(`${import.meta.env.VITE_BASE_URL}/api/games`, {
        method: 'POST',
        body: JSON.stringify(formData),
        headers: { 'Content-Type': 'application/json' },
      });
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['game'] });
      reset();
      setShowModal(false);
      alert('Game added successfully');
    },
    onError: error => {
      console.log(error);
    },
  });

  return (
    <>
      {showModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <form onSubmit={handleSubmit(mutate, errors)}>
              <label htmlFor="title-input">Title</label>
              <input {...register('title')} name="title" id="title-input" />
              <label htmlFor="summary-text">Summary</label>
              <textarea
                {...register('summary')}
                name="summary"
                id="summary-text"
              />
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
              <label htmlFor="genre-select">Genre</label>
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
            <button onClick={() => setShowModal(!showModal)}>Close</button>
          </div>
        </div>
      )}
      <button onClick={() => setShowModal(!showModal)}>Add Game</button>
    </>
  );
}

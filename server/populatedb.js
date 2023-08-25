#! /usr/bin/env node

console.log(
  'This script populates some test games, publishers, platforms and genres to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
);

// Get arguments passed on command line
const userArgs = process.argv.slice(2);
const Game = require('./src/models/gameModel');
const Publisher = require('./src/models/publisherModel');
const Platform = require('./src/models/platformModel');
const Genre = require('./src/models/genreModel');

const genres = [];
const publishers = [];
const platforms = [];
const games = [];

const mongoose = require('mongoose');
mongoose.set('strictQuery', false); // Prepare for Mongoose 7

const mongoDB = userArgs[0];

main().catch(err => console.log(err));

async function main() {
  console.log('Debug: About to connect');
  await mongoose.connect(mongoDB);
  console.log('Debug: Should be connected?');
  await createGenres();
  await createPublishers();
  await createPlatforms();
  await createGames();
  console.log('Debug: Closing mongoose');
  mongoose.connection.close();
}

// We pass the index to the ...Create functions so that, for example,
// genre[0] will always be the Action genre, regardless of the order
// in which the elements of promise.all's argument complete.
async function genreCreate(index, name) {
  const genre = new Genre({ name: name });
  await genre.save();
  genres[index] = genre;
  console.log(`Added genre: ${name}`);
}

async function publisherCreate(index, name, founded) {
  const publisherdetail = { name: name, founded: founded };

  const publisher = new Publisher(publisherdetail);

  await publisher.save();
  publishers[index] = publisher;
  console.log(`Added publisher: ${name} ${founded}`);
}

async function gameCreate(
  index,
  title,
  summary,
  publisher,
  platform,
  release_date,
  genre,
  stock
) {
  const gamedetail = {
    title: title,
    summary: summary,
    publisher: publisher,
    platform: platform,
    release_date: release_date,
    stock: stock,
  };
  if (genre != false) gamedetail.genre = genre;

  const game = new Game(gamedetail);
  await game.save();
  games[index] = game;
  console.log(`Added game: ${title}`);
}

async function platformCreate(index, name) {
  const platformdetail = {
    name: name,
  };
  const platform = new Platform(platformdetail);
  await platform.save();
  platforms[index] = platform;
  console.log(`Added platform: ${name}`);
}

async function createGenres() {
  console.log('Adding genres');
  await Promise.all([
    genreCreate(0, 'Action'),
    genreCreate(1, 'Fighting'),
    genreCreate(2, 'First-person Shooter'),
  ]);
}

async function createPublishers() {
  console.log('Adding publishers');
  await Promise.all([
    publisherCreate(0, 'Electronic Arts', '1982-05-27'),
    publisherCreate(1, 'Microsoft', '1975-04-04'),
    publisherCreate(2, 'Sony Interactive Entertainment', '1993-11-16'),
    publisherCreate(3, 'Nintendo', '1889-09-23'),
    publisherCreate(4, 'Activision Blizzard', '2008-07-10'),
    publisherCreate(5, 'Capcom', '1979-05-30'),
  ]);
}

async function createPlatforms() {
  console.log('Adding platforms');
  await Promise.all([
    platformCreate(0, 'PlayStation 5'),
    platformCreate(1, 'PlayStation 4'),
    platformCreate(2, 'PlayStation 3'),
    platformCreate(3, 'PlayStation 2'),
    platformCreate(4, 'Xbox'),
    platformCreate(5, 'Xbox 360'),
    platformCreate(6, 'Xbox One'),
    platformCreate(7, 'Xbox Series X/S'),
    platformCreate(8, 'PC'),
  ]);
}

async function createGames() {
  console.log('Adding Games');
  await Promise.all([
    gameCreate(
      0,
      'God of War Ragnarok',
      "Near the end of Fimbulwinter, Kratos and Atreus return home—fending off an ambush from a vengeful Freya—to find their wolf Fenrir in his final moments. Atreus' grief transforms him into a bear through his still-uncontrolled Giant and godly magic, briefly battling Kratos before returning to his senses. As prophesied in Atreus' dream three winters ago, Thor arrives with Odin, who proposes leaving them alone if Atreus abandons his secret search for Týr. Kratos refuses and duels Thor to a stalemate, and Odin tells Atreus he will leave Kratos alone if the former comes to Asgard. Kratos, Atreus, and Mímir take refuge at Sindri's home on a branch of Yggdrasil in the center of the nine realms.",
      publishers[2],
      platforms[0],
      '2022-11-09',
      [genres[0], genres[1]],
      1
    ),
    gameCreate(
      1,
      'Overwatch',
      'Overwatch takes place on a near-future Earth, some time in the mid 2070s. Some thirty years before, robots turned against humanity in what became known as the Omnic Crisis. This eventually led to the formation of an elite strike team, who finally brought an end to the war.',
      publishers[4],
      [platforms[0], platforms[1], platforms[7], platforms[8]],
      '2016-05-24',
      genres[2],
      1
    ),
    gameCreate(
      2,
      'Marvel vs. Capcom 2: New Age of Heroes',
      'players select a team of characters from the Marvel and Capcom universes to engage in combat and attempt to knock out their opponents.',
      publishers[5],
      [platforms[3], platforms[4]],
      '2002-09-19',
      genres[1],
      1
    ),
  ]);
}
